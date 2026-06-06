export const config = { runtime: 'edge' };

export default async function handler(req) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  
  if (!apiKey) {
    return new Response(JSON.stringify({ status: 'ERROR', message: 'No API key found' }), {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-5',
        max_tokens: 50,
        messages: [{ role: 'user', content: 'Reply with exactly this JSON: {"status":"working"}' }]
      }),
    });

    const data = await response.json();
    return new Response(JSON.stringify({ 
      status: 'SUCCESS', 
      apiKeyFound: true,
      response: data 
    }), {
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (err) {
    return new Response(JSON.stringify({ status: 'ERROR', message: err.message }), {
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
