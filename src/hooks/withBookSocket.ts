import React, { useState, useRef, useCallback, useEffect } from 'react';
import _isEqual from 'lodash/isEqual';

import { connect } from '../socket';
import { WithBookSocketOptions, WsType, BOOK } from '../utils/types';
import { getExchangeUrl } from '../helpers/exchangeUrls';
import { parseBookMessage } from '../helpers/parseBookMessage';
import { sendChannelMessage } from '../helpers/sendChannelMessage';

export default function WithBookSocket({
  exchange,
  symbol,
  params = {},
}: WithBookSocketOptions) {
  const [bookData, setData] = useState({});
  const [socketState, setState] = useState(0);
  const propRef: any = useRef();
  const wsRef: any = useRef<WsType>();
  const initialMessageSend = useRef<boolean>(false);

  const url = getExchangeUrl(exchange);
  const messageParser = parseBookMessage(exchange);

  const onMessage = React.useCallback(
    (e: any) => {
      const message = JSON.parse(e.data);
      const data = messageParser(message, symbol);
      setData(data);
    },
    [setData, messageParser, symbol, bookData]
  );

  const sendMessage = useCallback((message: any) => {
    wsRef?.current.send(JSON.stringify(message));
  }, []);

  useEffect(() => {
    if (!initialMessageSend.current && socketState === 1) {
      const sendFn = sendChannelMessage(BOOK)(exchange);
      const { precision, frequency, length } = params;
      const _sendMessage = sendFn({
        frequency,
        length,
        precision,
        symbol,
      });

      sendMessage(_sendMessage);
      initialMessageSend.current = true;
    }
  }, [socketState, sendMessage, exchange, symbol, params]);

  useEffect(() => {
    propRef.current = { exchange, symbol, ...params };
    const ws: WebSocket = connect(url);
    wsRef.current = ws;
    setState(ws?.readyState);
    ws.onopen = () => {
      setState(ws?.readyState);
    };

    ws.onmessage = (e) => {
      onMessage(e);
    };
    return () => {
      if (_isEqual({ exchange, symbol, ...params }, propRef.current)) return;

      if (ws?.readyState === 1) {
        ws.close();
      }
    };
  }, [exchange, symbol, params, url, onMessage]);

  return { bookData, sendMessage };
}
