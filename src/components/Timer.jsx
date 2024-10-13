import React, { useState, useEffect, useCallback } from "react";
import Settings from "./Settings";
import Navbar from "./Navbar";
import HistoryModal from "./HistoryModal";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import 'react-circular-progressbar/dist/styles.css'; 
import beepSound from '../sounds/beep.mp3';
import './Timer.css';
import MusicPlayer from './MusicPlayer';

const Timer = ({ initialWorkTime = 25, initialRestTime = 5, initialLongRestTime = 15 }) => {
    const [workTime, setWorkTime] = useState(initialWorkTime);
    const [restTime, setRestTime] = useState(initialRestTime);
    const [longRestTime, setLongRestTime] = useState(initialLongRestTime);
    const [timeLeft, setTimeLeft] = useState(initialWorkTime * 60);
    const [isWorking, setIsWorking] = useState(true);
    const [isRunning, setIsRunning] = useState(false);
    const [cycleCount, setCycleCount] = useState(0);
    const [cycleHistory, setCycleHistory] = useState([]);
    const [showSettings, setShowSettings] = useState(false);
    const [showHistoryModal, setShowHistoryModal] = useState(false);
    const [bgPosition, setBgPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (event) => {
            const x = (event.clientX / window.innerWidth) * 100;
            const y = (event.clientY / window.innerHeight) * 100;
            setBgPosition({ x, y });
        };

        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    const playSound = () => {
        const audio = new Audio(beepSound);
        audio.play();
    };

    const handleTimerComplete = useCallback(() => {
        playSound();
        if (isWorking) {
            setCycleCount((prev) => prev + 1);
            setTimeLeft((cycleCount + 1) % 4 === 0 ? longRestTime * 60 : restTime * 60);
        } else {
            setTimeLeft(workTime * 60);
        }

        setIsWorking(!isWorking);
        setCycleHistory((prev) => [
            ...prev,
            { cycle: cycleCount + 1, type: isWorking ? 'Работа' : 'Отдых', time: new Date().toLocaleTimeString() },
        ]);
        setIsRunning(false);
    }, [isWorking, cycleCount, longRestTime, restTime, workTime]);

    useEffect(() => {
        let timer = null;
        if (isRunning && timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft((prevTime) => prevTime - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            clearInterval(timer);
            handleTimerComplete();
        }

        return () => clearInterval(timer);
    }, [isRunning, timeLeft, handleTimerComplete]);

    const startTimer = () => setIsRunning(true);
    const stopTimer = () => setIsRunning(false);
    const resetTimer = () => {
        setIsRunning(false);
        setTimeLeft(workTime * 60);
        setIsWorking(true);
    };

    const updateSettings = (newSettings) => {
        setWorkTime(parseInt(newSettings.workTime, 10));
        setRestTime(parseInt(newSettings.restTime, 10));
        setLongRestTime(parseInt(newSettings.longRestTime, 10));
        setTimeLeft(parseInt(newSettings.workTime, 10) * 60);
        setShowSettings(false);
    };

    const formatTime = (seconds) => {
        if (seconds < 0) return "00:00"; 
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
    };

    const totalTime = isWorking
        ? workTime * 60
        : (cycleCount + 1) % 4 === 0
        ? longRestTime * 60
        : restTime * 60;

    const percentage = ((totalTime - timeLeft) / totalTime) * 100;

    return (
        <div
            className="timer-container"
            style={{
                background: isWorking
                    ? `radial-gradient(circle at ${bgPosition.x}% ${bgPosition.y}%, #ff0000, #000000)` 
                    : `radial-gradient(circle at ${bgPosition.x}% ${bgPosition.y}%, #049504, #000000)`, 
                transition: 'background 0.1s ease',
            }}
        >
            <Navbar
                onSettingsClick={() => setShowSettings(true)}
                onHistoryClick={() => setShowHistoryModal(true)}
                showHistory={showHistoryModal}
            />

            {showSettings && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={() => setShowSettings(false)}>
                            &times;
                        </span>
                        <Settings
                            workTime={workTime}
                            restTime={restTime}
                            longRestTime={longRestTime}
                            onUpdate={updateSettings}
                        />
                    </div>
                </div>
            )}

            <HistoryModal
                show={showHistoryModal}
                onClose={() => setShowHistoryModal(false)}
                cycleHistory={cycleHistory}
            />

            <h2>{isWorking ? 'Рабочее время' : 'Время отдыха'}</h2>

            <div style={{ width: '250px', height: '250px', margin: 'auto' }}>
                <CircularProgressbar
                    value={percentage}
                    text={formatTime(timeLeft)}
                    styles={buildStyles({
                        textColor: '#fff',
                        pathColor: isWorking ? '#ff0000' : '#00ff00',
                        trailColor: '#d6d6d6',
                        textSize: '30px', 
                    })}
                />
            </div>

            {!isWorking && <MusicPlayer />}
            {isWorking && <MusicPlayer />}

            <button className="timer-button" onClick={startTimer} disabled={isRunning}>
                Старт
            </button>
            <button className="timer-button" onClick={stopTimer} disabled={!isRunning}>
                Пауза
            </button>
            <button className="timer-button" onClick={resetTimer}>
                Сброс
            </button>
        </div>
    );
};

export default Timer;
