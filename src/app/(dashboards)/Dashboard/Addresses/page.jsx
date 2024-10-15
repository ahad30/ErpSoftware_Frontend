"use client";
import React, { useEffect, useState } from "react";
import BreadCrumb from "@/components/BreadCrumb/BreadCrumb";
import { Button, Space, Tooltip } from "antd";
import DashboardTable from "@/components/Table/DashboardTable";
import { CiEdit } from "react-icons/ci";
import { AiOutlineDelete } from "react-icons/ai";
import EditModal from "@/components/Modal/EditModal";
import { useAppDispatch, useAppSelector } from "@/redux/Hook/Hook";
import ButtonWithModal from "@/components/Button/ButtonWithModal";
import { setIsDeleteModalOpen, setIsEditModalOpen } from "@/redux/Modal/ModalSlice";
import DeleteModal from "@/components/Modal/DeleteModal";
import { useDeleteAddressMutation, useGetAddressesQuery } from "@/redux/Feature/Admin/address/addressApi";
import AddModal from "@/components/Modal/AddModal";
import AddAddress from "./AddAddress/page";
import EditAddress from "./EditAddress/page";


const Addresses = () => {
  const dispatch = useAppDispatch();
  const { data, error, isLoading } = useGetAddressesQuery();
  const { isAddModalOpen, isEditModalOpen, isDeleteModalOpen } = useAppSelector(
    (state) => state.modal
  );
  const [selectedAddress, setSelectedAddress] = useState({});
  const [deleteAddress, { isLoading: dCIsloading, isError, isSuccess, data: dCData, error: dError }] = useDeleteAddressMutation();

  // Mapping the data from the API response
  const addressData = data?.data?.map((address, index) => {
    const {
      address: addressDescription,
      countryID,
      countryName,
      regionID,
      regionName,
      cityID,
      cityName,
      zipCode,
      status,
      addressID,
    } = address;

    return {
      key: index,
      addressDescription,
      countryID,
      countryName,
      regionID,
      regionName,
      cityID,
      cityName,
      zipCode,
      status,
      addressID,
    };
  });



  const handledl = (addressData) => {
    setSelectedAddress(addressData);
    dispatch(setIsDeleteModalOpen());
  };

  const handleDeleteAddress = () => {
    deleteAddress(selectedAddress?.addressID);
  };

  const handleEditAddress = (addressData) => {
    setSelectedAddress(addressData);
    dispatch(setIsEditModalOpen());
  };

  const columns = [
    {
      title: "Address",
      dataIndex: "addressDescription",
      key: "addressDescription",
    },
    {
      title: "Country",
      dataIndex: "countryName",
      key: "countryName",
    },
    {
      title: "Region",
      dataIndex: "regionName",
      key: "regionName",
    },
    {
      title: "City",
      dataIndex: "cityName",
      key: "cityName",
    },
    {
      title: "Zip Code",
      dataIndex: "zipCode",
      key: "zipCode",
    },

    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => handleEditAddress(record)}>
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

  if (error) return <p>Error loading addresses</p>;

  return (
    <>
      <div>
        <BreadCrumb />
      </div>
      <div className="flex flex-col lg:flex-row items-center gap-x-2 justify-end my-5">
        <ButtonWithModal title="Add Address"></ButtonWithModal>
      </div>

      <AddModal isAddModalOpen={isAddModalOpen} title="Add New Address">
        <AddAddress />
      </AddModal>

      {/* EditModal Component */}
      <EditModal isEditModalOpen={isEditModalOpen} title="Edit Address">
        <EditAddress selectedAddress={selectedAddress} />
      </EditModal>

      {/* Pass the fetched address data to the DashboardTable */}
      <DashboardTable columns={columns} data={addressData} loading={isLoading}/>

      {/* Delete Modal */}
      <DeleteModal
        data={dCData}
        error={dError}
        isLoading={dCIsloading}
        isSuccess={isSuccess}
        title="Delete Address"
        onDelete={handleDeleteAddress}
        isDeleteModalOpen={isDeleteModalOpen}
        isError={isError}
        description={"Deleting this address will remove all corresponding data."}
      ></DeleteModal>
    </>
  );
};

export default Addresses;
