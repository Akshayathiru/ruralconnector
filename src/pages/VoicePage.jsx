// VoicePage.jsx  —  SPEAK YOUR PROBLEM (VOICE INPUT)
//
// 📚 NEW CONCEPT: useEffect
//    useEffect lets you run code AFTER the component appears on screen.
//    Syntax:
//      useEffect(() => {
//        // code to run
//      }, [dependency])
//    The second argument [] controls WHEN it runs:
//      []           → run once when the component first loads
//      [someValue]  → run every time someValue changes
//      (nothing)    → run after every render
//
// 📚 Web Speech API:
//    Browsers have a built-in speech recognition system.
//    window.SpeechRecognition (or window.webkitSpeechRecognition on Chrome)
//    lets us capture the user's voice and convert it to text.
import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import './PageStyles.css'
import { translations } from '../translations'

function VoicePage() {
  const navigate = useNavigate()

  const [lang] = useState(localStorage.getItem('userLanguage') || 'en')
  const t = translations[lang] || translations.en

  // State variables
  const [isListening, setIsListening] = useState(false)   // is mic active?
  const [transcript, setTranscript]   = useState('')       // recognized text
  const [supported, setSupported]     = useState(true)     // browser support?
  const [language, setLanguage]       = useState('hi-IN')  // selected language

  // 📚 useRef stores a value that does NOT cause a re-render when changed.
  //    We use it to hold the SpeechRecognition object between renders.
  const recognitionRef = useRef(null)

  // Check browser support on first load
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SpeechRecognition) {
      setSupported(false)
    }
  }, []) // ← empty array = run once on mount

  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SpeechRecognition) return

    const recognition = new SpeechRecognition()
    recognition.lang = language          // set language
    recognition.continuous = false       // stop after one phrase
    recognition.interimResults = false   // only return final result

    recognition.onresult = (event) => {
      // event.results[0][0].transcript is the recognized text
      const text = event.results[0][0].transcript
      setTranscript(text)
      setIsListening(false)
    }

    recognition.onerror = () => setIsListening(false)
    recognition.onend   = () => setIsListening(false)

    recognitionRef.current = recognition
    recognition.start()
    setIsListening(true)
  }

  const stopListening = () => {
    recognitionRef.current?.stop()
    setIsListening(false)
  }

  const LANGUAGES = [
    { code: 'hi-IN', label: 'हिन्दी (Hindi)' },
    { code: 'en-IN', label: 'English (India)' },
    { code: 'ta-IN', label: 'தமிழ் (Tamil)' },
    { code: 'te-IN', label: 'తెలుగు (Telugu)' },
    { code: 'kn-IN', label: 'ಕನ್ನಡ (Kannada)' },
    { code: 'mr-IN', label: 'मराठी (Marathi)' },
  ]

  return (
    <div className="page-wrapper">
      <button className="back-btn" onClick={() => navigate('/')}>← {t.back}</button>

      <div className="page-header">
        <span className="page-icon">🎤</span>
        <h1 className="page-title">{t.speak_problem}</h1>
        <p className="page-sub">{t.speak_sub}</p>
      </div>

      {!supported ? (
        <div className="result-card level-high">
          <p>⚠️ Your browser does not support voice input. Please use Google Chrome.</p>
        </div>
      ) : (
        <>
          {/* Language Selector */}
          <div className="lang-wrap">
            <label className="lang-label">{t.choose_lang}</label>
            <select
              className="lang-select"
              value={language}
              onChange={e => setLanguage(e.target.value)}
            >
              {LANGUAGES.map(l => (
                <option key={l.code} value={l.code}>{l.label}</option>
              ))}
            </select>
          </div>

          {/* Big Microphone Button */}
          <div className="mic-center">
            <button
              className={`mic-btn ${isListening ? 'mic-active' : ''}`}
              onClick={isListening ? stopListening : startListening}
              id="mic-button"
            >
              <span className="mic-icon">{isListening ? '⏹' : '🎤'}</span>
              <span className="mic-label">
                {isListening ? t.listening : t.tap_to_speak}
              </span>
            </button>

            {isListening && (
              <div className="pulse-rings">
                <div className="pulse-ring ring-1" />
                <div className="pulse-ring ring-2" />
                <div className="pulse-ring ring-3" />
              </div>
            )}
          </div>

          {/* Transcript Result */}
          {transcript && (
            <div className="transcript-card">
              <p className="transcript-label">{t.you_said}</p>
              <p className="transcript-text">"{transcript}"</p>
              <p className="transcript-advice">
                ✅ Your message has been recorded. A health worker will contact you soon.
              </p>
              <button className="reset-btn" onClick={() => setTranscript('')}>
                🎤 {t.speak_again}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default VoicePage
