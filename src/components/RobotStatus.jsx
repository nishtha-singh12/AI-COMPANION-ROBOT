import React, { useState } from "react";
import {
  Bot,
  Send,
  Mic,
  Trash2,
  User,
  Sparkles,
} from "lucide-react";

const AIChat = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: "assistant",
      text: "Hello. I'm ROBOCORE, your AI companion.",
      time: "12:42",
    },
    {
      id: 2,
      role: "user",
      text: "What can you see around me?",
      time: "12:43",
    },
    {
      id: 3,
      role: "assistant",
      text: "I can currently detect a person and a chair in the camera view.",
      time: "12:43",
    },
  ]);

  const [input, setInput] = useState("");
  const [listening, setListening] = useState(false);

  const sendMessage = () => {
    const text = input.trim();

    if (!text) return;

    const now = new Date();

    const time = now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    const userMessage = {
      id: Date.now(),
      role: "user",
      text,
      time,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          role: "assistant",
          text: "I'm processing your request through the local Qwen AI engine.",
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
    }, 700);
  };

  const clearChat = () => {
    setMessages([]);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <section className="card ai-chat">

      {/* HEADER */}
      <div className="section-header">

        <div>
          <div className="eyebrow">
            <Bot size={14} />
            ARTIFICIAL INTELLIGENCE
          </div>

          <h2>AI Companion</h2>

          <p className="section-subtitle">
            QWEN / OLLAMA ONLINE
          </p>
        </div>

        <button
          className="chat-clear-button"
          onClick={clearChat}
          title="Clear conversation"
        >
          <Trash2 size={15} />
        </button>

      </div>

      {/* CHAT */}
      <div className="chat-messages">

        {messages.length === 0 && (
          <div className="chat-empty">
            <Sparkles size={25} />

            <strong>
              AI ENGINE READY
            </strong>

            <span>
              Start a conversation with ROBOCORE
            </span>
          </div>
        )}

        {messages.map((message) => (

          <div
            key={message.id}
            className={`chat-message ${
              message.role === "user"
                ? "user"
                : "assistant"
            }`}
          >

            <div className="chat-avatar">

              {message.role === "user" ? (
                <User size={14} />
              ) : (
                <Bot size={14} />
              )}

            </div>

            <div className="chat-message-content">

              <div className="chat-message-meta">

                <strong>
                  {message.role === "user"
                    ? "YOU"
                    : "ROBOCORE"}
                </strong>

                <span>
                  {message.time}
                </span>

              </div>

              <div className="chat-bubble">
                {message.text}
              </div>

            </div>

          </div>

        ))}

      </div>

      {/* STATUS */}
      <div className="chat-status">

        <span className="status-live-dot"></span>

        <span>
          AI ENGINE READY
        </span>

      </div>

      {/* INPUT */}
      <div className="chat-input-area">

        <button
          className={`chat-action ${
            listening ? "active" : ""
          }`}
          onClick={() => setListening(!listening)}
          title="Voice input"
        >
          <Mic size={16} />
        </button>

        <input
          className="chat-input"
          type="text"
          placeholder="Talk to your AI companion..."
          value={input}
          onChange={(event) =>
            setInput(event.target.value)
          }
          onKeyDown={handleKeyDown}
        />

        <button
          className="chat-action send"
          onClick={sendMessage}
          title="Send message"
        >
          <Send size={16} />
        </button>

      </div>

    </section>
  );
};

export default AIChat;