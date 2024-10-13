// src/components/HistoryModal.js
import React from "react";
import './HistoryModal.css';

const HistoryModal = ({ show, onClose, cycleHistory }) => {
  if (!show) return null; // Если модалка не должна показываться, возвращаем null

  return (
    <div className="history-modal">
      <div className="history-modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h3>История циклов</h3>
        <ul>
          {cycleHistory.map((cycle, index) => (
            <li key={index}>
              Цикл {cycle.cycle}: {cycle.type} в {cycle.time}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default HistoryModal;
