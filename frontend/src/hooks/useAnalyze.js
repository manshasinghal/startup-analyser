import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { analyzeIdea } from "../lib/api";

export function useAnalyze() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  const analyze = async (idea) => {
    try {
      setLoading(true);
      setError(null);

      const result = await analyzeIdea(idea);
      setData(result);

      navigate("/result", {
        state: { analysis: result, idea },
      });
    } catch (err) {
      setError(err.message || "Analysis failed");
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    data,
    analyze,
  };
}
