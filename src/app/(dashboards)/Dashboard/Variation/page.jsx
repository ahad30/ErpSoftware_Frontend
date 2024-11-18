"use client";
import React, { useState } from "react";
import BreadCrumb from "@/components/BreadCrumb/BreadCrumb";
import { Tag, Space, Tooltip } from "antd";
import DashboardTable from "@/components/Table/DashboardTable";
import { CiEdit } from "react-icons/ci";
import { AiOutlineDelete } from "react-icons/ai";
import AddModal from "@/components/Modal/AddModal";
import EditModal from "@/components/Modal/EditModal";
import DeleteModal from "@/components/Modal/DeleteModal";
import ButtonWithModal from "@/components/Button/ButtonWithModal";
import { useAppDispatch, useAppSelector } from "@/redux/Hook/Hook";
import { setIsDeleteModalOpen, setIsEditModalOpen } from "@/redux/Modal/ModalSlice";
import { useDeleteProductVariationApiMutation, useGetProductVariationApiQuery } from "@/redux/Feature/Admin/product/productVariationApi";
import EditVariation from "./EditVariation/page";

const Variation = () => {
  const dispatch = useAppDispatch();
  const { data, isLoading: variationIsLoading } = useGetProductVariationApiQuery();
  const { isAddModalOpen, isEditModalOpen, isDeleteModalOpen } = useAppSelector((state) => state.modal);
  const [selectedVariation, setSelectedVariation] = useState({});
  const [deleteVariation, { isLoading: deleteLoading, isError, isSuccess, data: deleteData, error: deleteError }] = useDeleteProductVariationApiMutation();

  // Map product variation data to table rows
  const variationData = data?.data?.map((variation, index) => ({
    key: index,
    id: variation.productVariantID,
    sku: variation.sku,
    stock: variation.stock,
    min_stock: variation.min_stock,
    max_stock: variation.max_stock,
    salePrice: variation.salePrice,
    purchasePrice: variation.purchasePrice,
    retailPrice: variation.retailPrice,
    expiryDate: new Date(variation.expiryDate).toLocaleDateString(),
    status: variation.status ? 'Active' : 'Inactive',
  }));

  const handleEditVariation = (variationData) => {
    setSelectedVariation(variationData);
    dispatch(setIsEditModalOpen());
  };

  const handleDeleteConfirmation = (variationData) => {
    setSelectedVariation(variationData);
    dispatch(setIsDeleteModalOpen());
  };

  const handleDeleteVariation = () => {
    deleteVariation(selectedVariation?.id);
  };

  const columns = [
    {
      title: "SKU",
      dataIndex: "sku",
      key: "sku",
    },
    {
      title: "Stock",
      dataIndex: "stock",
      key: "stock",
    },
    {
      title: "Min Stock",
      dataIndex: "min_stock",
      key: "min_stock",
    },
    {
      title: "Max Stock",
      dataIndex: "max_stock",
      key: "max_stock",
    },
    {
      title: "Sale Price",
      dataIndex: "salePrice",
      key: "salePrice",
    },
    {
      title: "Purchase Price",
      dataIndex: "purchasePrice",
      key: "purchasePrice",
    },
    {
      title: "Retail Price",
      dataIndex: "retailPrice",
      key: "retailPrice",
    },
    {
      title: "Expiry Date",
      dataIndex: "expiryDate",
      key: "expiryDate",
    },
    // {
    //   title: "Status",
    //   dataIndex: "status",
    //   key: "status",
    //   render: (status) => (
    //     <Tag color={status === 'Active' ? 'green' : 'red'}>{status}</Tag>
    //   ),
    // },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => handleEditVariation(record)}>
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
        <ButtonWithModal title="Add  Variation" path={"/Dashboard/Variation/AddVariation"}></ButtonWithModal>
      </div>

      <DashboardTable columns={columns} data={variationData} loading={variationIsLoading} />
      
  

      {/* Edit Modal */}
      <EditModal isEditModalOpen={isEditModalOpen} title="Edit Product Variation">
        <EditVariation selectedVariation={selectedVariation} />
      </EditModal>

      {/* Delete Modal */}
      <DeleteModal
        data={deleteData}
        error={deleteError}
        isLoading={deleteLoading}
        isSuccess={isSuccess}
        title="Delete Product Variation"
        onDelete={handleDeleteVariation}
        isDeleteModalOpen={isDeleteModalOpen}
        isError={isError}
        description={"Deleting this variation will remove all associated data."}
      />
    </>
  );
};

export default Variation;
