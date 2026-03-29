import axios from "axios";

const API_BASE = "http://localhost:3001/api";

export const analyzeIdea = async (idea) => {
  const response = await fetch('/api/analyze', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ idea }),
  });

  if (!response.ok) {
    throw new Error('Failed to analyze idea');
  }

  return response.json();
};


export function streamRoadmap(idea, analysisSummary, onMessage, onDone, onError) {
  const eventSource = new EventSource(
    `${API_BASE}/roadmap-stream?idea=${encodeURIComponent(idea)}&analysisSummary=${encodeURIComponent(analysisSummary)}`
  );

  eventSource.onmessage = (event) => {
    if (event.data === "[DONE]") {
      onDone?.();
      eventSource.close();
      return;
    }    try {
        const parsed = JSON.parse(event.data);
        onMessage?.(parsed);
      } catch (err) {
        console.error("Invalid SSE chunk", err);
      }
    };
  
    eventSource.onerror = (err) => {
      onError?.(err);
      eventSource.close();
    };
  
    return eventSource;
  }