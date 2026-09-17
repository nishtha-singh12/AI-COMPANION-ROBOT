import React from "react";

import {
  ScanSearch,
  UserRound,
  Armchair,
  Package,
} from "lucide-react";

const objects = [
  ["Person", "96%", "2.4 m", UserRound],
  ["Chair", "91%", "3.1 m", Armchair],
  ["Object", "84%", "4.6 m", Package],
];

export default function DetectionList() {
  return (
    <section className="detections-panel">
      <div className="panel-header">
        <div>
          <span className="eyebrow">COMPUTER VISION</span>
          <h2>YOLO Detections</h2>
        </div>

        <div className="object-count">
          <ScanSearch size={14} />
          03 OBJECTS
        </div>
      </div>

      <div className="detection-list">
        {objects.map(([name, confidence, distance, Icon]) => (
          <div className="detection-item" key={name}>
            <div className="object-icon">
              <Icon size={17} />
            </div>

            <div className="object-info">
              <strong>{name}</strong>
              <span>{distance} distance</span>
            </div>

            <div className="confidence">
              <small>CONFIDENCE</small>
              <strong>{confidence}</strong>
            </div>

            <div className="confidence-bar">
              <span
                style={{
                  width: confidence,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}