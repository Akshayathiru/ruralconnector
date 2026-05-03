import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './VideoCallPage.css';
import { translations } from '../translations';

export default function VideoCallPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const doctorName = location.state?.doctorName || "Doctor"; // Fallback if no state

  const [lang] = useState(localStorage.getItem('userLanguage') || 'en');
  const t = translations[lang] || translations.en;

  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isConnecting, setIsConnecting] = useState(true);

  // Reference for the local video element
  const userVideoRef = useRef(null);
  // Store the MediaStream
  const [stream, setStream] = useState(null);

  useEffect(() => {
    // 1. Simulate connecting to the doctor
    const timer = setTimeout(() => {
      setIsConnecting(false);
    }, 3500); // 3.5 seconds connecting time

    // 2. Request real webcam access
    let userStream;
    const getMedia = async () => {
      try {
        userStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        setStream(userStream);
        if (userVideoRef.current) {
          userVideoRef.current.srcObject = userStream;
        }
      } catch (err) {
        console.error("Failed to access webcam:", err);
      }
    };

    getMedia();

    // Cleanup: stop tracks when unmounting so the camera light turns off
    return () => {
      clearTimeout(timer);
      if (userStream) {
        userStream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  // Handle mute toggling on the actual stream
  useEffect(() => {
    if (stream) {
      stream.getAudioTracks().forEach(track => {
        track.enabled = !isMuted;
      });
    }
  }, [isMuted, stream]);

  // Handle video toggling on the actual stream
  useEffect(() => {
    if (stream) {
      stream.getVideoTracks().forEach(track => {
        track.enabled = !isVideoOff;
      });
    }
  }, [isVideoOff, stream]);

  // Handle ending the call
  const endCall = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }
    navigate(-1);
  };

  return (
    <div className="video-call-container">
      {/* Main Doctor Video Area */}
      <div className="main-video">
        {isConnecting ? (
          <div className="connecting-overlay">
            <div className="spinner"></div>
            <h2>{t.connecting_to} {doctorName}...</h2>
            <p>Please wait while we establish a secure connection.</p>
          </div>
        ) : (
          <>
            <img 
              src="https://images.unsplash.com/photo-1594824436998-ef22a96a4b12?auto=format&fit=crop&q=80&w=1000" 
              alt="Doctor Video Stream" 
              className="video-feed" 
            />
            <div className="doctor-info-overlay animate-fade-in">
              <h2>{doctorName}</h2>
              <p>00:14</p>
            </div>
          </>
        )}
      </div>

      {/* Patient PIP (Picture-in-Picture) Area (Actual Webcam) */}
      <div className={`pip-video ${isVideoOff ? 'video-off' : ''}`}>
        {isVideoOff ? (
          <div className="avatar-placeholder">A</div>
        ) : (
          <video 
            ref={userVideoRef}
            autoPlay 
            playsInline 
            muted /* Mute local video to prevent echo */
            className="video-feed mirror-video" 
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
