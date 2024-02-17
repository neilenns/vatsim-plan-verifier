import { useEffect, useState } from "react";
import { useAppContext } from "../hooks/useAppContext.mjs";

export type useAudioType = { play: () => void };

export function useAudio(url: string): useAudioType {
  const [audio] = useState(new Audio(url));
  const [isMuted, setIsMuted] = useState(false);
  const { muted } = useAppContext();

  useEffect(() => {
    setIsMuted(muted);
  }, [muted]);

  const play = () => {
    if (!isMuted) {
      void audio.play();
    }
  };

  return { play };
}
