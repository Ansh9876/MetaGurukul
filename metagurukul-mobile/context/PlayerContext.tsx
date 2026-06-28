import { createContext, useContext, useState } from "react";

type Track = {
  title: string;
  audioUrl: string;
  index: number;
  playlist: any[];
};

type PlayerContextType = {
  currentTrack: Track | null;
  setCurrentTrack: (track: Track) => void;
  isPlaying: boolean;
  setIsPlaying: (value: boolean) => void;
};

const PlayerContext = createContext<PlayerContextType | null>(null);

export const PlayerProvider = ({ children }: any) => {

  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <PlayerContext.Provider value={{
      currentTrack,
      setCurrentTrack,
      isPlaying,
      setIsPlaying
    }}>
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => {

  const context = useContext(PlayerContext);

  if (!context) {
    throw new Error("usePlayer must be used inside PlayerProvider");
  }

  return context;
};