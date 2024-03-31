/* eslint-disable no-unused-vars */
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'antd/dist/reset.css'

//pages
import Auth from './pages/Auth';
import AdminHome from './pages/AdminHome';
import AdminPanel from './pages/AdminPanel';
import Departments from './pages/Departments'
import Doctors from './pages/Doctors';
import Patients from './pages/Patients';
import Appointment from './pages/Appointment';
import Prescription from './pages/Prescription';

function App() {
  return (
    <>
      <ToastContainer
        position='top-center'
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Auth />} />
          <Route path='/dashboard' element={<AdminPanel />} />         
          <Route path='/dashboard/admin-panel' element={<AdminPanel />} />
          <Route path='/dashboard/departments' element={<Departments />} />
          <Route path='/dashboard/doctors' element={<Doctors />} />
          <Route path='/dashboard/patients' element={<Patients />} />
          <Route path='/dashboard/appointments' element={<Appointment />} />
          <Route path='/dashboard/prescriptions' element={<Prescription />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
