import { BitfinexBookSendMessage } from '../../utils/types';

export function sendBookMessage({
  frequency = 'F0',
  length = '100',
  precision = 'P0',
  symbol = 'tBTCUSD',
}: BitfinexBookSendMessage) {
  return {
    channel: 'book',
    event: 'subscribe',
    freq: frequency,
    len: length,
    prec: precision,
    subId: `book/${symbol}/${precision}`,
    symbol,
  };
}
