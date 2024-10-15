"use client"
import React, { useContext } from 'react'
import { CgMenuLeftAlt } from "react-icons/cg";
import { RiMenu3Line } from "react-icons/ri";
import Dropdown from './Dropdown';
import { HiMenuAlt1 } from "react-icons/hi";
import { HomeContextProvider } from '@/components/HomeProvider/HomeProvider';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Logo from "../../../../../public/sf-logo.png"
import { Button } from 'antd';



const Navbar = ({handleClick,toggle}) => {

  const { hamburger, setHamburger } = useContext(HomeContextProvider);
  const pathName = usePathname();

  return (
    
    <div className='bg-primary text-sm p-3  sticky top-0 z-[15] text-white'>
    <div className='flex justify-between items-center'>
  { pathName === "/UserDashboard/UserBusiness" ?
  
  (  <div>
    <Image src={Logo} alt="Admin" className="w-[100px] h-[50px]" />
     </div> ) :
  pathName === "/UserDashboard/UserBusiness/AddBusiness" ?
  
(  <div>
  <Image src={Logo} alt="Admin" className="w-[100px] h-[50px]" />
   </div> )
   :
  (<div
          className="lg:hidden focus:ring-1 cursor-pointer"
          onClick={() => setHamburger(!hamburger)}
        >
          <HiMenuAlt1 size={20} className="cursor-pointer" />
    </div>)
    
    
    }
        
    <div className={`mt-3 hidden lg:block ${pathName === "/UserDashboard/UserBusiness" && "lg:hidden"} ${pathName === "/UserDashboard/UserBusiness/AddBusiness" && "lg:hidden"}`}>
   <button
   onClick={handleClick}
   >
   {
!toggle? <RiMenu3Line size={25}/> :
<CgMenuLeftAlt size={25}/>

   }</button>
    </div>
   
   <div className='flex justify-between items-center gap-2'>
    <Link href={`/UserDashboard/UserBusiness`}>
    <Button>All Businesses
    </Button>   
        </Link>
    <Link href={`/UserDashboard/UserHome`}>
    <Button>Dashboard
    </Button>   
        </Link>
    <Dropdown/>
   </div>
    </div>
   </div>

  )
}

export default Navbar