export const TRAIT_CATEGORIES: Record<string, string[]> = {
    "Emotional & Relational": ["empathetic", "warm", "gentle", "supportive", "romantic", "patient", "positive", "humble"],
    "Cognitive & Thinking": ["analytical", "philosophical", "thoughtful", "observant", "curious", "deep", "introspective", "inventive", "nerdy"],
    "Creative & Imaginative": ["artistic", "dreamy"],
    "Drive & Courage": ["driven", "ambitious", "fearless", "adventurous", "confident"],
    "Social & Humor": ["funny", "witty", "sarcastic", "playful", "introverted", "extroverted", "mellow", "chill"],
    "Energy & Intensity": ["energetic", "excitable", "intense"],
    "Edge & Chaos": ["chaotic", "mischievous", "rebellious", "slightly unhinged"],
    "Grounding & Stability": ["grounded", "stoic"],
    "Perspective & Values": ["idealistic", "realistic", "cynical"],
};

export function getRandomTraits(len: number): string[] {
    const traitsArr = Object.values(TRAIT_CATEGORIES).flat()
    const out: string[] = []
    const getRandomUniqueEl = (): string => {
        let el = traitsArr[Math.floor(Math.random() * traitsArr.length)]
        if (out.includes(el!)) el = getRandomUniqueEl()
        return el!
    }
    for (let i = 0; i < len; i++) {
        const randomEl = getRandomUniqueEl()
        out.push(randomEl)
    }
    return out
}
