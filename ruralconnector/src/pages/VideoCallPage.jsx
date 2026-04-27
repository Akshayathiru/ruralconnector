import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './VideoCallPage.css';

export default function VideoCallPage() {
  const navigate = useNavigate();
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);

  const endCall = () => {
    // Navigate back to hospitals page or home
    navigate(-1);
  };

  return (
    <div className="video-call-container">
      {/* Main Doctor Video Area */}
      <div className="main-video">
        <img 
          src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=1000" 
          alt="Doctor Video Stream" 
          className="video-feed" 
        />
        <div className="doctor-info-overlay">
          <h2>Dr. Raj Kumar</h2>
          <p>02:14</p>
        </div>
      </div>

      {/* Patient PIP (Picture-in-Picture) Area */}
      <div className={`pip-video ${isVideoOff ? 'video-off' : ''}`}>
        {isVideoOff ? (
          <div className="avatar-placeholder">A</div>
        ) : (
          <img 
            src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400" 
            alt="Your Video Stream" 
            className="video-feed" 
          />
        )}
        <span className="you-label">You</span>
      </div>

      {/* Call Controls */}
      <div className="call-controls">
        <button 
          className={`control-btn ${isMuted ? 'btn-danger' : 'btn-dark'}`} 
          onClick={() => setIsMuted(!isMuted)}
        >
          {isMuted ? '🔇' : '🎤'}
        </button>
        <button 
          className={`control-btn ${isVideoOff ? 'btn-danger' : 'btn-dark'}`} 
          onClick={() => setIsVideoOff(!isVideoOff)}
        >
          {isVideoOff ? '📷' : '📹'}
        </button>
        <button className="control-btn btn-danger end-call-btn" onClick={endCall}>
          📞
        </button>
      </div>
    </div>
  );
}
