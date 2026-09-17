import React from "react";

import {
  Activity,
  ScanSearch,
  Brain,
  Mic,
  Move,
  Wifi,
} from "lucide-react";

const events = [
  ["12:43:18", "YOLO detected person", "VISION", ScanSearch],
  ["12:43:14", "Qwen response generated", "AI", Brain],
  ["12:43:08", "Voice input received", "VOICE", Mic],
  ["12:42:55", "Robot moved FORWARD", "MOTION", Move],
  ["12:42:41", "ESP32 connection active", "SYSTEM", Wifi],
];

export default function ActivityLog() {
  return (
    <section className="activity-panel">
      <div className="panel-header">
        <div>
          <span className="eyebrow">SYSTEM EVENTS</span>
          <h2>Activity Log</h2>
        </div>

        <Activity size={17} />
      </div>

      <div className="activity-list">
        {events.map(([time, text, type, Icon]) => (
          <div className="activity-item" key={time + text}>
            <time>{time}</time>

            <div className="activity-icon">
              <Icon size={13} />
            </div>

            <div className="activity-info">
              <strong>{text}</strong>
              <span>{type}</span>
            </div>

            <i className="activity-live-dot" />
          </div>
        ))}
      </div>
    </section>
  );
}