"use client";

import React, { useState } from "react";
import BreadCrumb from "@/components/BreadCrumb/BreadCrumb";
import { Button, Image } from "antd";
import DashboardTable from "@/components/Table/DashboardTable";
import { Space, Tooltip } from "antd";
import { CiEdit } from "react-icons/ci";
import { AiOutlineDelete } from "react-icons/ai";
import { useRouter } from "next/navigation";
import AddModal from "@/components/Modal/AddModal";
import EditModal from "@/components/Modal/EditModal";
import { useAppDispatch, useAppSelector } from "@/redux/Hook/Hook";
import ButtonWithModal from '@/components/Button/ButtonWithModal';
import { setIsDeleteModalOpen, setIsEditModalOpen } from '@/redux/Modal/ModalSlice';
import AddModule from './AddModule/page';
import { useDeleteModuleMutation, useGetModuleQuery } from "@/redux/Feature/Admin/module/module";
import EditModule from "./EditModule/page";
import DeleteModal from "@/components/Modal/DeleteModal";

const Module = () => {
  const dispatch = useAppDispatch();
  const router = useRouter(); 
  const { isAddModalOpen, isEditModalOpen , isDeleteModalOpen} = useAppSelector(
    (state) => state.modal
  );
  const [selectedModule, setSelectedModule] = useState(null);

  const { data, error, isLoading:mLoading, isSuccess } = useGetModuleQuery();
  const [ deleteModule ,  { isLoading: dCIsloading, isError, isSuccess:mIsSuccess, data: dMdata, error:dError } ] = useDeleteModuleMutation();

  const moduleData =
    isSuccess &&
    data?.data?.map((module, index) => ({
      key: index,
      id: module.moduleID,
      name: module.moduleName,
      image: module.moduleImage,
      desc: module.moduleIcon,
    }));


  const handleEditModule = (moduleData) => {
    setSelectedModule(moduleData);
    dispatch(setIsEditModalOpen());
  };


  const handledl = (moduleData) => {
    setSelectedModule(moduleData);
    dispatch(setIsDeleteModalOpen());
  };


  const handleDeleteModule = () => {
     deleteModule(selectedModule?.id)
  };


  const handleViewModule = (id) => {
    router.push(`/Dashboard/Module/${id}`);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Icon",
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
        <Space size="small">
          <a onClick={() => handleEditModule(record)}>
            <Tooltip title="Edit" placement="top">
              <CiEdit size={20} />
            </Tooltip>
          </a>
          <a onClick={() => handledl(record)}>
            <Tooltip title="Delete" placement="top">
              <AiOutlineDelete size={20} />
            </Tooltip>
          </a>
          
          <a onClick={() => handleViewModule(record.id)}>
            <Tooltip title="Add Pages" placement="top">
            <Button type="dashed">Addon</Button>
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
        <ButtonWithModal title="Add Module" />
      </div>

      <DashboardTable columns={columns} data={moduleData} loading={mLoading}/>
      <AddModal isAddModalOpen={isAddModalOpen} title="Create Module">
        <AddModule />
      </AddModal>

      {/* EditModal Component */}
      <EditModal isEditModalOpen={isEditModalOpen} title="Edit Module">
        <EditModule selectedModule={selectedModule} />
      </EditModal>

      {/* delete category */}
<DeleteModal
        data={dMdata}
        error={dError}
        isLoading={dCIsloading}
        isSuccess={mIsSuccess}
        title="Delete Category"
        onDelete={handleDeleteModule}
        isDeleteModalOpen={isDeleteModalOpen}
        isError={isError}
        description={"Under the module corresponding data will be removed "}
      ></DeleteModal>

    </>
  );
};

export default Module;
