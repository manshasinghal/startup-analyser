import { useRef, useState } from "react";
import { streamRoadmap } from "../lib/api";

export function useRoadmapStream() {
  const [steps, setSteps] = useState([]);
  const [streaming, setStreaming] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState(null);
  const sourceRef = useRef(null);

  const startStream = (idea, analysisSummary) => {
    setSteps([]);
    setStreaming(true);
    setDone(false);
    setError(null);

    sourceRef.current = streamRoadmap(
      idea,
      analysisSummary,
      (chunk) => {
        setSteps((prev) => [...prev, chunk]);
      },
      () => {
        setStreaming(false);
        setDone(true);
      },
      () => {
        setStreaming(false);
        setError("Streaming failed");
      }
    );
  };

  const stopStream = () => {
    sourceRef.current?.close();
    setStreaming(false);
  };

  return {
    steps,
    streaming,
    done,
    error,
    startStream,
    stopStream,
  };
}