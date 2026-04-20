import { useState } from 'react';
import './App.css';

import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import { IncidentCard } from './pages/IncidentCard/IncidentCard';
import { CreateIncidentPage } from './pages/CreateIncidentPage/CreateIncidentPage';
import { AdminPanel } from './pages/AdminPanel/AdminPanel';
import { Ai_chat } from './pages/Ai_chat/Ai_chat';
import { Flisi } from './pages/Flisi/flisi'

function App() {

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/incidentcard" element={<IncidentCard />} />
      <Route path="/create" element={<CreateIncidentPage />} />
      <Route path="/admin" element={<AdminPanel />} />
      <Route path="/aichat" element={<Ai_chat />} />
      <Route path="/analytics" element={<Flisi />} />
    </Routes>
  );
}

export default App;