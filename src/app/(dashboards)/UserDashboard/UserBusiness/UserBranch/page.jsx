"use client";
import React, { useEffect, useState } from "react";
import BreadCrumb from "@/components/BreadCrumb/BreadCrumb";
import { Button, Image, Modal } from "antd";
import DashboardTable from "@/components/Table/DashboardTable";
import { Space, Tooltip, message } from "antd";
import { CiEdit } from "react-icons/ci";
import { AiOutlineDelete } from "react-icons/ai";
import EditModal from "@/components/Modal/EditModal";
import { useAppDispatch, useAppSelector } from "@/redux/Hook/Hook";
import ButtonWithModal from "@/components/Button/ButtonWithModal";
import { setIsDeleteModalOpen, setIsEditModalOpen } from "@/redux/Modal/ModalSlice";
import DeleteModal from "@/components/Modal/DeleteModal";
import { useDeleteBranchMutation, useGetBranchesQuery } from "@/redux/Feature/Admin/branch/branchesApi";
import EditBranch from "./EditBranch/page";
import { toast } from "sonner";
import AddModal from "@/components/Modal/AddModal";
import AddBranch from "./AddBranch/page";

const UserBranch = () => {
  const dispatch = useAppDispatch();
  const { data, error, isLoading } = useGetBranchesQuery();
  const { isAddModalOpen, isEditModalOpen, isDeleteModalOpen } = useAppSelector(
    (state) => state.modal
  );
  const [selectedBranch, setSelectedBranch] = useState({});
  const [deleteBranch, { isLoading: dCIsloading, isError, isSuccess, data: dCData, error: dError }] = useDeleteBranchMutation();


  const branchData = data?.data?.map((branch, index) => {
    const {
      branchName,
      branchID,
      branchAddressDescription,
      branchCustomAddress,
      branchMobile,
      branchEmail,
      branchArea,
      cityID,
      cityName,
      regionID,
      regionName,
      countryID,
      countryCode,
      countryName,
      mapLink,
      location: locationStr,
      coordinates: coordinatesStr,
      isDelivery,
      isInHouse,
      isPickup,
      isMainBranch,
      branchQRCode,
      businessID,
    } = branch;
    const location = locationStr ? JSON.parse(locationStr) : {};
    const coordinates = coordinatesStr ? JSON.parse(coordinatesStr) : {};
    const lat = location.lat || '';
    const lng = location.lng || '';
    const latitude = coordinates.latitude || '';
    const longitude = coordinates.longitude || '';
  
    return {
      key: index,
      branchName,
      branchAddressDescription,
      branchCustomAddress,
      branchMobile,
      branchEmail,
      branchArea,
      cityID,
      cityName,
      regionID,
      regionName,
      countryID,
      countryCode,
      countryName,
      mapLink,
      lat,
      lng,
      latitude,
      longitude,
      isDelivery,
      isInHouse,
      isPickup,
      isMainBranch,
      branchQRCode,
      businessID,
      branchID,
    };
  });
// console.log(branchData);

  const handledl = (branchData) => {
      setSelectedBranch(branchData);
      dispatch(setIsDeleteModalOpen());
  
  };

  const handleDeleteBranch = () => {
    // if(branchData.length === 1) {
    //   toast.error('At least one branch required')
    // }
    // else{
      deleteBranch(selectedBranch?.branchID);
    // }  
  };

  const handleEditBranch = (branchData) => {

    setSelectedBranch(branchData);
    dispatch(setIsEditModalOpen());
  };

  const columns = [
    {
      title: "Branch Name",
      dataIndex: "branchName",
      key: "branchName",
    },
    {
      title: "Branch Address",
      dataIndex: "branchAddressDescription",
      key: "branchAddressDescription",
    },
    {
      title: "Branch Mobile",
      dataIndex: "branchMobile",
      key: "branchMobile",
    },
    {
      title: "Branch Email",
      dataIndex: "branchEmail",
      key: "branchEmail",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => handleEditBranch(record)}>
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


  if (error) return <p>Error loading branches</p>;

  return (
    <>

      <div className="flex flex-col lg:flex-row items-center gap-x-2 justify-end my-5">
        <ButtonWithModal title="Add Branch"></ButtonWithModal>
      </div>


      <AddModal 
      width={'70%'}
      isAddModalOpen={isAddModalOpen} title={'Add Branch'}>
       <AddBranch/>
      </AddModal>
      


      {/* EditModal Component */}
      <EditModal isEditModalOpen={isEditModalOpen} title="Edit Branch">
        <EditBranch selectedBranch={selectedBranch} />
      </EditModal>

      {/* Pass the fetched branch data to the DashboardTable */}
      <DashboardTable columns={columns} data={branchData} loading={isLoading}/>

      {/* Delete Modal */}
      <DeleteModal
        data={dCData}
        error={dError}
        isLoading={dCIsloading}
        isSuccess={isSuccess}
        title="Delete Branch"
        onDelete={handleDeleteBranch}
        isDeleteModalOpen={isDeleteModalOpen}
        isError={isError}
        description={"Deleting this branch will remove all corresponding data."}
      ></DeleteModal>
    </>
  );
};

export default UserBranch;
