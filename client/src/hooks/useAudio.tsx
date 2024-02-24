import { useRef } from "react";
import { useRecoilValue } from "recoil";
import { mutedState } from "../context/atoms";

export type useAudioType = { play: () => void };

export function useAudio(url: string): useAudioType {
  const audio = useRef(new Audio(url));
  const muted = useRecoilValue(mutedState);

  const play = () => {
    if (!muted) {
      void audio.current.play();
    }
  };

  return { play };
}
