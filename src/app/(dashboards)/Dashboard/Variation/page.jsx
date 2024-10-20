"use client"
import BreadCrumb from '@/components/BreadCrumb/BreadCrumb';
import ButtonWithModal from '@/components/Button/ButtonWithModal';
import AddModal from '@/components/Modal/AddModal';
import { useAppDispatch, useAppSelector } from '@/redux/Hook/Hook';
import React from 'react'
import AddVariation from './AddVariation/page';

const Variation = () => {
  const dispatch = useAppDispatch();
  const { isAddModalOpen, isEditModalOpen, isDeleteModalOpen } = useAppSelector(
    (state) => state.modal
  );
  return (
    <div>
    <BreadCrumb/>
         <div className="flex flex-col lg:flex-row items-center gap-x-2 justify-end my-5">
      <ButtonWithModal title="Create Variation"></ButtonWithModal> 
    </div>

    <AddModal isAddModalOpen={isAddModalOpen} title="Create Variation">
        <AddVariation />
      </AddModal>
  </div>
  )
}

export default Variation;