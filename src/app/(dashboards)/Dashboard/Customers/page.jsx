"use client";
import React, { useState } from "react";
import BreadCrumb from "@/components/BreadCrumb/BreadCrumb";
import { Tag } from "antd";
import DashboardTable from "@/components/Table/DashboardTable";
import { Space, Tooltip } from "antd";
import { CiEdit } from "react-icons/ci";
import { AiOutlineDelete } from "react-icons/ai";
import AddModal from "@/components/Modal/AddModal";
import EditModal from "@/components/Modal/EditModal";
import { useAppDispatch, useAppSelector } from "@/redux/Hook/Hook";
import AddCustomer from "./AddCustomer/page"; 
import ButtonWithModal from "@/components/Button/ButtonWithModal";
import { setIsDeleteModalOpen, setIsEditModalOpen } from "@/redux/Modal/ModalSlice";
import EditCustomer from "./EditCustomer/page"; // Replaced with EditCustomer component
import DeleteModal from "@/components/Modal/DeleteModal";
import { useDeleteCustomerMutation, useGetCustomersQuery } from "@/redux/Feature/User/customersApi";

const Customer = () => {
  const dispatch = useAppDispatch();
  const { data, error, isLoading: customerIsLoading } = useGetCustomersQuery(); // Updated to customer query
  const { isAddModalOpen, isEditModalOpen, isDeleteModalOpen } = useAppSelector((state) => state.modal);
  const [selectedCustomer, setSelectedCustomer] = useState({});
  const [deleteCustomer, { isLoading: dCIsloading, isError, isSuccess, data: dCData, error: dCError }] = useDeleteCustomerMutation(); 
  // Mapping customer data
  const customerData = data?.data?.map((customer, index) => ({
    key: index,
    id: customer.customerID, // Updated to use customerID
    name: customer.customerName, // Updated to customerName
    nameBn: customer.customerNameBn, // Added customerNameBn
    email: customer.customerEmail, // Updated to customerEmail
    contactNo: customer.customerContactNo, // Added customerContactNo
    stateID: customer.stateID, // Added stateID
    cityID: customer.cityID, // Added cityID
    countryID: customer.countryID, // Added countryID
    company: customer.companyName, // Updated to companyName
    representativeName: customer.representativeName, // Added representativeName
    representativeContactNo: customer.representativeContactNo, // Added representativeContactNo
    representativeDesignation: customer.representativeDesignation, // Added representativeDesignation
    payableAmount: customer.payableAmount, // Added payableAmount
    receivableAmount: customer.receivableAmount, // Added receivableAmount
    salesPercentage: customer.salesPercentage, // Added salesPercentage
    status: customer.status ? 'Active' : 'Inactive', // Display status as text
    businessID: customer.businessID, // Added businessID
    branchID: customer.branchID // Added branchID
  }));
  
  console.log(data)

  const handleEditCustomer = (customerData) => {
    setSelectedCustomer(customerData);
    dispatch(setIsEditModalOpen());
  };

  const handleDeleteConfirmation = (customerData) => {
    setSelectedCustomer(customerData);
    dispatch(setIsDeleteModalOpen());
  };

  const handleDeleteCustomer = () => {
    deleteCustomer(selectedCustomer?.id); // Call the delete mutation with selected customerID
  };

  // Columns for customer data
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Company",
      dataIndex: "company",
      key: "company",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === 'Active' ? 'green' : 'red'}>{status}</Tag> // Display status with color
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => handleEditCustomer(record)}>
            <Tooltip title="Edit" placement="top">
              <CiEdit size={20} />
            </Tooltip>
          </a>
          <a onClick={() => handleDeleteConfirmation(record)}>
            <Tooltip title="Delete" placement="top">
              <AiOutlineDelete size={20} />
            </Tooltip>
          </a>
        </Space>
      ),
    },
  ];

  return (
    <>
      <div>
        <BreadCrumb />
      </div>
      <div className="flex flex-col lg:flex-row items-center gap-x-2 justify-end my-5">
        <ButtonWithModal title="Add Customer"></ButtonWithModal> {/* Updated to "Add Customer" */}
      </div>

      <DashboardTable columns={columns} data={customerData} loading={customerIsLoading} /> {/* Updated to use customer data */}
      
      {/* AddModal Component */}
      <AddModal width={800} isAddModalOpen={isAddModalOpen} title="Add New Customer">
        <AddCustomer /> {/* Updated to AddCustomer component */}
      </AddModal>

      {/* EditModal Component */}
      <EditModal isEditModalOpen={isEditModalOpen} title="Edit Customer">
        <EditCustomer selectedCustomer={selectedCustomer} /> {/* Updated to EditCustomer component */}
      </EditModal>

      {/* DeleteModal Component */}
      <DeleteModal
        data={dCData}
        error={dCError}
        isLoading={dCIsloading}
        isSuccess={isSuccess}
        title="Delete Customer"
        onDelete={handleDeleteCustomer}
        isDeleteModalOpen={isDeleteModalOpen}
        isError={isError}
        description={"Deleting this customer will remove all associated data."} // Update message for customer
      ></DeleteModal>
    </>
  );
};

export default Customer;
