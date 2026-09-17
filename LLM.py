import json
from ollama import chat
from collections import deque

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

MODEL = "qwen2.5:3b"
MAX_HISTORY_TURNS = 5

# Memory

system_message = {"role": "system", "content": SYSTEM_PROMPT}
history = deque(maxlen=MAX_HISTORY_TURNS * 2)   # user+assistant pairs only
 
print("=" * 40)
print(" AI COMPANION ROBOT ")
print("=" * 40)
print("Type 'exit' to quit, 'reset' to clear memory.\n")
 
while True:
 
    user = input("You : ")
 
    if user.lower() == "exit":
        print("Robot shutting down...")
        break
 
    if user.lower() == "reset":
        history.clear()
        print("[memory cleared]\n")
        continue
 
    history.append({"role": "user", "content": user})
    messages = [system_message] + list(history)
 
    try:
        response = chat(
            model=MODEL,
            messages=messages,
            format="json",              # forces valid JSON output, not just a request
            options={
                "temperature": 0.7,
                "num_predict": 80,      # keeps replies short + fast
            },
        )
        result = response["message"]["content"]
 
    except ConnectionError:
        print("\nRobot : My brain is offline. Please run 'ollama serve'.")
        history.pop()   # don't keep the failed turn in memory
        continue
    except Exception as e:
        print(f"\nRobot : Something went wrong ({e}).")
        history.pop()
        continue
 
    try:
        data = json.loads(result)
        reply_text = data.get("reply", "").strip() or "I'm not sure what to say."
        command = data.get("command", "none")
 
        print("\nRobot :", reply_text)
        if command != "none":
            print("Command :", command)
            # send_to_esp32(command)   # plug this in once ESP32 comms is ready
 
    except json.JSONDecodeError:
        print("\nRobot :", result)
        reply_text = result
 
    # Store only the clean reply text in history, not the raw JSON —
    # keeps future prompts smaller and stops the model imitating JSON back at itself
    history.append({"role": "assistant", "content": reply_text})
