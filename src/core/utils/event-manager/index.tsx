import { EventEmitter } from 'events'

export const EVENT_UNAUTHORIZED = 'event-unauthorized'

export const eventManager = new EventEmitter()