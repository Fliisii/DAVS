import { useState, useEffect } from 'react';
import './App.css';
import Layout from './Layout/Layout';

import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import { IncidentCard } from './pages/IncidentCard/IncidentCard';
import { CreateIncidentPage } from './pages/CreateIncidentPage/CreateIncidentPage';
import { AdminPanel } from './pages/AdminPanel/AdminPanel';
import { AiChat } from './pages/AiChat/AiChat.jsx';
import { Flisi } from './pages/Flisi/flisi'
import * as SDK from '@expressms/smartapp-sdk';

function App() {
  useEffect(() => {
    SDK.ready();
  }, []);
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />

        {/* Остальные страницы */}
        <Route path="/incidentcard" element={<IncidentCard />} />
        <Route path="/create" element={<CreateIncidentPage />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/aichat" element={<AiChat />} />
        <Route path="/Flisi" element={<Flisi />} />
      </Route>
    </Routes>
  ); 
}

export default App;