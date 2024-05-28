import DateComponent from './date'

export function Footer({dateString}: {dateString: string}) {
  return (
    <footer className="container mx-auto mb-5 px-5">
      <p className="text-muted text-center text-sm">
        Last update: <DateComponent dateString={dateString} />
      </p>
    </footer>
  )
}
