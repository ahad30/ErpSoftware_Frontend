"use client";
import React from "react";
import ZFormTwo from "@/components/Form/ZFormTwo";
import ZInputTwo from "@/components/Form/ZInputTwo";
import ZSelect from "@/components/Form/ZSelect"; 
import { useAppDispatch } from "@/redux/Hook/Hook";
import { setIsAddModalOpen } from "@/redux/Modal/ModalSlice";
import { useAddBrandMutation } from "@/redux/Feature/Admin/brand/brandApi";
// Updated import for adding brand

const AddBrand = () => {
  const dispatch = useAppDispatch();
  const [createBrand, { isLoading: BIsLoading, isError: BIsError, error: BError, isSuccess: BIsSuccess, data }] = useAddBrandMutation();

  const handleSubmit = (data) => {
    createBrand(data);
  };

  const handleCloseAndOpen = () => {
    dispatch(setIsAddModalOpen());
  };

  return (
    <div className="">
      <ZFormTwo
        isLoading={BIsLoading}
        isSuccess={BIsSuccess}
        isError={BIsError}
        error={BError}
        submit={handleSubmit}
        closeModal={handleCloseAndOpen}
        formType="create"
        data={data}
        buttonName="Create"
      >
        <div className="grid grid-cols-1 gap-3 mt-10">
          {/* Brand Name */}
          <ZInputTwo
            name="brandName"
            type="text"
            label="Brand Name"
            defaultKey={""}
            placeholder="Enter your brand name"
          />

          {/* Brand Logo */}
          <ZInputTwo
            name="brandLogo"
            type="text"
            label="Brand Logo"
            defaultKey={""}
            placeholder="Enter your brand logo"
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
        </div>
      </ZFormTwo>
    </div>
  );
};

export default AddBrand;
