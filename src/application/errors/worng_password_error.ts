import { BaseError } from '../../shared/base_error'

export class WrongPasswordError extends Error implements BaseError {
  name = 'WrongPasswordError'
  constructor (public readonly message: string = 'WrongPasswordError') {
    super(message)
  }
}
