from groq import Groq
import os
import json
from collections import deque

client = Groq(api_key=os.environ.get("GROQ_API_KEY_LLM"))

SYSTEM_PROMPT = """
You are a AI Companion Robot with wheels, a camera, and a speaker. 

You can: 
- Answer general questions.
- Tell jokes.
- Explain topics briefly.
- Chat naturally.

Reply in at most 2 short sentences, since your reply is spoken aloud
through a speaker. No markdown, no emoji, no code.

Detect robot movement commands in the user's message.

Valid commands: forward, backward, left, right, stop
If there is no robot command, return command as "none".

Always reply ONLY ijn this exact JSON shape, nothing else:
{"reply": "your spoken reply here", "command":"none"}
"""

MODEL = "qwen/qwen3.8-27b"
MAX_HISTORY_TURNS = 5

# MEMORY 

system_message = {"role": "system", "content": SYSTEM_PROMPT}
history = deque(maxlen=MAX_HISTORY_TURNS * 2)

print("=" * 40)
print("AI COMPANION ROBOT(Groq)")
print("=" * 40)
print("Type 'exit' to quit, 'reset' to clear memory.\n")

if not os.environ.get("GROQ_API_KEY_LLM"):
    print("[warning] GROQ_API_KEY_LLM is not set. Requests will fail.\n")

while True:

    user = input("You : ")

    if user.lower() == "exit":
        print("Robot shutting down.")
        break

    if user.lower() == "reset":
        history.clear()
        print("[memory cleared]\n")
        continue

    history.append({"role": "user", "content":user})
    messages = [system_message] + list(history)

    try:
        response = client.chat.completions.create(
            model=MODEL,
            messages=messages,
            response_format={
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
            },
            temperature=0.7,
            max_tokens=80
        )
        result = response.choices[0].message.content

    except Exception as e:
        print(f"\nRobot : Something went wrong ({e}).")
        history.pop()
        continue

    try:
        data = json.loads(result)
        reply_text = data.get("reply","").strip() or "I'm not sure what to say."
        command = data.get("command","none")

        print("\nRobot :", reply_text)
        if command != "none":
            print("Command :", command)
            #send to esp32(command) #plug this is once ESP32 comms is ready

    except json.JSONDecodeError:
        print("\nRobot :", result)
        reply_text = result

    # Store only the clean reply text in history, not the raw JSON - 
    # keeps future prompts smaller and stops the model imitating JSON back at itself
    history.append({"role": "assistant", "content":reply_text}) 