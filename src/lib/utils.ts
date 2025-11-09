import { faker } from "@faker-js/faker";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { Friend } from "~/types";

export function addRandomEmdashes(input: string, probability = 0.3): string {
    let out = "";
    for (const ch of input) {
        if (ch === " ") {
            if (out.endsWith("—")) {
                out += " ";
            } else {
                out += Math.random() < probability ? "—" : " ";
            }
        } else {
            out += ch;
        }
    }
    return out;
}

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}


export function getRandomFriendData() {

    return {
        name: faker.person.firstName("female"),
        traits: faker.helpers.arrayElements([""], 3),
    }

}
