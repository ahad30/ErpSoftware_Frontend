"use client"
import ButtonWithModal from '@/components/Button/ButtonWithModal';
import React from 'react'

const page = () => {
  return (
    <>
    <div className="flex  items-center gap-x-2 justify-between my-5">
      <div className='lg:text-xl font-semibold'>My Business</div>
      <ButtonWithModal title="Add Business" path={`/UserDashboard/UserBusiness/AddBusiness`}></ButtonWithModal>
    </div>
  </>
  )
}

export default page;
