import React from "react";
import {
  Ruler,
  Battery,
  Navigation,
} from "lucide-react";

const SensorCard = ({
  front = 42,
  left = 60,
  right = 54,
  battery = 82,
}) => {
  const sensors = [
    {
      name: "Front Distance",
      value: front,
      unit: "cm",
      icon: Navigation,
    },
    {
      name: "Left Distance",
      value: left,
      unit: "cm",
      icon: Ruler,
    },
    {
      name: "Right Distance",
      value: right,
      unit: "cm",
      icon: Ruler,
    },
    {
      name: "Battery",
      value: battery,
      unit: "%",
      icon: Battery,
    },
  ];

  return (
    <section className="card sensor-section">

      <div className="section-header">

        <div>
          <div className="eyebrow">
            <Navigation size={14} />
            TELEMETRY
          </div>

          <h2>Live Sensor Data</h2>

          <p className="section-subtitle">
            LIVE DATA
          </p>
        </div>

      </div>

      <div className="sensor-grid">

        {sensors.map((sensor) => {
          const Icon = sensor.icon;

          return (
            <div
              className="sensor-card"
              key={sensor.name}
            >

              <div className="sensor-icon">
                <Icon size={18} />
              </div>

              <div className="sensor-label">
                {sensor.name}
              </div>

              <div className="sensor-value">
                {sensor.value}
                <span className="sensor-unit">
                  {sensor.unit}
                </span>
              </div>

              <div className="sensor-line">
                <span
                  style={{
                    width: `${Math.min(
                      Number(sensor.value),
                      100
                    )}%`,
                  }}
                ></span>
              </div>

            </div>
          );
        })}

      </div>

    </section>
  );
};

export default SensorCard;