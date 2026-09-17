const WS_URL =
  import.meta.env.VITE_WS_URL ||
  "ws://localhost:8000/ws";

let socket = null;

export function connectWebSocket(
  onMessage,
  onStatus
) {
  socket = new WebSocket(WS_URL);

  socket.onopen = () => {
    console.log("WebSocket connected");

    if (onStatus) {
      onStatus("connected");
    }
  };

  socket.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data);

      if (onMessage) {
        onMessage(data);
      }
    } catch {
      console.error("Invalid WebSocket data");
    }
  };

  socket.onerror = () => {
    if (onStatus) {
      onStatus("error");
    }
  };

  socket.onclose = () => {
    if (onStatus) {
      onStatus("disconnected");
    }
  };

  return socket;
}

export function sendWebSocketMessage(data) {
  if (
    socket &&
    socket.readyState === WebSocket.OPEN
  ) {
    socket.send(JSON.stringify(data));
  }
}

export function disconnectWebSocket() {
  if (socket) {
    socket.close();
    socket = null;
  }
}