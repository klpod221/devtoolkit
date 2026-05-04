import React, { useState, useEffect, useRef } from "react";
import MyCard from "@components/MyCard";
import MyButton from "@components/MyButton";
import { FaPlay, FaPause, FaStop, FaFlag } from "react-icons/fa";

const Chronometer = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState([]);
  
  const timerRef = useRef(null);
  const startTimeRef = useRef(0);
  const accumulatedTimeRef = useRef(0);

  useEffect(() => {
    if (isRunning) {
      startTimeRef.current = Date.now() - accumulatedTimeRef.current;
      timerRef.current = setInterval(() => {
        setTime(Date.now() - startTimeRef.current);
      }, 10);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isRunning]);

  const handleStartStop = () => {
    if (isRunning) {
        accumulatedTimeRef.current = Date.now() - startTimeRef.current;
    }
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
    accumulatedTimeRef.current = 0;
    setLaps([]);
  };

  const handleLap = () => {
    if (isRunning) {
      setLaps([{ id: laps.length + 1, time, diff: laps.length === 0 ? time : time - laps[0].time }, ...laps]);
    }
  };

  const formatTime = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const milliseconds = Math.floor((ms % 1000) / 10);
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}.${milliseconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="flex flex-col lg:flex-row justify-center gap-6 py-10">
      <MyCard className="w-full max-w-md">
        <div className="flex flex-col items-center mb-8">
          <div className="font-mono text-6xl text-gray-800 dark:text-gray-100 font-bold mb-8 tabular-nums">
            {formatTime(time)}
          </div>
          <div className="flex gap-4">
            <MyButton 
              color={isRunning ? "warning" : "success"} 
              onClick={handleStartStop}
              className="w-32 flex justify-center text-lg"
            >
              {isRunning ? <><FaPause className="mr-2 mt-1" /> Pause</> : <><FaPlay className="mr-2 mt-1" /> Start</>}
            </MyButton>
            
            <MyButton 
              color="light" 
              onClick={isRunning ? handleLap : handleReset}
              className="w-32 flex justify-center text-lg"
            >
              {isRunning ? <><FaFlag className="mr-2 mt-1" /> Lap</> : <><FaStop className="mr-2 mt-1" /> Reset</>}
            </MyButton>
          </div>
        </div>
      </MyCard>

      {laps.length > 0 && (
        <MyCard className="w-full max-w-md max-h-96 overflow-y-auto">
          <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100 border-b pb-2 dark:border-gray-700">Laps</h3>
          <ul className="space-y-2">
            {laps.map((lap) => (
              <li key={lap.id} className="flex justify-between font-mono text-gray-700 dark:text-gray-300 p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded transition-colors">
                <span>Lap {lap.id.toString().padStart(2, '0')}</span>
                <span className="text-gray-500 dark:text-gray-400">+{formatTime(lap.diff)}</span>
                <span className="font-bold">{formatTime(lap.time)}</span>
              </li>
            ))}
          </ul>
        </MyCard>
      )}
    </div>
  );
};

Chronometer.title = "Chronometer";
export default Chronometer;
