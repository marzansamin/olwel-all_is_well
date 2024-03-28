import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

//pages
import Auth from './pages/Auth';
import AdminHome from './pages/AdminHome';
import AdminPanel from './pages/AdminPanel';
import { ToastContainer } from 'react-toastify';

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
          <Route path='/dashboard' element={<AdminHome />} />         
          <Route path='/dashboard/admin-panel' element={<AdminPanel />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
