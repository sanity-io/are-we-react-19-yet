'use client'

import {CheckmarkCircleIcon, CloseCircleIcon} from '@sanity/icons'
import {stegaClean} from '@sanity/client/stega'

import type {ReportQueryResult} from '@/sanity.types'

export default function Report(props: {test: Exclude<ReportQueryResult, null>['test']}) {
  return (
    <section className="grid grid-cols-1 gap-4 p-4 text-sm leading-6 sm:grid-cols-2 sm:px-8 sm:pb-8 sm:pt-6 lg:grid-cols-1 lg:p-4 xl:grid-cols-2 xl:px-8 xl:pb-8 xl:pt-6">
      {props.test.map((test) => {
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
