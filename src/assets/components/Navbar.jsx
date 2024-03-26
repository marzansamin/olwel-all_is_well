import olwelImage from '../images/olwel.png'; 
import { CiBellOn } from "react-icons/ci";
import { CiMail } from "react-icons/ci";
import { FcBusinessman } from "react-icons/fc";

const Navbar = () => {
  return (
    <div className='bg-[#CEDEBD] h-[10%] w-full p-4 border transition-all duration-500 border-solid border-[#CEDEBD] relative flex flex-row justify-between items-center' style={{ backdropFilter: 'blur(10px)', opacity: '0.9', zIndex: '1' }}>
      <div className='flex items-center justify-center'>
        <img src={olwelImage} className='w-10 h-10' alt="Olwel Logo" />
        <h1 className='font-semibold text-3xl text-[#435334] ml-4'>Olwel</h1>
      </div>
      <div className='flex items-center space-x-7 mr-7'>
        <CiBellOn className='w-10 h-10 hover:shadow-md hover:rounded-md' />
        <CiMail className='w-10 h-10 hover:shadow-md hover:rounded-md' />
        <FcBusinessman className='w-10 h-10 hover:shadow-md hover:rounded-md' />
      </div>
    </div>
  )
}

export default Navbar