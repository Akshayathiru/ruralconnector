import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './HospitalsPage.css';
import { translations } from '../translations';

// --- EXPANDED MOCK DATA ---
export const MOCK_HOSPITALS = [
  {
    id: 1,
    name: "City Care Hospital",
    distance: "3km",
    distanceValue: 3,
    location: "Chennai Central",
    rating: 4.8,
    doctorsCount: "85+",
    insurance: "Cashless",
    symptoms: ["Fever", "Cough", "General"],
    ages: ["0-4 yrs", "5-15 yrs", "16-18 yrs", "Above 18"],
    image: "🏥"
  },
  {
    id: 2,
    name: "Apollo Kids Clinic",
    distance: "8km",
    distanceValue: 8,
    location: "Chennai South",
    rating: 4.9,
    doctorsCount: "40+",
    insurance: "All Major",
    symptoms: ["Fever", "Baby Care", "Vaccination"],
    ages: ["0-4 yrs", "5-15 yrs"],
    image: "🧸"
  },
  {
    id: 3,
    name: "Women's Speciality Hospital",
    distance: "36km",
    distanceValue: 36,
    location: "Chennai West",
    rating: 4.7,
    doctorsCount: "60+",
    insurance: "Cashless",
    symptoms: ["Infertility", "Maternity", "Women's Health"],
    ages: ["Above 18"],
    image: "🌸"
  },
  {
    id: 4,
    name: "General Medical Center",
    distance: "12km",
    distanceValue: 12,
    location: "Chennai North",
    rating: 4.5,
    doctorsCount: "120+",
    insurance: "Cashless",
    symptoms: ["Fever", "Orthopedics", "Cardiology"],
    ages: ["16-18 yrs", "Above 18"],
    image: "🩺"
  },
  {
    id: 5,
    name: "Fertility & IVF Center",
    distance: "50km",
    distanceValue: 50,
    location: "Chennai Outskirts",
    rating: 4.6,
    doctorsCount: "35+",
    insurance: "Partial",
    symptoms: ["Infertility"],
    ages: ["Above 18"],
    image: "👶"
  },
  {
    id: 6,
    name: "Sunrise Orthopedic Center",
    distance: "18km",
    distanceValue: 18,
    location: "Chennai East",
    rating: 4.8,
    doctorsCount: "45+",
    insurance: "Cashless",
    symptoms: ["Orthopedics", "Bone Joint"],
    ages: ["16-18 yrs", "Above 18"],
    image: "🦴"
  },
  {
    id: 7,
    name: "Global Heart Institute",
    distance: "25km",
    distanceValue: 25,
    location: "Chennai Metro",
    rating: 4.9,
    doctorsCount: "150+",
    insurance: "All Major",
    symptoms: ["Cardiology", "Heart", "Emergency"],
    ages: ["16-18 yrs", "Above 18"],
    image: "❤️"
  },
  {
    id: 8,
    name: "Rural Health Mission Clinic",
    distance: "2km",
    distanceValue: 2,
    location: "Village Center",
    rating: 4.3,
    doctorsCount: "12+",
    insurance: "Free/Govt",
    symptoms: ["Fever", "General", "First Aid"],
    ages: ["0-4 yrs", "5-15 yrs", "16-18 yrs", "Above 18"],
    image: "🚑"
  }
];

const MOCK_DOCTORS = [
  { id: 101, hospitalId: 1, name: "Dr. Raj Kumar", specialty: "General Physician", tags: ["fever", "cough", "general"], available: true, experience: "15 yrs", rating: "4.9", time: "09:00 AM - 04:00 PM" },
  { id: 102, hospitalId: 1, name: "Dr. Anitha", specialty: "Cardiologist", tags: ["heart", "chest pain"], available: false, experience: "10 yrs", rating: "4.7", time: "Not available today" },
  { id: 113, hospitalId: 1, name: "Dr. Suresh Reddy", specialty: "Orthopedic", tags: ["bones", "joints"], available: true, experience: "12 yrs", rating: "4.8", time: "10:00 AM - 02:00 PM" },
  { id: 114, hospitalId: 1, name: "Dr. Kavya Iyer", specialty: "Pediatrician", tags: ["baby doctor", "fever"], available: true, experience: "8 yrs", rating: "4.9", time: "11:00 AM - 05:00 PM" },
  { id: 115, hospitalId: 1, name: "Dr. Mohammed Ali", specialty: "Neurologist", tags: ["brain", "nerves"], available: false, experience: "20 yrs", rating: "5.0", time: "Not available today" },
  { id: 116, hospitalId: 1, name: "Dr. Deepa Nair", specialty: "Dermatologist", tags: ["skin", "allergies"], available: true, experience: "6 yrs", rating: "4.6", time: "01:00 PM - 06:00 PM" },
  { id: 103, hospitalId: 2, name: "Dr. Smitha", specialty: "Pediatrician", tags: ["baby doctor", "child care", "fever"], available: true, experience: "8 yrs", rating: "4.8", time: "10:00 AM - 02:00 PM" },
  { id: 104, hospitalId: 2, name: "Dr. John", specialty: "Pediatric Surgeon", tags: ["baby doctor", "surgery"], available: true, experience: "12 yrs", rating: "4.9", time: "11:00 AM - 05:00 PM" },
  { id: 105, hospitalId: 3, name: "Dr. Priya Sharma", specialty: "Gynecologist", tags: ["infertility", "pregnancy", "women"], available: true, experience: "20 yrs", rating: "5.0", time: "10:00 AM - 01:00 PM" },
  { id: 106, hospitalId: 3, name: "Dr. Lakshmi", specialty: "IVF Specialist", tags: ["infertility", "ivf"], available: true, experience: "18 yrs", rating: "4.8", time: "02:00 PM - 06:00 PM" },
  { id: 107, hospitalId: 4, name: "Dr. Arun", specialty: "Orthopedics", tags: ["bones", "joints", "fracture"], available: true, experience: "22 yrs", rating: "4.9", time: "09:00 AM - 03:00 PM" },
  { id: 108, hospitalId: 4, name: "Dr. Sunita Rao", specialty: "Orthopedic Surgeon", tags: ["surgery", "bones"], available: true, experience: "14 yrs", rating: "4.7", time: "02:00 PM - 05:00 PM" },
  { id: 109, hospitalId: 5, name: "Dr. Ramesh Patel", specialty: "Fertility Expert", tags: ["infertility", "ivf"], available: false, experience: "14 yrs", rating: "4.6", time: "Not available today" },
  { id: 110, hospitalId: 6, name: "Dr. Anil Verma", specialty: "Surgeon", tags: ["surgery", "bones"], available: true, experience: "18 yrs", rating: "4.8", time: "11:00 AM - 03:00 PM" },
  { id: 111, hospitalId: 7, name: "Dr. Vikram Singh", specialty: "Cardiologist", tags: ["heart", "surgery"], available: true, experience: "25 yrs", rating: "5.0", time: "09:00 AM - 05:00 PM" },
  { id: 112, hospitalId: 8, name: "Dr. Meena", specialty: "General Physician", tags: ["fever", "cough"], available: true, experience: "5 yrs", rating: "4.5", time: "24/7 Available" }
];

export default function HospitalsPage() {
  const navigate = useNavigate();
  const location = useLocation();

  // --- HELPER TO GET LIVE DATA ---
  const getLiveHospitals = () => {
    return MOCK_HOSPITALS.map(h => {
      const saved = localStorage.getItem(`hospital_admin_${h.id}`);
      if (saved) {
        const adminData = JSON.parse(saved);
        return {
          ...h,
          doctorsCount: adminData.doctorsAvailable,
          isOpen: adminData.isOpen,
          emergencyActive: adminData.emergencyAvailable,
          announcement: adminData.announcement
        };
      }
      return { ...h, isOpen: true, emergencyActive: true }; // defaults
    });
  };

  const liveHospitals = getLiveHospitals();
  
  const [lang] = useState(localStorage.getItem('userLanguage') || 'en');
  const t = translations[lang] || translations.en;

  // State for navigation flow
  const [view, setView] = useState(location.state?.autoView || 'categories');
  
  // Selections
  const [category, setCategory] = useState(location.state?.autoCategory || null); 
  const [filterValue, setFilterValue] = useState(location.state?.autoFilter || null); 
  const [selectedHospital, setSelectedHospital] = useState(null);
  
  // Search state for doctors
  const [doctorSearchQuery, setDoctorSearchQuery] = useState('');

  // Booking state
  const [bookingDoctor, setBookingDoctor] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [bookingStatus, setBookingStatus] = useState(''); // 'slot_selection', 'confirmed'

  // --- Handlers ---
  const handleCategorySelect = (cat) => {
    setCategory(cat);
    setView('subcategories');
  };

  const openBooking = (doc) => {
    setBookingDoctor(doc);
    setSelectedSlot(null);
    setBookingStatus('slot_selection');
  };

  const handleFilterSelect = (val) => {
    setFilterValue(val);
    setView('hospitals');
  };

  const handleHospitalSelect = (hospital) => {
    setSelectedHospital(hospital);
    setDoctorSearchQuery(''); 
    setView('hospital_detail');
  };

  const goBack = () => {
    if (view === 'hospital_detail') setView('hospitals');
    else if (view === 'hospitals') setView('subcategories');
    else if (view === 'subcategories') setView('categories');
    else navigate('/');
  };

  // --- Filter Logic ---
  let filteredHospitals = [];
  if (view === 'hospitals') {
    if (category === 'location') {
      const maxDist = parseInt(filterValue); 
      filteredHospitals = liveHospitals.filter(h => h.distanceValue <= maxDist);
    } else if (category === 'symptoms') {
      filteredHospitals = liveHospitals.filter(h => h.symptoms.includes(filterValue));
    } else if (category === 'age') {
      filteredHospitals = liveHospitals.filter(h => h.ages.includes(filterValue));
    }
  }

  let filteredDoctors = [];
  if (view === 'hospital_detail' && selectedHospital) {
    let docs = MOCK_DOCTORS.filter(d => d.hospitalId === selectedHospital.id);
    if (doctorSearchQuery.trim() !== '') {
      const q = doctorSearchQuery.toLowerCase();
      docs = docs.filter(d => 
        d.name.toLowerCase().includes(q) || 
        d.specialty.toLowerCase().includes(q) ||
        d.tags.some(tag => tag.toLowerCase().includes(q))
      );
    }
    filteredDoctors = docs;
  }

  // --- Render Helpers ---
  const renderCategories = () => (
    <div className="grid-container animate-fade-in">
      <div className="category-card" onClick={() => handleCategorySelect('location')}>
        <div className="icon-wrapper purple-glow">📍</div>
        <h3>{t.based_on_location}</h3>
        <p>{t["Find hospitals within 5km, 10km, etc."] || "Find hospitals within 5km, 10km, etc."}</p>
      </div>
      <div className="category-card" onClick={() => handleCategorySelect('symptoms')}>
        <div className="icon-wrapper purple-glow">🩺</div>
        <h3>{t.based_on_problems}</h3>
        <p>{t["Search by symptoms like Infertility, Fever, etc."] || "Search by symptoms like Infertility, Fever, etc."}</p>
      </div>
      <div className="category-card" onClick={() => handleCategorySelect('age')}>
        <div className="icon-wrapper purple-glow">👶</div>
        <h3>{t.based_on_age}</h3>
        <p>{t["Filter hospitals that treat babies, adults, etc."] || "Filter hospitals that treat babies, adults, etc."}</p>
      </div>
    </div>
  );

  const renderSubcategories = () => {
    let options = [];
    if (category === 'location') {
      options = [
        { label: "Within 5km", value: "5km", icon: "🚶" },
        { label: "Within 10km", value: "10km", icon: "🚲" },
        { label: "Within 20km", value: "20km", icon: "🚗" },
        { label: "Any distance (50km+)", value: "100km", icon: "🚌" },
      ];
    } else if (category === 'symptoms') {
      options = [
        { label: "Fever & General", value: "Fever", icon: "🌡️" },
        { label: "Infertility", value: "Infertility", icon: "🌸" },
        { label: "Orthopedics (Bones)", value: "Orthopedics", icon: "🦴" },
        { label: "Cardiology (Heart)", value: "Cardiology", icon: "❤️" },
      ];
    } else if (category === 'age') {
      options = [
        { label: "0 to 4 yrs (Babies)", value: "0-4 yrs", icon: "🍼" },
        { label: "5 to 15 yrs (Children)", value: "5-15 yrs", icon: "🎒" },
        { label: "16 to 18 yrs (Teens)", value: "16-18 yrs", icon: "📱" },
        { label: "Above 18 (Adults)", value: "Above 18", icon: "🧑" },
      ];
    }

    return (
      <div className="sub-container animate-fade-in">
        <h2 className="sub-title">{t.select_pref ? t.select_pref.replace('{category}', t[category] || category) : `Select your ${category} preference:`}</h2>
        <div className="list-grid">
          {options.map((opt, i) => (
            <div key={i} className="list-item" onClick={() => handleFilterSelect(opt.value)}>
              <span className="list-icon">{opt.icon}</span>
              <span className="list-label">{t[opt.label] || opt.label}</span>
              <span className="list-arrow">→</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderHospitals = () => (
    <div className="hospitals-list-view animate-fade-in">
      
      {/* Search & Filter Bar */}
      <div className="filter-bar">
        <div className="search-input-wrapper">
          <span className="search-icon">🔍</span>
          <input type="text" placeholder={t.search_hospital} />
        </div>
        <select className="filter-select"><option>{t.speciality || "Speciality"}</option></select>
        <select className="filter-select"><option>{t.distance || "Distance"}</option></select>
        <select className="filter-select"><option>{t.insurance || "Insurance"}</option></select>
        <button className="apply-filters-btn">⚡ {t.apply_filters}</button>
      </div>

      <div className="results-header">
        <h2>{t.hospitals_matching || "Hospitals matching:"} <span className="highlight-tag">{t[filterValue] || filterValue} <span className="close-tag">✕</span></span></h2>
        <span className="results-count">🏥 {filteredHospitals.length} {t.hospitals_found || "Hospital(s) found"}</span>
      </div>

      {filteredHospitals.length === 0 ? (
        <div className="empty-state">
          <p>No hospitals found for this criteria.</p>
        </div>
      ) : (
        <div className="hospital-cards-vertical">
          {filteredHospitals.map(h => (
            <div key={h.id} className={`premium-hospital-card ${!h.isOpen ? 'hospital-closed' : ''}`} style={{ opacity: h.isOpen ? 1 : 0.75 }}>
              {!h.isOpen && (
                <div style={{ position: 'absolute', top: 10, right: 10, background: '#ef4444', color: '#fff', padding: '4px 12px', fontSize: '0.7rem', fontWeight: 'bold', borderRadius: '12px', zIndex: 5 }}>
                  CLOSED / FULL
                </div>
              )}
              <div className="ph-top">
                <div className="ph-icon-area">
                  <div className="ph-icon-box">{h.image}</div>
                  <div className="ph-verified">✓</div>
                </div>
                <div className="ph-info">
                  <h3>{t[h.name] || h.name}</h3>
                  <p className="ph-loc">📍 {t[h.location] || h.location} &nbsp; | &nbsp; 📞 +91 98765 4321{h.id}</p>
                  <div className="ph-tags">
                    {h.symptoms.slice(0,2).map(s => <span key={s} className="tag tag-soft-purple">{t[s] || s}</span>)}
                    {h.ages.slice(0,1).map(a => <span key={a} className="tag tag-soft-green">{t[a] || a}</span>)}
                  </div>
                </div>
                <div className="ph-distance-badge">
                  {h.distance} {t.away_text || "away"}
                </div>
              </div>
              
              <div className="ph-divider"></div>
              
              <div className="ph-bottom">
                <div className="ph-stats">
                  <div className="stat">
                    <span className="stat-icon">⏰</span>
                    <div><strong>24/7</strong><span>{t.emergency || "Emergency"}</span></div>
                  </div>
                  <div className="stat">
                    <span className="stat-icon">👨‍⚕️</span>
                    <div><strong>{h.doctorsCount}</strong><span>{t.doctors || "Doctors"}</span></div>
                  </div>
                  <div className="stat">
                    <span className="stat-icon">⭐</span>
                    <div><strong>{h.rating}</strong><span>{t.patient_rating || "Patient Rating"}</span></div>
                  </div>
                  <div className="stat">
                    <span className="stat-icon">🛡️</span>
                    <div><strong>{t[h.insurance] || h.insurance}</strong><span>{t.insurance || "Insurance"}</span></div>
                  </div>
                </div>

                {h.announcement && (
                  <div style={{ marginTop: '12px', padding: '10px 14px', background: 'var(--warning-soft)', borderRadius: '12px', border: '1px solid #fcd34d', fontSize: '0.8rem', color: '#92400e', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{fontSize: '1.2rem'}}>📢</span>
                    <span>{h.announcement}</span>
                  </div>
                )}

                <button className="ph-view-btn" onClick={() => handleHospitalSelect(h)} disabled={!h.isOpen}>
                  {h.isOpen ? (t.view_doctors + " →") : "Unavailable"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderHospitalDetail = () => (
    <div className="detail-container animate-fade-in">
      {/* Dashboard Style Header */}
      <div className="detail-dashboard-header">
        <div className="dd-text">
          <h2>{t.doctor_avail_title}</h2>
          <p>{t.doctor_avail_sub}</p>
          <div className="dd-tabs">
            <button className="dd-tab active">👥 {t.all_doctors} ({filteredDoctors.length})</button>
            <button className="dd-tab">✅ {t.available_now} ({filteredDoctors.filter(d => d.available).length})</button>
          </div>
        </div>
        <div className="dd-graphic">
          <div className="dd-graphic-card">
            <div className="dd-stat">
              <span>{t["Available Today"] || "Available Today"}</span>
              <strong>{filteredDoctors.filter(d => d.available).length}</strong>
              <small>{t.doctors || "Doctors"}</small>
            </div>
            <div className="dd-circle">33%</div>
          </div>
        </div>
      </div>

      <div className="doctors-list-vertical">
        {filteredDoctors.map(doc => (
          <div key={doc.id} className="premium-doctor-card">
            <div className="pd-avatar" style={{ backgroundColor: doc.available ? '#8b5cf6' : '#94a3b8' }}>
              {doc.name.split(' ').map(n => n[0]).join('').replace('D', '').substring(0, 2)}
              {doc.available && <span className="pd-online-dot"></span>}
            </div>
            
            <div className="pd-info">
              <h4>{t[doc.name] || doc.name} {doc.available ? <span className="verified-badge">✓</span> : <span className="unverified-badge">✕</span>}</h4>
              <p>🩺 {t[doc.specialty] || doc.specialty}</p>
              <p>🏥 {t[selectedHospital.name] || selectedHospital.name}</p>
            </div>
            
            <div className="pd-schedule">
              <p>⏰ {doc.time}</p>
              <p>📍 {selectedHospital.distance} {t.away_text || "away"}</p>
              <p>📅 {t["Mon - Sat"] || "Mon - Sat"}</p>
            </div>
            
            <div className="pd-action">
              {doc.available 
                ? <span className="pd-status status-green">● {t.available}</span>
                : <span className="pd-status status-red">● {t.away}</span>
              }
              <button 
                className="pd-book-btn" 
                disabled={!doc.available} 
                onClick={() => openBooking(doc)}
              >
                {t.book_slot} 〉
              </button>
            </div>
            <button className="pd-menu">⋮</button>
          </div>
        ))}
      </div>
    </div>
  );

  const renderBookingModal = () => {
    if (!bookingDoctor) return null;

    return (
      <div className="modal-overlay">
        <div className="modal-content animate-fade-in">
          <button className="close-modal" onClick={() => setBookingDoctor(null)}>✕</button>
          
          {bookingStatus === 'slot_selection' ? (
            <>
              <h3>{t.book_appointment || "Book Appointment"}</h3>
              <p className="modal-subtitle">{t.with_doctor || "with"} <strong>{t[bookingDoctor.name] || bookingDoctor.name}</strong> ({t[bookingDoctor.specialty] || bookingDoctor.specialty})</p>
              <div className="slots-grid">
                {["10:00 AM", "11:30 AM", "02:00 PM", "04:15 PM", "06:00 PM"].map(slot => (
                  <button 
                    key={slot} 
                    className={`slot-btn ${selectedSlot === slot ? 'selected' : ''}`}
                    onClick={() => setSelectedSlot(slot)}
                  >
                    {slot}
                  </button>
                ))}
              </div>
              <button 
                className="confirm-btn" 
                disabled={!selectedSlot}
                onClick={() => setBookingStatus('confirmed')}
              >
                {t.confirm_booking || "Confirm Booking"}
              </button>
            </>
          ) : (
            <div className="confirmation-success">
              <div className="success-icon">✅</div>
              <h3>{t.booking_confirmed || "Booking Confirmed!"}</h3>
              <p>{t.slot_confirmed_for || "Your slot is confirmed for"} <strong>{selectedSlot}</strong> {t.today || "today."}</p>
              <button className="video-call-btn" onClick={() => navigate('/videocall', { state: { doctorName: bookingDoctor.name } })}>
                📹 {t.join_video_call || "Join Video Call"}
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="hospitals-page">
      {renderBookingModal()}
      
      {/* Header */}
      <header className="page-header">
        <button className="back-button" onClick={goBack}>
          ← {view === 'categories' ? `${t.back} to Dashboard` : t.back}
        </button>
        <div className="header-titles">
          <h1>{t.find_hospitals}</h1>
          <p>{t.hospitals_sub}</p>
        </div>
      </header>

      {/* Content Area */}
      <main className="page-content">
        {view === 'categories' && renderCategories()}
        {view === 'subcategories' && renderSubcategories()}
        {view === 'hospitals' && renderHospitals()}
        {view === 'hospital_detail' && renderHospitalDetail()}
      </main>
    </div>
  );
}
