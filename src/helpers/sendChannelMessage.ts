import { sendBookMessage } from './bitfinex/sendChannelMessage';
import { BITFINEX, BOOK, Channel } from '../utils/types';

const BOOK_CHANNEL_SEND: any = {
  [BITFINEX]: sendBookMessage,
};

export function sendBookChannelMessage(exchange: string): Function {
  return BOOK_CHANNEL_SEND[exchange];
}

const CHANNEL_SEND: any = {
  [BOOK]: sendBookChannelMessage,
};

export function sendChannelMessage(channel: Channel): Function {
  return CHANNEL_SEND[channel];
}
