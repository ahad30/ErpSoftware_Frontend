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
import AddSupplier from "./AddSupplier/page"; // Renamed to AddSupplier
import ButtonWithModal from "@/components/Button/ButtonWithModal";
import { setIsDeleteModalOpen, setIsEditModalOpen } from "@/redux/Modal/ModalSlice";
import DeleteModal from "@/components/Modal/DeleteModal";
import { useDeleteSupplierMutation, useGetSuppliersQuery } from "@/redux/Feature/User/suppliers/suppliersApi";
import EditSupplier from "./EditSupllier/page";


const Supplier = () => {
  const dispatch = useAppDispatch();
  const { data, error, isLoading: supplierIsLoading } = useGetSuppliersQuery(); // Updated to supplier query
  const { isAddModalOpen, isEditModalOpen, isDeleteModalOpen } = useAppSelector((state) => state.modal);
  const [selectedSupplier, setSelectedSupplier] = useState({});
  const [deleteSupplier, { isLoading: dSIsLoading, isError, isSuccess, data: dSData, error: dSError }] = useDeleteSupplierMutation(); 

  const supplierData = data?.data?.map((supplier, index) => ({
    key: index,
    id: supplier.supplierID, 
    name: supplier.supplierName, 
    nameBn: supplier.supplierNameBn, 
    email: supplier.supplierEmail, 
    type : supplier.supplierType,
    contactNo: supplier.supplierContactNo,
    stateID: supplier.stateID, 
    cityID: supplier.cityID, 
    countryID: supplier.countryID, 
    company: supplier.companyName, 
    representativeName: supplier.representativeName, 
    representativeContactNo: supplier.representativeContactNo,
    representativeDesignation: supplier.representativeDesignation, 
    payableAmount: supplier.payableAmount, 
    receivableAmount: supplier.receivableAmount, 
    salesPercentage: supplier.salesPercentage, 
    status: supplier.status ? 'Active' : 'Inactive', 
    businessID: supplier.businessID, 
    branchID: supplier.branchID
  }));
  
  const handleEditSupplier = (supplierData) => {
    setSelectedSupplier(supplierData);
    dispatch(setIsEditModalOpen());
  };

  const handleDeleteConfirmation = (supplierData) => {
    setSelectedSupplier(supplierData);
    dispatch(setIsDeleteModalOpen());
  };

  const handleDeleteSupplier = () => {
    deleteSupplier(selectedSupplier?.id); 
  };

 
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
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
          <a onClick={() => handleEditSupplier(record)}>
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
        <ButtonWithModal title="Add Supplier"></ButtonWithModal> {/* Updated to "Add Supplier" */}
      </div>

      <DashboardTable columns={columns} data={supplierData} loading={supplierIsLoading} /> {/* Updated to use supplier data */}
      
      {/* AddModal Component */}
      <AddModal isAddModalOpen={isAddModalOpen} title="Add New Supplier">
        <AddSupplier /> {/* Updated to AddSupplier component */}
      </AddModal>

      {/* EditModal Component */}
      <EditModal isEditModalOpen={isEditModalOpen} title="Edit Supplier">
        <EditSupplier selectedSupplier={selectedSupplier} /> {/* Updated to EditSupplier component */}
      </EditModal>

      {/* DeleteModal Component */}
      <DeleteModal
        data={dSData}
        error={dSError}
        isLoading={dSIsLoading}
        isSuccess={isSuccess}
        title="Delete Supplier"
        onDelete={handleDeleteSupplier}
        isDeleteModalOpen={isDeleteModalOpen}
        isError={isError}
        description={"Deleting this supplier will remove all associated data."}
      ></DeleteModal>
    </>
  );
};

export default Supplier;
