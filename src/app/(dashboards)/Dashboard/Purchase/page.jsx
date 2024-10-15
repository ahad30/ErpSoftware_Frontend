"use client"
import React from 'react'
import ButtonWithModal from '@/components/Button/ButtonWithModal';
import BreadCrumb from '@/components/BreadCrumb/BreadCrumb';

const Purchase = () => {
  return (
    <div>
      <BreadCrumb/>
           <div className="flex flex-col lg:flex-row items-center gap-x-2 justify-end my-5">
        <ButtonWithModal path={'/Dashboard/Purchase/AddPurchase'}
         title="Create Purchase"></ButtonWithModal> 
      </div>
    </div>
  )
}

export default Purchase;
