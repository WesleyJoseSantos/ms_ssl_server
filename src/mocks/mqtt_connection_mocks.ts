import { IMqttConnection } from 'application/interfaces/imqtt_connection'
import { MqttClient, Store } from 'mqtt'

export const mqttConn : MqttClient = {
  publish: jest.fn(),
  on: jest.fn(),
  connected: true,
  disconnecting: false,
  disconnected: false,
  reconnecting: false,
  incomingStore: new Store({}),
  outgoingStore: new Store({}),
  options: {},
  queueQoSZero: false,
  once: jest.fn(),
  subscribe: jest.fn(),
  unsubscribe: jest.fn(),
  end: jest.fn(),
  removeOutgoingMessage: jest.fn(),
  reconnect: jest.fn(),
  handleMessage: jest.fn(),
  handleAuth: jest.fn(),
  getLastMessageId: jest.fn(),
  addListener: jest.fn(),
  removeListener: jest.fn(),
  off: jest.fn(),
  removeAllListeners: jest.fn(),
  setMaxListeners: jest.fn(),
  getMaxListeners: jest.fn(),
  listeners: jest.fn(),
  rawListeners: jest.fn(),
  emit: jest.fn(),
  listenerCount: jest.fn(),
  prependListener: jest.fn(),
  prependOnceListener: jest.fn(),
  eventNames: jest.fn(),
}

export const topic = 'someTopic'
export const message = 'someMessage'

export const mqttConnectionSpy: IMqttConnection = {
  connect: (): Promise<void> => jest.fn as any,
  getMqttConnection: (): MqttClient => jest.fn as any,
  publish: (topic: string, message: any): void => jest.fn as any,
  connected: false
}