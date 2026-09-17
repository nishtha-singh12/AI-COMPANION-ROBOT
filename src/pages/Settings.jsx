import React, { useState } from "react";
import {
  Settings as SettingsIcon,
  Bot,
  Brain,
  Eye,
  Mic,
  Shield,
  Save,
  Wifi,
  Volume2,
  Cpu,
  Gauge,
  SlidersHorizontal,
  CheckCircle2,
} from "lucide-react";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("robot");
  const [saved, setSaved] = useState(false);

  const [settings, setSettings] = useState({
    robotName: "ROBOCORE",
    robotId: "UNIT-01",
    aiModel: "Qwen",
    temperature: 0.7,
    visionModel: "YOLO",
    confidence: 0.65,
    microphone: true,
    speaker: true,
    voiceSpeed: 1,
    obstacleStop: true,
    emergencyStop: true,
    maxSpeed: 80,
  });

  const tabs = [
    {
      id: "robot",
      label: "Robot",
      icon: Bot,
    },
    {
      id: "ai",
      label: "AI Core",
      icon: Brain,
    },
    {
      id: "vision",
      label: "Vision",
      icon: Eye,
    },
    {
      id: "audio",
      label: "Audio",
      icon: Mic,
    },
    {
      id: "safety",
      label: "Safety",
      icon: Shield,
    },
  ];

  const updateSetting = (key, value) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }));

    setSaved(false);
  };

  const handleSave = () => {
    localStorage.setItem(
      "robotSettings",
      JSON.stringify(settings)
    );

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2500);
  };

  return (
    <div className="page settings-page">

      {/* PAGE HEADER */}
      <div className="page-heading">

        <div>
          <div className="eyebrow">
            <SettingsIcon size={14} />
            SYSTEM / CONFIGURATION
          </div>

          <h1>Robot Settings</h1>

          <p>
            Configure AI, robotics, vision, audio and safety parameters.
          </p>
        </div>

        <button
          className={`primary-button ${saved ? "saved" : ""}`}
          onClick={handleSave}
        >
          {saved ? (
            <>
              <CheckCircle2 size={17} />
              SAVED
            </>
          ) : (
            <>
              <Save size={17} />
              SAVE CONFIGURATION
            </>
          )}
        </button>

      </div>

      {/* SETTINGS LAYOUT */}
      <div className="settings-layout">

        {/* SIDEBAR */}
        <aside className="settings-sidebar card">

          <div className="settings-sidebar-title">
            <SlidersHorizontal size={15} />
            CONFIG MODULES
          </div>

          <div className="settings-tabs">

            {tabs.map((tab) => {
              const Icon = tab.icon;

              return (
                <button
                  key={tab.id}
                  className={`settings-tab ${
                    activeTab === tab.id ? "active" : ""
                  }`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <Icon size={17} />

                  <span>{tab.label}</span>

                  {activeTab === tab.id && (
                    <div className="settings-tab-indicator"></div>
                  )}
                </button>
              );
            })}

          </div>

          {/* SYSTEM INFO */}
          <div className="settings-system-info">

            <div className="system-info-header">
              <Cpu size={15} />
              SYSTEM STATUS
            </div>

            <div className="system-info-row">
              <span>Controller</span>
              <strong>ESP32</strong>
            </div>

            <div className="system-info-row">
              <span>Network</span>
              <strong className="text-online">ONLINE</strong>
            </div>

            <div className="system-info-row">
              <span>Firmware</span>
              <strong>v1.4.2</strong>
            </div>

          </div>

        </aside>

        {/* CONTENT */}
        <main className="settings-content">

          {/* ROBOT SETTINGS */}
          {activeTab === "robot" && (
            <section className="settings-section">

              <div className="settings-section-header">
                <div className="settings-section-icon">
                  <Bot size={21} />
                </div>

                <div>
                  <h2>Robot Identity</h2>
                  <p>
                    Configure the identity and basic behavior of your
                    companion robot.
                  </p>
                </div>
              </div>

              <div className="settings-grid">

                <div className="setting-field">
                  <label>Robot Name</label>

                  <input
                    type="text"
                    value={settings.robotName}
                    onChange={(e) =>
                      updateSetting(
                        "robotName",
                        e.target.value
                      )
                    }
                  />
                </div>

                <div className="setting-field">
                  <label>Unit Identifier</label>

                  <input
                    type="text"
                    value={settings.robotId}
                    onChange={(e) =>
                      updateSetting(
                        "robotId",
                        e.target.value
                      )
                    }
                  />
                </div>

              </div>

              <div className="settings-card-inner">

                <div className="setting-row">

                  <div className="setting-row-info">
                    <div className="setting-row-icon">
                      <Wifi size={17} />
                    </div>

                    <div>
                      <strong>Wi-Fi Connection</strong>
                      <span>
                        Maintain wireless connection with robot
                      </span>
                    </div>
                  </div>

                  <span className="status-badge online">
                    CONNECTED
                  </span>

                </div>

              </div>

            </section>
          )}

          {/* AI SETTINGS */}
          {activeTab === "ai" && (
            <section className="settings-section">

              <div className="settings-section-header">
                <div className="settings-section-icon purple">
                  <Brain size={21} />
                </div>

                <div>
                  <h2>AI Core</h2>
                  <p>
                    Configure the local language model and response
                    behavior.
                  </p>
                </div>
              </div>

              <div className="settings-grid">

                <div className="setting-field">
                  <label>Language Model</label>

                  <select
                    value={settings.aiModel}
                    onChange={(e) =>
                      updateSetting(
                        "aiModel",
                        e.target.value
                      )
                    }
                  >
                    <option value="Qwen">Qwen</option>
                    <option value="Qwen2.5">Qwen 2.5</option>
                    <option value="Llama">Llama</option>
                    <option value="Mistral">Mistral</option>
                  </select>
                </div>

                <div className="setting-field">

                  <div className="label-with-value">
                    <label>Temperature</label>
                    <strong>
                      {settings.temperature}
                    </strong>
                  </div>

                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={settings.temperature}
                    onChange={(e) =>
                      updateSetting(
                        "temperature",
                        Number(e.target.value)
                      )
                    }
                  />

                  <div className="range-labels">
                    <span>Precise</span>
                    <span>Creative</span>
                  </div>

                </div>

              </div>

              <div className="settings-card-inner ai-status-card">

                <div className="ai-status-icon">
                  <Brain size={20} />
                </div>

                <div>
                  <strong>LOCAL AI ENGINE</strong>
                  <span>
                    Ollama connection configured
                  </span>
                </div>

                <span className="status-badge online">
                  READY
                </span>

              </div>

            </section>
          )}

          {/* VISION SETTINGS */}
          {activeTab === "vision" && (
            <section className="settings-section">

              <div className="settings-section-header">
                <div className="settings-section-icon">
                  <Eye size={21} />
                </div>

                <div>
                  <h2>Vision System</h2>
                  <p>
                    Configure camera processing and object detection.
                  </p>
                </div>
              </div>

              <div className="settings-grid">

                <div className="setting-field">
                  <label>Detection Model</label>

                  <select
                    value={settings.visionModel}
                    onChange={(e) =>
                      updateSetting(
                        "visionModel",
                        e.target.value
                      )
                    }
                  >
                    <option value="YOLO">YOLO</option>
                    <option value="YOLOv8">YOLOv8</option>
                    <option value="YOLOv11">YOLOv11</option>
                  </select>
                </div>

                <div className="setting-field">

                  <div className="label-with-value">
                    <label>Confidence Threshold</label>

                    <strong>
                      {Math.round(
                        settings.confidence * 100
                      )}
                      %
                    </strong>
                  </div>

                  <input
                    type="range"
                    min="0.1"
                    max="1"
                    step="0.05"
                    value={settings.confidence}
                    onChange={(e) =>
                      updateSetting(
                        "confidence",
                        Number(e.target.value)
                      )
                    }
                  />

                </div>

              </div>

              <div className="vision-feature-grid">

                <div className="feature-status">
                  <Eye size={18} />

                  <div>
                    <strong>Object Detection</strong>
                    <span>YOLO processing enabled</span>
                  </div>

                  <span className="status-badge online">
                    ACTIVE
                  </span>
                </div>

                <div className="feature-status">
                  <CameraIcon />

                  <div>
                    <strong>Camera Stream</strong>
                    <span>1080p / 30 FPS</span>
                  </div>

                  <span className="status-badge online">
                    READY
                  </span>
                </div>

              </div>

            </section>
          )}

          {/* AUDIO SETTINGS */}
          {activeTab === "audio" && (
            <section className="settings-section">

              <div className="settings-section-header">
                <div className="settings-section-icon purple">
                  <Mic size={21} />
                </div>

                <div>
                  <h2>Audio System</h2>
                  <p>
                    Configure speech recognition and text-to-speech.
                  </p>
                </div>
              </div>

              <div className="settings-card-inner">

                <div className="setting-row">

                  <div className="setting-row-info">

                    <div className="setting-row-icon">
                      <Mic size={17} />
                    </div>

                    <div>
                      <strong>Microphone</strong>
                      <span>
                        Enable speech input
                      </span>
                    </div>

                  </div>

                  <button
                    className={`toggle ${
                      settings.microphone
                        ? "active"
                        : ""
                    }`}
                    onClick={() =>
                      updateSetting(
                        "microphone",
                        !settings.microphone
                      )
                    }
                  >
                    <span></span>
                  </button>

                </div>

                <div className="setting-row">

                  <div className="setting-row-info">

                    <div className="setting-row-icon">
                      <Volume2 size={17} />
                    </div>

                    <div>
                      <strong>Speaker</strong>
                      <span>
                        Enable robot voice output
                      </span>
                    </div>

                  </div>

                  <button
                    className={`toggle ${
                      settings.speaker
                        ? "active"
                        : ""
                    }`}
                    onClick={() =>
                      updateSetting(
                        "speaker",
                        !settings.speaker
                      )
                    }
                  >
                    <span></span>
                  </button>

                </div>

              </div>

              <div className="settings-card-inner">

                <div className="setting-field">

                  <div className="label-with-value">
                    <label>
                      Voice Speed
                    </label>

                    <strong>
                      {settings.voiceSpeed.toFixed(1)}x
                    </strong>
                  </div>

                  <input
                    type="range"
                    min="0.5"
                    max="2"
                    step="0.1"
                    value={settings.voiceSpeed}
                    onChange={(e) =>
                      updateSetting(
                        "voiceSpeed",
                        Number(e.target.value)
                      )
                    }
                  />

                </div>

              </div>

            </section>
          )}

          {/* SAFETY SETTINGS */}
          {activeTab === "safety" && (
            <section className="settings-section">

              <div className="settings-section-header">

                <div className="settings-section-icon red">
                  <Shield size={21} />
                </div>

                <div>
                  <h2>Safety Controls</h2>
                  <p>
                    Configure movement limits and automatic protection.
                  </p>
                </div>

              </div>

              <div className="settings-card-inner">

                <div className="setting-row">

                  <div className="setting-row-info">

                    <div className="setting-row-icon">
                      <Shield size={17} />
                    </div>

                    <div>
                      <strong>
                        Automatic Obstacle Stop
                      </strong>

                      <span>
                        Stop robot when an obstacle is detected
                      </span>
                    </div>

                  </div>

                  <button
                    className={`toggle ${
                      settings.obstacleStop
                        ? "active"
                        : ""
                    }`}
                    onClick={() =>
                      updateSetting(
                        "obstacleStop",
                        !settings.obstacleStop
                      )
                    }
                  >
                    <span></span>
                  </button>

                </div>

                <div className="setting-row">

                  <div className="setting-row-info">

                    <div className="setting-row-icon danger">
                      <Shield size={17} />
                    </div>

                    <div>
                      <strong>
                        Emergency Stop
                      </strong>

                      <span>
                        Immediately disable robot movement
                      </span>
                    </div>

                  </div>

                  <button
                    className={`toggle ${
                      settings.emergencyStop
                        ? "active"
                        : ""
                    }`}
                    onClick={() =>
                      updateSetting(
                        "emergencyStop",
                        !settings.emergencyStop
                      )
                    }
                  >
                    <span></span>
                  </button>

                </div>

              </div>

              <div className="settings-card-inner">

                <div className="setting-field">

                  <div className="label-with-value">

                    <label>
                      Maximum Movement Speed
                    </label>

                    <strong>
                      {settings.maxSpeed}%
                    </strong>

                  </div>

                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={settings.maxSpeed}
                    onChange={(e) =>
                      updateSetting(
                        "maxSpeed",
                        Number(e.target.value)
                      )
                    }
                  />

                  <div className="range-labels">
                    <span>Safe</span>
                    <span>Maximum</span>
                  </div>

                </div>

              </div>

              <div className="safety-warning">

                <Shield size={20} />

                <div>
                  <strong>
                    SAFETY SYSTEM ACTIVE
                  </strong>

                  <p>
                    Obstacle detection and emergency stop
                    protection are enabled.
                  </p>
                </div>

              </div>

            </section>
          )}

        </main>

      </div>

    </div>
  );
};

/* Small reusable camera icon */
const CameraIcon = () => (
  <div className="mini-icon-camera">
    <Eye size={18} />
  </div>
);

export default Settings;