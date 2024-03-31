/* eslint-disable no-unused-vars */
import { FcBusinessman } from "react-icons/fc";
import Navbar from '../assets/components/Navbar';
import Sidebar from '../assets/components/Sidebar';
import Breadcrumbs from "../assets/components/Breadcrumbs";
import { AiOutlineSearch } from 'react-icons/ai';
import { useState, useEffect } from "react";
import ModalBox from "../assets/components/ModalBox";
import { toast } from "react-toastify";

const Patients = () => {
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [patients, setPatients] = useState([]);

  const handleCloseModal = () => {
    setShowModal(false);
    setName("");
    setAge("");
  }

  useEffect(() => {
    const storedPatients = JSON.parse(localStorage.getItem('patients')) || [];
    setPatients(storedPatients);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if(name === ""){
      toast.error("Name Is Required");
    }else if(age === ""){
      toast.error("Age Is Required");
    }else{
      const currentDate = new Date();
      const day = String(currentDate.getDate()).padStart(2, '0');
      const month = String(currentDate.getMonth() + 1).padStart(2, '0'); 
      const year = currentDate.getFullYear();
      const formattedDate = `${day}/${month}/${year}`;
      const existingPatients = JSON.parse(localStorage.getItem('patients')) || [];
      const patientExists = existingPatients.some(patient => patient.name === name);
      if(!patientExists){
        const newPatient = { name, age, addingDate: formattedDate};
        setPatients(prevPatients => [...prevPatients, newPatient]);
        localStorage.setItem('patients', JSON.stringify([...patients, newPatient]));
        toast.success("New Patient Added!");
        handleCloseModal();
      }else{
        toast.error("Patient Already Exists");
      }
    }
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
                <span className='opacity-70 text-lg text-[#F1F1F1]'></span>
              </div>
            </div>
            {/* Sidebar Items */}
            <Sidebar />
          </div>
          {/* Main Page */}
          <div className="flex flex-col p-4 w-[80%]">
            <Breadcrumbs />
            <div className="flex flex-row items-center">
              {/* add new button */}
              <button onClick={() => setShowModal(true)} className="bg-[#1C4E80] place-self-start hover:bg-[#0091D5] text-white text-lg py-2 px-4 rounded mt-5">Add New Patient</button>
              {/* search bar */}
              <div className='ml-auto flex flex-col justify-center mt-3'>
                <form className="w-[350px] relative">
                  <div className="relative">
                    <input type="search" placeholder="Search" onChange={(e) => setSearch(e.target.value)} className="w-full p-4 rounded-full bg-slate-300 outline-none" />
                    <button className="absolute right-1 top-1/2 -translate-y-1/2 p-4 bg-slate-500 rounded-full">
                      <AiOutlineSearch />
                    </button>
                  </div>
                </form>
              </div>
            </div>
            {/* show the patients */}
            {
                patients.length>0 && (
                  <div className="mt-10">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Serial</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Age</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Admit Date</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {patients.filter((patient) => {
                            const searchTerm = search.toLowerCase();
                            const nameMatches = patient.name.toLowerCase().includes(searchTerm);
                            return nameMatches;
                        }).map((pat, index) => (
                          <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} text-black`}>
                            <td className="px-6 py-4 whitespace-nowrap text-left">{index + 1}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-left">{pat.name}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-left">{pat.age}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-left">{pat.addingDate}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )
              }
            {showModal && (
              <ModalBox isVisible={showModal} onClose={() => setShowModal(false)}>
                <div className='flex flex-col p-6 text-left justify-center'>
                  <h3 className="text-xl font-semibold text-gray-700">Add New Patient</h3>
                  <div className='flex flex-col mt-6'>
                    <input placeholder='Name' type='text' value={name} onChange={e => setName(e.target.value)} className='p-3 shadow-md bg-slate-100 border-solid border-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500' />
                    <input placeholder='Age' type='text' value={age} onChange={e => setAge(e.target.value)} className='p-3 mt-5 shadow-md bg-slate-100 border-solid border-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500' />
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

export default Patients