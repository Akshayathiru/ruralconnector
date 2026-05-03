import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './MedicinePage.css';
import { translations } from '../translations';

// --- MOCK DATA ---
export const MOCK_PHARMACIES = [
  { id: 1, name: "City Pharma", distance: "2km", distanceValue: 2, location: "Main Street", rating: 4.8 },
  { id: 2, name: "Rural Health Pharmacy", distance: "5km", distanceValue: 5, location: "Village Center", rating: 4.5 },
  { id: 3, name: "Apollo Pharmacy", distance: "8km", distanceValue: 8, location: "South Chennai", rating: 4.9 },
  { id: 4, name: "MedPlus", distance: "12km", distanceValue: 12, location: "North Chennai", rating: 4.6 },
  { id: 5, name: "Green Cross Pharmacy", distance: "18km", distanceValue: 18, location: "West Chennai", rating: 4.7 },
];

export const MOCK_MEDICINES = [
  { id: 101, pharmacyId: 1, name: "Paracetamol 500mg", type: "Tablet", qty: "500+", inStock: true, price: "₹20/strip" },
  { id: 102, pharmacyId: 1, name: "Amoxicillin 250mg", type: "Capsule", qty: "200", inStock: true, price: "₹45/strip" },
  { id: 109, pharmacyId: 1, name: "Cough Syrup (Junior)", type: "Syrup", qty: "150", inStock: true, price: "₹85/bottle" },
  { id: 110, pharmacyId: 1, name: "Azithromycin 500mg", type: "Tablet", qty: "100", inStock: true, price: "₹75/strip" },
  
  { id: 103, pharmacyId: 2, name: "Paracetamol 500mg", type: "Tablet", qty: "100", inStock: true, price: "₹18/strip" },
  { id: 104, pharmacyId: 2, name: "ORS Sachets", type: "Powder", qty: "0", inStock: false, price: "₹5/pack" },
  { id: 111, pharmacyId: 2, name: "Bandages (Sterile)", type: "First Aid", qty: "50", inStock: true, price: "₹15/roll" },
  { id: 112, pharmacyId: 2, name: "Antiseptic Liquid", type: "Liquid", qty: "40", inStock: true, price: "₹55/bottle" },

  { id: 105, pharmacyId: 3, name: "Insulin Pen", type: "Injection", qty: "50", inStock: true, price: "₹450/pen" },
  { id: 106, pharmacyId: 3, name: "Metformin 500mg", type: "Tablet", qty: "300", inStock: true, price: "₹35/strip" },
  { id: 113, pharmacyId: 3, name: "BP Monitor", type: "Device", qty: "10", inStock: true, price: "₹1200/unit" },
  { id: 114, pharmacyId: 3, name: "Atorvastatin 10mg", type: "Tablet", qty: "200", inStock: true, price: "₹95/strip" },

  { id: 107, pharmacyId: 4, name: "Cough Syrup", type: "Syrup", qty: "80", inStock: true, price: "₹65/bottle" },
  { id: 115, pharmacyId: 4, name: "Ibuprofen 400mg", type: "Tablet", qty: "250", inStock: true, price: "₹25/strip" },
  { id: 116, pharmacyId: 4, name: "Baby Diapers", type: "Personal Care", qty: "100", inStock: true, price: "₹450/pack" },
  { id: 117, pharmacyId: 4, name: "Face Masks (N95)", type: "Safety", qty: "500", inStock: true, price: "₹40/pc" },

  { id: 108, pharmacyId: 5, name: "Vitamin C", type: "Tablet", qty: "0", inStock: false, price: "₹30/strip" },
  { id: 118, pharmacyId: 5, name: "Hand Sanitizer", type: "Liquid", qty: "120", inStock: true, price: "₹50/bottle" },
  { id: 119, pharmacyId: 5, name: "Omega 3 Capsules", type: "Supplement", qty: "60", inStock: true, price: "₹350/bottle" },
  { id: 120, pharmacyId: 5, name: "Zinc Supplements", type: "Tablet", qty: "200", inStock: true, price: "₹45/strip" },
];

export default function MedicinePage() {
  const navigate = useNavigate();
  
  const [lang] = useState(localStorage.getItem('userLanguage') || 'en');
  const t = translations[lang] || translations.en;

  const [searchQuery, setSearchQuery] = useState('');
  const [distanceFilter, setDistanceFilter] = useState('any');

  const filteredData = MOCK_MEDICINES.map(med => {
    const saved = localStorage.getItem(`pharmacy_admin_${med.pharmacyId}`);
    if (saved) {
      const adminData = JSON.parse(saved);
      const stockInfo = adminData.medicineStock[med.id];
      if (stockInfo) {
        return { ...med, inStock: stockInfo.inStock, qty: stockInfo.qty };
      }
    }
    return med;
  }).filter(med => {
    const pharmacy = MOCK_PHARMACIES.find(p => p.id === med.pharmacyId);
    const translatedName = t[med.name] || med.name;
    const matchesSearch = translatedName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDistance = distanceFilter === 'any' || pharmacy.distanceValue <= parseInt(distanceFilter);
    return matchesSearch && matchesDistance;
  }).map(med => ({
    ...med,
    pharmacy: MOCK_PHARMACIES.find(p => p.id === med.pharmacyId)
  }));

  return (
    <div className="medicine-page">
      {/* Header */}
      <header className="page-header">
        <button className="back-button" onClick={() => navigate('/')}>← {t.back}</button>
        <div className="header-titles">
          <h1>{t.medicine_avail}</h1>
          <p>{t.medicine_sub}</p>
        </div>
      </header>

      <main className="page-content">
        {/* Filter Bar */}
        <div className="filter-bar">
          <div className="search-input-wrapper">
            <span className="search-icon">🔍</span>
            <input 
              type="text" 
              placeholder={t.search_medicine} 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <select 
            className="filter-select"
            value={distanceFilter}
            onChange={(e) => setDistanceFilter(e.target.value)}
          >
            <option value="any">{t.any_distance}</option>
            <option value="5">{t.within_5km}</option>
            <option value="15">{t.within_15km}</option>
            <option value="50">{t.within_50km}</option>
          </select>
          <button className="apply-filters-btn">⚡ {t.apply_filters}</button>
        </div>

        <div className="results-header">
          <h2>{t.results_for} <span className="highlight-tag">{searchQuery || t.all_medicines}</span></h2>
          <span className="results-count">💊 {filteredData.length} {t.medicines_found}</span>
        </div>

        {/* Medicine List */}
        <div className="medicine-grid">
          {filteredData.length === 0 ? (
            <div className="empty-state">
              <p>{t.no_medicines}</p>
            </div>
          ) : (
            filteredData.map(med => (
              <div key={med.id} className="premium-medicine-card">
                <div className="pm-top">
                  <div className="pm-icon-area">
                    <div className="pm-icon-box">💊</div>
                  </div>
                  <div className="pm-info">
                    <h3>{t[med.name] || med.name}</h3>
                    <p className="pm-pharmacy">🏥 {t[med.pharmacy.name] || med.pharmacy.name} • 📍 {t[med.pharmacy.location] || med.pharmacy.location}</p>
                    <div className="pm-tags">
                      <span className="tag tag-soft-purple">{t[med.type] || med.type}</span>
                      <span className={`tag ${med.inStock ? 'tag-soft-green' : 'tag-soft-red'}`}>
                        {med.inStock ? t.in_stock : t.out_of_stock}
                      </span>
                    </div>
                  </div>
                  <div className="pm-distance-badge">
                    {med.pharmacy.distance} {t.away_text}
                  </div>
                </div>
                
                <div className="pm-divider"></div>
                
                <div className="pm-bottom">
                  <div className="pm-stats">
                    <div className="stat">
                      <span className="stat-icon">📦</span>
                      <div><strong>{med.qty}</strong><span>{t.units}</span></div>
                    </div>
                    <div className="stat">
                      <span className="stat-icon">💰</span>
                      <div><strong>{med.price}</strong><span>{t.price}</span></div>
                    </div>
                    <div className="stat">
                      <span className="stat-icon">⭐</span>
                      <div><strong>{med.pharmacy.rating}</strong><span>{t.pharmacy_rating}</span></div>
                    </div>
                  </div>
                  <button className="pm-view-btn" disabled={!med.inStock}>
                    {med.inStock ? `${t.order_now} →` : t.out_of_stock}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
