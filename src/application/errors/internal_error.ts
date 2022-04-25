import { BaseError } from '../../shared/base_error'

export class InternalError extends Error implements BaseError {
  name = 'InternalError'
  constructor (public readonly message: string = 'InternalError') {
    super(message)
  }
}
