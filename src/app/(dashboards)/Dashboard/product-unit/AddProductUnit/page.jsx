"use client";
import React from "react";
import ZFormTwo from "@/components/Form/ZFormTwo";
import ZInputTwo from "@/components/Form/ZInputTwo";
import ZSelect from "@/components/Form/ZSelect"; 
import { useAppDispatch } from "@/redux/Hook/Hook";
import { setIsAddModalOpen } from "@/redux/Modal/ModalSlice";
import { useAddProductUnitMutation } from "@/redux/Feature/Admin/product/productUnitApi";



const AddProductUnit = () => {
  const dispatch = useAppDispatch();
  const [createProductUnit, { isLoading: PIsLoading, isError: PIsError, error: PError, isSuccess: PIsSuccess, data }] = useAddProductUnitMutation();

  const handleSubmit = (data) => {
    createProductUnit(data);
  };

  const handleCloseAndOpen = () => {
    dispatch(setIsAddModalOpen());
  };

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
          {/* Product Unit Name */}
          <ZInputTwo
            name="productUnitName"
            type="text"
            label="Product Unit Name"
            defaultKey={""}
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
            placeholder="Select status"
            
          />
        </div>
      </ZFormTwo>
    </div>
  );
};

export default AddProductUnit;
