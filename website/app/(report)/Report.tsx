'use client'

import {CheckmarkCircleIcon, CloseCircleIcon} from '@sanity/icons'
import {stegaClean} from '@sanity/client/stega'

import type {ReportQueryResult} from '@/sanity.types'
import {useMemo, useState} from 'react'
import Link from 'next/link'

const filters = [
  {id: 'all', title: 'Show all'},
  {id: 'passing', title: 'Passing'},
  {id: 'failing', title: 'Failing'},
] as const

export default function Report(props: {
  test: Exclude<ReportQueryResult, null>['test']
  lastLiveEventId: string | undefined
}) {
  const {lastLiveEventId} = props
  const [filterBy, setFilterBy] = useState<(typeof filters)[number]['id']>(filters[0].id)
  const filtered = useMemo(() => {
    const copied = [...props.test]
    copied.sort((a, b) => {
      if (a.name && b.name) return a.name.localeCompare(b.name)
      return 0
    })
    switch (filterBy) {
      case 'failing':
        return copied.filter((test) => !test.pass)
      case 'passing':
        return copied.filter((test) => test.pass)
      default:
        return copied
    }
  }, [filterBy, props.test])
  return (
    <>
      <fieldset className="px-4 pb-6">
        <legend className="text-sm font-semibold leading-6 text-gray-900">Filter</legend>
        <div className="mt-6 space-y-6 sm:flex sm:items-center sm:space-x-10 sm:space-y-0">
          {filters.map((filter) => (
            <div key={filter.id} className="flex items-center">
              <input
                id={filter.id}
                type="radio"
                checked={filter.id === filterBy}
                onChange={() => setFilterBy(filter.id)}
                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
              />
              <label
                htmlFor={filter.id}
                className="ml-3 block text-sm font-medium leading-6 text-gray-900"
              >
                {filter.title}
              </label>
            </div>
          ))}
        </div>
      </fieldset>
      <section className="grid grid-cols-1 gap-4 p-4 text-sm leading-6 sm:grid-cols-2 sm:px-8 sm:pb-8 sm:pt-6 lg:grid-cols-1 lg:p-4 xl:grid-cols-2 xl:px-8 xl:pb-8 xl:pt-6">
        {filtered.map((test) => {
          if (!test._key) throw new Error('No key')
          if (!test.name) throw new Error('No name')
          if (!test.version) throw new Error('No version')
          return (
            <Link
              key={test._key}
              data-sanity-edit-target
              className={`group relative rounded-md bg-white p-3 shadow-sm ring-1 ring-slate-200 hover:shadow-md hover:ring-blue-500`}
              href={stegaClean(
                `/package/${test.name}${lastLiveEventId ? `?lastLiveEventId=${lastLiveEventId}` : ''}`,
              )}
              title={test.name || ''}
            >
              <span
                className={`absolute left-1.5 top-1.5 -z-0 scale-150 text-4xl opacity-25 ${test.pass ? 'text-green-800' : 'text-red-800'}`}
              >
                {test.pass ? <CheckmarkCircleIcon /> : <CloseCircleIcon />}
              </span>
              <span className="relative z-10 ml-1 pl-8">{test.name || 'No name'}</span>
            </Link>
          )
        })}
      </section>
    </>
  )
}
