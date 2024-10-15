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
import ButtonWithModal from "@/components/Button/ButtonWithModal";
import { setIsDeleteModalOpen, setIsEditModalOpen } from "@/redux/Modal/ModalSlice";
import DeleteModal from "@/components/Modal/DeleteModal";
import AddWarehouses from "./AddWarehouses/page";
import EditWarehouses from "./EditWarehouses/page";
import { useDeleteWarehousesMutation, useGetWarehousesQuery } from "@/redux/Feature/User/warehouses/warehousesApi";

const Warehouses = () => {
  const dispatch = useAppDispatch();
  const { data, error, isLoading: warehousesIsLoading } = useGetWarehousesQuery(); // Updated to customer query
  const { isAddModalOpen, isEditModalOpen, isDeleteModalOpen } = useAppSelector((state) => state.modal);
  const [selectedCustomer, setSelectedCustomer] = useState({});
  const [deleteCustomer, { isLoading: dCIsloading, isError, isSuccess, data: dCData, error: dCError }] = useDeleteWarehousesMutation();

  // Mapping customer data
  const warehousesData = data?.data?.map((warehouse, index) => ({
    key: index,
    id: warehouse.warehouseID, // Using warehouseCode as a unique identifier
    name: warehouse.warehouseName, // Warehouse name
    warehouseCode: warehouse.warehouseCode,
    address: warehouse.warehouseAddress, // Warehouse address
    personName: warehouse.warehousePersonName, // Person in charge
    personDesignation: warehouse.warehousePersonDesignation, // Designation of the person
    personContactNo: warehouse.warehousePersonContactNo, // Contact number of the person
    personEmail: warehouse.warehousePersonEmail, // Email of the person
    warehouseContactNo: warehouse.warehouseContactNo, // Warehouse contact number
    capacity: warehouse.capacity, // Warehouse capacity
    status: warehouse.status ? 'Active' : 'Inactive', // Displaying status as 'Active' or 'Inactive'
    businessID: warehouse.businessID, // Business ID
    branchID: warehouse.branchID // Branch ID
  }));
  


  const handleEditCustomer = (warehousesData) => {
    setSelectedCustomer(warehousesData);
    dispatch(setIsEditModalOpen());
  };

  const handleDeleteConfirmation = (warehousesData) => {
    setSelectedCustomer(warehousesData);
    dispatch(setIsDeleteModalOpen());
  };

  const handleDeleteCustomer = () => {
    deleteCustomer(selectedCustomer?.id); // Call the delete mutation with selected customerID
  };


  // Columns for data
  const columns = [
    {
      title: "Warehouse Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Warehouse Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Contact Person",
      dataIndex: "personName",
      key: "personName",
    },
    {
      title: "Contact No",
      dataIndex: "personContactNo",
      key: "personContactNo",
    },
    {
      title: "Capacity",
      dataIndex: "capacity",
      key: "capacity",
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
        <ButtonWithModal title="Add Warehouse"></ButtonWithModal> {/* Updated to "Add Customer" */}
      </div>

      <DashboardTable columns={columns} data={warehousesData} loading={warehousesIsLoading} /> {/* Updated to use customer data */}
      
      {/* AddModal Component */}
      <AddModal isAddModalOpen={isAddModalOpen} title="Add New Warehouse">
        <AddWarehouses/> {/* Updated to AddCustomer component */}
      </AddModal>

      {/* EditModal Component */}
      <EditModal isEditModalOpen={isEditModalOpen} title="Edit Warehouse">
        <EditWarehouses selectedWarehouse={selectedCustomer} /> {/* Updated to EditCustomer component */}
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
        description={"Deleting this warehouse will remove all associated data."} // Update message for customer
      ></DeleteModal>
    </>
  );
};

export default Warehouses;
