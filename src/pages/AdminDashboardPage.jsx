import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { MOCK_DOCTORS } from './HospitalsPage';
import { translations } from '../translations';
import './PageStyles.css';

function AdminDashboardPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const hospital = location.state?.hospital;

  const [lang] = useState(localStorage.getItem('userLanguage') || 'en');
  const t = translations[lang] || translations.en;

  // If no hospital passed (e.g. direct URL access), redirect
  useEffect(() => {
    if (!hospital) {
      navigate('/asha');
    }
  }, [hospital, navigate]);

  if (!hospital) return null;

  const myDoctors = MOCK_DOCTORS.filter(d => d.hospitalId === hospital.id);
  const storageKey = `hospital_admin_${hospital.id}`;

  const [data, setData] = useState(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) return JSON.parse(saved);

    // Initial overrides based on mock data
    const initialOverrides = {};
    myDoctors.forEach(d => {
      initialOverrides[d.id] = d.available;
    });

    return {
      isOpen: true,
      doctorsAvailable: hospital.doctorsCount,
      emergencyAvailable: true,
      announcement: '',
      doctorOverrides: initialOverrides
    };
  });

  const toggleDoctor = (id) => {
    setData({
      ...data,
      doctorOverrides: {
        ...data.doctorOverrides,
        [id]: !data.doctorOverrides[id]
      }
    });
  };

  const handleSave = () => {
    localStorage.setItem(storageKey, JSON.stringify(data));
    alert(t.success_update);
  };

  return (
    <div className="page-wrapper">
      <button className="back-btn" onClick={() => navigate('/asha')}>← {t.logout}</button>
      
      <div className="page-header" style={{ textAlign: 'left', width: '100%', maxWidth: '560px' }}>
        <h1 className="page-title">{t[hospital.name] || hospital.name}</h1>
        <p className="page-sub">Admin Dashboard • {t[hospital.location] || hospital.location}</p>
      </div>

      <div style={{ width: '100%', maxWidth: '560px', background: '#fff', padding: '20px', borderRadius: '14px', border: '1px solid #e5e7eb', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
        
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px', color: '#374151' }}>{t.hospital_status}</label>
          <select 
            className="search-input" 
            value={data.isOpen ? 'open' : 'closed'}
            onChange={(e) => setData({ ...data, isOpen: e.target.value === 'open' })}
          >
            <option value="open">🟢 {t.open_receiving}</option>
            <option value="closed">🔴 {t.closed_capacity}</option>
          </select>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px', color: '#374151' }}>{t.doctors_available_now}</label>
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
            {t.emergency_ward_active}
          </label>
        </div>

        <div style={{ marginBottom: '30px' }}>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px', color: '#374151' }}>{t.public_announcement}</label>
          <textarea 
            className="search-input" 
            value={data.announcement}
            onChange={(e) => setData({ ...data, announcement: e.target.value })}
            placeholder="..."
            style={{ minHeight: '80px', resize: 'vertical' }}
          />
        </div>

        <div style={{ marginBottom: '30px' }}>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '15px', color: '#374151', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>{t.manage_doctor_avail}</label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {myDoctors.map(doc => (
              <div key={doc.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px', background: '#f9fafb', borderRadius: '10px' }}>
                <div>
                  <p style={{ margin: 0, fontWeight: 'bold', fontSize: '0.9rem' }}>{t[doc.name] || doc.name}</p>
                  <p style={{ margin: 0, fontSize: '0.75rem', color: '#666' }}>{t[doc.specialty] || doc.specialty}</p>
                </div>
                <button 
                  onClick={() => toggleDoctor(doc.id)}
                  style={{ 
                    padding: '6px 12px', 
                    borderRadius: '8px', 
                    border: 'none', 
                    background: data.doctorOverrides[doc.id] ? '#dcfce7' : '#fee2e2',
                    color: data.doctorOverrides[doc.id] ? '#16a34a' : '#dc2626',
                    fontSize: '0.75rem',
                    fontWeight: 'bold',
                    cursor: 'pointer'
                  }}
                >
                  {data.doctorOverrides[doc.id] ? t.available_btn : t.away_btn}
                </button>
              </div>
            ))}
          </div>
        </div>

        <button className="primary-action-btn" onClick={handleSave} style={{ margin: 0 }}>
          💾 {t.save_changes}
        </button>
      </div>
    </div>
  );
}

export default AdminDashboardPage;
