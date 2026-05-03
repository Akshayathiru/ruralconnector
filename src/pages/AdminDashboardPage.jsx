import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './PageStyles.css';

function AdminDashboardPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const hospital = location.state?.hospital;

  // If no hospital passed (e.g. direct URL access), redirect
  useEffect(() => {
    if (!hospital) {
      navigate('/asha');
    }
  }, [hospital, navigate]);

  if (!hospital) return null;

  // We store updates in localStorage to persist them
  // Key format: `hospital_admin_${hospital.id}`
  const storageKey = `hospital_admin_${hospital.id}`;
  
  const [data, setData] = useState(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) return JSON.parse(saved);
    return {
      isOpen: true,
      doctorsAvailable: hospital.doctorsCount,
      emergencyAvailable: true,
      announcement: ''
    };
  });

  const handleSave = () => {
    localStorage.setItem(storageKey, JSON.stringify(data));
    alert('Hospital details updated successfully! These changes are now live.');
  };

  return (
    <div className="page-wrapper">
      <button className="back-btn" onClick={() => navigate('/asha')}>← Logout</button>
      
      <div className="page-header" style={{ textAlign: 'left', width: '100%', maxWidth: '560px' }}>
        <h1 className="page-title">{hospital.name}</h1>
        <p className="page-sub">Admin Dashboard • {hospital.location}</p>
      </div>

      <div style={{ width: '100%', maxWidth: '560px', background: '#fff', padding: '20px', borderRadius: '14px', border: '1px solid #e5e7eb', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
        
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px', color: '#374151' }}>Hospital Status</label>
          <select 
            className="search-input" 
            value={data.isOpen ? 'open' : 'closed'}
            onChange={(e) => setData({ ...data, isOpen: e.target.value === 'open' })}
          >
            <option value="open">🟢 Open / Receiving Patients</option>
            <option value="closed">🔴 Closed / Capacity Full</option>
          </select>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px', color: '#374151' }}>Doctors Available Now</label>
          <input 
            type="text" 
            className="search-input" 
            value={data.doctorsAvailable}
            onChange={(e) => setData({ ...data, doctorsAvailable: e.target.value })}
            placeholder="e.g. 85+ or 12"
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontWeight: 'bold', color: '#374151', cursor: 'pointer' }}>
            <input 
              type="checkbox" 
              checked={data.emergencyAvailable}
              onChange={(e) => setData({ ...data, emergencyAvailable: e.target.checked })}
              style={{ width: '18px', height: '18px' }}
            />
            Emergency Ward Active
          </label>
        </div>

        <div style={{ marginBottom: '30px' }}>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px', color: '#374151' }}>Public Announcement</label>
          <textarea 
            className="search-input" 
            value={data.announcement}
            onChange={(e) => setData({ ...data, announcement: e.target.value })}
            placeholder="e.g. Vaccine drive tomorrow..."
            style={{ minHeight: '80px', resize: 'vertical' }}
          />
        </div>

        <button className="primary-action-btn" onClick={handleSave} style={{ margin: 0 }}>
          💾 Save Changes
        </button>
      </div>
    </div>
  );
}

export default AdminDashboardPage;
