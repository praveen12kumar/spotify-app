import { useState, useEffect, useRef } from "react";
import ReactHowler from "react-howler";
import { useDispatch, useSelector } from "react-redux";
import {
  MdShuffle,
  MdSkipNext,
  MdSkipPrevious,
  MdOutlinePlayCircleFilled,
  MdOutlineRepeat,
  MdOutlinePauseCircleFilled,
} from "react-icons/md";
import {
  togglePlay,
  playNext,
  playPrevious,
} from "../../redux/slices/player-slice";
import { FaVolumeDown, FaVolumeMute, FaVolumeUp } from "react-icons/fa";

// Helper to format time (mm:ss)
const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
};

export const PlayerController = () => {
  const dispatch = useDispatch();
  const { currentSong, isPlaying } = useSelector((state) => state.player);

  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(75); // Percentage (0-100)
  const [duration, setDuration] = useState(0);

  const howlerRef = useRef(null);

  // When the song loads, set its duration
  const handleLoad = () => {
    const soundDuration = howlerRef.current?.duration();
    if (soundDuration) {
      setDuration(soundDuration);
    }
  };

  // Update the current time every second while playing
  useEffect(() => {
    let interval;
    if (isPlaying && howlerRef.current) {
      interval = setInterval(() => {
        const seek = howlerRef.current?.seek();
        setCurrentTime(seek);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, howlerRef]);

  const handleTogglePlay = () => {
    dispatch(togglePlay());
  };

  const handleNext = () => {
    dispatch(playNext());
    setCurrentTime(0);
  };

  const handlePrevious = () => {
    dispatch(playPrevious());
    setCurrentTime(0);
  };

  // Seek handler - update Howler's seek position
  const handleSeek = (e) => {
    const newTime = parseFloat(e.target.value);
    if (howlerRef.current) {
      howlerRef.current.seek(newTime);
    }
    setCurrentTime(newTime);
  };

  // Volume handler - update local state; ReactHowler receives new volume on render
  const handleVolumeChange = (e) => {
    const newVolume = parseInt(e.target.value, 10);
    setVolume(newVolume);
  };

  return (
    <div className="w-full  text-white flex flex-row items-center justify-evenly ">
      {currentSong && (
        <ReactHowler
          ref={howlerRef}
          src={currentSong.songUrl}
          playing={isPlaying}
          volume={volume / 100} // ReactHowler expects a value between 0 and 1
          onLoad={handleLoad}
          onEnd={() => dispatch(playNext())}
        />
      )}


      <div className="w-1/2 flex flex-col gap-1">
        <div className="w-full flex items-center justify-center space-x-8 text-gray-400">
          <button className="text-xl hover:text-white">
            <MdShuffle className="size-6" />
          </button>
          <button onClick={handlePrevious} className="text-xl hover:text-white">
            <MdSkipPrevious className="size-7" />
          </button>
          {isPlaying ? (
            <button onClick={handleTogglePlay} className="text-xl text-white">
              <MdOutlinePauseCircleFilled className="size-10" />
            </button>
          ) : (
            <button onClick={handleTogglePlay} className="text-xl text-white">
              <MdOutlinePlayCircleFilled className="size-10" />
            </button>
          )}
          <button onClick={handleNext} className="text-xl hover:text-white">
            <MdSkipNext className="size-7" />
          </button>
          <button className="text-xl hover:text-white">
            <MdOutlineRepeat className="size-6" />
          </button>
      </div>

      {/* Seek Bar */}

      <div className="w-full flex items-center gap-2">
        <span className="text-xs text-gray-400">{formatTime(currentTime)}</span>
        <input
          type="range"
          min={0}
          max={duration}
          step={0.1}
          value={currentTime}
          onChange={handleSeek}
          className="w-full h-[4px] rounded-lg"
          
          
        />
        <span className="text-xs text-gray-400">{formatTime(duration)}</span>
      </div>
      </div>

      {/* Volume Control */}
      <div className="w-1/2  flex items-center justify-center">
        <div className="w-1/3 flex flex-row items-center gap-2">
        {
          volume === 0 ? (
            <FaVolumeMute className="size-6 text-gray-400" />
          ) : volume < 50 ? (
            <FaVolumeDown className="size-6 text-gray-400" />
          ) : (
            <FaVolumeUp className="size-6 text-gray-400" />
          )
        }
        <input
          type="range"
          min={0}
          max={100}
          value={volume}
          onChange={handleVolumeChange}
          className="w-full h-[4px] bg-gray-300 rounded-lg"
          style={{WebkitAppearance: "none"}}
        />
        </div>
      </div>
     
    </div>
  );
};

export default PlayerController;
