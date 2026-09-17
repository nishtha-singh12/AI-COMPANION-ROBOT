import speech_recognition as sr

recognizer = sr.Recognizer()
recognizer.pause_threshold = 0.8

def listen_and_transcribe(timeout=5, phrase_time_limit=8):
    with sr.Microphone() as source:
        recognizer.adjust_for_ambient_noise(source, duration=0.5)
        print("[STT] Listening...")
        try:
            audio = recognizer.listen(source, timeout=timeout, phrase_time_limit=phrase_time_limit)
        except sr.WaitTimeoutError:
            print("[STT] No speech detected.")
            return None

    try:
        text = recognizer.recognize_google(audio)
        print(f"[STT] You said: {text}")
        return text
    except sr.UnknownValueError:
        print("[STT] Could not understand audio.")
        return None
    except sr.RequestError as e:
        print(f"[STT] API unreachable: {e}")
        return None