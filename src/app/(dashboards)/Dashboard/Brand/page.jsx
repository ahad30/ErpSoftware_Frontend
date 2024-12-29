"use client";
import React, { useState } from "react";
import BreadCrumb from "@/components/BreadCrumb/BreadCrumb";
import { Button, Image, Modal, Tag } from "antd";
import DashboardTable from "@/components/Table/DashboardTable";
import { Space, Tooltip } from "antd";
import { CiEdit } from "react-icons/ci";
import { AiOutlineDelete } from "react-icons/ai";
import AddModal from "@/components/Modal/AddModal";
import EditModal from "@/components/Modal/EditModal";
import { useAppDispatch, useAppSelector } from "@/redux/Hook/Hook";
import {
  useGetBrandQuery, // Updated API call
  useDeleteBrandMutation, // Updated mutation
} from "@/redux/Feature/Admin/brand/brandApi"; // Updated API imports
import ButtonWithModal from "@/components/Button/ButtonWithModal";
import { setIsDeleteModalOpen, setIsEditModalOpen } from "@/redux/Modal/ModalSlice";
import EditBrand from "./EditBrand/page"; // Replace with EditBrand component
import DeleteModal from "@/components/Modal/DeleteModal";
import AddBrand from "./AddBrand/page";

const Brand = () => {
  const dispatch = useAppDispatch();
  const { data, error, isLoading: brandIsLoading } = useGetBrandQuery(); // Updated to brand query
  const { isAddModalOpen, isEditModalOpen, isDeleteModalOpen } = useAppSelector((state) => state.modal);
  const [selectedBrand, setSelectedBrand] = useState({});
  const [deleteBrand, { isLoading: dBIsloading, isError, isSuccess, data: dBData, error: dBError }] = useDeleteBrandMutation(); 

  const brandData = data?.data?.map((brand, index) => ({
    key: index,
    id: brand.brandID, 
    name: brand.brandName, 
    logo: brand.brandLogo, // Updated to brandLogo
    status: brand.status ? 'Active' : 'Inactive', // Display status as text
  }));

  const handleEditBrand = (brandData) => {
    setSelectedBrand(brandData);
    dispatch(setIsEditModalOpen());
  };

  const handleDeleteConfirmation = (brandData) => {
    setSelectedBrand(brandData);
    dispatch(setIsDeleteModalOpen());
  };

  const handleDeleteBrand = () => {
    deleteBrand(selectedBrand?.id); 
  };

  // Columns for brand data
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Logo",
      dataIndex: "logo",
      key: "logo",
      render: (text, record) => (
        <Image alt="" height={50} width={50} src={record.logo} /> // Display brand logo
      ),
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
          <a onClick={() => handleEditBrand(record)}>
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
        <ButtonWithModal title="Add Brand"></ButtonWithModal> {/* Updated to "Add Brand" */}
      </div>

      <DashboardTable columns={columns} data={brandData} loading={brandIsLoading} /> {/* Updated to use brand data */}
      
      {/* AddModal Component */}
      <AddModal isAddModalOpen={isAddModalOpen} title="Add New Brand">
        <AddBrand /> {/* Updated to AddBrand component */}
      </AddModal>

      {/* EditModal Component */}
      <EditModal isEditModalOpen={isEditModalOpen} title="Edit Brand">
        <EditBrand selectedBrand={selectedBrand} /> {/* Updated to EditBrand component */}
      </EditModal>

      {/* DeleteModal Component */}
      <DeleteModal
        data={dBData}
        error={dBError}
        isLoading={dBIsloading}
        isSuccess={isSuccess}
        title="Delete Brand"
        onDelete={handleDeleteBrand}
        isDeleteModalOpen={isDeleteModalOpen}
        isError={isError}
        description={"Deleting this brand will remove all associated data."} // Update message for brand
      ></DeleteModal>
    </>
  );
};

export default Brand;
