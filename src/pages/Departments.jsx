/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
import { FcBusinessman } from "react-icons/fc";
import Navbar from '../assets/components/Navbar';
import Sidebar from '../assets/components/Sidebar';
import Breadcrumbs from "../assets/components/Breadcrumbs";
import { useState, useEffect } from "react";
import ModalBox from "../assets/components/ModalBox";
import { toast } from "react-toastify";

const Departments = () => {
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [departments, setDepartments] = useState([]);

  const handleCloseModal = () => {
    setShowModal(false);
    setName("");
    setDescription("");
  }

  useEffect(() => {
    const storedDepartments = JSON.parse(localStorage.getItem('departments')) || [];
    setDepartments(storedDepartments);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if(name === ""){
      toast.error("Name Is Required");
    }else if(description === ""){
      toast.error("Description Is Required");
    }else{
      const existingDepts = JSON.parse(localStorage.getItem('departments')) || [];
      const deptExists = existingDepts.some(department => department.name === name);
      if(!deptExists){
        const newDept = { name, description };
        setDepartments(prevDepartments => [...prevDepartments, newDept]);
        localStorage.setItem('departments', JSON.stringify([...departments, newDept]));
        toast.success("New Department Added!");
        handleCloseModal();
      }else{
        toast.error("Department Already Exists");
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
            {/* main part */}
            <div className="flex flex-col">
              {/* add new button */}
              <button onClick={() => setShowModal(true)} className="bg-[#1C4E80] place-self-start hover:bg-[#0091D5] text-white text-lg py-2 px-4 rounded mt-5">Add New Department</button>
              {/* show the departments */}
              {
                departments.length>0 && <div className="mt-10 grid grid-cols-3 gap-5">
                  {
                    departments.map((dept, index) => (
                      <div key={index} className="flex flex-col bg-white hover:shadow-inner p-3 shadow-2xl">
                        <div className="border-slate-300">
                          <h1 className='text-2xl font-normal'>{dept.name}</h1>
                        </div>
                        <h6 className="mt-5 text-slate-500 text-base">{dept.description}</h6>
                      </div>
                    ))
                  }
                </div>
              }
            </div>
            {showModal && (
              <ModalBox isVisible={showModal} onClose={() => setShowModal(false)}>
                <div className='flex flex-col p-6 text-left justify-center'>
                  <h3 className="text-xl font-semibold text-gray-700">Add New Department</h3>
                  <div className='flex flex-col mt-6'>
                    <input placeholder='Name' type='text' value={name} onChange={e => setName(e.target.value)} className='p-3 shadow-md bg-slate-100 border-solid border-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500' />
                    <textarea placeholder='Description' rows={3} type='text' value={description} onChange={e => setDescription(e.target.value)} 
                    className='mt-4 p-3 shadow-md bg-slate-100 border-solid border-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 resize-none'></textarea>
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

export default Departments