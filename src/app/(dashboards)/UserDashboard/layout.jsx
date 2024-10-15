"use client"

import React, {useContext, useState }  from 'react'
import "../../globals.css";
import HomeProvider, { HomeContextProvider } from '@/components/HomeProvider/HomeProvider';
import UserDashboard from './UserDashboard';
import Navbar from './UserNavbar/Navbar';
import { usePathname } from 'next/navigation';

const DashboardLayout = ({children}) => {
  const [toggle , setToggle] = useState(false);
  const { hamburger} = useContext(HomeContextProvider);
  const pathName = usePathname();


  const handleClick = () => {
  setToggle(!toggle);
}
  return (
    <>
     <HomeProvider>
          <div className="overflow-y-hidden">
            <div className="lg:flex lg:flex-row justify-start h-screen relative">
              <div
                className={`${
                toggle ? "max-w-[4.5%]" : "w-[24%]"
                } ${pathName === "/UserDashboard/UserBusiness" && "hidden"} ${pathName === "/UserDashboard/UserBusiness/AddBusiness" && "hidden"}  duration-500 transition`}
              >
                <UserDashboard toggle={toggle}/>
       
                </div>

              <div className={`block ${
            hamburger ? "w-[60%]" : "-ml-[500px]"
          } lg:hidden duration-700 absolute z-50 ${pathName === "/UserDashboard/UserBusiness" && "hidden"} ${pathName === "/UserDashboard/UserBusiness/AddBusiness" && "hidden"}`}>

              <UserDashboard  view={"mobile"}/>
              </div>

    
          <div className="relative w-[100%]">
          <div className=" text-gray-900 h-screen overflow-y-scroll">
           <Navbar handleClick={handleClick} toggle={toggle}/>
           <div className='p-8'> {children}</div>
          </div>
        </div>
            </div>
          </div>
        </HomeProvider> 
    </>
  )
}

export default DashboardLayout;