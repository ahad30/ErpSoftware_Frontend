"use client";
import React from "react";
import ZFormTwo from "@/components/Form/ZFormTwo";
import ZInputTwo from "@/components/Form/ZInputTwo";
import { useAppDispatch } from "@/redux/Hook/Hook";
import { setIsAddModalOpen } from "@/redux/Modal/ModalSlice";
import { useAddAttributesMutation } from "@/redux/Feature/Admin/attributes/attributes";

const AddAttributes = () => {
  const dispatch = useAppDispatch();

  const [
    createAttribute,
    { isLoading, isError, isSuccess, error, data },
  ] = useAddAttributesMutation();

  // Handle form submission
  const handleSubmit = (formData) => {
    // Prepare the payload for API
    const payload = {
      attributeName: formData.attributeName,
      businessID: parseInt(formData.businessID, 10),
      branchID: parseInt(formData.branchID, 10),
    };

    // Trigger create attribute API call
    createAttribute(payload);
  };

  // Close the modal
  const handleCloseAndOpen = () => {
    dispatch(setIsAddModalOpen());
  };

  return (
    <div className="">
      <ZFormTwo
        isLoading={isLoading}
        isSuccess={isSuccess}
        isError={isError}
        error={error}
        submit={handleSubmit}
        closeModal={handleCloseAndOpen}
        formType="create"
        data={data}
        buttonName="Create Attribute"
      >
        <div className="grid grid-cols-1 gap-3 mt-10">
          {/* Attribute Name */}
          <ZInputTwo
            required
            name="attributeName"
            type="text"
            label="Attribute Name"
            placeholder="Enter Attribute Name"
          />

          {/* Business ID */}
          <ZInputTwo
            required
            name="businessID"
            type="number"
            label="Business ID"
            placeholder="Enter Business ID"
          />

          {/* Branch ID */}
          <ZInputTwo
            required
            name="branchID"
            type="number"
            label="Branch ID"
            placeholder="Enter Branch ID"
          />
        </div>
      </ZFormTwo>
    </div>
  );
};

export default AddAttributes;
