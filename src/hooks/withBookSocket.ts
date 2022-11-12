import React from 'react';

import { connect } from '../socket';
import { WithBookSocketOptions } from '../utils/types';
import { getExchangeUrl } from '../helpers/exchangeUrls';

export default function WithBookSocket({ exchange }: WithBookSocketOptions) {
  const url = getExchangeUrl(exchange);

  const onMessage = React.useCallback((e: any) => {
    const message = JSON.parse(e.data);
  }, []);

  React.useEffect(() => {
    const ws: WebSocket = connect(url);

    ws.onopen = () => {
      ws.send(
        JSON.stringify({
          channel: 'book',
          event: 'subscribe',
          freq: 'F0',
          len: '100',
          prec: 'P0',
          subId: 'book/tBTCUSD/P0',
          symbol: 'tBTCUSD',
        })
      );
    };

    ws.onmessage = (e) => {
      onMessage(e);
    };
    return () => {
      ws.close();
    };
  }, [url, onMessage]);
}
