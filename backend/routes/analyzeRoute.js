import express from "express";
import fetch from "node-fetch";
import { getAnalyzePrompt } from "../utils/getAnalyzePrompt.js";


const router = express.Router();

router.post("/analyze", async (req, res) => {
  const { idea } = req.body;

  if (!idea || idea.length < 50) {
    return res.status(400).json({
      error: "Idea must be at least 50 characters",
    });
  }

  try {
    

const prompt = getAnalyzePrompt(idea);
;

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "HTTP-Referer": process.env.BASE_URL,
          "X-Title": "Startup Analyzer",
        },
        body: JSON.stringify({
          model: "openrouter/free",
          messages: [
            {
              role: "user",
              content: prompt,
            },
          ],
          temperature: 0.3,
          max_tokens: 2200
        }),
      }
    );

    const data = await response.json();

    // ✅ Better OpenRouter error handling
    if (!response.ok) {
      return res.status(response.status).json({
        error:
          data.error?.message ||
          `OpenRouter failed with status ${response.status}`,
      });
    }

    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      return res.status(500).json({
        error: "No response content from AI",
      });
    }

    function extractJSON(raw) {
      if (!raw) return null;
    
      let cleaned = raw.trim();
    
      // 🔹 Remove markdown fences ```json ... ```
      cleaned = cleaned.replace(/^```(?:json)?\s*/i, "");
      cleaned = cleaned.replace(/\s*```$/i, "");
    
      // 🔹 Extract JSON substring
      const firstBrace = cleaned.indexOf("{");
      const lastBrace = cleaned.lastIndexOf("}");
    
      if (firstBrace === -1 || lastBrace === -1) {
        return null;
      }
    
      return cleaned.substring(firstBrace, lastBrace + 1);
    }
    
    let analysis;
    
    try {
      const jsonString = extractJSON(content);
    
      if (!jsonString) {
        throw new Error("No valid JSON found in AI response");
      }
    
      analysis = JSON.parse(jsonString);
    } catch (err) {
      return res.status(500).json({
        error: "AI returned invalid JSON",
        raw: content,
      });
    }

    return res.json(analysis);
  } catch (error) {
    console.error("Backend Error:", error);
    return res.status(500).json({
      error: error.message,
    });
  }
});

export default router;