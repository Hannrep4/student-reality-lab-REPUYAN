const RENT_DATA = {
  newark: { name: 'Newark', averageRent: 1400 },
  'jersey-city': { name: 'Jersey City', averageRent: 1800 },
  paramus: { name: 'Paramus', averageRent: 1650 },
  elizabeth: { name: 'Elizabeth', averageRent: 1350 },
  hoboken: { name: 'Hoboken', averageRent: 2100 },
  trenton: { name: 'Trenton', averageRent: 1200 },
  'atlantic-city': { name: 'Atlantic City', averageRent: 1300 },
  'new-brunswick': { name: 'New Brunswick', averageRent: 1400 }
};

const SYSTEM_PROMPT = `You are a helpful rent affordability assistant for college graduates in New Jersey.
You help users understand whether they can afford rent in different NJ cities using the 30% affordability rule.

The 30% Affordability Rule: Rent should not exceed 30% of gross monthly income.
- If rent is more than 30% of income: warn the user
- If rent is above 40% of income: explain that they may be rent-burdened

Here is the current rent data for NJ cities (2026 estimates):
- Newark: $1400/month
- Jersey City: $1800/month
- Paramus: $1650/month
- Elizabeth: $1350/month
- Hoboken: $2100/month
- Trenton: $1200/month
- Atlantic City: $1300/month
- New Brunswick: $1400/month

When users ask about affordability:
1. If they provide income and a city, calculate if it's affordable using the 30% rule
2. If not affordable, tell them how much more they need to earn
3. Provide encouragement and practical suggestions for improving affordability
4. Always reference the 30% rule and explain the calculations

Be friendly, informative, and empowering. Help them make informed decisions about their housing choices.`;

async function getChatCompletion(userMessage) {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    throw new Error('Missing OPENAI_API_KEY environment variable');
  }

  const openAIResponse = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: userMessage }
      ],
      max_tokens: 500,
      temperature: 0.7
    })
  });

  const payload = await openAIResponse.json();

  if (!openAIResponse.ok) {
    const message = payload?.error?.message || 'OpenAI request failed';
    throw new Error(message);
  }

  return payload?.choices?.[0]?.message?.content || 'I could not generate a response right now.';
}

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed', success: false });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
    const userMessage = (body.message || '').trim();

    if (!userMessage) {
      return res.status(400).json({ error: 'Message cannot be empty', success: false });
    }

    const response = await getChatCompletion(userMessage);

    return res.status(200).json({
      response,
      success: true,
      rentData: RENT_DATA
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message || 'Unexpected server error',
      success: false
    });
  }
};
