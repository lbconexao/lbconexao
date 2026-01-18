
import React from 'react';
import { HashRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import Hub from './pages/Hub';
import Saude from './pages/Saude';
import Dev from './pages/Dev';
import Store from './pages/Store';
import Login from './pages/Login';
import Admin from './pages/Admin';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  return (
    <HashRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Hub />} />
        <Route path="/saude" element={<Saude />} />
        <Route path="/dev" element={<Dev />} />
        <Route path="/store" element={<Store />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </HashRouter>
  );
};

export default App;
