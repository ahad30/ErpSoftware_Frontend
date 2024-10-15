"use client";
import React from "react";
import ZFormTwo from "@/components/Form/ZFormTwo";
import ZInputTwo from "@/components/Form/ZInputTwo";
import ZSelect from "@/components/Form/ZSelect";
import { useAppDispatch } from "@/redux/Hook/Hook";
import { useGetBusinessesQuery } from "@/redux/Feature/Admin/businesses/businesses";
import { useGetBranchesQuery } from "@/redux/Feature/Admin/branch/branchesApi";
import { setIsAddModalOpen } from "@/redux/Modal/ModalSlice";
import { useAddSupplierMutation } from "@/redux/Feature/User/suppliers/suppliersApi";

const AddSupplier = () => {
  const dispatch = useAppDispatch();

  const [
    createSupplier,
    {
      isLoading: SIsLoading,
      isError: SIsError,
      error: SError,
      isSuccess: SIsSuccess,
      data,
    },
  ] = useAddSupplierMutation();

  const { data: businessData, isLoading: businessLoading } =
    useGetBusinessesQuery();
  const { data: branchData, isLoading: branchLoading } = useGetBranchesQuery();

  const handleSubmit = (data) => {
    createSupplier(data);
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
        isLoading={SIsLoading}
        isSuccess={SIsSuccess}
        isError={SIsError}
        error={SError}
        submit={handleSubmit}
        formType="create"
        data={data}
        closeModal={handleCloseAndOpen}
        buttonName="Create Supplier"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mt-10">
          <ZInputTwo
            name="supplierName"
            type="text"
            label="Supplier Name"
            placeholder="Enter supplier name"
          />
          <ZInputTwo
            name="supplierType"
            type="text"
            label="Supplier Type"
            placeholder="Enter supplier type"
          />
          <ZInputTwo
            name="supplierNameBn"
            type="text"
            label="Supplier Name (Bangla)"
            placeholder="Enter supplier name in Bangla"
          />
          <ZInputTwo
            name="supplierAddress"
            type="text"
            label="Supplier Address"
            placeholder="Enter supplier address"
          />
          <ZInputTwo
            name="supplierEmail"
            type="email"
            label="Supplier Email"
            placeholder="Enter supplier email"
          />
          <ZInputTwo
            name="supplierContactNo"
            type="text"
            label="Supplier Contact No"
            placeholder="Enter supplier contact number"
          />
          <ZInputTwo
            name="supplierAlternativeContactNo"
            type="text"
            label="Alternative Contact No"
            placeholder="Enter alternative contact number"
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

          <ZInputTwo
            name="representativeName"
            type="text"
            label="Representative Name"
            placeholder="Enter representative name"
          />
          <ZInputTwo
            name="representativeContactNo"
            type="number"
            label="Representative Contact No"
            placeholder="Enter representative contact number"
          />
          <ZInputTwo
            name="representativeDesignation"
            type="text"
            label="Representative Designation"
            placeholder="Enter representative designation"
          />
          <ZInputTwo
            name="stateID"
            type="number"
            label="State ID"
            placeholder="Enter state ID"
          />
          <ZInputTwo
            name="cityID"
            type="number"
            label="City ID"
            placeholder="Enter city ID"
          />
          <ZInputTwo
            name="countryID"
            type="number"
            label="Country ID"
            placeholder="Enter country ID"
          />
          <ZInputTwo
            name="payableAmount"
            type="number"
            label="Payable Amount"
            placeholder="Enter payable amount"
          />
          <ZInputTwo
            name="receivableAmount"
            type="number"
            label="Receivable Amount"
            placeholder="Enter receivable amount"
          />
          <ZInputTwo
            name="salesPercentage"
            type="number"
            label="Sales Percentage"
            placeholder="Enter sales percentage"
          />
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

export default AddSupplier;
