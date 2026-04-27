// ─────────────────────────────────────────────────────────────────────────────
// App.jsx  —  ROOT COMPONENT with ROUTING
//
// 📚 WHAT IS REACT ROUTER?
//    React Router lets you show DIFFERENT pages (components) based on the URL.
//    Without it, React only shows ONE page — there's no way to "go to" another.
//
//    How it works:
//      BrowserRouter → wraps the entire app, enables URL tracking
//      Routes        → a container that holds all your page rules
//      Route         → one rule: "if URL is /doctor, show DoctorPage"
// ─────────────────────────────────────────────────────────────────────────────
import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'

// Import all pages
// As we build each page, we add it here
import HomePage   from './pages/HomePage'
import DoctorPage from './pages/DoctorPage'
import HospitalsPage from './pages/HospitalsPage'

function App() {
  return (
    // BrowserRouter must wrap everything that uses navigation
    <BrowserRouter>
      <div className="app-wrapper">
        {/*
          Routes checks the current URL and renders the matching Route.
          path="/"        → homepage (exact match)
          path="/doctor"  → doctor availability page
        */}
        <Routes>
          <Route path="/"       element={<HomePage />}   />
          <Route path="/doctor" element={<DoctorPage />} />
          <Route path="/hospitals" element={<HospitalsPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
