import { Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { timerExpiredState, loaderState } from '../../state';

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
      const nextDay = initializeTimer();
      localStorage.setItem('localStorageTimer', nextDay);
      return nextDay;
    }
  };

  const [endTime, setEndTime] = useState(getEndTime());
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(endTime));
  const setTimerExpired = useSetRecoilState(timerExpiredState);
  const setLoading = useSetRecoilState(loaderState);


  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft(endTime));
    }, 1000);

    // Check if the timer has reached zero
    if (Object.keys(timeLeft).length === 0 && timeLeft.constructor === Object) {
      // Introduce a small delay to ensure the date rolls over
      setTimeout(() => {
        setTimerExpired(true); // Set timer expired state to true
        setLoading(true);
        localStorage.removeItem('localStorageTimer'); // Remove the timer from local storage
        setEndTime(initializeTimer()); // Reset the end time for the next day
      }, 1000); // 1 second delay
    }

    return () => clearTimeout(timer);
  }, [timeLeft, endTime, setTimerExpired]);
  const timerToShow = `השיר הבא בעוד ${String(timeLeft.hours).padStart(2, '0')}:${String(timeLeft.minutes).padStart(2, '0')}:${String(timeLeft.seconds).padStart(2, '0')}`;


  return (
    <>
      {Object.keys(timeLeft).length !== 0 && (
        <>
          <Typography variant="h6" mt={2} sx={{ flexBasis: "80%", margin: 'auto', textAlign: 'center', color: 'red' }}>
            <span>{timerToShow}</span>
          </Typography>
        </>
      )}
    </>
  );
  
};

export default Timer;
