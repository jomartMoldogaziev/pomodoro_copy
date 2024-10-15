import React, { useEffect, useState } from "react";
import Timer from "./components/Timer";
import "./App.css";

function App() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="App">
      <h1>Pomodoro Tracker</h1>
      <h4>{currentTime.toLocaleTimeString()} - {currentTime.toLocaleDateString()}</h4>

      <Timer workTime={25} restTime={5} longRestTime={15} />
    </div>
  );
}

export default App;
