"use client";
import React, { useEffect } from "react";
import ZFormTwo from "@/components/Form/ZFormTwo";
import ZInputTwo from "@/components/Form/ZInputTwo";
import ZSelect from "@/components/Form/ZSelect";
import { useAppDispatch } from "@/redux/Hook/Hook";
import { useGetBusinessesQuery } from "@/redux/Feature/Admin/businesses/businesses";
import { useGetBranchesQuery } from "@/redux/Feature/Admin/branch/branchesApi";
import { setIsEditModalOpen } from "@/redux/Modal/ModalSlice";
import { useUpdateSupplierMutation } from "@/redux/Feature/User/suppliers/suppliersApi";


const EditSupplier = ({ selectedSupplier }) => {
  const dispatch = useAppDispatch();

  const [
    updateSupplier,
    {
      isLoading: SIsLoading,
      isError: SIsError,
      error: SError,
      isSuccess: SIsSuccess,
      data,
    },
  ] = useUpdateSupplierMutation();

  const { data: businessData, isLoading: businessLoading } =
    useGetBusinessesQuery();
  const { data: branchData, isLoading: branchLoading } = useGetBranchesQuery();

  const handleSubmit = (data) => {
    // Pass supplier ID for editing
    updateSupplier({ data, id: selectedSupplier?.id });
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

  // Pre-fill the form with existing supplier data
  return (
    <div className="">
      <ZFormTwo
        isLoading={SIsLoading}
        isSuccess={SIsSuccess}
        isError={SIsError}
        error={SError}
        submit={handleSubmit}
        formType="edit"
        data={data}
        closeModal={handleCloseAndOpen}
        buttonName="Update Supplier"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mt-10">
          {/* Business Dropdown */}
          <ZSelect
            name="businessID"
            label="Business Name"
            placeholder="Select business"
            options={businessOptions}
            isLoading={businessLoading}
            value={selectedSupplier?.businessID} // Pre-filled
          />

          {/* Branch Dropdown */}
          <ZSelect
            name="branchID"
            label="Branch Name"
            placeholder="Select branch"
            options={branchOptions}
            isLoading={branchLoading}
            value={selectedSupplier?.branchID || "No branch found"} // Pre-filled
          />

          <ZInputTwo
            name="supplierName"
            type="text"
            label="Supplier Name"
            placeholder="Enter supplier name"
            value={selectedSupplier?.name} // Pre-filled with supplierName
          />
          <ZInputTwo
            name="supplierType"
            type="text"
            label="Supplier Type"
            placeholder="Enter supplier type"
            value={selectedSupplier?.type} // Pre-filled with supplierType
          />
          <ZInputTwo
            name="supplierNameBn"
            type="text"
            label="Supplier Name (Bangla)"
            placeholder="Enter supplier name in Bangla"
            value={selectedSupplier?.nameBn} // Pre-filled with supplierNameBn
          />
          <ZInputTwo
            name="supplierEmail"
            type="email"
            label="Supplier Email"
            placeholder="Enter supplier email"
            value={selectedSupplier?.email} // Pre-filled with supplierEmail
          />
          <ZInputTwo
            name="supplierContactNo"
            type="text"
            label="Supplier Contact No"
            placeholder="Enter supplier contact number"
            value={selectedSupplier?.contactNo} // Pre-filled with supplierContactNo
          />
          <ZInputTwo
            name="supplierAlternativeContactNo"
            type="text"
            label="Supplier Alternative No"
            placeholder="Enter supplier alternative contact number"
            value={selectedSupplier?.supplierAlternativeContactNo} // Pre-filled with supplierAlternativeContactNo
          />
          <ZInputTwo
            name="stateID"
            type="number"
            label="State ID"
            placeholder="Enter state ID"
            value={selectedSupplier?.stateID} // Pre-filled with stateID
          />
          <ZInputTwo
            name="cityID"
            type="number"
            label="City ID"
            placeholder="Enter city ID"
            value={selectedSupplier?.cityID} // Pre-filled with cityID
          />
          <ZInputTwo
            name="countryID"
            type="number"
            label="Country ID"
            placeholder="Enter country ID"
            value={selectedSupplier?.countryID} // Pre-filled with countryID
          />
          <ZInputTwo
            name="representativeName"
            type="text"
            label="Representative Name"
            placeholder="Enter representative name"
            value={selectedSupplier?.representativeName} // Pre-filled with representativeName
          />
          <ZInputTwo
            name="representativeContactNo"
            type="text"
            label="Representative Contact No"
            placeholder="Enter representative contact number"
            value={selectedSupplier?.representativeContactNo} // Pre-filled with representativeContactNo
          />
          <ZInputTwo
            name="representativeDesignation"
            type="text"
            label="Representative Designation"
            placeholder="Enter representative designation"
            value={selectedSupplier?.representativeDesignation} // Pre-filled with representativeDesignation
          />
          <ZInputTwo
            name="payableAmount"
            type="number"
            label="Payable Amount"
            placeholder="Enter payable amount"
            value={selectedSupplier?.payableAmount} // Pre-filled with payableAmount
          />
          <ZInputTwo
            name="receivableAmount"
            type="number"
            label="Receivable Amount"
            placeholder="Enter receivable amount"
            value={selectedSupplier?.receivableAmount} // Pre-filled with receivableAmount
          />
          <ZInputTwo
            name="salesPercentage"
            type="number"
            label="Sales Percentage"
            placeholder="Enter sales percentage"
            value={selectedSupplier?.salesPercentage} // Pre-filled with salesPercentage
          />
          <ZSelect
            name="status"
            label="Status"
            options={[
              { label: "Active", value: true },
              { label: "Inactive", value: false },
            ]}
            value={selectedSupplier?.status || ""}
            placeholder="Select status"
            required
          />
        </div>
      </ZFormTwo>
    </div>
  );
};

export default EditSupplier;
