"use client";
import React, { useState } from "react";
import BreadCrumb from "@/components/BreadCrumb/BreadCrumb";
import { Alert, Button, Modal, Tag } from "antd";
import DashboardTable from "@/components/Table/DashboardTable";
import { Space, Tooltip } from "antd";
import { CiEdit } from "react-icons/ci";
import { AiOutlineDelete } from "react-icons/ai";
import EditModal from "@/components/Modal/EditModal";
import { useAppDispatch, useAppSelector } from "@/redux/Hook/Hook";
import ButtonWithModal from "@/components/Button/ButtonWithModal";
import { setIsDeleteModalOpen, setIsEditModalOpen } from "@/redux/Modal/ModalSlice";
import DeleteModal from "@/components/Modal/DeleteModal";
import EditPurchase from "./EditPurchase/page";
import { FaEye } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useDeletePurchaseOrderMutation, useGetPurchaseOrdersQuery } from "@/redux/Feature/Admin/purchase/purchaseApi";
import moment from "moment";
import AddPurchase from "@/components/AddPurchase";

const PurchaseTable = () => {
  const dispatch = useAppDispatch();
  const [selectedPurchase, setSelectedPurchase] = useState({});
  const { data, error, isLoading } = useGetPurchaseOrdersQuery();
  const { isEditModalOpen, isDeleteModalOpen } = useAppSelector((state) => state.modal);
  const [deletePurchase, { isLoading: dCIsloading, isError, isSuccess, data: dCData, error: dError }] = useDeletePurchaseOrderMutation();
  const router = useRouter();

  const purchaseData = data?.data?.map((purchase, index) => ({
    key: index+1,
    id: purchase?.purchaseID,
    warehouse: purchase?.warehouseID,
    supplier: purchase?.supplierID,
    purchaseDate: moment(purchase?.purchaseDate).format("DD-MM-YYYY"),
    business: purchase?.businessID,
    branch: purchase?.branchID,
    discount: purchase?.discountAmount,
    tax: purchase?.taxAmount,
    shipping: purchase?.shippingAmount,
    total: purchase?.finalAmount,
    due: purchase?.dueAmount,
    status: purchase?.status,
    items: purchase?.items,
  }));

  // console.log(purchaseData)

  const handleDelete = (purchaseData) => {
    setSelectedPurchase(purchaseData);
    dispatch(setIsDeleteModalOpen());
  };

  const handleDeletePurchase = () => {
    deletePurchase(selectedPurchase?.id);
  };

  const handleEditPurchase = (id) => {
    router.push(`/Dashboard/Purchase/EditPurchase?id=${id}`);

  };

  const handleViewPurchase = (id) => {
    router.push(`/Dashboard/Purchase/ViewPurchase?id=${id}`);
  };

  // Define table columns
  const columns = [
    {
      title: "Serial",
      dataIndex: "key",
      key: "key"
    },
    // {
    //   title: "Warehouse",
    //   dataIndex: "warehouse",
    //   key: "warehouse",
    // },
    // {
    //   title: "Supplier",
    //   dataIndex: "supplier",
    //   key: "supplier",
    // },

    {
      title: "Purchase Date",
      dataIndex: "purchaseDate",
      key: "purchaseDate",
    },
    {
      title: "Total Amount",
      dataIndex: "total",
      key: "total",
    },
    {
      title: "Due Amount",
      dataIndex: "due",
      key: "due",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag 
        color={status === "pending" ? "red" : "green"}
        >
          {status}
        </Tag>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          {/* <a onClick={() => handleViewPurchase(record.id)}>
            <Tooltip title="View" placement="top">
              <FaEye size={25} />
            </Tooltip>
          </a> */}
          <a onClick={() => handleEditPurchase(record.id)}>
            <Tooltip title="Edit" placement="top">
              <CiEdit size={20} />
            </Tooltip>
          </a>
          <a onClick={() => handleDelete(record)}>
            <Tooltip title="Delete" placement="top">
              <AiOutlineDelete size={20} />
            </Tooltip>
          </a>
        </Space>
      ),
    },
  ];

  if (error) return <p>Error loading purchases</p>;

  return (
    <>
      <div>
        <BreadCrumb />
      </div>
      <div className="flex flex-col lg:flex-row items-center gap-x-2 justify-end my-5">
        <ButtonWithModal title="Add Purchase" path={"/Dashboard/Purchase/AddPurchase"} />
      </div>

      {/* EditModal Component */}
      <EditModal isEditModalOpen={isEditModalOpen} title="Edit Purchase">
        <EditPurchase selectedPurchase={selectedPurchase} />
      </EditModal>

      {/* Purchase Table */}
      <DashboardTable columns={columns} data={purchaseData} loading={isLoading} />

      {/* Delete Modal */}
      <DeleteModal
        data={dCData}
        error={dError}
        isLoading={dCIsloading}
        isSuccess={isSuccess}
        title="Delete Purchase"
        onDelete={handleDeletePurchase}
        isDeleteModalOpen={isDeleteModalOpen}
        isError={isError}
        description={"Deleting this purchase will remove all corresponding data."}
      />

      {/* <AddPurchase/> */}
    </>
  );
};

export default PurchaseTable;
