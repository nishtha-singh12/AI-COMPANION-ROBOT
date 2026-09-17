import React from "react";

import CameraFeed from "../components/CameraFeed";
import AIChat from "../components/AIChat";
import RobotFace from "../components/RobotFace";
import RobotStatus from "../components/RobotStatus";
import SensorCard from "../components/SensorCard";
import MovementControl from "../components/MovementControl";
import EmergencyStop from "../components/EmergencyStop";
import DetectionList from "../components/DetectionList";
import ActivityLog from "../components/ActivityLog";

const Dashboard = () => {

  const detections = [
    {
      label: "PERSON",
      confidence: 0.96,
      x: 25,
      y: 28,
      w: 17,
      h: 42,
    },
    {
      label: "CHAIR",
      confidence: 0.89,
      x: 58,
      y: 38,
      w: 16,
      h: 30,
    },
  ];

  return (
    <div className="page dashboard-page">

      {/* PAGE HEADER */}
      <div className="page-heading">

        <div>

          <div className="eyebrow">
            ARTIFICIAL INTELLIGENCE / ROBOTICS
          </div>

          <h1>
            Command Center
          </h1>

          <p>
            Monitor your AI companion, vision system,
            sensors and robotic movement in real time.
          </p>

        </div>

      </div>

      {/* TOP */}
      <div className="dashboard-hero-grid">

        <CameraFeed
          detections={detections}
        />

        <AIChat />

      </div>

      {/* STATUS */}
      <div className="dashboard-bottom-grid">

        <div className="dashboard-left-stack">

          <RobotFace
            state="Idle"
          />

          <RobotStatus />

          <MovementControl />

          <EmergencyStop />

        </div>

        <div className="dashboard-right-stack">

          <SensorCard
            front={42}
            left={60}
            right={54}
            battery={82}
          />

          <DetectionList
            detections={detections}
          />

          <ActivityLog />

        </div>

      </div>

    </div>
  );
};

export default Dashboard;