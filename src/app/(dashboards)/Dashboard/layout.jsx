"use client"
import React, {useContext, useState }  from 'react'
import "../../globals.css";
import HomeProvider, { HomeContextProvider } from '@/components/HomeProvider/HomeProvider';
import Dashboard from '@/app/(dashboards)/Dashboard/Dashboard';
import Navbar from '@/app/(dashboards)/Dashboard/Navbar/Navbar';
import { usePathname } from 'next/navigation';

const DashboardLayout = ({children}) => {
  const [toggle , setToggle] = useState(false);
  const { hamburger} = useContext(HomeContextProvider);
  const pathName = usePathname()

  const handleClick = () => {
  setToggle(!toggle);
}
  return (
    <>
     <HomeProvider>
          <div className="overflow-y-hidden overflow-x-hidden">
            <div className="md:flex md:flex-row justify-start h-screen relative">
              <div
                className={`${
                toggle ? "max-w-[4.5%]" : "w-[17%]"
                }  duration-500 transition ${pathName === '/Dashboard/pos' && "hidden"}`}
              >
                <Dashboard toggle={toggle}/>
       
              </div>

              <div className={`block ${
            hamburger ? "w-[60%]" : "-ml-[500px]"
          } lg:hidden  duration-700 absolute z-50 ${pathName === '/Dashboard/pos' && "hidden"}`}>

              <Dashboard  view={"mobile"}/>
              </div>

    
          <div className="relative w-[100%]">
          <div className={` text-gray-900 h-screen overflow-y-scroll scrollbar-0`}>
           <Navbar handleClick={handleClick} toggle={toggle}/>
           <div className={`
           ${ pathName === "/Dashboard/pos" ? "w-full lg:w-[98%] mx-auto lg:max-w-[100vw]" : "py-5 w-[88%] lg:max-w-[90%] mx-auto "} py-0 lg:py-2`}>
            {children}
          </div>
          </div>
        </div>
            </div>
          </div>
        </HomeProvider> 
    </>
  )
}

export default DashboardLayout;