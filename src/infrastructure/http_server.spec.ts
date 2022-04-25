import { HttpServer } from './http_server'
import express from 'express'

jest.mock('express', () => jest.fn(() => ({
  use: jest.fn(() => ({})),
  json: jest.fn(() => ({})),
  listen: jest.fn(() => ({}))
})))

function makeSut () {
  const sut = new HttpServer()

  return { sut }
}

describe('HttpServer', () => {
  it('init()', () => {
    process.env.NODE_ENV = 'development'
    const { sut } = makeSut()
    sut.init()

    expect(express).toHaveBeenCalledTimes(1)
  })
})
