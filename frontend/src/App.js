import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import Login from './components/Login';
import Register from './components/Register';
import Chat from './components/Chat';
import './App.css';

function App() {
  const { user } = useContext(AuthContext);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={user ? <Navigate to="/chat" /> : <Register />} />
          <Route path="/register" element={user ? <Navigate to="/chat" /> : <Register />} />
          <Route path="/login" element={user ? <Navigate to="/chat" /> : <Login />} />
          <Route path="/chat" element={user ? <Chat /> : <Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;