import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { MOCK_MEDICINES } from './MedicinePage';
import { translations } from '../translations';
import './PageStyles.css';

function PharmacyDashboardPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const pharmacy = location.state?.pharmacy;

  const [lang] = useState(localStorage.getItem('userLanguage') || 'en');
  const t = translations[lang] || translations.en;

  useEffect(() => {
    if (!pharmacy) {
      navigate('/pharmacy-login');
    }
  }, [pharmacy, navigate]);

  if (!pharmacy) return null;

  const storageKey = `pharmacy_admin_${pharmacy.id}`;
  const myMedicines = MOCK_MEDICINES.filter(m => m.pharmacyId === pharmacy.id);

  const [data, setData] = useState(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) return JSON.parse(saved);

    const initialStock = {};
    myMedicines.forEach(m => {
      initialStock[m.id] = { inStock: m.inStock, qty: m.qty };
    });

    return {
      isOpen: true,
      medicineStock: initialStock,
      announcement: ''
    };
  });

  const toggleStock = (id) => {
    const current = data.medicineStock[id];
    setData({
      ...data,
      medicineStock: {
        ...data.medicineStock,
        [id]: { ...current, inStock: !current.inStock }
      }
    });
  };

  const updateQty = (id, newQty) => {
    const current = data.medicineStock[id];
    setData({
      ...data,
      medicineStock: {
        ...data.medicineStock,
        [id]: { ...current, qty: newQty }
      }
    });
  };

  const handleSave = () => {
    localStorage.setItem(storageKey, JSON.stringify(data));
    alert(t.success_update);
  };

  return (
    <div className="page-wrapper">
      <button className="back-btn" onClick={() => navigate('/pharmacy-login')}>← {t.logout}</button>
      
      <div className="page-header" style={{ textAlign: 'left', width: '100%', maxWidth: '560px' }}>
        <h1 className="page-title">{t[pharmacy.name] || pharmacy.name}</h1>
        <p className="page-sub">Pharmacy Dashboard • {t[pharmacy.location] || pharmacy.location}</p>
      </div>

      <div style={{ width: '100%', maxWidth: '560px', background: '#fff', padding: '20px', borderRadius: '14px', border: '1px solid #e5e7eb', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
        
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px', color: '#374151' }}>{t.pharmacy_status}</label>
          <select 
            className="search-input" 
            value={data.isOpen ? 'open' : 'closed'}
            onChange={(e) => setData({ ...data, isOpen: e.target.value === 'open' })}
          >
            <option value="open">🟢 {t.open}</option>
            <option value="closed">🔴 {t.closed}</option>
          </select>
        </div>

        <div style={{ marginBottom: '30px' }}>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '15px', color: '#374151', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>{t.manage_medicine_stock}</label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {myMedicines.map(med => (
              <div key={med.id} style={{ padding: '12px', background: '#f9fafb', borderRadius: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <div>
                    <p style={{ margin: 0, fontWeight: 'bold', fontSize: '0.9rem' }}>{t[med.name] || med.name}</p>
                    <p style={{ margin: 0, fontSize: '0.75rem', color: '#666' }}>{t[med.type] || med.type}</p>
                  </div>
                  <button 
                    onClick={() => toggleStock(med.id)}
                    style={{ 
                      padding: '6px 12px', 
                      borderRadius: '8px', 
                      border: 'none', 
                      background: data.medicineStock[med.id].inStock ? '#dcfce7' : '#fee2e2',
                      color: data.medicineStock[med.id].inStock ? '#16a34a' : '#dc2626',
                      fontSize: '0.75rem',
                      fontWeight: 'bold',
                      cursor: 'pointer'
                    }}
                  >
                    {data.medicineStock[med.id].inStock ? t.in_stock : t.out_of_stock}
                  </button>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <label style={{ fontSize: '0.75rem', color: '#666' }}>{t.quantity}:</label>
                  <input 
                    type="text" 
                    value={data.medicineStock[med.id].qty} 
                    onChange={(e) => updateQty(med.id, e.target.value)}
                    style={{ padding: '4px 8px', borderRadius: '6px', border: '1px solid #ddd', fontSize: '0.8rem', width: '80px' }}
                  />
                </div>
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

export default PharmacyDashboardPage;
