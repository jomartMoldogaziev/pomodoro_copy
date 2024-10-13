// src/App.js
import React from "react";
import Timer from "./components/Timer";
import "./App.css";

function App() {
  return (
    <div className="App">
      <h1>Pomodoro Tracker</h1>
      <Timer workTime={25} restTime={5} longRestTime={15} />
    </div>
  );
}

export default App;
