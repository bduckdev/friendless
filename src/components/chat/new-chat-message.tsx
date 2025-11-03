/*
    should take a chat message in.
    if it's a user message, render it normally
    else if isLoading is true, render the little extra "friend is typing message"
    
    if it's a friend message, render it split messages by \n and render the delete button


        one component should be the stupid ui thing that just renders it dumbly
    */
interface ChatMessageProps {
    messageId: string;
    role: "user" | "assistant" | "system";
    content: string;
    friendName?: string;
    friendAvatar?: string;
}

export function ChatMessageHandler() {
}



