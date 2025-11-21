# friendless

Friendless is a slightly silly, slightly dystopian full-stack AI companion app designed to replace human communication, or at least parody the idea.

Built with Next.js, tRPC, PostgreSQL, Prisma, and Bun.

## Features

- Create AI "friends" with unique personalities, backgrounds, and interests.
- Send your AI friends messages and recieve streamed repsonses from them.
- Clean iMessage inspired chat UI for a disturbingly human experience.
- Authentication via NextAuth.js (Preconfigured to use Discord and GitHub)

Demo it [here](https://friendless.bduck.dev/)

## Screenshots

<img src="screenshots/1.jpg" alt="Landing Page" width="600"/>
<img src="screenshots/2.jpg" alt="Swipe Gallery" width="600"/>
<img src="screenshots/3.jpg" alt="Chat Window"width="400"/>

## Instructions to run locally

1. clone the repo
2. setup .env based on .env.example (openai api key, nextauth stuff, postgresdb, etc..)
3. migrate the db
4. bun install and bun dev
5. navigate to localhost:3000
