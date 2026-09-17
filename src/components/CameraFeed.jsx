import React from "react";
import {
  Camera,
  Crosshair,
  ScanLine,
  Wifi,
  Maximize2,
} from "lucide-react";

const CameraFeed = ({ detections = [] }) => {
  return (
    <section className="card camera-card">
      {/* Header */}
      <div className="section-header">
        <div>
          <div className="eyebrow">
            <Camera size={14} />
            VISION / LIVE FEED
          </div>

          <h2>Camera Monitor</h2>

          <p className="section-subtitle">
            Real-time robotic vision and object detection
          </p>
        </div>

        <div className="live-pill">
          <span className="live-dot"></span>
          LIVE
        </div>
      </div>

      {/* Camera */}
      <div className="camera-stage">

        {/* Grid */}
        <div className="camera-grid"></div>

        {/* Scan line */}
        <div className="camera-scan-line"></div>

        {/* Camera overlay */}
        <div className="camera-overlay camera-overlay-top-left">
          <span>CAM-01</span>
          <span className="camera-recording">
            <span></span>
            REC
          </span>
        </div>

        <div className="camera-overlay camera-overlay-top-right">
          <Wifi size={13} />
          <span>CONNECTED</span>
        </div>

        {/* Center placeholder */}
        <div className="camera-center">

          <div className="camera-icon-ring">
            <Camera size={34} />
          </div>

          <h3>VISION SYSTEM READY</h3>

          <p>
            Waiting for camera stream
          </p>

          <span className="camera-endpoint">
            /api/vision
          </span>
        </div>

        {/* YOLO detection boxes */}
        {detections.map((detection, index) => (
          <div
            className="detection-box"
            key={`${detection.label}-${index}`}
            style={{
              left: `${detection.x ?? 20}%`,
              top: `${detection.y ?? 25}%`,
              width: `${detection.w ?? 18}%`,
              height: `${detection.h ?? 25}%`,
            }}
          >
            <div className="detection-label">
              <Crosshair size={11} />
              {detection.label}
              <span>
                {Math.round((detection.confidence ?? 0.94) * 100)}%
              </span>
            </div>
          </div>
        ))}

        {/* Corner brackets */}
        <div className="camera-corner corner-tl"></div>
        <div className="camera-corner corner-tr"></div>
        <div className="camera-corner corner-bl"></div>
        <div className="camera-corner corner-br"></div>

        {/* Bottom info */}
        <div className="camera-overlay camera-overlay-bottom-left">
          AI VISION ONLINE
        </div>

        <div className="camera-overlay camera-overlay-bottom-right">
          1920 × 1080
        </div>

      </div>

      {/* Footer */}
      <div className="camera-footer">

        <div className="camera-stat">
          <ScanLine size={15} />
          <div>
            <span>VISION MODEL</span>
            <strong>YOLO</strong>
          </div>
        </div>

        <div className="camera-stat">
          <Crosshair size={15} />
          <div>
            <span>DETECTIONS</span>
            <strong>{detections.length}</strong>
          </div>
        </div>

        <div className="camera-stat">
          <Wifi size={15} />
          <div>
            <span>STREAM</span>
            <strong>30 FPS</strong>
          </div>
        </div>

        <button
          className="camera-expand-button"
          type="button"
          title="Fullscreen camera"
        >
          <Maximize2 size={16} />
        </button>

      </div>
    </section>
  );
};

export default CameraFeed;