let WEBSOCKET: WebSocket | null = null;
let URL: string = '';

export function connect(url: string): WebSocket {
  if (WEBSOCKET && url === URL) {
    return WEBSOCKET;
  }

  WEBSOCKET = new WebSocket(url);
  return WEBSOCKET;
}
