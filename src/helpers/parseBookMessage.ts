import { parseBfxBookData } from './bitfinex/parseBookMessage';
import { BITFINEX } from '../utils/types';

const BookParser: any = {
  [BITFINEX]: parseBfxBookData,
};

export function parseBookMessage(exchange: string): Function {
  return BookParser[exchange];
}
