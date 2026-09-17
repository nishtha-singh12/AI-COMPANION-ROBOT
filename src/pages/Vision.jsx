import React from "react";

import CameraFeed from "../components/CameraFeed";
import DetectionList from "../components/DetectionList";

export default function Vision() {
  return (
    <div className="inner-page">

      <div className="page-heading">
        <span className="eyebrow">COMPUTER VISION</span>

        <h1>Vision System</h1>

        <p>
          Live camera monitoring and YOLO object detection.
        </p>
      </div>

      <div className="vision-grid">

        <div className="glass-card">
          <CameraFeed />
        </div>

        <div className="glass-card">
          <DetectionList />
        </div>

      </div>

    </div>
  );
}