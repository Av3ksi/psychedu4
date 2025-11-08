// app/api/chat/route.ts
export const runtime = 'nodejs';

// In-Memory Rate Limiting
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

async function checkRateLimit(identifier: string): Promise<{ allowed: boolean; remaining: number }> {
  const now = Date.now();
  const limit = rateLimitMap.get(identifier);
  
  if (!limit || now > limit.resetTime) {
    // Neues Zeitfenster: 15 requests pro Stunde
    rateLimitMap.set(identifier, { count: 1, resetTime: now + 60 * 60 * 1000 });
    return { allowed: true, remaining: 14 };
  }
  
  if (limit.count >= 15) {
    return { allowed: false, remaining: 0 };
  }
  
  limit.count++;
  return { allowed: true, remaining: 15 - limit.count };
}

export async function POST(req: Request) {
  try {
    // IP-Adresse als Identifier (funktioniert auch für nicht-eingeloggte)
    const forwarded = req.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0] : 'unknown';
    
    // Rate Limiting prüfen
    const rateLimit = await checkRateLimit(ip);
    
    if (!rateLimit.allowed) {
      return new Response(
        'Du hast das Limit von 15 Nachrichten pro Stunde erreicht. Bitte versuche es später erneut.', 
        { 
          status: 429, 
          headers: { 
            'Content-Type': 'text/plain',
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': String(Date.now() + 60 * 60 * 1000)
          } 
        }
      );
    }

    const { messages } = await req.json();
    
    const userMessages = messages.filter((m: { role: string; content: string }) => 
      m.role === 'user' && m.content.trim()
    );
    const lastMessage = userMessages[userMessages.length - 1]?.content || '';
    
    console.log('User message:', lastMessage, 'Remaining:', rateLimit.remaining);

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
        'X-RateLimit-Remaining': String(rateLimit.remaining),
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