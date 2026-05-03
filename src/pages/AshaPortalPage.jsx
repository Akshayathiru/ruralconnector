import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MOCK_HOSPITALS } from './HospitalsPage';
import { translations } from '../translations';
import './PageStyles.css';

function AshaPortalPage() {
  const navigate = useNavigate();
  const [lang] = useState(localStorage.getItem('userLanguage') || 'en');
  const t = translations[lang] || translations.en;

  const [selectedHospital, setSelectedHospital] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin123') {
      navigate('/admin-dashboard', { state: { hospital: selectedHospital } });
    } else {
      setError(t.invalid_login);
    }
  };

  return (
    <div className="page-wrapper">
      <button className="back-btn" onClick={() => navigate('/')}>← {t.back}</button>
      
      <div className="page-header">
        <span className="page-icon">🏥</span>
        <h1 className="page-title">{t.hospital_admin_portal}</h1>
        <p className="page-sub">{t.hospital_admin_portal_sub}</p>
      </div>

      <div className="card-list" style={{ width: '100%', maxWidth: '560px' }}>
        {MOCK_HOSPITALS.map(hosp => (
          <div key={hosp.id} className="doctor-card card-available" style={{ cursor: 'pointer' }} onClick={() => {
            setSelectedHospital(hosp);
            setError('');
          }}>
            <div className="card-icon-big">{hosp.image}</div>
            <div className="card-info">
              <h3 className="card-name">{t[hosp.name] || hosp.name}</h3>
              <p className="card-hospital">{t[hosp.location] || hosp.location}</p>
            </div>
            <div className="card-status">
              <span className="badge badge-green">{t.admin_login}</span>
            </div>
          </div>
        ))}
      </div>

      {selectedHospital && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div className="login-card" style={{ background: '#fff', padding: '30px', borderRadius: '14px', width: '90%', maxWidth: '400px' }}>
            <h3 style={{ marginTop: 0 }}>{t.login}: {t[selectedHospital.name] || selectedHospital.name}</h3>
            <p style={{ fontSize: '0.85rem', color: '#666', marginBottom: '20px' }}>Default Credentials: admin / admin123</p>
            
            {error && <p style={{ color: 'red', fontSize: '0.85rem', marginBottom: '10px' }}>{error}</p>}
            
            <form onSubmit={handleLogin}>
              <label className="login-label">{t.username}</label>
              <input type="text" className="login-input" value={username} onChange={e => setUsername(e.target.value)} required />
              
              <label className="login-label">{t.password}</label>
              <input type="password" className="login-input" value={password} onChange={e => setPassword(e.target.value)} required />
              
              <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                <button type="button" className="reset-btn" style={{ flex: 1, margin: 0 }} onClick={() => setSelectedHospital(null)}>{t.cancel}</button>
                <button type="submit" className="login-btn" style={{ flex: 1, margin: 0 }}>{t.login}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AshaPortalPage;
