import React from "react";
import './Navbar.css';

const Navbar = ({ onSettingsClick, onHistoryClick, showHistory }) => {
 

  return (
    <div className="navbar">
    <button onClick={onSettingsClick}>Настройки</button>
    <button onClick={onHistoryClick}>
      {showHistory ? 'Скрыть историю' : 'Показать историю циклов'}
    </button>
    </div>
  );
};

export default Navbar;
