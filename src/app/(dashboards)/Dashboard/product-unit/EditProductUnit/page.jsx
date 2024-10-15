"use client";
import React, { useEffect } from "react";
import ZFormTwo from "@/components/Form/ZFormTwo";
import ZInputTwo from "@/components/Form/ZInputTwo";
import ZSelect from "@/components/Form/ZSelect"; 
import { useAppDispatch } from "@/redux/Hook/Hook";
import {  setIsEditModalOpen } from "@/redux/Modal/ModalSlice";
import { useGetProductUnitByIdQuery, useUpdateProductUnitMutation } from "@/redux/Feature/Admin/product/productUnitApi";


const EditProductUnit = ({ productUnitId }) => {

  const dispatch = useAppDispatch();
  const { data: productUnitData, isLoading: PIsLoading, isError: PIsError } = useGetProductUnitByIdQuery(productUnitId);
  console.log(productUnitData)
  
  const [updateProductUnit, { isLoading: UIsLoading, isError: UIsError, error: UError, isSuccess: UIsSuccess, data }] = useUpdateProductUnitMutation();

  const handleSubmit = (data) => {
    updateProductUnit({ id: productUnitId, data });
  };

  const handleCloseAndOpen = () => {
    dispatch(setIsEditModalOpen());
  };




  return (
    <div className="">
      <ZFormTwo
        isLoading={UIsLoading}
        isSuccess={UIsSuccess}
        isError={UIsError}
        error={UError}
        submit={handleSubmit}
        closeModal={handleCloseAndOpen}
        formType="edit"
        data={data}
        buttonName="Update"
      >
        <div className="grid grid-cols-1 gap-3 mt-10">
          {/* Product Unit Name */}
          <ZInputTwo
            name="productUnitName"
            type="text"
            label="Product Unit Name"
            value={productUnitData?.data?.productUnitName || ""}
            placeholder="Enter the product unit name"
          />

          {/* Status */}
          <ZSelect
            name="status"
            label="Status"
            options={[
              { label: "Active", value: true },
              { label: "Inactive", value: false },
            ]}
            value={productUnitData?.data?.status}
            placeholder="Select status"
          />
        </div>
      </ZFormTwo>
    </div>
  );
};

export default EditProductUnit;
