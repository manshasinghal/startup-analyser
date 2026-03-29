import express from 'express';
import fetch from 'node-fetch';

const router = express.Router();

router.post('/roadmap', async (req, res) => {
  const { idea, analysisSummary } = req.body;

  if (!idea) {
    return res.status(400).json({ error: 'Idea is required' });
  }

  try {
    const prompt = `You are a startup advisor. Create a 5-step launch roadmap for this startup idea:

Idea: ${idea}

Analysis Summary: ${analysisSummary || "No analysis provided"}

Return ONLY a valid JSON object (no markdown, no backticks):
{
  "steps": [
    {
      "title": "Step title",
      "description": "2-sentence description",
      "timeframe": "Weeks 1-4",
      "resources": ["resource 1", "resource 2", "resource 3"],
      "kpis": ["KPI 1", "KPI 2", "KPI 3"]
    }
  ],
  "advice": "2-3 sentence strategic advice paragraph"
}`;

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'HTTP-Referer': process.env.BASE_URL,
        'X-Title': 'Startup Analyzer',
      },
      body: JSON.stringify({
        model: 'openrouter/free',
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 2000,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`OpenRouter API error: ${response.status} - ${JSON.stringify(errorData)}`);
    }

    const data = await response.json();
    const content = data.choices[0].message.content;

    // Parse JSON from response
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Invalid JSON in response');
    }

    const roadmap = JSON.parse(jsonMatch[0]);
    res.json(roadmap);
  } catch (error) {
    console.error('Roadmap Error:', error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
