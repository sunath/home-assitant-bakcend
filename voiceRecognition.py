import subprocess
import sys

from vosk import Model, KaldiRecognizer, SetLogLevel

SAMPLE_RATE = 16000

SetLogLevel(0)

model = Model("C:\\Users\\lol44\\Downloads\\Compressed\\vosk-model-en-in-0.5\\vosk-model-en-in-0.5")
rec = KaldiRecognizer(model, SAMPLE_RATE)

with subprocess.Popen(["ffmpeg", "-loglevel", "quiet", "-i",
                            sys.argv[1],
                            "-ar", str(SAMPLE_RATE) , "-ac", "1", "-f", "s16le", "-"],
                            stdout=subprocess.PIPE) as process:

    while True:
        data = process.stdout.read(4000)
        if len(data) == 0:
            break
        if rec.AcceptWaveform(data):
            # print(rec.Result())
            pass
        else:
            pass

    print(str(rec.FinalResult()))
            # print(rec.PartialResult())
    # print(rec.PartialResult())
    # print(rec.FinalResult())
