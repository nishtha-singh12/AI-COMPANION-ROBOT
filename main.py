import os
import json
from collections import deque
from groq import Groq

from stt import listen_and_transcribe
from tts import speak

from dotenv import load_dotenv
load_dotenv()

client = Groq(api_key=os.environ.get("GROQ_API_KEY_LLM"))

SYSTEM_PROMPT = """
You are a AI Companion Robot with wheels, a camera, and a speaker. 

You can: 
- Answer general questions.
- Tell jokes.
- Explain topics briefly.
- Chat naturally.

Reply in at most 2 short sentences, since your reply is spoken aloud.
through a speaker. No markdown, no emoji, no code.

Detect robot movement commands in the user's message.

Valid commands: forward, backward, left, right, stop
If there is no robot command, return command as "none".

Always reply ONLY in this exact JSON shape, nothing else:
{"reply": "your spoken reply here", "command":"none"}
"""

MODEL = "qwen/qwen3.8-27b"
MAX_HISTORY_TURNS = 5

system_message = {"role": "system", "content": SYSTEM_PROMPT}
history = deque(maxlen=MAX_HISTORY_TURNS * 2)

JSON_SCHEMA = {
    "type": "json_schema",
    "json_schema": {
        "name": "robot_response",
        "schema": {
            "type": "object",
            "properties": {
                "reply": {"type": "string"},
                "command": {
                    "type": "string",
                    "enum": ["forward", "backward", "left", "right", "stop", "none"]
                }
            },
            "required": ["reply", "command"],
            "additionalProperties": False
        }
    }
}

def send_to_esp32(command: str):
    print(f"[ESP32] Would send command: {command}")

print("=" * 40)
print(" AI COMPANION ROBOT (Voice Mode) ")
print("=" * 40)

while True:
    user = listen_and_transcribe()
    if user is None:
        continue

    if user.lower() == "exit":
        speak("Robot shutting down.")
        break

    if user.lower() == "reset":
        history.clear()
        continue

    history.append({"role": "user", "content": user})
    messages = [system_message] + list(history)

    try:
        response = client.chat.completions.create(
            model=MODEL,
            messages=messages,
            response_format=JSON_SCHEMA,
            temperature=0.7,
            max_tokens=80,
        )
        result = response.choices[0].message.content
    except Exception as e:
        print(f"\nRobot : Something went wrong ({e}).")
        speak("Something went wrong.")
        history.pop()
        continue

    try:
        data = json.loads(result)
        reply_text = data.get("reply", "").strip() or "I'm not sure what to say."
        command = data.get("command", "none")

        print("\nRobot :", reply_text)
        speak(reply_text)

        if command != "none":
            print("Command :", command)
            send_to_esp32(command)

    except json.JSONDecodeError:
        reply_text = result
        speak(result)

    history.append({"role": "assistant", "content": reply_text})
