import React from "react";
import {
  Bot,
  Radio,
} from "lucide-react";

const RobotFace = ({
  state = "Idle",
}) => {

  const normalizedState =
    state.toLowerCase();

  return (
    <section className="card robot-face-card">

      <div className="section-header">

        <div>

          <div className="eyebrow">
            <Bot size={14} />
            COMPANION CORE
          </div>

          <h2>Robot Face</h2>

        </div>

        <div className="live-pill">
          <span className="live-dot"></span>
          ACTIVE
        </div>

      </div>

      <div className="robot-face">

        <div className="robot-face-head">

          <div className="robot-eyes">

            <div
              className={`robot-eye ${
                normalizedState === "thinking"
                  ? "thinking"
                  : ""
              }`}
            ></div>

            <div
              className={`robot-eye ${
                normalizedState === "thinking"
                  ? "thinking"
                  : ""
              }`}
            ></div>

          </div>

          <div className="robot-mouth"></div>

        </div>

        <div className="robot-face-state">

          <Radio size={11} />

          SYSTEM STATE:{" "}

          <strong>
            {state.toUpperCase()}
          </strong>

        </div>

      </div>

    </section>
  );
};

export default RobotFace;