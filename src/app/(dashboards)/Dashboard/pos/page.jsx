"use client"
import React from 'react';

import { useState } from "react";
import AddedItemCalculation from "./AddedItemCalculation/AddedItemCalculation";
import Products from "./Products/Products";
import { IoHomeOutline } from "react-icons/io5";
import Link from "next/link";
import moment from "moment";
import Calculator from "./Calculator";
import { useAppDispatch, useAppSelector } from '@/redux/Hook/Hook';
import { Modal } from 'antd';
import { BsCalculatorFill } from "react-icons/bs";
import { IoMdClose } from 'react-icons/io';
import { setIsCalculatorModalOpen } from '@/redux/Modal/ModalSlice';


const Pos = () => {
  const dispatch = useAppDispatch();
  const [addedProduct, setAddedProduct] = useState([]);
  const currentDate = moment().format("MMMM Do YYYY, h:mm:ss a");
  const { isCalculatorModalOpen } = useAppSelector((state) => state.modal);
  const handleCancel = () => {
    dispatch(setIsCalculatorModalOpen());
  };
  return (
    <>
    <div className="bg-[#E3EFF7] py-1 lg:py-0"> 
  <div className="flex justify-between w-[98%] items-center mx-auto pt-1">
  <div className="text-gray-700 text-sm">
            {currentDate}
  </div>
  
  <div className='flex items-center gap-2'>
  <div>
  <button
        onClick={() => dispatch(setIsCalculatorModalOpen())}
        className="px-2 py-2 bg-[#6571FF] flex justify-center items-center gap-2 text-center text-white rounded-lg"
      >
        <BsCalculatorFill size={20}/>
      </button>
  </div>
  
  <div>
    <div  className="p-2 bg-red-500 text-white rounded-lg flex justify-center items-center">
    <Link href={"/Dashboard/AdminHome"}>
      <IoHomeOutline size={20}></IoHomeOutline>
    </Link>
    </div>
  </div>
  </div>
  </div>

    <div className="lg:px-3 py-0 pt-1 lg:py-2 flex flex-col md:flex-row justify-between gap-3 lg:h-screen md:overflow-hidden">

      <div className="relative  bg-white md:w-[55%] lg:overflow-hidden rounded-lg">
        <div className="w-full overflow-x-hidden lg:h-screen">
          <AddedItemCalculation
            addedProduct={addedProduct}
            setAddedProduct={setAddedProduct}
          ></AddedItemCalculation>
        </div>
      </div>

      <div className="md:w-2/3">
        <Products
          addedProduct={addedProduct}
          setAddedProduct={setAddedProduct}
        ></Products>
      </div>
    </div>
   
    <div>


      <Modal
        className='custom-modal'
        centered
        open={isCalculatorModalOpen}
        width={300}
        onCancel={handleCancel}
        closeIcon={<IoMdClose  style={{ fontSize: '24px', color: 'white' , backgroundColor:"red", padding:"2px" ,borderRadius:"100%"}} />}
        okButtonProps={{ style: { display: "none" , color:"white" } }}
        cancelButtonProps={{ style: { display: "none" } }}
      >
        <div className="mt-7">
        <Calculator/>
        </div>
      </Modal>
    </div>
    </div>
    </>
  );
};

export default Pos;
