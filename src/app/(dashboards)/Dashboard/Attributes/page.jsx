"use client";
import React, { useEffect, useState } from "react";
import { Space, Tooltip, message, Button, Table, Alert } from "antd";
import { CiEdit } from "react-icons/ci";
import { AiOutlineDelete } from "react-icons/ai";
import BreadCrumb from "@/components/BreadCrumb/BreadCrumb";
import DashboardTable from "@/components/Table/DashboardTable";
import { useAppDispatch, useAppSelector } from "@/redux/Hook/Hook";
import AddModal from "@/components/Modal/AddModal";
import EditModal from "@/components/Modal/EditModal";
import DeleteModal from "@/components/Modal/DeleteModal";
import {
  useGetAttributesQuery,
  useDeleteAttributesMutation,
} from "@/redux/Feature/Admin/product/attributesApi";
import {
  setIsAddModalOpen,
  setIsEditModalOpen,
  setIsDeleteModalOpen,
} from "@/redux/Modal/ModalSlice";
import AddAttributes from "./AddAttributes/page";
import EditAttributes from "./EditAttributes/page";
import ButtonWithModal from "@/components/Button/ButtonWithModal";

const Attributes = () => {
  const dispatch = useAppDispatch();

  // Fetch attributes data
  const { data, error, isLoading: attributesIsLoading } = useGetAttributesQuery();
  const { isAddModalOpen, isEditModalOpen, isDeleteModalOpen } = useAppSelector((state) => state.modal);
  const [selectedAttribute, setSelectedAttribute] = useState({});

  // Mutation hook for deleting attribute
  const [deleteAttribute, { isLoading: deleteIsLoading, isSuccess, isError, data: dData }] = useDeleteAttributesMutation();

  // Map fetched data
  const attributeData = data?.data?.map((attribute , index) => ({
    key: index+ 1,
    id: attribute.attributeID,
    name: attribute.attributeName,
    values: attribute.values.map((value) => ({
      id: value.attributeValueID,
      name: value.attributeValue,
    })),
  }));


  // Handlers
  const handleEditAttribute = (attributeData) => {
    setSelectedAttribute(attributeData);
    dispatch(setIsEditModalOpen());
  };

  const handleDeleteAttribute = (attributeData) => {
    setSelectedAttribute(attributeData);
    dispatch(setIsDeleteModalOpen());
  };

  const handleDelete = () => {
    deleteAttribute(selectedAttribute?.id);
  };

  // Table columns
  const columns = [
    {
      title: "SL",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "Attribute Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Values",
      dataIndex: "values",
      key: "values",
      render: (values) =>  
        <div className="flex justify-center gap-2">
      { values?.map((item) => (
            <div key={item?.id} className="relative">
              <Alert message={item?.name} type="info" />
            </div>
          ))
      }
    </div>
       
    },
    
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => handleEditAttribute(record)}>
            <Tooltip title="Edit" placement="top">
              <CiEdit size={20} />
            </Tooltip>
          </a>
          <a onClick={() => handleDeleteAttribute(record)}>
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
        <ButtonWithModal title="Add Attribute"
        //  path={`/Dashboard/Attributes/AddAttributes`}
         ></ButtonWithModal>
      </div>

      {/* Dashboard Table */}
      <DashboardTable columns={columns} data={attributeData} loading={attributesIsLoading} />

      {/* AddModal Component */}
      <AddModal isAddModalOpen={isAddModalOpen} title="Add New Attribute">
        <AddAttributes />
      </AddModal>

      {/* EditModal Component */}
      <EditModal isEditModalOpen={isEditModalOpen} title="Edit Attribute">
        <EditAttributes selectedAttribute={selectedAttribute} />
      </EditModal>

      {/* DeleteModal Component */}
      <DeleteModal
        title="Delete Attribute"
        isDeleteModalOpen={isDeleteModalOpen}
        onDelete={handleDelete}
        isLoading={deleteIsLoading}
        isSuccess={isSuccess}
        isError={isError}
        data={dData}
        description="Are you sure you want to delete this attribute?"
      />
    </>
  );
};

export default Attributes;
