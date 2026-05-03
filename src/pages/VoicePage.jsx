import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import './PageStyles.css'
import { translations } from '../translations'

function VoicePage() {
  const navigate = useNavigate()
  const [lang] = useState(localStorage.getItem('userLanguage') || 'en')
  const t = translations[lang] || translations.en

  const [messages, setMessages] = useState([
    { text: "Hello! I am your rural health assistant. Please tell me your symptoms or what you need help with today.", sender: 'bot' }
  ])
  const [input, setInput] = useState('')
  const chatEndRef = useRef(null)

  const [isListening, setIsListening] = useState(false)
  const [supported, setSupported] = useState(true)
  const recognitionRef = useRef(null)

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SpeechRecognition) {
      setSupported(false)
    }
  }, [])

  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SpeechRecognition) return

    const recognition = new SpeechRecognition()
    recognition.lang = lang === 'en' ? 'en-IN' : lang + '-IN'
    recognition.continuous = false
    recognition.interimResults = false

    recognition.onresult = (event) => {
      const text = event.results[0][0].transcript
      setIsListening(false)
      processMessage(text)
    }

    recognition.onerror = (event) => {
      setIsListening(false)
      if (event.error === 'not-allowed') {
        alert("Microphone access is blocked! Please click the microphone icon in your browser's address bar (top right) and select 'Allow'.")
      } else {
        alert("Microphone error: " + event.error)
      }
    }
    recognition.onend = () => setIsListening(false)

    recognitionRef.current = recognition
    recognition.start()
    setIsListening(true)
  }

  // Scroll to bottom when messages change
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const processMessage = (userText) => {
    if (!userText.trim()) return
    
    // Add user message
    setMessages(prev => [...prev, { text: userText, sender: 'user' }])

    // Bot response logic
    setTimeout(() => {
      const lowerText = userMessage.toLowerCase()
      
      if (lowerText.includes('fever') || lowerText.includes('hospital') || lowerText.includes('జ్వరం') || lowerText.includes('కாய்ச்சல்') || lowerText.includes('പനി') || lowerText.includes('ताप') || lowerText.includes('बुखार')) {
        
        setMessages(prev => [...prev, { text: "I understand you have a fever. Finding nearby hospitals that treat fever...", sender: 'bot' }])
        
        setTimeout(() => {
          navigate('/hospitals', { state: { autoFilter: 'Fever', autoCategory: 'symptoms', autoView: 'hospitals' } })
        }, 2000)
        
      } else if (lowerText.includes('medicine') || lowerText.includes('paracetamol')) {
        
        setMessages(prev => [...prev, { text: "Checking local pharmacy stock for your medicine...", sender: 'bot' }])
        
        setTimeout(() => {
          navigate('/medicine')
        }, 2000)
        
      } else {
        setMessages(prev => [...prev, { text: "Your message has been recorded. A health worker will contact you soon.", sender: 'bot' }])
      }
    }, 600)
  }

  const handleSend = () => {
    processMessage(input)
    setInput('')
  }

  return (
    <div className="page-wrapper" style={{ padding: 0, height: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* HEADER */}
      <div style={{ padding: '16px', background: 'var(--white)', borderBottom: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', gap: '12px', width: '100%', boxSizing: 'border-box' }}>
        <button className="back-btn" style={{ margin: 0 }} onClick={() => navigate('/')}>← {t.back}</button>
        <div style={{ flex: 1 }}>
          <h1 style={{ margin: 0, fontSize: '1.2rem', color: 'var(--text-dark)' }}>Health Assistant Chat</h1>
          <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)' }}>Online</p>
        </div>
      </div>

      {/* CHAT HISTORY */}
      <div style={{ flex: 1, padding: '20px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px', background: '#f9fafb', width: '100%', boxSizing: 'border-box' }}>
        {messages.map((msg, i) => (
          <div key={i} style={{ 
            alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
            maxWidth: '80%',
            padding: '12px 16px',
            borderRadius: msg.sender === 'user' ? '18px 18px 0 18px' : '18px 18px 18px 0',
            background: msg.sender === 'user' ? 'var(--green)' : 'var(--white)',
            color: msg.sender === 'user' ? '#fff' : 'var(--text-dark)',
            boxShadow: 'var(--shadow-sm)',
            border: msg.sender === 'user' ? 'none' : '1px solid #e5e7eb',
            fontSize: '0.95rem',
            lineHeight: 1.4
          }}>
            {msg.text}
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      {/* CHAT INPUT */}
      <div style={{ padding: '16px', background: 'var(--white)', borderTop: '1px solid #e5e7eb', display: 'flex', gap: '10px', width: '100%', boxSizing: 'border-box', alignItems: 'center' }}>
        
        {supported && (
          <button 
            onClick={isListening ? () => recognitionRef.current?.stop() : startListening}
            style={{ 
              width: '44px', height: '44px', borderRadius: '50%', border: 'none', 
              background: isListening ? '#ef4444' : 'var(--green-soft)', 
              color: isListening ? '#fff' : 'var(--green)', 
              fontSize: '1.2rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0
            }}
            title="Speak your problem"
          >
            {isListening ? '⏹' : '🎤'}
          </button>
        )}

        <input 
          type="text" 
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSend()}
          placeholder="Type your symptoms here..."
          style={{ flex: 1, padding: '12px 16px', borderRadius: '24px', border: '1px solid #e5e7eb', outline: 'none', fontSize: '0.95rem' }}
        />
        <button 
          onClick={handleSend}
          style={{ padding: '0 20px', borderRadius: '24px', border: 'none', background: 'var(--green)', color: '#fff', fontWeight: 'bold', cursor: 'pointer' }}
        >
          Send
        </button>
      </div>

    </div>
  )
}

export default VoicePage
