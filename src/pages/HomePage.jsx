import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';
import { translations } from '../translations';

function HomePage() {
  const navigate = useNavigate()
  
  // Get selected language from localStorage, default to English
  const [lang, setLang] = useState(localStorage.getItem('userLanguage') || 'en')
  const t = translations[lang] || translations.en

  return (
    <div className="dashboard-container">
      {/* ── SIDEBAR ── */}
      <aside className="sidebar">
        <div className="sidebar-brand">
          <div className="brand-logo">
            <div className="brand-icon">
              <span>+</span>
            </div>
            <div>
              <h2 className="brand-title">{t.welcome.split(' ')[0]}</h2>
              <span className="brand-subtitle">{t.welcome.split(' ').slice(1).join(' ')}</span>
            </div>
          </div>
        </div>

        <nav className="sidebar-nav">
          <a href="#" className="nav-item active">
            <span className="nav-icon">🏠</span>
            Home
          </a>
          <a href="#" className="nav-item" onClick={(e) => { e.preventDefault(); navigate('/hospitals'); }}>
            <span className="nav-icon">🏥</span>
            {t.hospitals}
          </a>
          <a href="#" className="nav-item" onClick={(e) => { e.preventDefault(); navigate('/medicine'); }}>
            <span className="nav-icon">💊</span>
            {t.medicine}
          </a>
          <a href="#" className="nav-item" onClick={(e) => { e.preventDefault(); navigate('/asha'); }}>
            <span className="nav-icon">🩺</span>
            {t.asha}
          </a>
          <a href="#" className="nav-item" onClick={(e) => { e.preventDefault(); navigate('/pharmacy-login'); }}>
            <span className="nav-icon">🏪</span>
            Pharmacy Login
          </a>
          <a href="#" className="nav-item" onClick={(e) => { e.preventDefault(); navigate('/voice'); }}>
            <span className="nav-icon">📞</span>
            {t.voice}
          </a>
          <a href="#" className="nav-item">
            <span className="nav-icon">ℹ️</span>
            About Us
          </a>
        </nav>

        <div className="sidebar-help">
          <h3>Change Language</h3>
          <p>Select another language for the portal.</p>
          <button className="contact-btn" onClick={() => navigate('/')}>
             🌐 {t.select_lang}
          </button>
        </div>
      </aside>

      {/* ── MAIN CONTENT ── */}
      <main className="main-content">
        {/* TOP BAR */}
        <header className="topbar">
          <div className="topbar-left">
            <div className="location-selector">
              <span>📍</span> Rural India <span>v</span>
            </div>
          </div>
          <div className="topbar-right">
            <button className="notification-btn">
              🔔
              <span className="notification-dot"></span>
            </button>
            <div className="user-profile">
              <div className="avatar">A</div>
              <div className="user-info">
                <span className="user-name">Assistant</span>
                <span className="user-status">Online</span>
              </div>
              <span className="dropdown-icon">v</span>
            </div>
          </div>
        </header>

        <div className="dashboard-content">
          {/* HERO SECTION */}
          <div className="hero-section">
            <div className="hero-left">
              <div className="hero-badge">
                <span className="badge-icon">✓</span> Your Health, Our Priority
              </div>
              <h1 className="hero-title">
                {t.welcome}
              </h1>
              <p className="hero-desc">
                {t.subtitle}
              </p>
              <div className="hero-buttons">
                <button className="btn-primary" onClick={() => navigate('/hospitals')}>
                  🏥 {t.hospitals}
                </button>
                <button className="btn-secondary" onClick={() => navigate('/medicine')}>
                  💊 {t.medicine}
                </button>
              </div>
            </div>
            <div className="hero-right">
              <div className="clinic-card">
                <img src="/rural_clinic.png" alt="Rural Indian Healthcare Center" className="clinic-image" />
                <div className="clinic-status">
                  <div className="status-header">
                    <span className="status-dot"></span> System Online
                    <span className="status-check">✓</span>
                  </div>
                  <p>All services are active and available</p>
                </div>
              </div>
            </div>
          </div>

          {/* HELP SECTION */}
          <h2 className="section-title">{t.select_lang}</h2>
          <div className="services-grid">
            <div className="service-card" onClick={() => navigate('/hospitals')}>
              <div className="service-icon icon-purple">🏥</div>
              <div className="service-info">
                <h3>{t.hospitals}</h3>
                <p>{t.hospitals_desc}</p>
              </div>
              <div className="service-arrow">→</div>
            </div>
            
            <div className="service-card" onClick={() => navigate('/medicine')}>
              <div className="service-icon icon-green">💊</div>
              <div className="service-info">
                <h3>{t.medicine}</h3>
                <p>{t.medicine_desc}</p>
              </div>
              <div className="service-arrow">→</div>
            </div>
            
            <div className="service-card" onClick={() => alert('Coming soon!')}>
              <div className="service-icon icon-pink">❤️</div>
              <div className="service-info">
                <h3>{t.symptoms}</h3>
                <p>{t.symptoms_desc}</p>
              </div>
              <div className="service-arrow">→</div>
            </div>
            
            <div className="service-card" onClick={() => navigate('/voice')}>
              <div className="service-icon icon-orange">📞</div>
              <div className="service-info">
                <h3>{t.voice}</h3>
                <p>{t.voice_desc}</p>
              </div>
              <div className="service-arrow">→</div>
            </div>
          </div>

          {/* BOTTOM WIDGETS */}
          <div className="widgets-grid">
            <div className="tips-widget">
              <div className="tips-content">
                <div className="tips-header">
                  <span className="tips-icon">📖</span>
                  <h3>Health Tips</h3>
                </div>
                <p>Stay informed with our latest health tips and wellness advice</p>
                <a href="#" className="view-all">View All Tips →</a>
              </div>
              <div className="tips-image-wrapper">
                <img src="/stethoscope.png" alt="Health Tips" className="tips-image" />
              </div>
            </div>
            
            <div className="stats-widget">
              <div className="stats-header">
                <span className="stats-icon">📊</span>
                <h3>Quick Stats</h3>
              </div>
              <div className="stats-container">
                <div className="stat-item">
                  <h4>500+</h4>
                  <p>Doctors Connected</p>
                </div>
                <div className="stat-item">
                  <h4 className="text-green">1000+</h4>
                  <p>Medicines Available</p>
                </div>
                <div className="stat-item">
                  <h4 className="text-red">24/7</h4>
                  <p>Emergency Support</p>
                </div>
              </div>
            </div>
          </div>

          {/* BOTTOM BANNER */}
          <div className="bottom-banner">
            <div className="banner-icon">🛡️</div>
            <div className="banner-text">
              <h3>Your health is our mission</h3>
              <p>We are committed to providing accessible and quality healthcare for every individual in rural India.</p>
            </div>
            <button className="banner-btn">Learn More About Us</button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default HomePage;
