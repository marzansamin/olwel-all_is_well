import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

//pages
import Auth from './pages/Auth';
import AdminHome from './pages/AdminHome';
import DoctorHome from './pages/DoctorHome';
import PatientHome from './pages/PatientHome';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Auth />} />
          <Route path='/admin-home' element={<AdminHome />} />         
          <Route path='/doctor-home' element={<DoctorHome />} />
          <Route path='/patient-home' element={<PatientHome />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
