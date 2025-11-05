// app/api/chat/route.ts
import { createVertex } from '@ai-sdk/google-vertex'; // KORREKTUR: Name geändert
import { streamText } from 'ai';

export const runtime = 'edge';

export async function POST(req: Request) {
  const { messages } = await req.json();

  const vertex = createVertex({ // KORREKTUR: Name geändert
    project: process.env.GOOGLE_PROJECT_ID,
    location: process.env.GOOGLE_LOCATION,
    // API Key wird automatisch aus .env.local gelesen
  });

  const result = await streamText({
    model: vertex('gemini-1.5-flash-latest'),
    messages,
    system: 'Du bist "Psychedu Assistent", ein hilfreicher Bot auf einer Lernplattform für Psychologie. Antworte freundlich und informativ auf Fragen zur Psychologie.',
  });

  return result.toTextStreamResponse();
}