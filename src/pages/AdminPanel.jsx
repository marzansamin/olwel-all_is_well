/* eslint-disable no-unused-vars */
import { FcBusinessman } from "react-icons/fc";
import Navbar from '../assets/components/Navbar';
import Sidebar from '../assets/components/Sidebar';
import Breadcrumbs from "../assets/components/Breadcrumbs";
import { CiEdit } from "react-icons/ci";
import ModalBox from "../assets/components/ModalBox";
import { useState, useEffect } from "react";
import { CiTrash } from "react-icons/ci";
import { toast } from "react-toastify";

const AdminPanel = () => { 
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [admins, setAdmins] = useState([]);
  const userName_ = localStorage.getItem('name')

  const handleCloseModal = () => {
    setShowModal(false);
    setName('');
    setEmail('');
    setPassword('');
  };

  useEffect(() => {
    // Load admins from localStorage when component mounts
    const storedAdmins = JSON.parse(localStorage.getItem('admins')) || [];
    setAdmins(storedAdmins);
  }, []); // Empty dependency array to run once on mount

  const handleSubmit = (e) => {
    e.preventDefault();
    if(name === ""){
      toast.error("Name Is Required");
    } else if(email === ""){
      toast.error("Email Is Required");
    } else if(password === ""){
      toast.error("Password Is Required");
    } else {
      // Add the new admin to the array
      const newAdmin = { name, email, password };
      // Update state with new admin
      setAdmins(prevAdmins => [newAdmin, ...prevAdmins]);
      // Store the updated array back to local storage
      localStorage.setItem('admins', JSON.stringify([newAdmin, ...admins]));
      toast.success("New Admin Added!");
      handleCloseModal();
    }
  }

  const handleDelete = (email) => {
    // Filter out the admin with the given email
    const updatedAdmins = admins.filter((admin) => {
      return admin.email !== email;
    });
    // Update state with the filtered admins
    setAdmins(updatedAdmins);
    // Store the updated array back to local storage
    localStorage.setItem('admins', JSON.stringify(updatedAdmins));
  }

  return (
    <div className="w-full h-fit overflow-hidden bg-[#F1F1F1] flex flex-col">
        {/* Navbar */}
        <Navbar />
        <div className="flex flex-row">
          {/* Sidebar */}
          <div className= 'bg-[#1C4E80] shadow-md h-[96%] w-[20%] border transition-all duration-500 border-solid border-[#1C4E80] relative overflow-y-auto'>
            {/* User profile */}
            <div className='bg-[#1C4E80] p-4 flex gap-5 items-center shadow-xl'>
              <div>
                <FcBusinessman className='w-20 h-20 ' />
              </div>
              <div className='text-left'>
                <h3 className='text-2xl text-[#F1F1F1]'>Admin</h3>
                <span className='opacity-70 text-lg text-[#F1F1F1]'>{userName_}</span>
              </div>
            </div>
            {/* Sidebar Items */}
            <Sidebar />
          </div>
          {/* Main Page */}
          <div className="flex flex-col p-4 w-[80%]">
            <Breadcrumbs />
            <div className="flex flex-col">
              {/* add new button */}
              <button onClick={() => setShowModal(true)} className="bg-[#1C4E80] place-self-start hover:bg-[#0091D5] text-white text-lg py-2 px-4 rounded mt-5">Add New Admin</button>
              {/* show the admin */}
              <div className="grid grid-cols-3 mt-4">
                {JSON.parse(localStorage.getItem('admins') || '[]').map((admin, index) => (
                  <div key={index} className="rounded-md bg-slate-300 shadow-lg hover:shadow-2xl p-6 gap-3" style={{marginRight: index % 4 !== 3 ? '1rem' : '0', marginBottom: index < 12 ? '1rem' : '0'}}>
                    <div className="flex flex-row">
                      <div className="flex flex-col text-left">
                        <h4>Name: {admin.name}</h4>
                        <h4>Email: {admin.email}</h4>
                      </div>
                      <div className="flex flex-row ">
                        <CiEdit className='place-self-end mb-10 cursor-pointer text-red-600 w-7 h-7 ml-10 rounded-full rounded-r-full hover:bg-[#7d95ad]' />
                        <CiTrash className='place-self-end mb-10 cursor-pointer text-red-600 w-7 h-7 ml-7 rounded-full rounded-r-full hover:bg-[#7d95ad]' onClick={() => handleDelete(admin.email)} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {showModal && (
              <ModalBox isVisible={showModal} onClose={() => setShowModal(false)}>
                <div className='flex flex-col p-6 text-left justify-center'>
                  <h3 className="text-xl font-semibold text-gray-700">Add New Admin</h3>
                  <div className='flex flex-col mt-6'>
                    <input placeholder='Name' type='text' value={name} onChange={e => setName(e.target.value)} className='p-3 shadow-md bg-slate-100 border-solid border-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500' />
                    <input placeholder='Email' type='email' value={email} onChange={e => setEmail(e.target.value)} className=' mt-4 p-3 shadow-md bg-slate-100 border-solid border-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500' />
                    <input placeholder='Password' type='password' value={password} onChange={e => setPassword(e.target.value)} className='mt-4 p-3 shadow-md bg-slate-100 border-solid border-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500' />
                  </div>
                  <button type="submit" onClick={handleSubmit}
                    className='rounded w-[200px] p-3 mt-6 text-xl bg-[#1C4E80] hover:bg-[#0091D5] text-white font-bold place-self-center'>Submit</button>
                </div>
              </ModalBox>
            )}
          </div>
        </div>
      </div>
  )
}

export default AdminPanel;