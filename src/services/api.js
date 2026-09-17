const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:8000";

async function request(endpoint, options = {}) {
  const response = await fetch(
    `${API_BASE_URL}${endpoint}`,
    {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
    }
  );

  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`);
  }

  return response.json();
}

export const getRobotStatus = () =>
  request("/api/status");

export const getSensors = () =>
  request("/api/sensors");

export const sendMovement = (command, speed) =>
  request("/api/movement", {
    method: "POST",
    body: JSON.stringify({
      command,
      speed,
    }),
  });

export const sendChat = (message) =>
  request("/api/chat", {
    method: "POST",
    body: JSON.stringify({
      message,
    }),
  });

export const sendVoice = (audio) =>
  request("/api/voice", {
    method: "POST",
    headers: {
      "Content-Type": "audio/wav",
    },
    body: audio,
  });

export const getVision = () =>
  request("/api/vision");

export const emergencyStop = () =>
  request("/api/emergency-stop", {
    method: "POST",
  });