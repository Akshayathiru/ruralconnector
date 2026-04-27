// ─────────────────────────────────────────────────────────────────────────────
// MedicinePage.jsx  —  CHECK MEDICINE AVAILABILITY
//
// 📚 CONCEPTS USED HERE:
//
//   1. onChange Event: Captures what the user types into the search box.
//   2. Filtering Lists: We use .filter() to search through medicine names
//      based on the typed input, ignoring uppercase/lowercase differences.
//
// ─────────────────────────────────────────────────────────────────────────────
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './PageStyles.css'

// ── MOCK DATA ──────────────────────────────────────────────────────────────
// Fake data representing a pharmacy's current inventory.
// ──────────────────────────────────────────────────────────────────────────
const MEDICINES = [
  { id: 1, name: 'Paracetamol 500mg',    category: 'Painkiller',   inStock: true,  qty: 240, pharmacy: 'PHC Ramnagar' },
  { id: 2, name: 'Amoxicillin 250mg',    category: 'Antibiotic',   inStock: true,  qty: 80,  pharmacy: 'CHC Bilaspur' },
  { id: 3, name: 'ORS Sachets',          category: 'Rehydration',  inStock: false, qty: 0,   pharmacy: 'PHC Sehore'   },
  { id: 4, name: 'Iron + Folic Acid',    category: 'Supplement',   inStock: true,  qty: 500, pharmacy: 'PHC Ramnagar' },
  { id: 5, name: 'Metformin 500mg',      category: 'Diabetes',     inStock: false, qty: 0,   pharmacy: 'CHC Bilaspur' },
  { id: 6, name: 'Amlodipine 5mg',       category: 'BP Medicine',  inStock: true,  qty: 120, pharmacy: 'District Hosp.' },
]

function MedicinePage() {
  const navigate = useNavigate()
  
  // State to hold the current search text
  const [search, setSearch] = useState('')

  // Filter medicines based on the search text.
  // We convert both to lowercase to make the search case-insensitive.
  const filtered = MEDICINES.filter(m =>
    m.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="page-wrapper">
      
      {/* ── BACK BUTTON ── */}
      <button className="back-btn" onClick={() => navigate('/')}>
        ← Back to Home
      </button>

      {/* ── HEADER ── */}
      <div className="page-header">
        <span className="page-icon">💊</span>
        <h1 className="page-title">Medicine Availability</h1>
        <p className="page-sub">
          Check real-time stock levels at nearby facilities
        </p>
      </div>

      {/* ── SEARCH BOX ── */}
      <div className="search-wrap">
        <input
          className="search-input"
          type="text"
          placeholder="🔍 Search for a medicine..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      {/* ── MEDICINE CARDS ── */}
      <div className="card-list">
        {/* If no medicines match the search, show a friendly message */}
        {filtered.length === 0 && (
          <p className="no-results">No medicines found matching "{search}"</p>
        )}

        {/* Loop through the filtered medicines and render a card for each */}
        {filtered.map(med => (
          <div key={med.id} className={`medicine-card ${med.inStock ? 'card-available' : 'card-unavailable'}`}>
            
            <div className="card-icon-big">💊</div>
            
            <div className="card-info">
              <h2 className="card-name">{med.name}</h2>
              <p className="card-specialty">🏷 {med.category}</p>
              <p className="card-hospital">🏥 {med.pharmacy}</p>
              {med.inStock && <p className="card-time">📦 {med.qty} units available</p>}
            </div>
            
            <div className="card-status">
              {med.inStock
                ? <span className="badge badge-green">In Stock</span>
                : <span className="badge badge-red">Out of Stock</span>
              }
            </div>
            
          </div>
        ))}
      </div>

    </div>
  )
}

export default MedicinePage
