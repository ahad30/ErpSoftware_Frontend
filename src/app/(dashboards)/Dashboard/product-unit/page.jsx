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
import AddProductUnit from "./AddProductUnit/page"; 
import ButtonWithModal from "@/components/Button/ButtonWithModal";
import { setIsDeleteModalOpen, setIsEditModalOpen } from "@/redux/Modal/ModalSlice";
import EditProductUnit from "./EditProductUnit/page"; 
import DeleteModal from "@/components/Modal/DeleteModal";
import { useDeleteProductUnitMutation, useGetProductUnitsQuery } from "@/redux/Feature/Admin/product/productUnitApi";

const ProductUnit = () => {
  const dispatch = useAppDispatch();
  const { data, error, isLoading: productUnitIsLoading } = useGetProductUnitsQuery(); 
  const { isAddModalOpen, isEditModalOpen, isDeleteModalOpen } = useAppSelector((state) => state.modal);
  const [selectedProductUnit, setSelectedProductUnit] = useState({});
  const [deleteProductUnit, { isLoading: dPIsLoading, isError, isSuccess, data: dPData, error: dPError }] = useDeleteProductUnitMutation(); 

  // Mapping product unit data
  const productUnitData = data?.data?.map((unit, index) => ({
    key: index,
    id: unit.productUnitID, 
    name: unit.productUnitName,
    status: unit.status ? 'Active' : 'Inactive'
  }));

  // Handle edit product unit
  const handleEditProductUnit = (productUnitData) => {
    setSelectedProductUnit(productUnitData);
    dispatch(setIsEditModalOpen());
  };

  // Handle delete confirmation
  const handleDeleteConfirmation = (productUnitData) => {
    setSelectedProductUnit(productUnitData);
    dispatch(setIsDeleteModalOpen());
  };

  // Handle delete product unit
  const handleDeleteProductUnit = () => {
    deleteProductUnit(selectedProductUnit?.id);
  };

  // Columns for product unit table
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
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => handleEditProductUnit(record)}>
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
        <ButtonWithModal title="Add Product Unit"></ButtonWithModal> 
      </div>

      <DashboardTable columns={columns} data={productUnitData} loading={productUnitIsLoading} /> {/* Use product unit data */}
      
      {/* AddModal Component */}
      <AddModal isAddModalOpen={isAddModalOpen} title="Add New Product Unit">
        <AddProductUnit /> {/* Add Product Unit form */}
      </AddModal>

      {/* EditModal Component */}
      <EditModal isEditModalOpen={isEditModalOpen} title="Edit Product Unit">
        <EditProductUnit productUnitId={selectedProductUnit?.id}  /> {/* Edit Product Unit form */}
      </EditModal>

      {/* DeleteModal Component */}
      <DeleteModal
        data={dPData}
        error={dPError}
        isLoading={dPIsLoading}
        isSuccess={isSuccess}
        title="Delete Product Unit"
        onDelete={handleDeleteProductUnit}
        isDeleteModalOpen={isDeleteModalOpen}
        isError={isError}
        description={"Deleting this product unit will remove all associated data."}
      ></DeleteModal>
    </>
  );
};

export default ProductUnit;
