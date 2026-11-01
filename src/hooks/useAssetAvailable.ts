import { useEffect, useState } from 'react'

/**
 * Checks that a static file in /public really exists before linking to it.
 * Dev servers and SPA hosts answer unknown paths with index.html, so the
 * content-type is checked as well as the status.
 */
export function useAssetAvailable(url: string, expectedType: string): boolean {
  const [available, setAvailable] = useState(false)

  useEffect(() => {
    const controller = new AbortController()
    fetch(url, { method: 'HEAD', signal: controller.signal })
      .then((res) => {
        const type = res.headers.get('content-type') ?? ''
        setAvailable(res.ok && type.includes(expectedType))
      })
      .catch(() => setAvailable(false))
    return () => controller.abort()
  }, [url, expectedType])

  return available
}
