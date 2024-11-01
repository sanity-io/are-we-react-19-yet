export function Favicon({pass}: {pass: boolean}) {
  return (
    <svg
      style={{
        background: pass ? 'rgb(22,101,52)' : 'rgb(153,27,27)',
        borderRadius: '50%',
      }}
      width="25"
      height="25"
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {pass ? (
        <path
          d="M5.5 11.5L10.5 16.5L19.5 7.60001"
          stroke="#fff"
          stroke-width="1.2"
          stroke-linejoin="round"
        />
      ) : (
        <path d="M18 7L7 18M7 7L18 18" stroke="#fff" stroke-width="1.2" stroke-linejoin="round" />
      )}
    </svg>
  )
}
