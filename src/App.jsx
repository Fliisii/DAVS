import './App.css';
import { Routes, Route } from 'react-router-dom';
import { TempPage } from './pages/TempPage/TempPage';
import { Page42 } from './pages/Page42/Page42';
import { Ai_chat } from './pages/Ai_chat/Ai_chat';
import { IncidentCard } from './pages/IncidentCard/IncidentCard';
import { CreateIncidentPage } from './pages/CreateIncidentPage/CreateIncidentPage';
import { Flisi } from './pages/Flisi/flisi'

function App() {

  return (
    <Routes>
      <Route path="/temp" element={<TempPage />} />
      <Route path="/incidentcard" element={<IncidentCard />} />
      <Route path="/create" element={<CreateIncidentPage />} />
      <Route path="/page42" element={<Page42 />} />
      <Route path="/ai_chat" element={<Ai_chat />} />
      <Route path="/Flisi" element={<Flisi />} />
    </Routes>
  );
}

export default App;
