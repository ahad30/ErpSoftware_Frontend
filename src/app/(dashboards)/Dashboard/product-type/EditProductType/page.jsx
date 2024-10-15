"use client";
import React, { useEffect } from "react";
import ZFormTwo from "@/components/Form/ZFormTwo";
import ZInputTwo from "@/components/Form/ZInputTwo";
import ZSelect from "@/components/Form/ZSelect";
import { useAppDispatch } from "@/redux/Hook/Hook";
import { setIsEditModalOpen } from "@/redux/Modal/ModalSlice";
import { useGetProductTypeByIdQuery, useUpdateProductTypeMutation } from "@/redux/Feature/Admin/product/productTypeApi"; // Updated import
import { useGetModuleQuery } from "@/redux/Feature/Admin/module/module";

const EditProductType = ({ productTypeId }) => {
  const dispatch = useAppDispatch();
  
  // Fetch product type data by ID
  const { data: productTypeData, isLoading: PIsLoading, isError: PIsError } = useGetProductTypeByIdQuery(productTypeId);
  
  // Fetch modules
  const { data: moduleData, isLoading: MIsLoading, isError: MIsError } = useGetModuleQuery();

  const [updateProductType, { isLoading: UIsLoading, isError: UIsError, error: UError, isSuccess: UIsSuccess, data }] = useUpdateProductTypeMutation();

  useEffect(() => {
    // Optionally handle any side effects here
  }, [productTypeData]);

  // Handle form submission
  const handleSubmit = (data) => {
    updateProductType({ id: productTypeId, data });
  };

  const handleCloseAndOpen = () => {
    dispatch(setIsEditModalOpen());
  };

  // Map module data to options
  const moduleOptions = moduleData?.data?.map(module => ({
    label: module.moduleName, // Adjust according to your data
    value: module.moduleID
  })) || [];

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
          {/* Product Type Name */}
          <ZInputTwo
            name="productTypeName"
            type="text"
            label="Product Type Name"
            value={productTypeData?.data?.productTypeName || ""}
            placeholder="Enter the product type name"
          />

          {/* Status */}
          <ZSelect
            name="status"
            label="Status"
            options={[
              { label: "Active", value: true },
              { label: "Inactive", value: false },
            ]}
            value={productTypeData?.data?.status}
            placeholder="Select status"
          />

          {/* Module */}
          <ZSelect
            name="moduleID"
            label="Module"
            options={moduleOptions}
            value={productTypeData?.data?.moduleID}
            placeholder="Select a module"
            isLoading={MIsLoading} // Show loading state
            isError={MIsError} // Handle errors
          />
        </div>
      </ZFormTwo>
    </div>
  );
};

export default EditProductType;
