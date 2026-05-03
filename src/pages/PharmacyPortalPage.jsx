import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MOCK_PHARMACIES } from './MedicinePage';
import './PageStyles.css';

function PharmacyPortalPage() {
  const navigate = useNavigate();
  const [selectedPharmacy, setSelectedPharmacy] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin123') {
      navigate('/pharmacy-dashboard', { state: { pharmacy: selectedPharmacy } });
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="page-wrapper">
      <button className="back-btn" onClick={() => navigate('/')}>← Back</button>
      
      <div className="page-header">
        <span className="page-icon">💊</span>
        <h1 className="page-title">Pharmacy Admin Portal</h1>
        <p className="page-sub">Select your pharmacy and log in to manage stock</p>
      </div>

      <div className="card-list" style={{ width: '100%', maxWidth: '560px' }}>
        {MOCK_PHARMACIES.map(pharm => (
          <div key={pharm.id} className="doctor-card card-available" style={{ cursor: 'pointer' }} onClick={() => {
            setSelectedPharmacy(pharm);
            setError('');
          }}>
            <div className="card-icon-big">🏪</div>
            <div className="card-info">
              <h3 className="card-name">{pharm.name}</h3>
              <p className="card-hospital">{pharm.location}</p>
            </div>
            <div className="card-status">
              <span className="badge badge-green">Pharmacy Login</span>
            </div>
          </div>
        ))}
      </div>

      {selectedPharmacy && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div className="login-card" style={{ background: '#fff', padding: '30px', borderRadius: '14px', width: '90%', maxWidth: '400px' }}>
            <h3 style={{ marginTop: 0 }}>Login: {selectedPharmacy.name}</h3>
            <p style={{ fontSize: '0.85rem', color: '#666', marginBottom: '20px' }}>Default Credentials: admin / admin123</p>
            
            {error && <p style={{ color: 'red', fontSize: '0.85rem', marginBottom: '10px' }}>{error}</p>}
            
            <form onSubmit={handleLogin}>
              <label className="login-label">Username</label>
              <input type="text" className="login-input" value={username} onChange={e => setUsername(e.target.value)} required />
              
              <label className="login-label">Password</label>
              <input type="password" className="login-input" value={password} onChange={e => setPassword(e.target.value)} required />
              
              <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                <button type="button" className="reset-btn" style={{ flex: 1, margin: 0 }} onClick={() => setSelectedPharmacy(null)}>Cancel</button>
                <button type="submit" className="login-btn" style={{ flex: 1, margin: 0 }}>Login</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default PharmacyPortalPage;
