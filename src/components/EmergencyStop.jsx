import React, { useState } from "react";

import {
  TriangleAlert,
  ShieldAlert,
  Octagon,
} from "lucide-react";

export default function EmergencyStop() {
  const [active, setActive] = useState(false);

  function stopRobot() {
    setActive(true);

    setTimeout(() => {
      setActive(false);
    }, 3000);
  }

  return (
    <section
      className={`emergency-panel ${
        active ? "emergency-active" : ""
      }`}
    >
      <div className="emergency-glow" />

      <div className="emergency-icon">
        {active ? (
          <ShieldAlert size={28} />
        ) : (
          <TriangleAlert size={28} />
        )}
      </div>

      <span className="eyebrow">SAFETY SYSTEM</span>

      <h2>
        {active ? "ROBOT STOPPED" : "Emergency Stop"}
      </h2>

      <p>
        Immediately stop robot movement and trigger
        the controller safety state.
      </p>

      <button onClick={stopRobot}>
        <Octagon size={17} />
        {active ? "STOP ACTIVATED" : "EMERGENCY STOP"}
      </button>

      <small>
        ESP32 safety protection remains active
      </small>
    </section>
  );
}