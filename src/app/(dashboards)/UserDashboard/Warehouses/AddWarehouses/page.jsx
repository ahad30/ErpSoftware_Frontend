"use client";
import React from "react";
import ZFormTwo from "@/components/Form/ZFormTwo";
import ZInputTwo from "@/components/Form/ZInputTwo";
import ZSelect from "@/components/Form/ZSelect";
import { useAppDispatch } from "@/redux/Hook/Hook";
import ZCheckbox from "@/components/Form/ZCheckbox";
import { useGetBusinessesQuery } from "@/redux/Feature/Admin/businesses/businesses";
import { useGetBranchesQuery } from "@/redux/Feature/Admin/branch/branchesApi";
import { setIsAddModalOpen } from "@/redux/Modal/ModalSlice";
import { useAddWarehousesMutation } from "@/redux/Feature/User/warehouses/warehousesApi";

const AddWarehouses = () => {
  const dispatch = useAppDispatch();

  const [
    createCustomer,
    {
      isLoading: CIsloading,
      isError: CIsError,
      error: CError,
      isSuccess: CIsSuccess,
      data,
    },
  ] = useAddWarehousesMutation();

  const { data: businessData, isLoading: businessLoading } =
    useGetBusinessesQuery();
  const { data: branchData, isLoading: branchLoading } = useGetBranchesQuery();

  const handleSubmit = (data) => {
    createCustomer(data);
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
    dispatch(setIsAddModalOpen());
  };

  return (
<div className="">
  <ZFormTwo
    isLoading={CIsloading}
    isSuccess={CIsSuccess}
    isError={CIsError}
    error={CError}
    submit={handleSubmit}
    formType="create"
    data={data}
    closeModal={handleCloseAndOpen}
    buttonName="Create Warehouse" // Updated for warehouse creation
  >
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mt-10">
      {/* Warehouse Name */}
      <ZInputTwo
        name="warehouseName"
        type="text"
        label="Warehouse Name"
        placeholder="Enter warehouse name"
      />
      
      {/* Warehouse Code */}
      <ZInputTwo
        name="warehouseCode"
        type="text"
        label="Warehouse Code"
        placeholder="Enter warehouse code"
      />
      
      {/* Warehouse Address */}
      <ZInputTwo
        name="warehouseAddress"
        type="text"
        label="Warehouse Address"
        placeholder="Enter warehouse address"
      />
      
      {/* Warehouse Contact Number */}
      <ZInputTwo
        name="warehouseContactNo"
        type="text"
        label="Warehouse Contact Number"
        placeholder="Enter warehouse contact number"
      />

      {/* Warehouse Person Name */}
      <ZInputTwo
        name="warehousePersonName"
        type="text"
        label="Warehouse Person Name"
        placeholder="Enter warehouse person name"
      />

      {/* Warehouse Person Designation */}
      <ZInputTwo
        name="warehousePersonDesignation"
        type="text"
        label="Warehouse Designation"
        placeholder="Enter warehouse person designation"
      />

      {/* Warehouse Person Contact No */}
      <ZInputTwo
        name="warehousePersonContactNo"
        type="text"
        label="Warehouse Contact No"
        placeholder="Enter warehouse person contact number"
      />

      {/* Warehouse Person Email */}
      <ZInputTwo
        name="warehousePersonEmail"
        type="email"
        label="Warehouse Person Email"
        placeholder="Enter warehouse person email"
      />

      {/* Business Dropdown */}
      <ZSelect
        name="businessID"
        label="Business Name"
        placeholder="Select business"
        options={businessOptions}
        isLoading={businessLoading}
      />

      {/* Branch Dropdown */}
      <ZSelect
        name="branchID"
        label="Branch Name"
        placeholder="Select branch"
        options={branchOptions}
        isLoading={branchLoading}
      />

      {/* Capacity */}
      <ZInputTwo
        name="capacity"
        type="number"
        label="Capacity"
        placeholder="Enter warehouse capacity"
      />

      {/* Status Checkbox */}
      <ZSelect
            name="status"
            label="Status"
            options={[
              { label: "Active", value: true },
              { label: "Inactive", value: false },
            ]}
            placeholder="Select status"
            required
          />
    </div>
  </ZFormTwo>
</div>

  );
};



export default AddWarehouses;