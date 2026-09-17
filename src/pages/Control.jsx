import React from "react";

import MovementControl from "../components/MovementControl";
import EmergencyStop from "../components/EmergencyStop";
import SensorCard from "../components/SensorCard";

export default function Control() {
  return (
    <div className="inner-page">

      <div className="page-heading">
        <span className="eyebrow">ROBOTICS</span>

        <h1>Robot Control</h1>

        <p>
          Manual movement and real-time robot telemetry.
        </p>
      </div>

      <div className="control-page-grid">

        <div className="glass-card">
          <MovementControl />
        </div>

        <div className="glass-card">
          <EmergencyStop />
        </div>

      </div>

      <div className="glass-card telemetry-panel">

        <div className="section-title">
          <div>
            <span className="eyebrow">TELEMETRY</span>
            <h2>Robot Sensors</h2>
          </div>
        </div>

        <div className="sensor-grid">
          <SensorCard title="Front" value="42" unit="cm" />
          <SensorCard title="Left" value="68" unit="cm" />
          <SensorCard title="Right" value="54" unit="cm" />
          <SensorCard
            title="Battery"
            value="82"
            unit="%"
            type="battery"
          />
        </div>

      </div>

    </div>
  );
}