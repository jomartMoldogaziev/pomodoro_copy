import React, { useState } from 'react';
import './MusicPlayer.css';

const MusicPlayer = () => {
  const [audioSrc, setAudioSrc] = useState(null);
  const [audioName, setAudioName] = useState(''); 
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = React.useRef(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileURL = URL.createObjectURL(file);
      setAudioSrc(fileURL);
      setAudioName(file.name);
    }
  };

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleClickUpload = () => {
    document.getElementById('file-input').click();
  };

  return (
    <div className="music-player">
      <input
        id="file-input"
        type="file"
        accept="audio/*"
        onChange={handleFileUpload}
        style={{ display: 'none' }} 
      />
      <button className="upload-btn" onClick={handleClickUpload}>
        Загрузить свою музыку
      </button>

      {audioName && <p className="audio-name">{audioName}</p>} 

      {audioSrc && (
        <div>
          <audio ref={audioRef} src={audioSrc} />
          <button className="play-btn" onClick={handlePlayPause}>
            {isPlaying ? 'Pause' : 'Play'}
          </button>
        </div>
      )}
    </div>
  );
};

export default MusicPlayer;
