"use client"
import React, { useState } from "react";
import BreadCrumb from "@/components/BreadCrumb/BreadCrumb";
import { Alert, Button, Modal, Tag } from "antd";
import DashboardTable from "@/components/Table/DashboardTable";
import { Space, Tooltip } from "antd";
import { CiEdit } from "react-icons/ci";
import { AiOutlineDelete } from "react-icons/ai";
import { useAppDispatch, useAppSelector } from "@/redux/Hook/Hook";
import ButtonWithModal from "@/components/Button/ButtonWithModal";
import { setIsDeleteModalOpen } from "@/redux/Modal/ModalSlice";
import DeleteModal from "@/components/Modal/DeleteModal";
import { useRouter } from "next/navigation";
import { useDeleteSalesOrderMutation, useGetSalesOrdersQuery } from "@/redux/Feature/Admin/sales/salesApi";
import moment from "moment";

const SaleTable = () => {
  const dispatch = useAppDispatch();
  const [selectedSale, setSelectedSale] = useState({});
  const { data, error, isLoading } = useGetSalesOrdersQuery();
  const { isDeleteModalOpen } = useAppSelector((state) => state.modal);
  const [deleteSale, { isLoading: dCIsloading, isError, isSuccess, data: dCData, error: dError }] = useDeleteSalesOrderMutation();
  const router = useRouter();

  const saleData = data?.data?.map((sale, index) => ({
    key: index+1,
    id: sale?.salesID,
    warehouse: sale?.warehouseID,
    customer: sale?.customerID,
    saleDate: moment(sale?.saleDate).format("DD-MM-YYYY"),
    business: sale?.businessID,
    branch: sale?.branchID,
    discount: sale?.discountAmount,
    tax: sale?.taxAmount,
    shipping: sale?.shippingAmount,
    total: sale?.totalAmount,
    due: sale?.dueAmount,
    paid: sale?.paidAmount,
    status: sale?.status,
    paymentStatus: sale?.paymentStatus,
    paymentMethod: sale?.paymentMethod,
    items: sale?.items,
  }));

  const handleDelete = (saleData) => {
    setSelectedSale(saleData);
    dispatch(setIsDeleteModalOpen());
  };

  const handleDeleteSale = () => {
    deleteSale(selectedSale?.id);
  };

  const handleEditSale = (id) => {
    router.push(`/Dashboard/Sale/EditSale?id=${id}`);
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: "orange",
      shipped: "blue",
      completed: "green",
      cancelled: "red",
      returned: "purple"
    };
    return colors[status?.toLowerCase()] || "default";
  };

  const getPaymentStatusColor = (status) => {
    const colors = {
      pending: "orange",
      paid: "green",
      failed: "red",
      refunded: "purple"
    };
    return colors[status?.toLowerCase()] || "default";
  };

  const columns = [
    {
      title: "Serial",
      dataIndex: "key",
      key: "key"
    },
    {
      title: "Sale Date",
      dataIndex: "saleDate",
      key: "saleDate",
    },
    {
      title: "Total Amount",
      dataIndex: "total",
      key: "total",
    },
    {
      title: "Paid Amount",
      dataIndex: "paid",
      key: "paid",
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
        <Tag color={getStatusColor(status)}>
          {status}
        </Tag>
      ),
    },
    {
      title: "Payment Status",
      dataIndex: "paymentStatus", 
      key: "paymentStatus",
      render: (status) => (
        <Tag color={getPaymentStatusColor(status)}>
          {status}
        </Tag>
      ),
    },
    {
      title: "Payment Method",
      dataIndex: "paymentMethod",
      key: "paymentMethod",
      render: (method) => (
        <span style={{ textTransform: 'capitalize' }}>
          {method?.replace(/_/g, ' ')}
        </span>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => handleEditSale(record.id)}>
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

  if (error) return <p>Error loading sales</p>;

  return (
    <>
      <div>
        <BreadCrumb />
      </div>
      <div className="flex flex-col lg:flex-row items-center gap-x-2 justify-end my-5">
        <ButtonWithModal title="Add Sale" path={"/Dashboard/Sale/AddSale"} />
      </div>

      {/* Sale Table */}
      <DashboardTable columns={columns} data={saleData} loading={isLoading} />

      {/* Delete Modal */}
      <DeleteModal
        data={dCData}
        error={dError}
        isLoading={dCIsloading}
        isSuccess={isSuccess}
        title="Delete Sale"
        onDelete={handleDeleteSale}
        isDeleteModalOpen={isDeleteModalOpen}
        isError={isError}
        description={"Deleting this sale will remove all corresponding data."}
      />
    </>
  );
};

export default SaleTable;
