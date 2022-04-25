import { BaseError } from '@shared/base_error'

export class UnauthorizedError extends Error implements BaseError {
  name = 'UnauthorizedError'
  constructor (public readonly message: string = 'UnauthorizedError') {
    super(message)
  }
}
