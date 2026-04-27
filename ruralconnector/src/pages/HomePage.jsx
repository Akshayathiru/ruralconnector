// ─────────────────────────────────────────────────────────────────────────────
// HomePage.jsx  —  Updated with navigation
//
// 📚 NEW: useNavigate
//    Now each button navigates to its own page instead of showing an alert.
//    useNavigate() gives us a navigate() function.
//    Calling navigate('/doctor') takes the user to the /doctor URL.
// ─────────────────────────────────────────────────────────────────────────────
import React from 'react'
import { useNavigate } from 'react-router-dom'
import './HomePage.css'

// Button data — 'path' tells React Router which page to go to
// If path is null, the page isn't built yet (shows "coming soon")
const BUTTONS = [
  { emoji: '🟢', label: 'Check Doctor Availability',   id: 'btn-doctor',   color: 'btn-green',  path: '/doctor'   },
  { emoji: '💊', label: 'Check Medicine Availability', id: 'btn-medicine', color: 'btn-blue',   path: null        },
  { emoji: '🩺', label: 'Symptom Checker',             id: 'btn-symptom',  color: 'btn-orange', path: null        },
  { emoji: '🎤', label: 'Speak Your Problem (Voice)',  id: 'btn-voice',    color: 'btn-purple', path: null        },
  { emoji: '👩‍⚕️', label: 'ASHA Login',               id: 'btn-asha',     color: 'btn-teal',   path: null        },
  { emoji: '🏥', label: 'Hospital Login',              id: 'btn-hospital', color: 'btn-red',    path: null        },
]

// ── ActionButton component ──
// navigate is passed down from the parent as a prop
function ActionButton({ emoji, label, id, color, path, navigate }) {
  const handleClick = () => {
    if (path) {
      navigate(path)               // go to the page
    } else {
      alert(`"${label}" — Coming soon! 🚧`)
    }
  }

  return (
    <button className={`action-btn ${color}`} id={id} onClick={handleClick}>
      <span className="btn-emoji">{emoji}</span>
      <span className="btn-label">{label}</span>
    </button>
  )
}

// ── Main HomePage component ──
function HomePage() {
  // 📚 useNavigate must be called inside the component function (React rule for hooks)
  const navigate = useNavigate()

  return (
    <div className="home-page">
      {/* ── AMBIENT BACKGROUND BLOBS ── */}
      <div className="ambient-blob blob-1" />
      <div className="ambient-blob blob-2" />
      <div className="ambient-blob blob-3" />

      {/* ── TOP NAV BAR ── */}
      <nav className="home-nav">
        <div className="nav-brand">
          <div className="nav-dot" />
          RHC
        </div>
        <span className="nav-badge">🇮🇳 Rural India</span>
      </nav>

      {/* ── HEADER ── */}
      <header className="home-header">
        <div className="logo-wrap">
          <span className="logo-icon">🏥</span>
        </div>
        <h1 className="home-title">
          Rural Healthcare<br />
          <span>Connect</span>
        </h1>
        <p className="home-subtitle">
          Check doctor availability before travelling
        </p>
        <div className="subtitle-chip">
          <span>●</span> System Online — Updated Today
        </div>
      </header>

      {/* ── DIVIDER ── */}
      <div className="section-divider" />

      {/* ── BUTTONS ── */}
      <main className="home-main">
        <p className="choose-text">What do you need help with?</p>
        <div className="btn-grid">
          {BUTTONS.map(btn => (
            <ActionButton
              key={btn.id}
              emoji={btn.emoji}
              label={btn.label}
              id={btn.id}
              color={btn.color}
              path={btn.path}
              navigate={navigate}   // pass navigate into each button
            />
          ))}
        </div>
      </main>

      {/* ── FOOTER ── */}
      <footer className="home-footer">
        <div className="footer-inner">
          <div className="footer-dot" />
          <p>Serving rural communities across India — Free &amp; Always Available</p>
        </div>
      </footer>

    </div>
  )
}

export default HomePage
