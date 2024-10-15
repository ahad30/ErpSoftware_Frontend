import { useAppDispatch, useAppSelector } from '@/redux/Hook/Hook';
import { setIsProductModalOpen } from '@/redux/Modal/ModalSlice';
import React from 'react';
import AddProduct from '../Product/AddProduct/page';
import { FaPlus } from 'react-icons/fa';
import { Modal } from 'antd';

const AddPosProduct = () => {
  const dispatch = useAppDispatch();
  const { isProductModalOpen } = useAppSelector((state) => state.modal);
  const handleCancel = () => {
    dispatch(setIsProductModalOpen());
  };

  return (
    <div>
      <button
        onClick={() => dispatch(setIsProductModalOpen())}
        className="bg-[#24354C] flex justify-center items-center gap-2 text-center text-white rounded-full p-1"
      >
        <FaPlus />
      </button>

      <Modal
      className='m-5'
        title={"Add new product"}
        centered
        open={isProductModalOpen}
        width={600}
        onCancel={handleCancel}
        okButtonProps={{ style: { display: "none" } }}
        cancelButtonProps={{ style: { display: "none" } }}
      >
        <div className="mt-7">
        <AddProduct/>
        </div>
      </Modal>
    </div>
  );
};

export default AddPosProduct;
