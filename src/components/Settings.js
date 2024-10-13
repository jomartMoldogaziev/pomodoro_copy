import React, { useState } from "react";
import './Settings.css'

const Settings = ({ workTime, restTime, longRestTime, onUpdate }) => {
  const [newWorkTime, setNewWorkTime] = useState(workTime);
  const [newRestTime, setNewRestTime] = useState(restTime);
  const [newLongRestTime, setNewLongRestTime] = useState(longRestTime);

  const handleSave = () => {
    onUpdate({
      workTime: newWorkTime,
      restTime: newRestTime,
      longRestTime: newLongRestTime,
    });
  };

  return (
    <div className="sett">
      <h3>Настройки таймера</h3>
      <label>
        Рабочее время (мин):
        <input
          type="number"
          value={newWorkTime}
          onChange={(e) => setNewWorkTime(e.target.value)}
        />
      </label>
      <br />
      <label>
        Время отдыха (мин):
        <input
          type="number"
          value={newRestTime}
          onChange={(e) => setNewRestTime(e.target.value)}
        />
      </label>
      <br />
      <label>
        Долгое время отдыха (мин):
        <input
          type="number"
          value={newLongRestTime}
          onChange={(e) => setNewLongRestTime(e.target.value)}
        />
      </label>
      <br />
      <button onClick={handleSave}>Сохранить</button>
    </div>
  );
};

export default Settings;
