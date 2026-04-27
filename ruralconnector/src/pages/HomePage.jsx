import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

function HomePage() {
  const navigate = useNavigate();

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
              <h2 className="brand-title">Rural Healthcare</h2>
              <span className="brand-subtitle">Connect</span>
            </div>
          </div>
        </div>

        <nav className="sidebar-nav">
          <a href="#" className="nav-item active">
            <span className="nav-icon">🏠</span>
            Home
          </a>
          <a href="#" className="nav-item" onClick={(e) => { e.preventDefault(); navigate('/doctor'); }}>
            <span className="nav-icon">📅</span>
            Doctor Availability
          </a>
          <a href="#" className="nav-item" onClick={(e) => { e.preventDefault(); alert('Coming soon!'); }}>
            <span className="nav-icon">💊</span>
            Medicine Availability
          </a>
          <a href="#" className="nav-item">
            <span className="nav-icon">🩺</span>
            Health Services
          </a>
          <a href="#" className="nav-item">
            <span className="nav-icon">📖</span>
            Health Tips
          </a>
          <a href="#" className="nav-item">
            <span className="nav-icon">📞</span>
            Emergency
          </a>
          <a href="#" className="nav-item">
            <span className="nav-icon">ℹ️</span>
            About Us
          </a>
        </nav>

        <div className="sidebar-help">
          <h3>Need Help?</h3>
          <p>Our support team is available to assist you.</p>
          <button className="contact-btn">
            🎧 Contact Support
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
                Rural Healthcare<br />
                <span className="highlight">Connect</span>
              </h1>
              <p className="hero-desc">
                Access healthcare services, check availability, and get connected with trusted medical support in your area.
              </p>
              <div className="hero-buttons">
                <button className="btn-primary" onClick={() => navigate('/doctor')}>
                  📅 Check Doctor Availability
                </button>
                <button className="btn-secondary" onClick={() => alert('Coming soon!')}>
                  💊 Check Medicine Availability
                </button>
              </div>
            </div>
            <div className="hero-right">
              <div className="clinic-card">
                <img src="/clinic.png" alt="Clinic 3D Illustration" className="clinic-image" />
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
          <h2 className="section-title">How can we help you today?</h2>
          <div className="services-grid">
            <div className="service-card" onClick={() => navigate('/doctor')}>
              <div className="service-icon icon-purple">📅</div>
              <div className="service-info">
                <h3>Doctor Availability</h3>
                <p>Find and connect with available doctors</p>
              </div>
              <div className="service-arrow">→</div>
            </div>
            
            <div className="service-card" onClick={() => alert('Coming soon!')}>
              <div className="service-icon icon-green">💊</div>
              <div className="service-info">
                <h3>Medicine Availability</h3>
                <p>Check medicine availability at nearby pharmacies</p>
              </div>
              <div className="service-arrow">→</div>
            </div>
            
            <div className="service-card">
              <div className="service-icon icon-pink">❤️</div>
              <div className="service-info">
                <h3>Health Services</h3>
                <p>Explore various healthcare services</p>
              </div>
              <div className="service-arrow">→</div>
            </div>
            
            <div className="service-card">
              <div className="service-icon icon-orange">📞</div>
              <div className="service-info">
                <h3>Emergency Support</h3>
                <p>Get immediate help in emergency situations</p>
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
