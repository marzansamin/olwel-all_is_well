/* eslint-disable no-unused-vars */
import { Fragment, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../App.css';
import olwelImage from '../assets/images/olwel.png'; 
import ModalBox from '../assets/components/ModalBox';

const Auth = () => {
  const [showModal, setShowModal] = useState(false);
  const [hasAccount, sethasAccount] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const userName = localStorage.getItem('email') ? localStorage.getItem('email') : 'admin@gmail.com';
  const userPassword = localStorage.getItem('password') ? localStorage.getItem('password') : 'admin';
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    const storedAdmins = JSON.parse(localStorage.getItem('admins')) || [];
    setAdmins(storedAdmins.map(admin => ({ ...admin, active: true }))); 
  }, []);


  const handleCloseModal = () => {
    setShowModal(false);
    setName('');
    setEmail('');
    setPassword('');
  };

  const handleSubmitLogin = (e) => {
    e.preventDefault();
    const existingAdmins = JSON.parse(localStorage.getItem('admins')) || [];
    const user = existingAdmins.find(admin => admin.email === email && admin.password === password);
    if(user){
      if(!user.active){
        toast.error("Your Account Is Inactive. Please Contact Support For Assistance.");
      }else{
        toast.success("Login Successful!")
        handleCloseModal()
        navigate('/dashboard')
      }
    }else{
      toast.error("Invalid Email OR Password");
    }
  };  

  const handleSubmitRegister = (e) => {
    e.preventDefault();
    if (name === "") {
      toast.error("Name Is Required");
    } else if (email === "") {
      toast.error("Email Is Required");
    } else if (password === "") {
      toast.error("Password Is Required");
    } else {
      const existingAdmins = JSON.parse(localStorage.getItem('admins')) || [];
      if (existingAdmins.length === 0) {
        const newAdmin = { name, email, password, role: 'Super Admin', active: true };
        localStorage.setItem('admins', JSON.stringify([newAdmin]));
        toast.success("Super Admin Registration Successful!");
        navigate('/dashboard');
        handleCloseModal();
      } else {
        const emailExists = existingAdmins.some(admin => admin.email === email);
        if (!emailExists) {
          const newAdmin = { name, email, password, role: 'Subordinate', active: true };
          const updatedAdmins = [...existingAdmins, newAdmin];
          localStorage.setItem('admins', JSON.stringify(updatedAdmins));
          toast.success("Subordinate Admin Registration Successful!");
          navigate('/dashboard');
          handleCloseModal();
        } else {
          toast.error("Email Already In Use");
        }
      }
    }
  };
  

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
            <button onClick={() => setShowModal(true)} className="bg-[#1C4E80] hover:bg-[#0091D5] text-white font-bold py-2 px-4 rounded mt-7 ml-10">Get Started</button>
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
                <input placeholder='Name' type='text' value={name} onChange={(e) =>setName(e.target.value)} className='p-3 shadow-md bg-slate-100 border-solid border-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500' />
              )}
              <input placeholder='Email' type='email' className=' mt-4 p-3 shadow-md bg-slate-100 border-solid border-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500' value={email} onChange={(e) =>setEmail(e.target.value)} />
              <input placeholder='Password' type='password' className='mt-4 p-3 shadow-md bg-slate-100 border-solid border-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500' value={password} onChange={(e) =>setPassword(e.target.value)} />
            </div>
            <button type='submit'
              className='rounded w-[200px] p-3 mt-6 text-xl bg-[#1C4E80] hover:bg-[#0091D5] text-white font-bold place-self-center'
            >
              {!hasAccount ? "Sign Up" : "Log In"}
            </button>
            <button className='mt-4 text-gray-700' onClick={() => {sethasAccount(true)}} style={{display: hasAccount ? 'none' : 'block'}}>Already Have An Account?</button>
            <button onClick={() => {sethasAccount(false)}} className='mt-4 text-gray-700' style={{display: hasAccount ? 'block' : 'none'}}>Dont Have An Account?</button>
          </div>
        </ModalBox>
      )}
    </Fragment>
  )
}

export default Auth;
