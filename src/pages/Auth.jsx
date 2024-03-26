/* eslint-disable no-unused-vars */
import { Fragment, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import '../App.css';
import olwelImage from '../assets/images/olwel.png'; 
import ModalBox from '../assets/components/ModalBox';

const Auth = () => {
  const [showModal, setShowModal] = useState(false);
  const [hasAccount, sethasAccount] = useState(false);
  const [selected, setSelected] = useState(""); //for role selection
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const roles = ['Admin', 'Doctor', 'Patient']

  // Define credentials for different roles
  const credentials = {
    Admin: { email: "admin@gmail.com", password: "123456" },
    Doctor: { email: "doctor@gmail.com", password: "123456" },
    Patient: { email: "patient@gmail.com", password: "123456" }
  };

  const handleSubmitLogin = (e) => {
    e.preventDefault();
    const formData = {
      email,
      password,
      selected
    };
  
    // Retrieve credentials based on the selected role
    const { email: storedEmail, password: storedPassword } = credentials[selected];
  
    if (formData.selected && formData.email === storedEmail && formData.password === storedPassword) {
      setIsLoggedIn(true);

      // Redirect based on the selected role
      if (selected === "Admin") {
        navigate('/admin-home');
      } else if (selected === "Doctor") {
        navigate('/doctor-home');
      } else if (selected === "Patient") {
        navigate('/patient-home');
      }
    } else {
      // Handle invalid credentials
      console.log("Invalid credentials");
    }
  };  

  const handleSubmitRegister= (e) => {
    e.preventDefault();
    const formData = {
      email, password, selected
    }
    console.log(formData);
  }

  return (
    <Fragment>
      <div className='w-full h-screen relative bg-no-repeat' style={{ backgroundImage: "url('https://www.kansashealthsystem.com/-/media/Project/Website/Hero/Care_DoctorPatient_AS230454605_hero.jpg?h=586&w=1440&la=en&hash=0C6ABBA9D22560651D926011D18EEE46F7FD25C5')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
        {!showModal && (
          <div className='flex flex-col justify-center items-center h-full'>
            <div className='flex flex-row justify-center items-center -mt-40'>
              <img src={olwelImage} alt="Olwel Logo" className='w-20 h-20' />
              <h6 className="z-10 text-white text-opacity-300 text-6xl">Olwel</h6>
            </div>
            <h2 className='text-white text-3xl'>Find the best consultant according to your health issues</h2>
            <button onClick={() => setShowModal(true)} className="bg-[#9EB384] hover:bg-[#435334] text-white font-bold py-2 px-4 rounded mt-7 ml-10">Get Started</button>
          </div>
        )}
        <div className="absolute top-0 left-0 w-full bg-gradient-to-tl bg-black opacity-100" />
      </div>
      {showModal && (
        <ModalBox isVisible={showModal} onClose={() => setShowModal(false)} onSubmit={hasAccount ? handleSubmitLogin : handleSubmitRegister}>
          <div className='flex flex-col p-6 text-left justify-center'>
            <h3 className="text-xl font-semibold text-gray-700">{!hasAccount ? "Sign Up To See The Best Healthcare System" : "Log In To View Your Portal"}</h3>
            <div className='flex flex-col mt-6'>
              {!hasAccount && (
                <input placeholder='Name' type='text' className='p-3 shadow-md bg-slate-100 border-solid border-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500' />
              )}
              <input placeholder='Email' type='email' className=' mt-4 p-3 shadow-md bg-slate-100 border-solid border-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500' value={email} onChange={(e) =>setEmail(e.target.value)} />
              <input placeholder='Password' type='password' className='mt-4 p-3 shadow-md bg-slate-100 border-solid border-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500' value={password} onChange={(e) =>setPassword(e.target.value)} />
            </div>
            <div onClick={() => setOpen(true)} className={`mt-4 p-3 shadow-md bg-slate-100 border-solid border-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 flex items-center justify-between ${!selected && 'text-gray-400'}`}>
              <span className="mr-5">{selected ? selected : "Select Role"}</span>
            </div>
            <ul style={{display: open ? 'block' : 'none'}} className='mt-2 p-3 shadow-md bg-slate-100 border-solid border-slate-400'>
              {roles.map((role) => (
                <li key={role} className='p-2 hover:text-white hover:bg-sky-500' onClick={() => {
                  if(role?.toLowerCase() !== selected.toLowerCase){
                    setSelected(role)
                    setOpen(false)
                  }
                }}>{role}</li>
              ))}
            </ul>
            <button 
              className='rounded w-[200px] p-3 mt-6 text-xl bg-[#9EB384] hover:bg-[#435334] text-white font-bold place-self-center'
            >
              {!hasAccount ? "Sign Up" : "Log In"}
            </button>
            <button className='mt-4 text-gray-700' onClick={() => {sethasAccount(true); setEmail(""); setPassword(""); setSelected("")}} style={{display: hasAccount ? 'none' : 'block'}}>Already Have An Account?</button>
            <button onClick={() => {sethasAccount(false); setEmail(""); setPassword(""); setSelected("")}} className='mt-4 text-gray-700' style={{display: hasAccount ? 'block' : 'none'}}>Dont Have An Account?</button>
          </div>
        </ModalBox>
      )}
    </Fragment>
  )
}

export default Auth;
