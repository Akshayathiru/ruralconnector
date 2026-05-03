import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LanguageSelectionPage.css';

const LANGUAGES = [
  { code: 'en', name: 'English', native: 'English', icon: '🌍' },
  { code: 'hi', name: 'Hindi', native: 'हिन्दी', icon: '🇮🇳' },
  { code: 'te', name: 'Telugu', native: 'తెలుగు', icon: '🪔' },
  { code: 'ta', name: 'Tamil', native: 'தமிழ்', icon: '🛕' },
  { code: 'ml', name: 'Malayalam', native: 'മലയാളം', icon: '🌴' },
  { code: 'mr', name: 'Marathi', native: 'मराठी', icon: '⚔️' },
];

export default function LanguageSelectionPage() {
  const navigate = useNavigate();

  const handleSelect = (code) => {
    localStorage.setItem('userLanguage', code);
    // Dispatch a custom event so the App knows the language changed if needed
    window.dispatchEvent(new Event('languageChanged'));
    navigate('/dashboard');
  };

  return (
    <div className="lang-page">
      <div className="lang-content">
        <div className="lang-header">
          <div className="lang-logo">🏥</div>
          <h1>Rural Healthcare Connect</h1>
          <p>Please select your preferred language</p>
          <p className="native-text">कृपया अपनी भाषा चुनें | మీ భాషను ఎంచుకోండి</p>
        </div>

        <div className="lang-grid">
          {LANGUAGES.map((lang) => (
            <button 
              key={lang.code} 
              className="lang-card"
              onClick={() => handleSelect(lang.code)}
            >
              <span className="lang-icon">{lang.icon}</span>
              <span className="lang-name">{lang.name}</span>
              <span className="lang-native">{lang.native}</span>
            </button>
          ))}
        </div>

        <div className="lang-footer">
          <p>Designed for easy access to healthcare in every village.</p>
        </div>
      </div>
    </div>
  );
}
