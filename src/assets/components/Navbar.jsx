import { useState } from 'react';
import olwelImage from '../images/olwel.png'; 
import { CiBellOn } from "react-icons/ci";
import { CiMail } from "react-icons/ci";
import { FcBusinessman } from "react-icons/fc";
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const options = ["Admin Panel", "Logout"];
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className='bg-[#1C4E80] h-[10%] w-full p-4 border transition-all duration-500 border-solid border-[#1C4E80] relative flex flex-row justify-between items-center shadow-4xl ' style={{ backdropFilter: 'blur(10px)', opacity: '0.9' }}>
      <div className='flex items-center justify-center'>
        <img src={olwelImage} className='w-10 h-10 brightness-0 invert' alt="Olwel Logo" />
        <h1 className='font-semibold text-3xl text-[#F1F1F1] ml-4'>Olwel</h1>
      </div>
      <div className='flex items-center space-x-7 mr-20'>
        <CiBellOn className='w-10 h-10 hover:shadow-md hover:rounded-md text-[#F1F1F1] font-medium' />
        <CiMail className='w-10 h-10 hover:shadow-md hover:rounded-md text-[#F1F1F1] font-medium' />
        <div className='relative'>
          <FcBusinessman className='w-10 h-10 object-cover border-2 border-white rounded-full cursor-pointer' onClick={() => setOpen(!open)} />
          {
            open && (
              <div className='bg-white p-2 w-40 shadow-lg absolute -left-14 top-14 text-left'>
                <ul>
                  {
                    options.map((option) => (
                      <li onClick={() => {
                        if (option === "Admin Panel") {
                          navigate("/dashboard/admin-panel"); 
                        } else if(option === "Logout"){
                          navigate("/");
                        }
                        setOpen(false);
                      }} key={option} className='p-2 text-lg cursor-pointer rounded hover:bg-[#A5D8DD]'>
                        {option}
                      </li>
                    ))
                  }
                </ul>
              </div>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default Navbar