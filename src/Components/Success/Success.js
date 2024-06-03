import React, { useEffect } from 'react';
import Timer from '../Timer/Timer';

const Success = ({ songTitle, songViews }) => {
  useEffect(() => {
    const successTime = new Date().toISOString();
    localStorage.setItem('successTime', successTime);
  }, []);

  return (
    <div>
      <h1>Success!</h1>
      <p>{`Song Title: ${songTitle}`}</p>
      <p>{`Song Views: ${songViews}`}</p>
      <Timer />
    </div>
  );
};

export default Success;
