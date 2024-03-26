import { FcBusinessman } from "react-icons/fc";
import Navbar from '../assets/components/Navbar';
import Sidebar from '../assets/components/Sidebar';
import Breadcrumbs from "../assets/components/Breadcrumbs";
const AdminHome = () => {
  return (
    <div className="w-full h-fit overflow-hidden bg-[#FAF1E4] flex flex-col">
        {/* Navbar */}
        <Navbar />
        <div className="flex flex-row">
          {/* Sidebar */}
          <div className= 'bg-[#c6d2ba] shadow-md h-[96%] w-[20rem] border transition-all duration-500 border-solid border-[#CEDEBD] relative overflow-y-auto'>
            {/* User profile */}
            <div className='bg-[#9EB384] p-4 flex gap-5 items-center shadow-xl'>
              <div>
                <FcBusinessman className='w-20 h-20 ' />
              </div>
              <div className='text-left'>
                <h3 className='text-2xl text-[#435334]'>Admin</h3>
                <span className='opacity-70 text-lg text-[#435334]'>Riyad Hasan</span>
              </div>
            </div>
            {/* Sidebar Items */}
            <Sidebar />
          </div>
          {/* Main Page */}
          <div>
            <Breadcrumbs />
          </div>
        </div>
      </div>
  )
}

export default AdminHome;
