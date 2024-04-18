
import './App.css'
import MainCom from './Components/MainCom';
import Navbar from './Components/Navbar';
import VerifyOTP from './Components/VerifyOtp';
import Login from './Components/Login';
import { Navigate } from 'react-router-dom';
import Signup from './Components/Signup'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  const currentPath = window.location.pathname;
  const showNavbar = currentPath==='/home';
  return (
    <div>
    {showNavbar && <Navbar />}
    <Router>
    <Routes>
      <Route path="/" element={<Signup />} />
      <Route path="/verify-otp" element={<VerifyOTP />} />
      <Route path="/home" element={<MainCom />} />
      <Route path="/login" element={<Login />} />

      <Route path="/*" element={<Navigate to="/" />} />
    </Routes>
    </Router>
  </div>
  )
}

export default App
