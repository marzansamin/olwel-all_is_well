/* eslint-disable no-unused-vars */
import { useNavigate } from 'react-router-dom'
import React from 'react';
import { CiCompass1 } from "react-icons/ci";
import { CiMedicalClipboard } from "react-icons/ci";
import { CiUser } from "react-icons/ci";
import { GoClock } from "react-icons/go";
import { GoStack } from "react-icons/go";
import { GoCheck } from "react-icons/go";
import { BiNotepad } from "react-icons/bi";
import { CgChevronDown } from "react-icons/cg";
import { CiTempHigh } from "react-icons/ci";
import { useState } from 'react'

const routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: <CiCompass1 />,
  },
  {
    name: "Doctors",
    icon: <CiMedicalClipboard />,
    path: "/dashboard/doctors",
    // subroute: true,
    // subRoutes: [
    //   {
    //     path: "/dashboard/doctors",
    //     name: "Doctor List",
    //   },
    //   {
    //     path: "/dashboard/add-doctor",
    //     name: "Add Doctor",
    //   },
    // ],
  },
  {
    name: "Patients",
    icon: <CiUser />,
    path: "/dashboard/patients",
    // subroute: true,
    // subRoutes: [
    //   {
    //     path: "/dashboard/patient",
    //     name: "Patient List",
    //   },
    //   {
    //     path: "/dashboard/add-patient",
    //     name: "Add Patient",
    //   },
    // ],
  },
  {
    name: "Departments",
    icon: <GoStack />,
    path: "/dashboard/departments",
    // subroute: true,
    // subRoutes: [
    //   {
    //     path: "/dashboard/departments",
    //     name: "Departments List",
    //   },
    //   {
    //     path: "/dashboard/add-departments",
    //     name: "Add Departments",
    //   },
    // ],
  },
  // {
  //   name: "Doctor Schedule",
  //   icon: <GoClock />,
  //   path: "/dashboard/doctor-schedule",
  //   // subroute: true,
  //   // subRoutes: [
  //   //   {
  //   //     path: "/dashboard/schedule",
  //   //     name: "Schedule List",
  //   //   },
  //   //   {
  //   //     path: "/dashboard/add-departments",
  //   //     name: "Add Schedule",
  //   //   },
  //   // ],
  // },
  {
    name: "Appointment",
    icon: <GoCheck />,
    path: "/dashboard/appointments",
    // subroute: true,
    // subRoutes: [
    //   {
    //     path: "/dashboard/appointment",
    //     name: "Appointment List",
    //   },
    //   {
    //     path: "/dashboard/add-departments",
    //     name: "Add Appointment",
    //   },
    // ],
  },
  {
    name: "Prescription",
    icon: <CiTempHigh />,
    path: "/dashboard/prescriptions",
    // subroute: true,
    // subRoutes: [
    //   {
    //     path: "/dashboard/precription",
    //     name: "Prescription List",
    //   },
    //   {
    //     path: "/dashboard/add-precription",
    //     name: "Add Prescription",
    //   },
    // ],
  },
  // {
  //   name: "Reports",
  //   icon: <BiNotepad />,
  //   path: "/dashboard/reports",
  //   // subroute: true,
  //   // subRoutes: [
  //   //   {
  //   //     path: "/dashboard/reports",
  //   //     name: "Reports List",
  //   //   },
  //   //   {
  //   //     path: "/dashboard/add-report",
  //   //     name: "Add Report",
  //   //   },
  //   // ],
  // },
];


const Sidebar = () => {
  const navigate = useNavigate();
  const [openMenuIndex, setOpenMenuIndex] = useState(-1);

  const toggleSubMenu = (index) => {
    setOpenMenuIndex((prevIndex) => (prevIndex === index ? -1 : index));
  };

  const handleMenuClick = (path) => {0
    navigate(path);
  };

  return (
    <div className='flex flex-col text-left h-screen overflow-y-auto'>
            <ul>
              {routes.map((route, index) => (
                <React.Fragment key={index}>
                  <li className="flex items-center text-lg text-[#F1F1F1] rounded-lg cursor-pointer hover:bg-[#0091D5] hover:shadow-md hover:text-white py-4 px-12"
                    onClick={() => {handleMenuClick(route.path); toggleSubMenu(index);}}>
                    {route.icon && React.cloneElement(route.icon, { className: "mr-2 w-7 h-7" })}
                    {route.name}
                    {route.subRoutes && <CgChevronDown className={`ml-auto ${openMenuIndex === index && "rotate-180"}`} />}
                  </li>
                  {route.subRoutes && openMenuIndex === index && (
                    <ul>
                      {route.subRoutes.map((subRoute, subIndex) => (
                        <li key={subIndex} className="flex items-center text-base text-[#F1F1F1] rounded-lg cursor-pointer hover:bg-[#0091D5] hover:shadow-md hover:text-white py-2 px-12" onClick={() => handleMenuClick(subRoute.path)}>{subRoute.name}</li>
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