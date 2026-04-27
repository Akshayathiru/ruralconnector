import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './HospitalsPage.css';

// --- MOCK DATA ---
const MOCK_HOSPITALS = [
  {
    id: 1,
    name: "City Care Hospital",
    distance: "3km",
    distanceValue: 3,
    location: "Chennai Central",
    rating: 4.8,
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
    symptoms: ["Infertility"],
    ages: ["Above 18"],
    image: "👶"
  }
];

const MOCK_DOCTORS = [
  { id: 101, hospitalId: 1, name: "Dr. Raj Kumar", specialty: "General Physician", tags: ["fever", "cough", "general"], available: true, experience: "15 yrs" },
  { id: 102, hospitalId: 1, name: "Dr. Anitha", specialty: "Cardiologist", tags: ["heart", "chest pain"], available: false, experience: "10 yrs" },
  { id: 103, hospitalId: 2, name: "Dr. Smitha", specialty: "Pediatrician", tags: ["baby doctor", "child care", "fever"], available: true, experience: "8 yrs" },
  { id: 104, hospitalId: 2, name: "Dr. John", specialty: "Pediatric Surgeon", tags: ["baby doctor", "surgery"], available: true, experience: "12 yrs" },
  { id: 105, hospitalId: 3, name: "Dr. Priya", specialty: "Gynecologist", tags: ["infertility", "pregnancy", "women"], available: true, experience: "20 yrs" },
  { id: 106, hospitalId: 3, name: "Dr. Lakshmi", specialty: "IVF Specialist", tags: ["infertility", "ivf"], available: true, experience: "18 yrs" },
  { id: 107, hospitalId: 4, name: "Dr. Arun", specialty: "Orthopedics", tags: ["bones", "joints", "fracture"], available: true, experience: "22 yrs" },
  { id: 108, hospitalId: 5, name: "Dr. Ramesh", specialty: "Fertility Expert", tags: ["infertility", "ivf"], available: true, experience: "14 yrs" }
];

export default function HospitalsPage() {
  const navigate = useNavigate();
  
  // State for navigation flow
  // views: 'categories' -> 'subcategories' -> 'hospitals' -> 'hospital_detail'
  const [view, setView] = useState('categories');
  
  // Selections
  const [category, setCategory] = useState(null); // 'location', 'symptoms', 'age'
  const [filterValue, setFilterValue] = useState(null); // e.g., '5km', 'Infertility', '0-4 yrs'
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
    setDoctorSearchQuery(''); // reset search
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
      const maxDist = parseInt(filterValue); // e.g. "5km" -> 5
      filteredHospitals = MOCK_HOSPITALS.filter(h => h.distanceValue <= maxDist);
    } else if (category === 'symptoms') {
      filteredHospitals = MOCK_HOSPITALS.filter(h => h.symptoms.includes(filterValue));
    } else if (category === 'age') {
      filteredHospitals = MOCK_HOSPITALS.filter(h => h.ages.includes(filterValue));
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
        <div className="icon bg-blue">📍</div>
        <h3>Based on Location</h3>
        <p>Find hospitals within 5km, 10km, etc.</p>
      </div>
      <div className="category-card" onClick={() => handleCategorySelect('symptoms')}>
        <div className="icon bg-pink">🩺</div>
        <h3>Based on Problems</h3>
        <p>Search by symptoms like Infertility, Fever, etc.</p>
      </div>
      <div className="category-card" onClick={() => handleCategorySelect('age')}>
        <div className="icon bg-green">👶</div>
        <h3>Based on Age</h3>
        <p>Filter hospitals that treat babies, adults, etc.</p>
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
        <h2 className="sub-title">Select your {category} preference:</h2>
        <div className="list-grid">
          {options.map((opt, i) => (
            <div key={i} className="list-item" onClick={() => handleFilterSelect(opt.value)}>
              <span className="list-icon">{opt.icon}</span>
              <span className="list-label">{opt.label}</span>
              <span className="list-arrow">→</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderHospitals = () => (
    <div className="sub-container animate-fade-in">
      <h2 className="sub-title">
        Hospitals matching: <span className="highlight-badge">{filterValue}</span>
      </h2>
      {filteredHospitals.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">🏜️</div>
          <p>No hospitals found for this criteria.</p>
        </div>
      ) : (
        <div className="hospital-grid">
          {filteredHospitals.map(h => (
            <div key={h.id} className="hospital-card" onClick={() => handleHospitalSelect(h)}>
              <div className="h-card-header">
                <span className="h-icon">{h.image}</span>
                <span className="h-distance">{h.distance} away</span>
              </div>
              <h3 className="h-name">{h.name}</h3>
              <p className="h-loc">📍 {h.location}</p>
              <div className="h-tags">
                {h.symptoms.slice(0,2).map(s => <span key={s} className="tag tag-blue">{s}</span>)}
                {h.ages.slice(0,1).map(a => <span key={a} className="tag tag-green">{a}</span>)}
              </div>
              <button className="view-btn">View Doctors</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderHospitalDetail = () => (
    <div className="detail-container animate-fade-in">
      {/* Hospital Banner */}
      <div className="detail-banner">
        <div className="d-icon">{selectedHospital.image}</div>
        <div className="d-info">
          <h2>{selectedHospital.name}</h2>
          <p>📍 {selectedHospital.location} • 🚗 {selectedHospital.distance} away</p>
          <div className="d-rating">⭐ {selectedHospital.rating} / 5.0</div>
        </div>
      </div>

      {/* Doctor Search */}
      <div className="doctor-search-box">
        <h3>Available Doctors</h3>
        <div className="search-input-wrapper">
          <span className="search-icon">🔍</span>
          <input 
            type="text" 
            placeholder="Search e.g., 'baby doctors', 'fever', 'specialist name'..."
            value={doctorSearchQuery}
            onChange={(e) => setDoctorSearchQuery(e.target.value)}
            className="doctor-search-input"
          />
        </div>
      </div>

      {/* Doctor List */}
      <div className="doctors-list">
        {filteredDoctors.length === 0 ? (
          <div className="empty-state small">
            <p>No doctors found matching "{doctorSearchQuery}"</p>
          </div>
        ) : (
          filteredDoctors.map(doc => (
            <div key={doc.id} className="doctor-card">
              <div className="doc-avatar">👨‍⚕️</div>
              <div className="doc-details">
                <h4>{doc.name}</h4>
                <p className="doc-spec">{doc.specialty} • {doc.experience}</p>
                <div className="doc-tags">
                  {doc.tags.map(t => <span key={t} className="tag tag-outline">#{t}</span>)}
                </div>
              </div>
              <div className="doc-status">
                {doc.available 
                  ? <span className="status-badge available">🟢 Available</span>
                  : <span className="status-badge busy">🔴 Busy</span>
                }
                <button className="book-btn" disabled={!doc.available} onClick={() => openBooking(doc)}>Book Now</button>
              </div>
            </div>
          ))
        )}
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
              <h3>Book Appointment</h3>
              <p className="modal-subtitle">with <strong>{bookingDoctor.name}</strong> ({bookingDoctor.specialty})</p>
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
                Confirm Booking
              </button>
            </>
          ) : (
            <div className="confirmation-success">
              <div className="success-icon">✅</div>
              <h3>Booking Confirmed!</h3>
              <p>Your slot is confirmed for <strong>{selectedSlot}</strong> today.</p>
              <button className="video-call-btn" onClick={() => navigate('/videocall')}>
                📹 Join Video Call
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  // --- Main Render ---
  return (
    <div className="hospitals-page">
      {renderBookingModal()}
      {/* Header */}
      <header className="page-header">
        <button className="back-button" onClick={goBack}>
          ← {view === 'categories' ? 'Back to Dashboard' : 'Back'}
        </button>
        <div className="header-titles">
          <h1>Find Nearby Hospitals</h1>
          <p>Filter by your specific needs and priorities</p>
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
