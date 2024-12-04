"use client"
import React, {useContext, useState }  from 'react'
import "../../globals.css";
import HomeProvider, { HomeContextProvider } from '@/components/HomeProvider/HomeProvider';
import Dashboard from '@/app/(dashboards)/Dashboard/Dashboard';
import Navbar from '@/app/(dashboards)/Dashboard/Navbar/Navbar';
import { usePathname } from 'next/navigation';

const DashboardLayout = ({children}) => {
  const [toggle , setToggle] = useState(false);
  const { hamburger, setHamburger} = useContext(HomeContextProvider);
  const pathName = usePathname()

  const handleClick = () => {
  setToggle(!toggle);
}

const handleClick2 = () => {if(hamburger){
  setHamburger(!hamburger)
}}
  return (
    <>
     <HomeProvider>
          <div className="overflow-y-hidden overflow-x-hidden">
            <div className="md:flex md:flex-row justify-start h-screen relative">
              <div
                className={`${
                toggle ? "max-w-[4.5%]" : "w-[20%]"
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
           <div  
           onClick={handleClick2}
           className={`
           ${ pathName === "/Dashboard/pos" ? "w-full lg:w-[98%] mx-auto lg:max-w-[100vw]" : " px-5 py-0 lg:py-12 bg-[#F3F5F7]"} w-full py-5`}>
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