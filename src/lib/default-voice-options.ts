export const VOICE_OPTIONS: string[] = [
    "soft and gentle",
    "low and thoughtful",
    "warm and comforting",
    "bright and confident",
    "calm and grounded",
    "energetic and upbeat",
    "sarcastic but kind",
    "steady and patient",
    "dreamy and poetic",
    "curious and animated",
    "fast, loud, encouraging",
    "slow, clear, kind",
    "nerdy and excitable",
    "playful and teasing",
    "soothing and measured",
    "intense and dramatic",
    "mellow and reflective",
    "chaotic but charming",
    "deadpan and dry",
    "flirty and confident",
    "raspy and emotional",
    "smooth and polished",
    "deep and resonant",
    "airy and ethereal",
    "crisp and articulate",
    "whispery and intimate",
    "balanced and neutral",
    "musical and rhythmic",
    "gravelly but warm",
    "clear and expressive",
];

export function getRandomVoiceOption(): string {
    const voice = VOICE_OPTIONS[Math.floor(Math.random() * (VOICE_OPTIONS.length))]
    if (!voice) return VOICE_OPTIONS[0]!
    return voice
}
