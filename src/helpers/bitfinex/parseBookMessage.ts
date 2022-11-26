import _get from 'lodash/get';
import _isArray from 'lodash/isArray';
import _nth from 'lodash/nth';
import _isInteger from 'lodash/isInteger';
import _size from 'lodash/size';
import _map from 'lodash/map';

import { BookType, BookDataType, ChannelIds } from '../../utils/types';

const BOOK_DATA: BookDataType = {};

const channelId: ChannelIds = {};

export function parseBfxBookData(message: any, symbol: string) {
  const _channelId = channelId[symbol] || null;
  if (
    _get(message, 'event', null) === 'subscribed' &&
    _get(message, 'channel', null) === 'book'
  ) {
    channelId[symbol] = _get(message, 'chanId', null);
    if (symbol) {
      BOOK_DATA[symbol] = {
        bids: {},
        asks: {},
      };
    }
  } else if (
    _isInteger(_channelId) &&
    _isArray(message) &&
    _nth(message, 0) === _channelId
  ) {
    const bookData = _nth(message, 1);

    if (_size(bookData) === 3) {
      saveBookData(BOOK_ADAPTOR(bookData), symbol);
    } else {
      _map(bookData, (item) => {
        saveBookData(BOOK_ADAPTOR(item), symbol);
      });
    }
  }
  return { ...BOOK_DATA?.[symbol] } || {};
}

function BOOK_ADAPTOR([price, count, amount]: any): BookType {
  return {
    price,
    count,
    amount,
  };
}

function saveBookData(data: BookType, symbol: string) {
  const { price, count, amount } = data;

  if (amount > 0) {
    BOOK_DATA[symbol].bids[price] = { price, count, amount };
  } else {
    BOOK_DATA[symbol].asks[price] = { price, count, amount };
  }
}
