import React from "react";
import { Bot, Radio } from "lucide-react";

export default function RobotFace() {
  return (
    <div className="robot-face-panel">
      <div className="face-header">
        <div>
          <span className="eyebrow">COMPANION CORE</span>
          <h2>Robot Face</h2>
        </div>

        <Bot size={17} />
      </div>

      <div className="robot-face">
        <div className="face-ring ring-one" />
        <div className="face-ring ring-two" />

        <div className="face-eyes">
          <div>
            <span />
          </div>

          <div>
            <span />
          </div>
        </div>

        <div className="face-mouth">
          <i />
          <i />
          <i />
          <i />
          <i />
        </div>

        <div className="face-scanline" />
      </div>

      <div className="face-state">
        <span>
          <Radio size={12} />
          CURRENT STATE
        </span>

        <strong>IDLE</strong>
      </div>
    </div>
  );
}