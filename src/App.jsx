import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './MyComponents/Navbar';
import Home from './pages/Home';
import Plates from './pages/Plates';
import PlateDetail from './pages/PlateDetail';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/plates" element={<Plates />} />
          <Route path="/plates/:id" element={<PlateDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
