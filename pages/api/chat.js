import OpenAI from 'openai';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST requests allowed' });
  }

  const { question } = req.body;

  const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
  });

  try {
    const response = await client.responses.create({
      model: "gpt-4o-mini",
      input: question
    });

    res.status(200).json({ answer: response.output_text });
  } catch (error) {
    res.status(500).json({ message: 'Error contacting AI', error: error.message });
  }
}
