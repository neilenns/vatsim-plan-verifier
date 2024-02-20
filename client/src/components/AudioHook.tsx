import { useRef } from "react";
import { useAppContext } from "../hooks/useAppContext.mjs";

export type useAudioType = { play: () => void };

export function useAudio(url: string): useAudioType {
  const audio = useRef(new Audio(url));
  const { muted } = useAppContext();

  const play = () => {
    if (!muted) {
      void audio.current.play();
    }
  };

  return { play };
}
