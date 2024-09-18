import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [currentLight, setCurrentLight] = useState('green');
  const [pedestrianRequested, setPedestrianRequested] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(10); // Time remaining for the current light

  // Function to switch lights
  const switchLights = () => {
    if (currentLight === 'green') {
      setCurrentLight('yellow');
      setTimeRemaining(3); // Set yellow light timer
    } else if (currentLight === 'yellow') {
      setCurrentLight('red');
      setTimeRemaining(7); // Set red light timer
    } else {
      setCurrentLight('green');
      setTimeRemaining(10); // Set green light timer
    }
  };

  // useEffect to manage the light transitions and countdown timer
  useEffect(() => {
    if (timeRemaining === 0) {
      if (pedestrianRequested && currentLight === 'green') {
        setCurrentLight('red'); // Change to red for pedestrians
        setPedestrianRequested(false); // Reset request after crossing
        setTimeRemaining(7); // Set red light timer
      } else {
        switchLights(); // Transition to the next light when the timer hits 0
      }
    } else {
      const timer = setTimeout(() => {
        setTimeRemaining(timeRemaining - 1); // Decrease time every second
      }, 1000);

      // Cleanup timer on unmount or when state changes
      return () => clearTimeout(timer);
    }
  }, [timeRemaining, pedestrianRequested, currentLight]); // Dependencies for useEffect

  // Handle pedestrian crossing request
  const handlePedestrianRequest = () => {
    setPedestrianRequested(true);
  };

  return (
    <div className="App">
      <h1>Traffic Light Simulator</h1>
      <div className="traffic-light">
        <div className={`light ${currentLight === 'green' ? 'green' : ''}`} />
        <div className={`light ${currentLight === 'yellow' ? 'yellow' : ''}`} />
        <div className={`light ${currentLight === 'red' ? 'red' : ''}`} />
      </div>
      <div className="timer">
        <h2>Time Remaining: {timeRemaining} seconds</h2>
      </div>
      <button onClick={handlePedestrianRequest}>Pedestrian Crossing</button>
    </div>
  );
}

export default App;
