import { Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { loaderState, timerExpiredState } from "../../state";

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
    const nextDay = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + 1
    );
    return nextDay;
  };

  const getEndTime = () => {
    const savedTime = localStorage.getItem("localStorageTimer");

    if (savedTime) {
      const savedDate = new Date(savedTime);
      const now = new Date();

      // Check if the saved date is today and not midnight (00:00:00)
      if (
        savedDate.getDate() === now.getDate() &&
        savedDate.getMonth() === now.getMonth() &&
        savedDate.getFullYear() === now.getFullYear() &&
        (savedDate.getHours() !== 0 ||
          savedDate.getMinutes() !== 0 ||
          savedDate.getSeconds() !== 0)
      ) {
        return savedDate;
      } else {
        // If the saved date is not today or it's midnight, remove it from localStorage
        localStorage.removeItem("localStorageTimer");
      }
    }

    // Only save a new timer if there's no valid saved time
    const nextDay = initializeTimer();
    localStorage.setItem("localStorageTimer", nextDay.toString());
    return nextDay;
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
    if (
      timeLeft.hours === 0 &&
      timeLeft.minutes === 0 &&
      timeLeft.seconds === 0
    ) {
      // Introduce a small delay to ensure the date rolls over
      setTimeout(() => {
        setTimerExpired(true); // Set timer expired state to true
        setLoading(true);
        localStorage.removeItem("localStorageTimer"); // Remove the timer from local storage
        setEndTime(initializeTimer()); // Reset the end time for the next day
      }, 1000); // 1 second delay
    }

    return () => clearTimeout(timer);
  }, [timeLeft, endTime, setTimerExpired]);
  //const timerToShow = `השיר הבא בעוד ${String(timeLeft.hours).padStart(2, '0')}:${String(timeLeft.minutes).padStart(2, '0')}:${String(timeLeft.seconds).padStart(2, '0')}`;
  const timerToShow = `${String(timeLeft.hours).padStart(2, "0")}:${String(
    timeLeft.minutes
  ).padStart(2, "0")}:${String(timeLeft.seconds).padStart(2, "0")}`;

  return (
    <>
      {Object.keys(timeLeft).length !== 0 && (
        <>
          <Typography
            variant="h6"
            mt={2}
            sx={{
              flexBasis: "80%",
              margin: "auto",
              textAlign: "center",
              color: "red",
            }}
          >
            <span>{timerToShow}</span>
          </Typography>
        </>
      )}
    </>
  );
};

export default Timer;
