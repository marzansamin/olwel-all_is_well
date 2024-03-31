/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
import { FcBusinessman } from "react-icons/fc";
import Navbar from '../assets/components/Navbar';
import Sidebar from '../assets/components/Sidebar';
import Breadcrumbs from "../assets/components/Breadcrumbs";
import { useState, useEffect } from "react";
import { AiOutlineSearch } from 'react-icons/ai';
import ModalBox from "../assets/components/ModalBox";
import { toast } from "react-toastify";

export const getPatientNames = () => {
  const storedPatients = JSON.parse(localStorage.getItem("appointments")) || [];
  const admittedPatients = storedPatients.filter(app => app.admitted === true);
  return admittedPatients.map((appo) => appo.name);
};

const Prescription = () => {
  const [showModal, setShowModal] = useState();
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [name, setName] = useState("");
  const patientNames = getPatientNames();
  const [healthIssue, setHealthIssue] = useState("");
  const [medicine, setMedicine] = useState("");
  const [prescriptions, setPrescriptions] = useState([]);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const storedAppointments = JSON.parse(localStorage.getItem('appointments')) || [];
    setAppointments(storedAppointments);
  }, []);

  const handleCloseModal = () => {
    setShowModal(false);
    setName("");
    setHealthIssue("");
    setMedicine("");
  }

  useEffect(() => {
    const storedPrescriptions = JSON.parse(localStorage.getItem('prescriptions')) || [];
    setPrescriptions(storedPrescriptions);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if(name === ""){
      toast.error("Name Is Required");
    }else if(healthIssue === ""){
      toast.error("Health Issue Is Required");
    }else if(medicine === ""){
      toast.error("Prescribed Medicine Is Required");
    }else{
      const newPrescription = { name, healthIssue, medicine };
      setPrescriptions(prevPrescriptions => [...prevPrescriptions, newPrescription]);
      localStorage.setItem('prescriptions', JSON.stringify([...prescriptions, newPrescription]));
      toast.success("New Prescription Added!");
      
      const updatedAppointments = appointments.map(app => {
        if (app.name === name) {
          return { ...app, admitted: false }; // Discharge the patient
        }
        return app;
      });
      setAppointments(updatedAppointments);
      localStorage.setItem('appointments', JSON.stringify(updatedAppointments));
      
      handleCloseModal();
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
              <button onClick={() => setShowModal(true)} className="bg-[#1C4E80] place-self-start hover:bg-[#0091D5] text-white text-lg py-2 px-4 rounded mt-5">Add New Prescription</button>
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
            {/* show the prescriptions */}
            {
                prescriptions.length>0 && <div className="mt-10 grid grid-cols-3 gap-5">
                  {
                    prescriptions.map((prescription, index) => (
                      <div key={index} className="flex flex-col bg-white hover:shadow-inner p-3 shadow-2xl">
                        <div className="border-slate-300">
                          <h1 className='text-2xl font-normal'>{prescription.name}</h1>
                        </div>
                        <h6 className="mt-5 text-slate-500 text-base">Health Issue: {prescription.healthIssue}</h6>
                        <h6 className="mt-5 text-slate-500 text-base">Prescribed Medicine: {prescription.medicine}</h6>
                      </div>
                    ))
                  }
                </div>
              }
            {showModal && (
              <ModalBox isVisible={showModal} onClose={() => setShowModal(false)}>
                <div className='flex flex-col p-6 text-left justify-center'>
                  <h3 className="text-xl font-semibold text-gray-700">Add New Appointment</h3>
                  <div className='flex flex-col mt-6'>
                    <div className="">
                      <div onClick={() => setOpen(!open)} className={`bg-slate-100 flex rounded text-left mt-4 p-3 shadow-md text-${!name ? "slate-400" : "black"} border-solid border-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500`}>
                        {name ? name : "Select Patient Name"}
                      </div>
                      <ul className={`bg-white mt-4 overflow-y-auto ${open ? "max-h-40" : "max-h-0"}`}>
                        <div className="flex items-center px-2 sticky top-0 bg-white">
                          <AiOutlineSearch size={18} className="text-slate-400" />
                          <input type="text" placeholder="Enter Patient Name" value={inputValue} onChange={(e) => setInputValue(e.target.value.toLowerCase())} className="placeholder:text-slate-400 p-2 outline-none" />
                        </div>
                        {
                          patientNames.map((pat) => (
                            <li key={pat} className={`p-2 text-sm hover:bg-[#0091D5] hover:text-white ${pat.toLowerCase().startsWith(inputValue) ? "block" : "hidden"} ${pat.toLowerCase() === name.toLowerCase() && "bg-[#0091D5] text-white"}`} onClick={() => {
                              if(pat.toLowerCase() !== name.toLowerCase()){
                                setName(pat);
                                setOpen(false);
                                setInputValue("");
                              }
                            }}>{pat}</li>
                          ))
                        }
                      </ul>
                    </div>
                    <input placeholder='Health Issue' type='text' value={healthIssue} onChange={e => setHealthIssue(e.target.value)} className='p-3 shadow-md bg-slate-100 border-solid border-slate-400 focus:outline-none focus:border-sky-500 
                    focus:ring-1 focus:ring-sky-500' />
                    <input placeholder='Prescribed Medicine' type='text' value={medicine} onChange={e => setMedicine(e.target.value)} className='p-3 mt-4 shadow-md bg-slate-100 border-solid border-slate-400 focus:outline-none focus:border-sky-500 
                    focus:ring-1 focus:ring-sky-500' />
                  </div>
                  <button type="submit" onClick={handleSubmit} className='rounded w-[200px] p-3 mt-6 text-xl bg-[#1C4E80] hover:bg-[#0091D5] text-white font-bold place-self-center'>Submit</button>
                </div>
              </ModalBox>
            )}
          </div>
        </div>
      </div>
  )
}

export default Prescription;