// app/api/chat/route.ts
export const runtime = 'nodejs';

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    
    const userMessages = messages.filter((m: { role: string; content: string }) => 
      m.role === 'user' && m.content.trim()
    );
    const lastMessage = userMessages[userMessages.length - 1]?.content || '';
    
    console.log('User message:', lastMessage);

    // Verwende gemini-2.5-flash mit v1beta API
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GOOGLE_GENERATIVE_AI_API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: lastMessage }],
            },
          ],
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Google AI Error:', errorText);
      throw new Error(`Google AI API error: ${response.status}`);
    }

    const data = await response.json();
    const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Keine Antwort erhalten.';
    
    console.log('AI Response:', aiResponse);

    return new Response(aiResponse, {
      headers: {
        'Content-Type': 'text/plain',
      },
    });

  } catch (error) {
    console.error('Chat API Error:', error);
    
    return new Response(
      'Entschuldigung, es gab einen Fehler. Bitte versuche es erneut.', 
      { 
        status: 500,
        headers: { 'Content-Type': 'text/plain' }
      }
    );
  }
}