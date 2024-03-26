import { useNavigate } from 'react-router-dom'
import React from 'react';
import { CiCompass1 } from "react-icons/ci";
import { CiMedicalClipboard } from "react-icons/ci";
import { CiUser } from "react-icons/ci";
import { GoClock } from "react-icons/go";
import { GoStack } from "react-icons/go";
import { GoCheck } from "react-icons/go";
import { FiCreditCard } from "react-icons/fi";
import { BiNotepad } from "react-icons/bi";
import { CgChevronDown } from "react-icons/cg";
import { useState } from 'react'

const routes = [
  {
    path: "/admin-home",
    name: "Dashboard",
    icon: <CiCompass1 />,
  },
  {
    name: "Doctors",
    icon: <CiMedicalClipboard />,
    subroute: true,
    subRoutes: [
      {
        path: "/admin-home/doctors",
        name: "Doctor's List ",
      },
      {
        path: "/admin-home/add-doctor",
        name: "Add Doctor",
      },
    ],
  },
  {
    name: "Patients",
    icon: <CiUser />,
    subroute: true,
    subRoutes: [
      {
        path: "/admin-home/patient",
        name: "Patient's List ",
      },
      {
        path: "/admin-home/add-patient",
        name: "Add Patient",
      },
    ],
  },
  {
    name: "Departments",
    icon: <GoStack />,
    subroute: true,
    subRoutes: [
      {
        path: "/admin-home/departments",
        name: "Departments's List ",
      },
      {
        path: "/admin-home/add-departments",
        name: "Add Departments",
      },
    ],
  },
  {
    name: "Doctor Schedule",
    icon: <GoClock />,
    subroute: true,
    subRoutes: [
      {
        path: "/admin-home/schedule",
        name: "Schedule List ",
      },
      {
        path: "/admin-home/add-departments",
        name: "Add Schedule",
      },
    ],
  },
  {
    name: "Appointment",
    icon: <GoCheck />,
    subroute: true,
    subRoutes: [
      {
        path: "/admin-home/appointment",
        name: "Appointment List ",
      },
      {
        path: "/admin-home/add-departments",
        name: "Add Appointment",
      },
    ],
  },
  {
    name: "Payment",
    icon: <FiCreditCard />,
    subroute: true,
    subRoutes: [
      {
        path: "/admin-home/payment",
        name: "Payment List ",
      },
      {
        path: "/admin-home/add-payment",
        name: "Add Payment",
      },
    ],
  },
  {
    name: "Reports",
    icon: <BiNotepad />,
    subroute: true,
    subRoutes: [
      {
        path: "/admin-home/reports",
        name: "Reports List ",
      },
      {
        path: "/admin-home/add-report",
        name: "Add Report",
      },
    ],
  },
];


const Sidebar = () => {
  const navigate = useNavigate();
  const [openMenuIndex, setOpenMenuIndex] = useState(-1);

  const toggleSubMenu = (index) => {
    setOpenMenuIndex((prevIndex) => (prevIndex === index ? -1 : index));
  };

  const handleMenuClick = (path) => {
    navigate(path);
  };

  return (
    <div className='mt-2 flex flex-col text-left'>
            <ul>
              {routes.map((route, index) => (
                <React.Fragment key={index}>
                  <li className="flex items-center text-lg text-[#435334] rounded-lg cursor-pointer hover:bg-[#435334] hover:shadow-md hover:text-white py-4 px-12"
                    onClick={() => {handleMenuClick(route.path); toggleSubMenu(index);}}>
                    {route.icon && React.cloneElement(route.icon, { className: "mr-2 w-7 h-7" })}
                    {route.name}
                    {route.subRoutes && <CgChevronDown className={`ml-auto ${openMenuIndex === index && "rotate-180"}`} />}
                  </li>
                  {route.subRoutes && openMenuIndex === index && (
                    <ul>
                      {route.subRoutes.map((subRoute, subIndex) => (
                        <li key={subIndex} className="flex items-center text-base text-[#435334] rounded-lg cursor-pointer hover:bg-[#435334] hover:shadow-md hover:text-white py-2 px-12" onClick={() => handleMenuClick(subRoute.path)}>{subRoute.name}</li>
                      ))}
                    </ul>
                  )}
                </React.Fragment>
              ))}
            </ul>
          </div>
  )
}

export default Sidebar