import wave, struct, math, random

SAMPLE_RATE = 44100
DURATION    = 25.0
NUM_SAMPLES = int(SAMPLE_RATE * DURATION)
BPM         = 140
BEAT        = int(SAMPLE_RATE * 60 / BPM)
STEP        = BEAT // 4          # 16th-note

random.seed(42)                  # deterministic noise

# ── sound generators ────────────────────────────────────────────────────────

def kick():
    n = int(SAMPLE_RATE * 0.35)
    out = []
    for i in range(n):
        t = i / SAMPLE_RATE
        env  = math.exp(-t * 14)
        freq = 160 * math.exp(-t * 28) + 48
        s = env * math.sin(2 * math.pi * freq * t)
        s += math.exp(-t * 90) * 0.4          # transient click
        out.append(max(-1.0, min(1.0, s)))
    return out

def snare():
    n = int(SAMPLE_RATE * 0.18)
    out = []
    for i in range(n):
        t = i / SAMPLE_RATE
        env   = math.exp(-t * 22)
        noise = (random.random() * 2 - 1) * 0.75
        tone  = math.sin(2 * math.pi * 195 * t) * 0.35
        out.append(max(-1.0, min(1.0, env * (noise + tone))))
    return out

def hihat(open_=False):
    dur = 0.14 if open_ else 0.04
    n   = int(SAMPLE_RATE * dur)
    out = []
    k   = 12 if open_ else 60
    for i in range(n):
        t   = i / SAMPLE_RATE
        env = math.exp(-t * k)
        s   = env * (random.random() * 2 - 1) * 0.45
        out.append(max(-1.0, min(1.0, s)))
    return out

def bass(freq, dur=0.28):
    n   = int(SAMPLE_RATE * dur)
    out = []
    for i in range(n):
        t   = i / SAMPLE_RATE
        att = min(1.0, t * 120)
        env = math.exp(-t * 7)
        s   = att * env * (
            math.sin(2 * math.pi * freq * t)       * 0.65 +
            math.sin(2 * math.pi * freq * 2 * t)   * 0.25 +
            math.sin(2 * math.pi * freq * 3 * t)   * 0.10
        )
        out.append(max(-1.0, min(1.0, s * 0.85)))
    return out

def riser(dur=2.0):
    """white-noise swell for intro"""
    n   = int(SAMPLE_RATE * dur)
    out = []
    for i in range(n):
        t   = i / SAMPLE_RATE
        env = (t / dur) ** 2
        out.append(env * (random.random() * 2 - 1) * 0.3)
    return out

# ── mixer ────────────────────────────────────────────────────────────────────

buf = [0.0] * NUM_SAMPLES

def mix(samples, start, vol=1.0):
    for i, s in enumerate(samples):
        idx = start + i
        if 0 <= idx < NUM_SAMPLES:
            buf[idx] = max(-1.0, min(1.0, buf[idx] + s * vol))

# ── pre-bake sounds ──────────────────────────────────────────────────────────

KK  = kick()
SN  = snare()
HH  = hihat(False)
HHO = hihat(True)

# ── beat patterns (16 steps / bar) ──────────────────────────────────────────
#                    1 e + a  2 e + a  3 e + a  4 e + a
K_PAT  = [1,0,0,0,  0,0,1,0,  1,0,0,0,  0,0,0,0]
S_PAT  = [0,0,0,0,  1,0,0,0,  0,0,0,0,  1,0,0,0]
HH_PAT = [1,0,1,0,  1,0,1,0,  1,0,1,0,  1,0,1,0]
HO_PAT = [0,0,0,0,  0,0,0,1,  0,0,0,0,  0,0,0,1]

# Phonk bass line (Hz, 0 = rest) — A minor / C minor pentatonic feel
B_PAT  = [55,0,0,55, 0,0,0,0,  55,0,0,0,  46,0,55,0]

# ── intro riser ──────────────────────────────────────────────────────────────
mix(riser(2.0), 0, 0.6)

# ── sequence ─────────────────────────────────────────────────────────────────
total_steps = int(DURATION * BPM * 4 / 60) + 1

for step in range(total_steps):
    pos  = step * STEP
    slot = step % 16

    if K_PAT[slot]:   mix(KK,  pos, 0.92)
    if S_PAT[slot]:   mix(SN,  pos, 0.72)
    if HO_PAT[slot]:  mix(HHO, pos, 0.42)
    elif HH_PAT[slot]:mix(HH,  pos, 0.36)
    if B_PAT[slot]:   mix(bass(B_PAT[slot]), pos, 0.82)

# ── fade out last 1.5 s ──────────────────────────────────────────────────────
fade_start = NUM_SAMPLES - int(SAMPLE_RATE * 1.5)
for i in range(fade_start, NUM_SAMPLES):
    t = (i - fade_start) / (SAMPLE_RATE * 1.5)
    buf[i] *= (1 - t)

# ── write WAV ────────────────────────────────────────────────────────────────
with wave.open("public/beat.wav", "w") as f:
    f.setnchannels(1)
    f.setsampwidth(2)
    f.setframerate(SAMPLE_RATE)
    for s in buf:
        f.writeframes(struct.pack("<h", int(s * 32767)))

print(f"beat.wav generated  ({DURATION}s @ {BPM} BPM, {NUM_SAMPLES} samples)")
