import { Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';

const Timer = () => {
  const calculateTimeLeft = (endTime) => {
    const now = new Date();
    const difference = endTime - now;
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const initializeTimer = () => {
    const now = new Date();
    const nextDay = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    return nextDay;
  };

  const getEndTime = () => {
    const savedTime = localStorage.getItem('localStorageTimer');
    if (savedTime) {
      return new Date(savedTime);
    } else {
      return initializeTimer();
    }
  };

  const [endTime, setEndTime] = useState(getEndTime());
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(endTime));

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft(endTime));
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, endTime]);
  const timerToShow = `השיר הבא בעוד ${String(timeLeft.hours).padStart(2, '0')}:${String(timeLeft.minutes).padStart(2, '0')}:${String(timeLeft.seconds).padStart(2, '0')}`
  return (
    <Typography variant="h6">
      <span>
        {timerToShow}
      </span>
    </Typography>
  );
};

export default Timer;
