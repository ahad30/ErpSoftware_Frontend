"use client";
import React, { useEffect } from "react";
import ZFormTwo from "@/components/Form/ZFormTwo";
import ZInputTwo from "@/components/Form/ZInputTwo";
import ZSelect from "@/components/Form/ZSelect"; 
import { useAppDispatch } from "@/redux/Hook/Hook";
import { setIsEditModalOpen } from "@/redux/Modal/ModalSlice";
import { useUpdateBrandMutation } from "@/redux/Feature/Admin/brand/brandApi";

const EditBrand = ({ selectedBrand }) => {
  const dispatch = useAppDispatch();
  const [updateBrand, { isLoading: BIsLoading, isError: BIsError, error: BError, isSuccess: BIsSuccess, data }] = useUpdateBrandMutation(); 


  const handleSubmit = (data) => {
    const updatedData = {
      id: selectedBrand.id,
      data,
    };
    updateBrand(updatedData); 
  };

  const handleCloseAndOpen = () => {
    dispatch(setIsEditModalOpen());
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
        formType="edit"
        data={data}
        buttonName="Update" // Changed to "Update"
      >
        <div className="grid grid-cols-1 gap-3 mt-10">
          {/* Brand Name */}
          <ZInputTwo
            name="brandName"
            type="text"
            label="Brand Name"
            value={selectedBrand?.name || ""} // Pre-fill with existing brand data
            placeholder="Enter your brand name"
          />

          {/* Brand Logo */}
          <ZInputTwo
            name="brandLogo"
            type="text"
            label="Brand Logo"
            value={selectedBrand?.logo || ""}
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
            value={selectedBrand?.status || ""}
            placeholder="Select status"
            required
          />
        </div>
      </ZFormTwo>
    </div>
  );
};

export default EditBrand;
