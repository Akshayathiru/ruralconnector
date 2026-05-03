// ─────────────────────────────────────────────────────────
// main.jsx  —  The ENTRY POINT of the entire React application
// Think of this file as the "ON switch" for your app.
// ─────────────────────────────────────────────────────────

// 1. Import React itself. React is the library that lets us write
//    HTML-like code inside JavaScript (called JSX).
import React from 'react'

// 2. Import ReactDOM. This is the bridge between React and the real browser.
//    It takes your React components and actually draws them on the screen.
import ReactDOM from 'react-dom/client'

// 3. Import our root App component. App.jsx is the "parent" of everything.
import App from './App.jsx'

// 4. Import global CSS so it applies to the whole page.
import './index.css'

// 5. ReactDOM.createRoot(...) finds the <div id="root"> in index.html
//    and tells React: "Put everything INSIDE this div."
// 6. .render(<App />) means: "Draw the App component on screen."
//    <App /> is JSX — it looks like an HTML tag but it's actually a React component.
ReactDOM.createRoot(document.getElementById('root')).render(
  // StrictMode is a helper tool that warns you about mistakes during development.
  // It doesn't affect the final app seen by users — just helps YOU while coding.
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
