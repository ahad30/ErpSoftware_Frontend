"use client";
import React, { useState } from "react";
import BreadCrumb from "@/components/BreadCrumb/BreadCrumb";
import { Button, Tag, Tooltip, Space } from "antd";
import DashboardTable from "@/components/Table/DashboardTable";
import AddModal from "@/components/Modal/AddModal";
import { CiEdit } from "react-icons/ci";
import { AiOutlineDelete } from "react-icons/ai";
import EditModal from "@/components/Modal/EditModal";
import DeleteModal from "@/components/Modal/DeleteModal";
import { useAppDispatch, useAppSelector } from "@/redux/Hook/Hook";
import AddProductType from "./AddProductType/page"; // Updated import
import EditProductType from "./EditProductType/page"; // Updated import
import ButtonWithModal from "@/components/Button/ButtonWithModal";
import { setIsDeleteModalOpen, setIsEditModalOpen } from "@/redux/Modal/ModalSlice";
import { useDeleteProductTypeMutation, useGetProductTypesQuery } from "@/redux/Feature/Admin/product/productTypeApi"; // Updated import

const ProductType = () => {
  const dispatch = useAppDispatch();
  const { data, error, isLoading: productTypeIsLoading } = useGetProductTypesQuery(); 
  const { isAddModalOpen, isEditModalOpen, isDeleteModalOpen } = useAppSelector((state) => state.modal);
  const [selectedProductType, setSelectedProductType] = useState({});
  const [deleteProductType, { isLoading: dPIsLoading, isError, isSuccess, data: dPData, error: dPError }] = useDeleteProductTypeMutation(); 

  // Mapping product type data
  const productTypeData = data?.data?.map((type, index) => ({
    key: index,
    id: type.productTypeID, 
    name: type.productTypeName,
    status: type.status ? 'Active' : 'Inactive',
    module: type.moduleID // Assuming moduleID is directly shown
  }));

  // Handle edit product type
  const handleEditProductType = (productTypeData) => {
    setSelectedProductType(productTypeData);
    dispatch(setIsEditModalOpen());
  };

  // Handle delete confirmation
  const handleDeleteConfirmation = (productTypeData) => {
    setSelectedProductType(productTypeData);
    dispatch(setIsDeleteModalOpen());
  };

  // Handle delete product type
  const handleDeleteProductType = () => {
    deleteProductType(selectedProductType?.id);
  };

  // Columns for product type table
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === 'Active' ? 'green' : 'red'}>{status}</Tag>
      ),
    },
    {
      title: "Module",
      dataIndex: "module",
      key: "module",
      // Adjust this as necessary to match your data
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => handleEditProductType(record)}>
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
        <ButtonWithModal title="Add Product Type"></ButtonWithModal> {/* Add Product Type button */}
      </div>

      <DashboardTable columns={columns} data={productTypeData} loading={productTypeIsLoading} /> {/* Use product type data */}
      
      {/* AddModal Component */}
      <AddModal isAddModalOpen={isAddModalOpen} title="Add New Product Type">
        <AddProductType /> {/* Add Product Type form */}
      </AddModal>

      {/* EditModal Component */}
      <EditModal isEditModalOpen={isEditModalOpen} title="Edit Product Type">
        <EditProductType productTypeId={selectedProductType?.id}  /> {/* Edit Product Type form */}
      </EditModal>

      {/* DeleteModal Component */}
      <DeleteModal
        data={dPData}
        error={dPError}
        isLoading={dPIsLoading}
        isSuccess={isSuccess}
        title="Delete Product Type"
        onDelete={handleDeleteProductType}
        isDeleteModalOpen={isDeleteModalOpen}
        isError={isError}
        description={"Deleting this product type will remove all associated data."}
      />
    </>
  );
};

export default ProductType;
