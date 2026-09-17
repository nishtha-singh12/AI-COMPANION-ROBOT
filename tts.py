import pyttsx3

def speak(text: str):
    if not text or not text.strip():
        return
    print(f"[TTS] Speaking: {text}")
    engine = pyttsx3.init()
    engine.setProperty("rate", 175)
    engine.setProperty("volume", 1.0)
    engine.say(text)
    engine.runAndWait()
    engine.stop()