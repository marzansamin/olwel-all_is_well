/* eslint-disable no-unused-vars */
import { FcBusinessman } from "react-icons/fc";
import Navbar from '../assets/components/Navbar';
import Sidebar from '../assets/components/Sidebar';
import Breadcrumbs from "../assets/components/Breadcrumbs";
import ModalBox from "../assets/components/ModalBox";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Switch } from 'antd'

const AdminPanel = () => { 
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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

  useEffect(() => {
    const storedAdmins = JSON.parse(localStorage.getItem('admins')) || [];
    setAdmins(storedAdmins);
  }, []); 

  const handleSubmit = (e) => {
    e.preventDefault();
    if(name === ""){
      toast.error("Name Is Required");
    } else if(email === ""){
      toast.error("Email Is Required");
    } else if(password === ""){
      toast.error("Password Is Required");
    } else {
      const existingAdmins = JSON.parse(localStorage.getItem('admins')) || [];
      const emailExists = existingAdmins.some(admin => admin.email === email);
      if(!emailExists){
        const newAdmin = { name, email, password, role: "Subordinate", active: true };
        setAdmins(prevAdmins => [...prevAdmins, newAdmin]);
        localStorage.setItem('admins', JSON.stringify([...admins, newAdmin])); 
        toast.success("New Admin Added!");
        handleCloseModal();
      }
      else{
        toast.error("Email Already In Use");
      }
    }
  }

  const handleToggleActive = (adminEmail) => {
    const updatedAdmins = admins.map(admin =>
      admin.email === adminEmail ? { ...admin, active: !admin.active } : admin
    );
    setAdmins(updatedAdmins);
    localStorage.setItem('admins', JSON.stringify(updatedAdmins));
  };

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
                <span className='opacity-70 text-lg text-[#F1F1F1]'></span>
              </div>
            </div>
            {/* Sidebar Items */}
            <Sidebar />
          </div>
          {/* Main Page */}
          <div className="flex flex-col p-7 w-[80%]">
            <Breadcrumbs />
            <div className="flex flex-col">
              {/* add new button */}
              <button onClick={() => setShowModal(true)} className="bg-[#1C4E80] place-self-start hover:bg-[#0091D5] text-white text-lg py-2 px-4 rounded mt-5">Add New Admin</button>
              {/* show the admin */}
              {
                admins.length>0 && (
                  <div className="mt-10">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Serial</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">State</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {admins.map((admin, index) => (
                          <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} ${admin.active ? 'text-black' : 'text-gray-500'}`}>
                            <td className="px-6 py-4 whitespace-nowrap text-left">{index + 1}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-left">{admin.name}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-left">{admin.email}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-left">{admin.role}</td>
                            <td className="px-4 py-4 whitespace-nowrap text-left">
                            <Switch className="ml-1 mr-3 bg-[#A5D8DD]" onClick={() => handleToggleActive(admin.email)} checked={admin.active} />
                            {admin.active ? <span>Active</span> : <span>Inactive</span>}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )
              }
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