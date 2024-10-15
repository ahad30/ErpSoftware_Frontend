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
import {
  useGetBusinessesQuery,
  useDeleteBusinessesMutation,
} from "@/redux/Feature/Admin/businesses/businesses";
import ButtonWithModal from "@/components/Button/ButtonWithModal";
import {
  setIsDeleteModalOpen,
  setIsEditModalOpen,
} from "@/redux/Modal/ModalSlice"; // Ensure this is imported correctly
import AddBusinesses from "./AddBusinesses/page";
import EditBusinesses from "./EditBusinesses/page";
import DeleteModal from "@/components/Modal/DeleteModal";

const Businesses = () => {
  const dispatch = useAppDispatch();
  const { data, error, isLoading: bIsLoading } = useGetBusinessesQuery();
  const {  isEditModalOpen, isDeleteModalOpen } = useAppSelector(
    (state) => state.modal
  );
  const [selectedCategory, setSelectedCategory] = useState({});
  const [
    deleteCategory,
    { isLoading: dCIsloading, isError, isSuccess, data: dCData, error: dError },
  ] = useDeleteBusinessesMutation();

  const businessData = data?.data?.map((business, index) => ({
    key: index,
    id: business.businessID,
    sysCategoryID: business.sysCategoryID,
    username: business.businessUsername,
    name: business.businessName,
    legalName: business.businessLegalName,
    email: business.businessEmail,
    customerFacingEmail: business.businessCustomerFacingEmail,
    mobile: business.businessMobile,
    logo: business.businessLogo,
    webURL: business.businessWebURL,
    TradeLicenseNo: business?.TradeLicenseNo || "null",
    binNo: business.BINNo,
    tinNo: business.TINNo,
    dbidNo: business.DBIDNo,
    countryCode: business.countryCode,
    currencyCode: business.currencyCode,
    qrCode: business.businessQRCode,
    noOfBranches: business.noOfBranches,
  }));

  const handleEditCategory = (businessData) => {
    setSelectedCategory(businessData);
    dispatch(setIsEditModalOpen());
  };

  const handledl = (businessData) => {
    setSelectedCategory(businessData);
    dispatch(setIsDeleteModalOpen());
  };

  const handleDeleteCategory = () => {
    deleteCategory(selectedCategory?.id);
  };

  const columns = [
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Business Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Legal Name",
      dataIndex: "legalName",
      key: "legalName",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Mobile",
      dataIndex: "mobile",
      key: "mobile",
    },
    {
      title: "License No",
      dataIndex: "TradeLicenseNo",
      key: "TradeLicenseNo",
    },
    {
      title: "Logo",
      dataIndex: "logo",
      key: "logo",
      render: (text, record) => (
        <Image alt="" height={50} width={50} src={record.logo} />
      ),
    },
    {
      title: "Branches",
      dataIndex: "noOfBranches",
      key: "noOfBranches",
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

  if (error) return <p>Error loading businesses</p>;

  return (
    <>
      <div>
        <BreadCrumb />
      </div>
      <div className="flex flex-col lg:flex-row items-center gap-x-2 justify-end my-5">
        <ButtonWithModal
          title="Add Business"
          path={"/Dashboard/Businesses/AddBusinesses"}
        ></ButtonWithModal>
      </div>

      {/* EditModal Component */}
      <EditModal isEditModalOpen={isEditModalOpen} title="Edit Business">
        <EditBusinesses selectedCategory={selectedCategory} />
      </EditModal>

      {/* Pass the fetched business data to the DashboardTable */}
      <DashboardTable
        columns={columns}
        data={businessData}
        loading={bIsLoading}
      />

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

export default Businesses;
