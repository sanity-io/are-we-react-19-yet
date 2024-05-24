import DateComponent from './date'

export default async function Page() {
  return (
    <>
      <main className="container mx-auto px-5">
        <section className="mb-16 mt-16 flex flex-col items-center lg:mb-12 lg:flex-row lg:justify-between">
          <h1 className="text-balance text-6xl font-bold leading-tight tracking-tighter lg:pr-8 lg:text-8xl">
            Yes or no
          </h1>
          <h2 className="mt-5 text-pretty text-center text-lg lg:pl-8 lg:text-left">
            0 of x tests are passing (0%)
          </h2>
        </section>
      </main>
      <footer className="container mx-auto px-5">
        <p className="text-muted text-center text-sm">
          Last update: <DateComponent dateString="2024-05-24T14:50:15.111Z" />
        </p>
      </footer>
    </>
  )
}
