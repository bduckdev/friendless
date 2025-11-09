export const INTEREST_CATEGORIES: Record<string, string[]> = {
    "Science & Space": [
        "cosmology",
        "astronomy",
        "physics",
        "neuroscience",
        "environmental science",
        "astrophotography"
    ],
    "Tech & Engineering": [
        "AI",
        "machine learning",
        "robotics",
        "programming",
        "open-source",
        "open-source chaos",
        "web development",
        "cybersecurity",
        "electronics",
        "3D printing",
        "AR/VR",
        "game development"
    ],
    "Arts & Literature": [
        "writing",
        "storytelling",
        "poetry",
        "painting",
        "drawing",
        "illustration",
        "photography",
        "cinema",
        "filmmaking",
        "animation",
        "graphic design",
        "typography"
    ],
    "Music & Audio": [
        "guitar",
        "piano",
        "singing",
        "DJing",
        "music production",
        "podcasts",
        "live shows"
    ],
    "Fitness & Health": [
        "lifting",
        "calisthenics",
        "running",
        "cycling",
        "yoga",
        "martial arts",
        "mobility",
        "nutrition"
    ],
    "Mindfulness & Growth": [
        "mindfulness",
        "meditation",
        "journaling",
        "self-improvement",
        "psychology",
        "philosophy",
        "productivity systems",
        "stoicism"
    ],
    "Food & Drink": [
        "food",
        "cooking",
        "baking",
        "coffee",
        "tea",
        "world cuisine",
        "restaurants"
    ],
    "Travel & Adventure": [
        "travel",
        "road trips",
        "backpacking",
        "camping",
        "language learning",
        "cultural exploration"
    ],
    "Outdoors & Nature": [
        "hiking",
        "gardening",
        "birdwatching",
        "stargazing",
        "nature photography"
    ],
    "Social & Community": [
        "human connection",
        "volunteering",
        "mentorship",
        "public speaking",
        "community events"
    ],
    "Business & Making": [
        "entrepreneurship",
        "startups",
        "freelancing",
        "product design",
        "maker projects"
    ],
    "Lifestyle & Aesthetics": [
        "midnight walks",
        "urban exploration",
        "minimalism",
        "interior design",
        "fashion"
    ],
    "Games & Puzzles": [
        "video games",
        "board games",
        "tabletop RPGs",
        "chess",
        "speedcubing"
    ],
    "Cars & Machines": [
        "automotive",
        "motorsport",
        "sim racing",
        "mechanical tinkering"
    ]
};


export function getRandomInterests(len: number): string[] {
    const interestsArr = Object.values(INTEREST_CATEGORIES).flat()
    const out: string[] = []
    const getRandomUniqueEl = (): string => {
        let el = interestsArr[Math.floor(Math.random() * interestsArr.length)]
        if (out.includes(el!)) el = getRandomUniqueEl()
        return el!
    }
    for (let i = 0; i < len; i++) {
        const randomEl = getRandomUniqueEl()
        out.push(randomEl)
    }
    return out
}
