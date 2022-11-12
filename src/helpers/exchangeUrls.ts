import { BITFINEX_URL, BINANCE_URL } from '../utils/constant';
import { BITFINEX, BINANCE, Exchange } from '../utils/types';

const URLS = {
  [BITFINEX]: BITFINEX_URL,
  [BINANCE]: BINANCE_URL,
};

export const getExchangeUrl = (exchange: Exchange): string => {
  const url = URLS[exchange];
  return url;
};
