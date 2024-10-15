"use client";
import React from "react";
import ZFormTwo from "@/components/Form/ZFormTwo";
import ZInputTwo from "@/components/Form/ZInputTwo";
import ZSelect from "@/components/Form/ZSelect"; 
import { useAppDispatch } from "@/redux/Hook/Hook";
import { setIsAddModalOpen } from "@/redux/Modal/ModalSlice";
import { useAddProductTypeMutation } from "@/redux/Feature/Admin/product/productTypeApi";
import { useGetModuleQuery } from "@/redux/Feature/Admin/module/module";


const AddProductType = () => {
  const dispatch = useAppDispatch();
  const [createProductType, { isLoading: PIsLoading, isError: PIsError, error: PError, isSuccess: PIsSuccess, data }] = useAddProductTypeMutation();
  const { data: moduleData, isLoading: MIsLoading, isError: MIsError } = useGetModuleQuery();

  const handleSubmit = (data) => {
    createProductType(data);
  };

  const handleCloseAndOpen = () => {
    dispatch(setIsAddModalOpen());
  };

  // Map module data to options
  const moduleOptions = moduleData?.data?.map(module => ({
    label: module.moduleName, // Adjust according to your data
    value: module.moduleID
  })) || [];

  return (
    <div className="">
      <ZFormTwo
        isLoading={PIsLoading}
        isSuccess={PIsSuccess}
        isError={PIsError}
        error={PError}
        submit={handleSubmit}
        closeModal={handleCloseAndOpen}
        formType="create"
        data={data}
        buttonName="Create"
      >
        <div className="grid grid-cols-1 gap-3 mt-10">
          {/* Product Type Name */}
          <ZInputTwo
            name="productTypeName"
            type="text"
            label="Product Type Name"
            defaultKey={""}
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
            placeholder="Select status"
          />

          {/* Module */}
          <ZSelect
            name="moduleID"
            label="Module"
            options={moduleOptions}
            placeholder="Select a module"
            isLoading={MIsLoading} // Show loading state
            isError={MIsError} // Handle errors
          />
        </div>
      </ZFormTwo>
    </div>
  );
};

export default AddProductType;
