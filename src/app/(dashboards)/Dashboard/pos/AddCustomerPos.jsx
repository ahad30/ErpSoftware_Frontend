import { useAppDispatch, useAppSelector } from '@/redux/Hook/Hook';
import { FaPlus } from 'react-icons/fa';
import AddCustomer from '../../UserDashboard/Customers/AddCustomer/page';
import { setIsCustomerModalOpen } from '@/redux/Modal/ModalSlice';
import { Modal } from 'antd';

const AddCustomerPos = () => {
  const dispatch = useAppDispatch();
  const { isCustomerModalOpen } = useAppSelector((state) => state.modal); 
  const handleCancel = () => {
    dispatch(setIsCustomerModalOpen());
  };

  return (
    <div>
      <button
        onClick={() => dispatch(setIsCustomerModalOpen())}
        className="bg-[#24354C] flex justify-center items-center gap-2 text-center text-white rounded-full p-1 -mt-6"
      >
        <FaPlus />
      </button>

      <Modal
        className='m-5'
        title={"Add new customer"}
        centered
        open={isCustomerModalOpen}
        width={700}
        onCancel={handleCancel}
        okButtonProps={{ style: { display: "none" } }}
        cancelButtonProps={{ style: { display: "none" } }}
      >
        <div className="mt-7">
        <AddCustomer/>
        </div>
      </Modal>
    </div>
  );
};

export default AddCustomerPos;
