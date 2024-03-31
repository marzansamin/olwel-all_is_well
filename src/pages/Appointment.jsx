/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
import { useState, useEffect } from "react";
import { FcBusinessman } from "react-icons/fc";
import Navbar from '../assets/components/Navbar';
import Sidebar from '../assets/components/Sidebar';
import Breadcrumbs from "../assets/components/Breadcrumbs";
import { AiOutlineSearch } from 'react-icons/ai';
import ModalBox from "../assets/components/ModalBox";
import { toast } from "react-toastify";
import { Switch } from "antd";

export const getPatientsNames = () => {
  const storedPatients = JSON.parse(localStorage.getItem("patients")) || [];
  return storedPatients.map((pat) => pat.name);
};

export const getDepartmentNames = () => {
  const storedDepartments = JSON.parse(localStorage.getItem("departments")) || [];
  return storedDepartments.map((pat) => pat.name);
};

export const getDoctorsNames = () => {
  const storedDoctors = JSON.parse(localStorage.getItem("doctors")) || [];
  const availableDoctors = storedDoctors.filter(doctor => doctor.available === true);
  return availableDoctors.map((doctor) => doctor.name);
};

const Appointment = () => {
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");
  const [name, setName] = useState("");
  const [dept, setDept] = useState("");
  const [doctor, setDoctor] = useState("");
  const [openName, setOpenName] = useState(false);
  const [openDept, setOpenDept] = useState(false);
  const [openDoctor, setOpenDoctor] = useState(false);
  const [inputValueName, setInputValueName] = useState("");
  const [inputValueDept, setInputValueDept] = useState("");
  const [inputValueDoctor, setInputValueDoctor] = useState("");
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const patientNames = getPatientsNames();
  const departmentNames = getDepartmentNames();
  const doctorNames = getDoctorsNames();

  const handleCloseModal = () => {
    setShowModal(false);
    setName("");
    setDept("");
    setDoctor("");
  }

  useEffect(() => {
    const storedAppo = JSON.parse(localStorage.getItem('appointments')) || [];
    setAppointments(storedAppo.map(app => ({ ...app, admitted: true }))); 
  }, []);

  useEffect(() => {
    const storedAppo = JSON.parse(localStorage.getItem('appointments')) || [];
    setAppointments(storedAppo);
  }, []);

  useEffect(() => {
    if (dept) {
      const filtered = doctorNames.filter(docName => {
        const doctorData = JSON.parse(localStorage.getItem("doctors")).find(doc => doc.name === docName);
        return doctorData && doctorData.department === dept && doctorData.available;
      });
      setFilteredDoctors(filtered);
    } else {
      setFilteredDoctors([]);
    }
  }, [dept]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if(name === ""){
      toast.error("Name Is Required");
    }else if(dept === ""){
      toast.error("Department Is Required");
    }else if(doctor === ""){
      toast.error("Doctor Name Is Required");
    }else{
      const currentDate = new Date();
      const day = String(currentDate.getDate()).padStart(2, '0');
      const month = String(currentDate.getMonth() + 1).padStart(2, '0'); 
      const year = currentDate.getFullYear();
      const formattedDate = `${day}/${month}/${year}`;
      const newApp = { name, dept, doctor, joiningDate: formattedDate, admitted: true};
      setAppointments(prevApps => [...prevApps, newApp]);
      localStorage.setItem('appointments', JSON.stringify([...appointments, newApp]));
      toast.success("New Appointment Added!");
      handleCloseModal();
    }
  };

  const handleToggleActive = (appName) => {
    const updatedApps = appointments.map(app =>
      app.name === appName ? { ...app, admitted: !app.admitted } : app
    );
    setAppointments(updatedApps);
    localStorage.setItem('appointments', JSON.stringify(updatedApps));
  };

  const handleDeptChange = (e) => {
    setDept(e.target.value);
  };

  return (
    <div className="w-full h-fit overflow-hidden bg-[#F1F1F1] flex flex-col">
      <Navbar />
      <div className="flex flex-row">
        <div className= 'bg-[#1C4E80] shadow-md h-[96%] w-[20%] border transition-all duration-500 border-solid border-[#1C4E80] relative overflow-y-auto'>
          <div className='bg-[#1C4E80] p-4 flex gap-5 items-center shadow-xl'>
            <div>
              <FcBusinessman className='w-20 h-20 ' />
            </div>
            <div className='text-left'>
              <h3 className='text-2xl text-[#F1F1F1]'>Admin</h3>
              <span className='opacity-70 text-lg text-[#F1F1F1]'></span>
            </div>
          </div>
          <Sidebar />
        </div>
        <div className="flex flex-col p-4 w-[80%]">
          <Breadcrumbs />
          <div className="flex flex-row items-center">
            <button onClick={() => setShowModal(true)} className="bg-[#1C4E80] place-self-start hover:bg-[#0091D5] text-white text-lg py-2 px-4 rounded mt-5">Add New Appointment</button>
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
          {
                appointments.length>0 && (
                  <div className="mt-10">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Serial</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient Name</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Doctor Name</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Admit Date</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">State</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {appointments.filter((app) => {
                            const searchTerm = search.toLowerCase();
                            const nameMatches = app.name.toLowerCase().includes(searchTerm);
                            const departmentMatches = app.dept.toLowerCase().includes(searchTerm);
                            const doctorMatches = app.doctor.toLowerCase().includes(searchTerm);
                            return nameMatches || departmentMatches || doctorMatches;
                        }).map((app, index) => (
                          <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} ${app.admitted ? 'text-black' : 'text-gray-500'}`}>
                            <td className="px-6 py-4 whitespace-nowrap text-left">{index + 1}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-left">{app.name}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-left">{app.dept}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-left">{app.doctor}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-left">{app.joiningDate}</td>
                            <td className="px-4 py-4 whitespace-nowrap text-left">
                            <Switch className="ml-1 mr-3 bg-[#A5D8DD]" onClick={() => handleToggleActive(app.name)} checked={app.admitted} />
                            {app.admitted ? <span>Admitted</span> : <span>Discharged</span>}
                            </td>
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
                <h3 className="text-xl font-semibold text-gray-700">Add New Appointment</h3>
                <div className='flex flex-col mt-6'>
                  <div className="">
                    <div onClick={() => setOpenName(!openName)} className={`bg-slate-100 flex rounded text-left mt-4 p-3 shadow-md text-${!name ? "slate-400" : "black"} border-solid border-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500`}>
                      {name ? name : "Select Patient Name"}
                    </div>
                    <ul className={`bg-white mt-4 overflow-y-auto ${openName ? "max-h-40" : "max-h-0"}`}>
                      <div className="flex items-center px-2 sticky top-0 bg-white">
                        <AiOutlineSearch size={18} className="text-slate-400" />
                        <input type="text" placeholder="Enter Patient Name" value={inputValueName} onChange={(e) => setInputValueName(e.target.value.toLowerCase())} className="placeholder:text-slate-400 p-2 outline-none" />
                      </div>
                      {
                        patientNames.map((pat) => (
                          <li key={pat} className={`p-2 text-sm hover:bg-[#0091D5] hover:text-white ${pat.toLowerCase().startsWith(inputValueName) ? "block" : "hidden"} ${pat.toLowerCase() === name.toLowerCase() && "bg-[#0091D5] text-white"}`} onClick={() => {
                            if(pat.toLowerCase() !== name.toLowerCase()){
                              setName(pat);
                              setOpenName(false);
                              setInputValueName("");
                            }
                          }}>{pat}</li>
                        ))
                      }
                    </ul>
                  </div>
                  <div className="">
                    <div onClick={() => setOpenDept(!openDept)} className={`bg-slate-100 flex rounded text-left mt-4 p-3 shadow-md text-${!dept ? "slate-400" : "black"} border-solid border-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500`}>
                      {dept ? dept : "Select Department Name"}
                    </div>
                    <ul className={`bg-white mt-4 overflow-y-auto ${openDept ? "max-h-40" : "max-h-0"}`}>
                      <div className="flex items-center px-2 sticky top-0 bg-white">
                        <AiOutlineSearch size={18} className="text-slate-400" />
                        <input type="text" placeholder="Enter Department Name" value={inputValueDept} onChange={(e) => setInputValueDept(e.target.value.toLowerCase())} className="placeholder:text-slate-400 p-2 outline-none" />
                      </div>
                      {
                        departmentNames.map((depart) => (
                          <li key={depart} className={`p-2 text-sm hover:bg-[#0091D5] hover:text-white ${depart.toLowerCase().startsWith(inputValueDept) ? "block" : "hidden"} ${depart.toLowerCase() === dept.toLowerCase() && "bg-[#0091D5] text-white"}`} onClick={() => {
                            if(depart.toLowerCase() !== dept.toLowerCase()){
                              setDept(depart);
                              setOpenDept(false);
                              setInputValueDept("");
                            }
                          }}>{depart}</li>
                        ))
                      }
                    </ul>
                  </div>
                  <div className="">
                    <div onClick={() => setOpenDoctor(!openDoctor)} className={`bg-slate-100 flex rounded text-left mt-4 p-3 shadow-md text-${!doctor ? "slate-400" : "black"} border-solid border-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500`}>
                      {doctor ? doctor : "Select Doctor Name"}
                    </div>
                    <ul className={`bg-white mt-4 overflow-y-auto ${openDoctor ? "max-h-40" : "max-h-0"}`}>
                      <div className="flex items-center px-2 sticky top-0 bg-white">
                        <AiOutlineSearch size={18} className="text-slate-400" />
                        <input type="text" placeholder="Enter Doctor Name" value={inputValueDoctor} onChange={(e) => setInputValueDoctor(e.target.value.toLowerCase())} className="placeholder:text-slate-400 p-2 outline-none" />
                      </div>
                      {
                        filteredDoctors.map((doc) => ( // Use filteredDoctors here instead of doctorNames
                          <li key={doc} className={`p-2 text-sm hover:bg-[#0091D5] hover:text-white ${doc.toLowerCase().startsWith(inputValueDoctor) ? "block" : "hidden"} ${doc.toLowerCase() === doctor.toLowerCase() && "bg-[#0091D5] text-white"}`} onClick={() => {
                            if(doc.toLowerCase() !== doctor.toLowerCase()){
                              setDoctor(doc);
                              setOpenDoctor(false);
                              setInputValueDoctor("");
                            }
                          }}>{doc}</li>
                        ))
                      }
                    </ul>
                  </div>
                </div>
                <button type="submit" onClick={handleSubmit} className='rounded w-[200px] p-3 mt-6 text-xl bg-[#1C4E80] hover:bg-[#0091D5] text-white font-bold place-self-center'>Submit</button>
              </div>
            </ModalBox>
          )}
        </div>
      </div>
    </div>
  );
};

export default Appointment;