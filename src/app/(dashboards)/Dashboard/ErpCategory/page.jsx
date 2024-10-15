"use client";
import React, { useEffect, useState } from "react";
import BreadCrumb from "@/components/BreadCrumb/BreadCrumb";
import { Button, Image, Modal } from "antd";
import DashboardTable from "@/components/Table/DashboardTable";
import { Space, Tooltip, message } from "antd";
import { CiEdit } from "react-icons/ci";
import { AiOutlineDelete } from "react-icons/ai";
import AddModal from "@/components/Modal/AddModal";
import EditModal from "@/components/Modal/EditModal";
import { useAppDispatch, useAppSelector } from "@/redux/Hook/Hook";

import ButtonWithModal from "@/components/Button/ButtonWithModal";
import { setIsDeleteModalOpen, setIsEditModalOpen } from "@/redux/Modal/ModalSlice";
import DeleteModal from "@/components/Modal/DeleteModal";
import AddErpCategory from "./AddErpCategory/AddErpCategory";
import { useGetErpCategoryQuery, useDeleteErpCategoryMutation } from "@/redux/Feature/Admin/erpcategory/erpcategory";
import EditErpCategory from "./EditErpCategory/page";


const ErpCategory = () => {
const dispatch = useAppDispatch();
const { data, error, isLoading: categoryIsLoading } = useGetErpCategoryQuery();
const { isAddModalOpen, isEditModalOpen , isDeleteModalOpen } = useAppSelector((state) => state.modal);
const [selectedCategory, setSelectedCategory] = useState({});
const [deleteCategory ,  { isLoading: dCIsloading, isError, isSuccess, data: dCData, error:dError } ] = useDeleteErpCategoryMutation();

  const categoryData = data?.data?.map((category, index) => ({
    key: index,
    id: category.erpCategoryID,
    name: category.erpCategoryName,
    image: category.erpCategoryImage,
    desc: category.erpCategoryDesc,
  }));

  
  const handleEditCategory = (categoryData) => {
    setSelectedCategory(categoryData);
    dispatch(setIsEditModalOpen());
  };

  const handledl = (categoryData) => {
    setSelectedCategory(categoryData);
    dispatch(setIsDeleteModalOpen());
  };


  const handleDeleteCategory = () => {
       deleteCategory(selectedCategory?.id)
  };


  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Description",
      dataIndex: "desc",
      key: "desc",
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (text, record) => (
        <Image alt="" height={50} width={50} src={record.image} />
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => handleEditCategory(record)}>
            <Tooltip title="Edit" placement="top">
              <CiEdit size={20} />
            </Tooltip>
          </a>
          <a onClick={() => handledl(record)}>
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
        <ButtonWithModal title="Add Category"></ButtonWithModal>
      </div>

      <DashboardTable columns={columns} data={categoryData} loading={categoryIsLoading}/>
      
      {/* AddModal Component */}
      <AddModal isAddModalOpen={isAddModalOpen} title="Add New Category">
        <AddErpCategory />
      </AddModal>

      {/* EditModal Component */}
      <EditModal isEditModalOpen={isEditModalOpen} title="Edit Category">
        <EditErpCategory selectedCategory= {selectedCategory}/>
      </EditModal>

{/* delete category */}
<DeleteModal
        data={dCData}
        error={dError}
        isLoading={dCIsloading}
        isSuccess={isSuccess}
        title="Delete Category"
        onDelete={handleDeleteCategory}
        isDeleteModalOpen={isDeleteModalOpen}
        isError={isError}
        description={"Under the category corresponding data will be removed "}
      ></DeleteModal>


    </>
  );
};

export default ErpCategory;
