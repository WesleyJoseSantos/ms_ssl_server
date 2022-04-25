import { BaseError } from '../../shared/base_error'

export class MediaTypeError extends Error implements BaseError {
  name = 'MediaTypeError'
  constructor (public readonly message: string = 'MediaTypeError') {
    super(message)
  }
}
