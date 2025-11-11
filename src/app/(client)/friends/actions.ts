"use server"

import { api } from "~/trpc/server"

type CreateFriendInput = {
    name: string;
    personality: string;
    background: string;
    age: number;
    gender: "male" | "female" | "non_binary";
    traits: string[];
    interests: string[];
    avatar: string;
    voice: string;
}

export async function handleCreateFriend(input: CreateFriendInput) {
    try {
        const newFriend = await api.friend.create(input)
        return newFriend
    } catch (e) {
        console.error("Error in handleCreateFriend action:", e);
        throw new Error("Failed to create new friend");
    }
}
