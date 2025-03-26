type FieldErrorProps = {
  error?: string | string[];
  showAllErrors?: boolean;
}

export function FormError({ error, showAllErrors }: FieldErrorProps) {
  if (!error || error.length === 0) {
    return null
  }
  if (showAllErrors) {
    return (
      <ul className="text-sm text-red-600 list-disc pl-5">
        {Array.isArray(error) ? error.map((e) => <li key={e}>{e}</li>) : <li>{error}</li>}
      </ul>
    )
  }
  return (
    <p className="text-sm text-red-600">{Array.isArray(error) ? error[0] : error}</p>
  )
}