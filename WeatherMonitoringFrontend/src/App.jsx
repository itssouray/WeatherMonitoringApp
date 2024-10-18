import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import WeatherDashboard from './pages/WeatherDashboard';
import CityDetail from './pages/CityDetail';
import WeatherAlerting from './pages/WeatherAlert';
import { TemperatureUnitProvider } from './context/TemperatureUnitContext';

const App = () => {
  return (
    <TemperatureUnitProvider> 
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<WeatherDashboard />} />
            <Route path="/city/:cityName" element={<CityDetail />} />
            <Route path="/alert" element={<WeatherAlerting />} />
          </Routes>
        </Layout>
      </Router>
    </TemperatureUnitProvider>
  );
};

export default App;
