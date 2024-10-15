"use client";
import React, { useEffect } from "react";
import ZFormTwo from "@/components/Form/ZFormTwo";
import ZInputTwo from "@/components/Form/ZInputTwo";
import ZSelect from "@/components/Form/ZSelect";
import { useAppDispatch } from "@/redux/Hook/Hook";
import ZCheckbox from "@/components/Form/ZCheckbox";
import { useGetBusinessesQuery } from "@/redux/Feature/Admin/businesses/businesses";
import { useGetBranchesQuery } from "@/redux/Feature/Admin/branch/branchesApi";
import {
  setIsEditModalOpen,
} from "@/redux/Modal/ModalSlice";
import { useUpdateWarehousesMutation } from "@/redux/Feature/User/warehouses/warehousesApi";

const EditWarehouses = ({ selectedWarehouse }) => {
  const dispatch = useAppDispatch();

  const [
    updateCustomer,
    {
      isLoading: CIsloading,
      isError: CIsError,
      error: CError,
      isSuccess: CIsSuccess,
      data,
    },
  ] = useUpdateWarehousesMutation();

  const { data: businessData, isLoading: businessLoading } =
    useGetBusinessesQuery();
  const { data: branchData, isLoading: branchLoading } = useGetBranchesQuery();

  const handleSubmit = (data) => {
    // Pass customer ID for editing
    updateCustomer({ data, id: selectedWarehouse?.id });
  };

  const businessOptions = businessData?.data?.map((business) => ({
    label: business.businessName,
    value: business.businessID,
  }));

  const branchOptions = branchData?.data?.map((branch) => ({
    label: branch.branchName,
    value: branch.branchID,
  }));

  const handleCloseAndOpen = () => {
    dispatch(setIsEditModalOpen());
  };

  // Pre-fill the form with existing customer data
  return (
    <div className="">
    <ZFormTwo
      isLoading={CIsloading}
      isSuccess={CIsSuccess}
      isError={CIsError}
      error={CError}
      submit={handleSubmit}
      formType="edit"
      data={data}
      closeModal={handleCloseAndOpen}
      buttonName="Update Warehouse"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mt-10">
        {/* Warehouse Name */}
        <ZInputTwo
          name="warehouseName"
          type="text"
          label="Warehouse Name"
          placeholder="Enter warehouse name"
          value={selectedWarehouse?.name} // Pre-filled
        />

        {/* Warehouse Code */}
        <ZInputTwo
          name="warehouseCode"
          type="text"
          label="Warehouse Code"
          placeholder="Enter warehouse code"
          value={selectedWarehouse?.warehouseCode} // Pre-filled
        />

        {/* Warehouse Address */}
        <ZInputTwo
          name="warehouseAddress"
          type="text"
          label="Warehouse Address"
          placeholder="Enter warehouse address"
          value={selectedWarehouse?.address} // Pre-filled
        />

        {/* Warehouse Contact No */}
        <ZInputTwo
          name="warehouseContactNo"
          type="text"
          label="Warehouse Contact No"
          placeholder="Enter warehouse contact number"
          value={selectedWarehouse?.warehouseContactNo} // Pre-filled
        />

        {/* Warehouse Person Name */}
        <ZInputTwo
          name="warehousePersonName"
          type="text"
          label="Warehouse Person Name"
          placeholder="Enter warehouse person name"
          value={selectedWarehouse?.personName} // Pre-filled
        />

        {/* Warehouse Person Designation */}
        <ZInputTwo
          name="warehousePersonDesignation"
          type="text"
          label="Warehouse Designation"
          placeholder="Enter warehouse person designation"
          value={selectedWarehouse?.personDesignation} // Pre-filled
        />

        {/* Warehouse Person Contact No */}
        <ZInputTwo
          name="warehousePersonContactNo"
          type="text"
          label="Warehouse Contact No"
          placeholder="Enter warehouse person contact number"
          value={selectedWarehouse?.personContactNo} // Pre-filled
        />

        {/* Warehouse Person Email */}
        <ZInputTwo
          name="warehousePersonEmail"
          type="email"
          label="Warehouse Person Email"
          placeholder="Enter warehouse person email"
          value={selectedWarehouse?.personEmail} // Pre-filled
        />

        {/* Business Dropdown */}
        <ZSelect
          name="businessID"
          label="Business Name"
          placeholder="Select business"
          options={businessOptions}
          isLoading={businessLoading}
          value={selectedWarehouse?.businessID} // Pre-filled
        />

        {/* Branch Dropdown */}
        <ZSelect
          name="branchID"
          label="Branch Name"
          placeholder="Select branch"
          options={branchOptions}
          isLoading={branchLoading}
          value={selectedWarehouse?.branchID || "No branch found"} // Pre-filled
        />

        {/* Capacity */}
        <ZInputTwo
          name="capacity"
          type="number"
          label="Capacity"
          placeholder="Enter warehouse capacity"
          value={selectedWarehouse?.capacity} // Pre-filled
        />


        <ZSelect
            name="status"
            label="Status"
            options={[
              { label: "Active", value: true },
              { label: "Inactive", value: false },
            ]}
            value={selectedWarehouse?.status || ""}
            placeholder="Select status"

          />
      </div>
    </ZFormTwo>
  </div>
  );
};

export default EditWarehouses;
