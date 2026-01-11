import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from "./Components/Navbar";
import Landing from "./Pages/Landing";
import Films from "./Pages/Films";  
import Footer from "./Components/Footer";

function App() {
  return (
    <Router> 
      <div className="bg-black text-white min-h-screen">
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing />} />  
          <Route path="/films" element={<Films />} /> 
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

