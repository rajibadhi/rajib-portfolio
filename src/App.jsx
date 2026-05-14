import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Portfolio from './pages/Portfolio';
import Admin from './pages/Admin';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}
