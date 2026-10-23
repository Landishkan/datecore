// src/App.jsx
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Layout, { scrollToTarget } from './components/layout/Layout';
import Home from './pages/Home';
import ServicePage from './pages/ServicePage';

function AnimatedRoutes({ onNavigate }) {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <Layout>
              <Home onNavigate={onNavigate} />
            </Layout>
          }
        />
        <Route
          path="/:slug"
          element={
            <Layout>
              <ServicePage />
            </Layout>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  const handleNavigate = (target) => {
    if (target === 'top') {
      scrollToTarget('top');
    } else if (typeof target === 'string' && target.startsWith('#')) {
      scrollToTarget(target, -88);
    } else {
      scrollToTarget(`#${target}`, -88);
    }
  };

  return (
    <BrowserRouter>
      <AnimatedRoutes onNavigate={handleNavigate} />
    </BrowserRouter>
  );
}