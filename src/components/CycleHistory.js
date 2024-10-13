// src/components/CycleHistory.js
import React from "react";

const CycleHistory = ({ history }) => {
  return (
    <div>
      <h2>История циклов</h2>
      <ul>
        {history.map((cycle, index) => (
          <li key={index}>
            {`Цикл ${index + 1}: ${cycle.isWork ? "Работа" : "Отдых"}, длительность ${cycle.duration} минут`}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CycleHistory;
