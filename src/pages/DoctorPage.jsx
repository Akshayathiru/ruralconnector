// ─────────────────────────────────────────────────────────────────────────────
// DoctorPage.jsx  —  CHECK DOCTOR AVAILABILITY
//
// 📚 CONCEPTS USED HERE:
//
//   1. useNavigate  → go back to homepage with navigate('/')
//   2. useState     → remember which filter tab is active
//   3. .filter()    → create a filtered list from the full list
//   4. .map()       → loop through list and render cards
//   5. Conditional rendering → show different badge based on availability
//
// ─────────────────────────────────────────────────────────────────────────────
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './PageStyles.css'
import { translations } from '../translations'

// ── MOCK DATA ──────────────────────────────────────────────────────────────
// 📚 This is FAKE data used to show how the page will look.
//    In a real app, you would fetch this from a server/database using:
//    fetch('https://your-api.com/doctors').then(...)
// ──────────────────────────────────────────────────────────────────────────
const DOCTORS = [
  {
    id: 1,
    name:      'Dr. Priya Sharma',
    specialty: 'General Physician',
    hospital:  'PHC Ramnagar',
    available: true,
    time:      '10:00 AM – 1:00 PM',
    distance:  '2.4 km',
    days:      'Mon – Sat',
  },
  {
    id: 2,
    name:      'Dr. Ramesh Patel',
    specialty: 'Pediatrician',
    hospital:  'CHC Bilaspur',
    available: false,
    time:      'Not available today',
    distance:  '5.1 km',
    days:      'Tue, Thu, Sat',
  },
  {
    id: 3,
    name:      'Dr. Sunita Rao',
    specialty: 'Gynecologist',
    hospital:  'PHC Sehore',
    available: true,
    time:      '2:00 PM – 5:00 PM',
    distance:  '3.8 km',
    days:      'Mon, Wed, Fri',
  },
  {
    id: 4,
    name:      'Dr. Anil Verma',
    specialty: 'Surgeon',
    hospital:  'District Hospital',
    available: true,
    time:      '9:00 AM – 12:00 PM',
    distance:  '8.2 km',
    days:      'Mon – Fri',
  },
  {
    id: 5,
    name:      'Dr. Meena Gupta',
    specialty: 'Dermatologist',
    hospital:  'CHC Bilaspur',
    available: false,
    time:      'Not available today',
    distance:  '5.1 km',
    days:      'Wed, Fri',
  },
]

// ── DoctorCard component ───────────────────────────────────────────────────
// A small component for ONE doctor's card.
// Receives doctor data as props.
// ──────────────────────────────────────────────────────────────────────────
function DoctorCard({ doctor, t }) {
  // Get first letter of the doctor's first name for the avatar circle
  // "Dr. Priya" → split by space → ["Dr.", "Priya"] → index [1] → "P"
  const initial = doctor.name.split(' ')[1]?.[0] ?? 'D'

  return (
    <div className={`doctor-card ${doctor.available ? 'card-available' : 'card-unavailable'}`}>

      {/* Avatar circle with first letter */}
      <div className="card-avatar">{initial}</div>

      {/* Info */}
      <div className="card-info">
        <h2 className="card-name">{doctor.name}</h2>
        <p className="card-specialty">🩺 {doctor.specialty}</p>
        <p className="card-hospital">🏥 {doctor.hospital}</p>
        <p className="card-time">🕐 {doctor.time}</p>
        <p className="card-distance">📍 {doctor.distance} away &nbsp;·&nbsp; 📅 {doctor.days}</p>
      </div>

      {/* Status badge */}
      <div className="card-status">
        {/* 📚 Ternary operator:  condition ? valueIfTrue : valueIfFalse */}
        {doctor.available
          ? <span className="badge badge-green">✓ {t.available}</span>
          : <span className="badge badge-red">✗ {t.away}</span>
        }
      </div>

    </div>
  )
}

// ── Main DoctorPage component ──────────────────────────────────────────────
function DoctorPage() {
  const navigate = useNavigate()

  const [lang] = useState(localStorage.getItem('userLanguage') || 'en')
  const t = translations[lang] || translations.en

  // 📚 useState — filter starts as 'all'
  //    Clicking a tab calls setFilter() which updates the value.
  //    React then re-renders the page with the new filter.
  const [filter, setFilter] = useState('all')

  // 📚 .filter() — builds a NEW array from DOCTORS keeping only matching items
  //    If filter === 'available', keep only doctors where available === true
  //    Otherwise show all doctors
  const visibleDoctors = filter === 'available'
    ? DOCTORS.filter(d => d.available)
    : DOCTORS

  // Count of available doctors (for the tab label)
  const availableCount = DOCTORS.filter(d => d.available).length

  return (
    <div className="page-wrapper">

      {/* ── BACK BUTTON ── */}
      <button className="back-btn" id="back-home" onClick={() => navigate('/')}>
        ← {t.back}
      </button>

      {/* ── HEADER ── */}
      <div className="page-header">
        <span className="page-icon">🟢</span>
        <h1 className="page-title">{t.doctor_avail_title}</h1>
        <p className="page-sub">
          {t.doctor_avail_sub}
        </p>
      </div>

      {/* ── FILTER TABS ── */}
      {/*
        📚 className uses a TEMPLATE LITERAL: `tab ${condition ? 'tab-active' : ''}`
           This adds 'tab-active' class when that tab is selected.
           Template literals use backticks (`) and ${ } for expressions.
      */}
      <div className="filter-tabs">
        <button
          id="filter-all"
          className={`tab ${filter === 'all' ? 'tab-active' : ''}`}
          onClick={() => setFilter('all')}
        >
          {t.all_doctors} ({DOCTORS.length})
        </button>
        <button
          id="filter-available"
          className={`tab ${filter === 'available' ? 'tab-active' : ''}`}
          onClick={() => setFilter('available')}
        >
          ✓ {t.available_now} ({availableCount})
        </button>
      </div>

      {/* ── DOCTOR CARDS ── */}
      <div className="card-list">
        {/* 📚 .map() loops through visibleDoctors.
                For each doctor object, we return a DoctorCard.
                key={doctor.id} is required — React uses it to track the list. */}
        {visibleDoctors.map(doctor => (
          <DoctorCard key={doctor.id} doctor={doctor} t={t} />
        ))}
      </div>

    </div>
  )
}

export default DoctorPage
