// backend/roadmapprompt.js

export function getRoadmapPrompt(idea, analysisSummary) {
    return `
  You are an expert startup advisor, growth strategist, and execution coach.
  
  Your job is to create a practical execution roadmap for the following startup idea.
  
  Startup Idea:
  "${idea}"
  
  Analysis Summary:
  "${analysisSummary}"
  
  IMPORTANT:
  Return ONLY valid JSON.
  Do not return markdown.
  Do not use \`\`\`.
  Do not add explanation before or after JSON.
  The output must be directly parsable using JSON.parse().
  
  Generate 10 to 15 numbered execution steps in EXACTLY this JSON array format:
  
  [
    {
      "step": 1,
      "title": "Validate Market Demand",
      "description": "Conduct 20+ customer interviews to validate the core pain points, willingness to pay, and urgency of the problem.",
      "timeframe": "Weeks 1-4",
      "resources": ["Calendly", "Google Forms", "Notion"],
      "kpis": ["Interview completion rate", "Problem validation score"]
    }
  ]
  
  Rules:
  - Generate minimum 10 and maximum 15 steps
  - Steps must follow logical startup journey order
  - Start from idea validation
  - Include MVP building, GTM, user acquisition, monetization, and scaling
  - title must be short and actionable
  - description should be practical and founder-friendly
  - timeframe must be realistic
  - resources should contain tools/platforms/frameworks
  - kpis must be measurable business metrics
  - return only JSON array
  `;
  }