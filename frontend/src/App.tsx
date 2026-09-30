import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Overview from './pages/Overview';
import WellMap from './pages/WellMap';
import ActiveWell from './pages/ActiveWell';
import RiskPrediction from './pages/RiskPrediction';
import FormationAnalysis from './pages/FormationAnalysis';
import HistoricalEvents from './pages/HistoricalEvents';
import WellComparison from './pages/WellComparison';
import AskNWIS from './pages/AskNWIS';
import Alerts from './pages/Alerts';
import Reports from './pages/Reports';
import Settings from './pages/Settings';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Navigate to="/overview" replace />} />
          <Route path="overview" element={<Overview />} />
          <Route path="map" element={<WellMap />} />
          <Route path="active-well" element={<ActiveWell />} />
          <Route path="risk" element={<RiskPrediction />} />
          <Route path="formations" element={<FormationAnalysis />} />
          <Route path="events" element={<HistoricalEvents />} />
          <Route path="comparison" element={<WellComparison />} />
          <Route path="reports" element={<Reports />} />
          <Route path="ask" element={<AskNWIS />} />
          <Route path="alerts" element={<Alerts />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
