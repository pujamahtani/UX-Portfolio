import React, { createContext, useContext, useRef, useState } from 'react';

const AudioCtx = createContext(null);

const LOOP_START = 60;
const LOOP_END   = 180;
const SRC = '/videos/jamaican_bam_bam.mp3';

export function AudioProvider({ children }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (!isPlaying) {
      if (audio.currentTime < LOOP_START || audio.currentTime >= LOOP_END) {
        audio.currentTime = LOOP_START;
      }
      audio.play().catch(() => {});
      audio.ontimeupdate = () => {
        if (audio.currentTime >= LOOP_END) audio.currentTime = LOOP_START;
      };
    } else {
      audio.pause();
    }
    setIsPlaying(p => !p);
  };

  return (
    <AudioCtx.Provider value={{ isPlaying, togglePlay }}>
      <audio ref={audioRef} src={SRC} preload="none" />
      {children}
    </AudioCtx.Provider>
  );
}

export const useAudio = () => useContext(AudioCtx);
