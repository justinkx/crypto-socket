export const BITFINEX = 'bitfinex';
export const BINANCE = 'binance';

export const BOOK = 'book';
export const TICKERS = 'tickers';

export type Exchange = typeof BITFINEX | typeof BINANCE;
export type WsType = WebSocket | EventSource;

export type Channel = typeof BOOK | typeof TICKERS;

export interface ChannelIds {
  [key: string]: number;
}

export interface WithBookSocketOptions {
  exchange: Exchange;
  symbol: string;
  params?: {
    precision?: number | string;
    frequency?: number | string;
    length?: number | string;
  };
}

export interface BookType {
  price: number;
  count: number;
  amount: number;
  total?: number;
}

export interface BookDataType {
  [key: string]: {
    bids: {
      [key: number]: BookType;
    };
    asks: {
      [key: number]: BookType;
    };
  };
}

export interface BitfinexBookSendMessage {
  frequency?: 'F0' | 'F1';
  length?: '1' | '25' | '100' | '250';
  precision?: 'P0' | 'P1' | 'P2' | 'P3' | 'P4';
  symbol: string;
}
