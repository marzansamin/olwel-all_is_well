/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
import { FcBusinessman } from "react-icons/fc";
import Navbar from '../assets/components/Navbar';
import Sidebar from '../assets/components/Sidebar';
import Breadcrumbs from "../assets/components/Breadcrumbs";
import { AiOutlineSearch } from 'react-icons/ai';
import { useState, useEffect } from "react";
import ModalBox from "../assets/components/ModalBox";
import { toast } from "react-toastify";
import { Switch } from "antd";

export const getDepartmentNames = () => {
  const storedDepartments = JSON.parse(localStorage.getItem("departments")) || [];
  return storedDepartments.map((dept) => dept.name);
};

const Doctors = () => {
  const [showModal, setShowModal] = useState();
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [open, setOpen] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [search, setSearch] = useState("");
  const departmentNames = getDepartmentNames();

  const handleCloseModal = () => {
    setShowModal(false);
    setName("");
    setDepartment("");
  }

  useEffect(() => {
    const storedDoctors = JSON.parse(localStorage.getItem('doctors')) || [];
    setDoctors(storedDoctors.map(doctor => ({ ...doctor, available: true }))); 
  }, []);

  useEffect(() => {
    const storedDoctors = JSON.parse(localStorage.getItem('doctors')) || [];
    setDoctors(storedDoctors);
  }, []);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if(name === ""){
      toast.error("Name Is Required");
    }else if(department === ""){
      toast.error("Department Is Required");
    }else{
      const currentDate = new Date();
      const day = String(currentDate.getDate()).padStart(2, '0');
      const month = String(currentDate.getMonth() + 1).padStart(2, '0'); 
      const year = currentDate.getFullYear();
      const formattedDate = `${day}/${month}/${year}`;
      const existingDoctors = JSON.parse(localStorage.getItem('doctors')) || [];
      const doctorExists = existingDoctors.some(doctor => doctor.name === name);
      if(!doctorExists){
        const newDoctor = { name, department, joiningDate: formattedDate, available: true};
        setDoctors(prevDoctors => [...prevDoctors, newDoctor]);
        localStorage.setItem('doctors', JSON.stringify([...doctors, newDoctor]));
        toast.success("New Doctor Added!");
        handleCloseModal();
      }else{
        toast.error("Doctor Already Exists");
      }
    }
  }

  const handleToggleActive = (doctorName) => {
    const updatedDoctors = doctors.map(doctor =>
      doctor.name === doctorName ? { ...doctor, available: !doctor.available } : doctor
    );
    setDoctors(updatedDoctors);
    localStorage.setItem('doctors', JSON.stringify(updatedDoctors));
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
          <div className="flex flex-col p-4 w-[80%]">
            <Breadcrumbs />
            <div className="flex flex-row items-center">
              {/* add new button */}
              <button onClick={() => setShowModal(true)} className="bg-[#1C4E80] place-self-start hover:bg-[#0091D5] text-white text-lg py-2 px-4 rounded mt-5">Add New Doctor</button>
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
            {/* show the doctors */}
            {
                doctors.length>0 && (
                  <div className="mt-10">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Serial</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joining Date</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">State</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {doctors.filter((index) => {
                          return search.toLowerCase() === "" ? index : index.department.toLowerCase().includes(search), index.name.toLowerCase().includes(search)
                        }).map((doctor, index) => (
                          <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} ${doctor.available ? 'text-black' : 'text-gray-500'}`}>
                            <td className="px-6 py-4 whitespace-nowrap text-left">{index + 1}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-left">{doctor.name}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-left">{doctor.department}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-left">{doctor.joiningDate}</td>
                            <td className="px-4 py-4 whitespace-nowrap text-left">
                            <Switch className="ml-1 mr-3 bg-[#A5D8DD]" onClick={() => handleToggleActive(doctor.name)} checked={doctor.available} />
                            {doctor.available ? <span>Available</span> : <span>Blocked</span>}
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
                    <h3 className="text-xl font-semibold text-gray-700">Add New Doctor</h3>
                    <div className='flex flex-col mt-6'>
                      <input placeholder='Name' type='text' value={name} onChange={e => setName(e.target.value)} className='p-3 shadow-md bg-slate-100 border-solid border-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500' />
                      <div className="">
                        <div onClick={() => setOpen(!open)} className={`bg-slate-100 flex rounded text-left mt-4 p-3 shadow-md text-${!department ? "slate-400" : "black"} border-solid border-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500`}>
                          {department ? department : "Select Department"}
                        </div>
                        <ul className={`bg-white mt-4 overflow-y-auto ${open ? "max-h-40" : "max-h-0"}`}>
                          <div className="flex items-center px-2 sticky top-0 bg-white">
                            <AiOutlineSearch size={18} className="text-slate-400" />
                            <input type="text" placeholder="Enter Department Name" value={inputValue} onChange={(e) => setInputValue(e.target.value.toLowerCase())} className="placeholder:text-slate-400 p-2 outline-none" />
                          </div>
                          {
                            departmentNames.map((dept) => (
                              <li key={dept} className={`p-2 text-sm hover:bg-[#0091D5] hover:text-white ${dept.toLowerCase().startsWith(inputValue) ? "block" : "hidden"} ${dept.toLowerCase() === department.toLowerCase() && "bg-[#0091D5] text-white"}`} onClick={() => {
                                if(dept.toLowerCase() !== department.toLowerCase()){
                                  setDepartment(dept);
                                  setOpen(false);
                                  setInputValue("");
                                }
                              }}>{dept}</li>
                            ))
                          }
                        </ul>
                      </div>
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

export default Doctors