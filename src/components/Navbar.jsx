import React from "react";
import { NavLink } from "react-router-dom";
import {
  Bot,
  LayoutDashboard,
  Eye,
  Gamepad2,
  Settings,
  Battery,
  Wifi,
  Radio,
} from "lucide-react";

const navItems = [
  {
    name: "Dashboard",
    path: "/",
    icon: LayoutDashboard,
  },
  {
    name: "Vision",
    path: "/vision",
    icon: Eye,
  },
  {
    name: "Control",
    path: "/control",
    icon: Gamepad2,
  },
  {
    name: "Settings",
    path: "/settings",
    icon: Settings,
  },
];

const Navbar = () => {
  return (
    <header className="robot-navbar">

      {/* =========================
          ROBOT BRAND
      ========================== */}
      <div className="robot-identity">

        <div className="robot-logo">
          <div className="logo-ring"></div>
          <Bot size={21} />
        </div>

        <div className="robot-name">

          <div className="robot-title">
            ROBO<span>CORE</span>
          </div>

          <div className="robot-id">
            AI COMPANION // UNIT-01
          </div>

        </div>

      </div>

      {/* =========================
          MAIN NAVIGATION
      ========================== */}
      <nav className="robot-navigation">

        {navItems.map((item) => {

          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/"}
              className={({ isActive }) =>
                `robot-nav-item ${
                  isActive ? "active" : ""
                }`
              }
            >

              <Icon size={15} />

              <span>
                {item.name}
              </span>

              <div className="nav-active-line"></div>

            </NavLink>
          );

        })}

      </nav>

      {/* =========================
          ROBOT TELEMETRY
      ========================== */}
      <div className="robot-telemetry">

        {/* Network */}
        <div className="telemetry-item">

          <div className="connection-icon">
            <Wifi size={14} />
          </div>

          <div className="telemetry-text">

            <span className="telemetry-label">
              NETWORK
            </span>

            <span className="telemetry-value online">
              ONLINE
            </span>

          </div>

        </div>

        {/* Signal */}
        <div className="signal-indicator">

          <Radio size={13} />

          <div className="signal-bars">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>

        </div>

        {/* Battery */}
        <div className="battery-status">

          <Battery size={17} />

          <div>

            <span className="battery-label">
              POWER
            </span>

            <span className="battery-value">
              82%
            </span>

          </div>

        </div>

        {/* Settings */}
        <NavLink
          to="/settings"
          className="settings-button"
          title="Robot Settings"
        >
          <Settings size={16} />
        </NavLink>

      </div>

    </header>
  );
};

export default Navbar;