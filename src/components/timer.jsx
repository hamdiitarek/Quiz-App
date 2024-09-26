import React, { useState, useEffect } from 'react';
import './timer.css';

const Timer = () => {
  const [seconds, setSeconds] = useState(10);

  useEffect(() => {
    if (seconds > 0) {
      const interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [seconds]);

  return (
    <div>
      <img src="https://www.svgrepo.com/download/522312/timer.svg" width={"5%"} alt="SVG Image" />
      <h3>Timer: {seconds} seconds</h3>
    </div>
  );
};

export default Timer;