// backend/analyzeprompt.js

export function getAnalyzePrompt(idea) {
    return `
  You are an expert startup analyst, product strategist, and VC evaluator.
  
  Analyze this startup idea deeply:
  "${idea}"
  
  IMPORTANT:
  Return ONLY valid JSON.
  Do not return markdown.
  Do not use \`\`\`.
  Do not write any explanation before or after JSON.
  The response must be directly parsable using JSON.parse().
  
  Return in exactly this format:
  
  {
    "percentileScore": 75,
    "verdict": "Excellent",
    "niche": "AI-powered project management for remote teams",
    "market": {
      "size": "$50B+ globally",
      "growthRate": "15% CAGR",
      "targetAudience": "Remote-first companies, startups, freelancers"
    },
    "overview": "A compelling idea targeting a growing market...",
    "competitors": [
      { "name": "Asana", "strength": 8 },
      { "name": "Monday.com", "strength": 8 }
    ],
    "financial": {
      "estimatedRevenue": "$2M-5M in Year 1",
      "breakEvenMonths": 18,
      "fundingStage": "Seed ($500K-2M)",
      "revenueModel": "SaaS subscription ($29-99/user/month)"
    },
    "strengths": ["Clear market need", "Scalable tech stack"],
    "weaknesses": ["Crowded market", "High CAC"],
    "advice": "Focus on a specific vertical (e.g., design teams) to differentiate...",
    "tags": ["B2B", "SaaS", "Productivity"]
  }
  
  Rules:
  - percentileScore must be between 1 and 100
  - verdict should be one of: Poor, Average, Good, Excellent
  - niche should be specific and marketable
  - competitors should be real-world companies
  - competitor strength must be between 1 and 10
  - financial values should be realistic
  - strengths and weaknesses must each have at least 2 points
  - advice must be highly actionable
  - tags should be short and relevant
  `;
  }