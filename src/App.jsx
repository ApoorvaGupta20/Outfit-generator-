import Navbar from './components/navbar.jsx';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Wardrobe from './pages/wardrobe.jsx';
import Outfit from './pages/outfit.jsx';
import SavedOutfits from './pages/SavedOutfit.jsx';
import OutfitCalender from './pages/CalenderOOTD.jsx';
import Footer from './components/Footer.jsx';

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/wardrobe" element={<Wardrobe />} />
        <Route path="/outfit" element={<Outfit />} />
        <Route path="/saved" element={<SavedOutfits />} />
        <Route path="/calendar" element={<OutfitCalender />} /> 
      </Routes>
      <Footer />
    </>
  );
}
