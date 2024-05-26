'use client'

import {CheckmarkCircleIcon, CloseCircleIcon} from '@sanity/icons'
import {stegaClean} from '@sanity/client/stega'

import type {ReportQueryResult} from '@/sanity.types'
import {useMemo, useState} from 'react'

const filters = [
  {id: 'all', title: 'Show all'},
  {id: 'passing', title: 'Passing'},
  {id: 'failing', title: 'Failing'},
] as const

export default function Report(props: {test: Exclude<ReportQueryResult, null>['test']}) {
  const [filterBy, setFilterBy] = useState<(typeof filters)[number]['id']>(filters[0].id)
  const filtered = useMemo(() => {
    const copied = [...props.test]
    copied.sort((a, b) => {
      if (a.pass && !b.pass) return -1
      if (!a.pass && b.pass) return 1
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
    <section className="grid grid-cols-1 gap-4 p-4 text-sm leading-6 sm:grid-cols-2 sm:px-8 sm:pb-8 sm:pt-6 lg:grid-cols-1 lg:p-4 xl:grid-cols-2 xl:px-8 xl:pb-8 xl:pt-6">
      <fieldset className="pb-6">
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
      {filtered.map((test) => {
        return (
          <a
            key={test._key}
            className="g-blue-500 group relative rounded-md bg-white p-3 shadow-sm ring-1 ring-slate-200 hover:shadow-md hover:ring-blue-500"
            rel="noreferrer noopener"
            target="_blank"
            href={test.name ? stegaClean(`https://npmjs.com/package/${test.name}`) : undefined}
            title={test.name || ''}
          >
            <span
              className={`absolute right-1.5 top-1.5 -z-0 scale-150 text-4xl opacity-25 ${test.pass ? 'text-green-800' : 'text-red-800'}`}
            >
              {test.pass ? <CheckmarkCircleIcon /> : <CloseCircleIcon />}
            </span>
            <span className="relative z-10">{test.name || 'No name'}</span>
          </a>
        )
      })}
    </section>
  )
}
