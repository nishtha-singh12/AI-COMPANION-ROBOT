import React, { useState } from "react";
import {
  Mic,
  Waves,
} from "lucide-react";

const VoiceButton = () => {
  const [listening, setListening] = useState(false);

  return (
    <div className="voice-interface">

      <div className="voice-interface-label">
        VOICE INTERFACE
      </div>

      <button
        className={`voice-button ${
          listening ? "listening" : ""
        }`}
        onClick={() =>
          setListening((current) => !current)
        }
      >

        <div className="voice-button-icon">
          {listening ? (
            <Waves size={20} />
          ) : (
            <Mic size={20} />
          )}
        </div>

        <div className="voice-button-content">

          <strong>
            {listening
              ? "LISTENING..."
              : "TALK TO ROBOT"}
          </strong>

          <span>
            {listening
              ? "Voice input active"
              : "Press to speak"}
          </span>

        </div>

      </button>

      <div className="voice-state">

        <span
          className={
            listening
              ? "voice-state-dot active"
              : "voice-state-dot"
          }
        ></span>

        VOICE STATE:
        <strong>
          {listening ? "LISTENING" : "IDLE"}
        </strong>

      </div>

    </div>
  );
};

export default VoiceButton;