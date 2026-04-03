export class HttpStatusError extends Error {
  status: number

  constructor(status: number, message: string) {
    super(message)
    this.status = status
  }
}

export function isAuthStatusError(error: unknown, message: string) {
  return (
    (error instanceof HttpStatusError && (error.status === 401 || error.status === 403)) ||
    message.includes('status 401') ||
    message.includes('status 403')
  )
}
