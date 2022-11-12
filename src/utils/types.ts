export const BITFINEX = 'bitfinex';
export const BINANCE = 'binance';

export type Exchange = typeof BITFINEX | typeof BINANCE;

export interface WithBookSocketOptions {
  exchange: Exchange;
}
