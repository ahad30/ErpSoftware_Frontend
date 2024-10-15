"use client";
import React, { useEffect } from "react";
import ZFormTwo from "@/components/Form/ZFormTwo";
import ZInputTwo from "@/components/Form/ZInputTwo";
import ZSelect from "@/components/Form/ZSelect";
import { useAppDispatch } from "@/redux/Hook/Hook";
import ZCheckbox from "@/components/Form/ZCheckbox";
import { useGetBusinessesQuery } from "@/redux/Feature/Admin/businesses/businesses";
import { useGetBranchesQuery } from "@/redux/Feature/Admin/branch/branchesApi";
import { setIsAddModalOpen, setIsEditModalOpen } from "@/redux/Modal/ModalSlice";
import { useUpdateCustomerMutation } from "@/redux/Feature/User/customersApi";

const EditCustomer = ({ selectedCustomer }) => {
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
  ] = useUpdateCustomerMutation();

  const { data: businessData, isLoading: businessLoading } =
    useGetBusinessesQuery();
  const { data: branchData, isLoading: branchLoading } = useGetBranchesQuery();

  const handleSubmit = (data) => {
    // Pass customer ID for editing
    updateCustomer({ data, id: selectedCustomer?.id });
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
        buttonName="Update Customer"
      >
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mt-10">
         {/* Business Dropdown */}
         <ZSelect
            name="businessID"
            label="Business Name"
            placeholder="Select business"
            options={businessOptions}
            isLoading={businessLoading}
            value={selectedCustomer?.businessID} // Pre-filled
          />

          {/* Branch Dropdown */}
          <ZSelect
            name="branchID"
            label="Branch Name"
            placeholder="Select branch"
            options={branchOptions}
            isLoading={branchLoading}
            value={selectedCustomer?.branchID || "No branch found" } // Pre-filled
          />

      <ZInputTwo
        name="name"
        type="text"
        label="Customer Name"
        placeholder="Enter customer name"
        value={selectedCustomer?.name} // Pre-filled with name
      />
      <ZInputTwo
        name="company"
        type="text"
        label="Company Name"
        placeholder="Enter company name"
        value={selectedCustomer?.company} // Pre-filled with company
      />
      <ZInputTwo
        name="nameBn"
        type="text"
        label="Customer Name (Bangla)"
        placeholder="Enter customer name in Bangla"
        value={selectedCustomer?.nameBn} // Pre-filled with nameBn
      />
      <ZInputTwo
        name="email"
        type="email"
        label="Customer Email"
        placeholder="Enter customer email"
        value={selectedCustomer?.email} // Pre-filled with email
      />
      <ZInputTwo
        name="contactNo"
        type="text"
        label="Customer Contact No"
        placeholder="Enter customer contact number"
        value={selectedCustomer?.contactNo} // Pre-filled with contactNo
      />
      <ZInputTwo
        name="stateID"
        type="number"
        label="State ID"
        placeholder="Enter state ID"
        value={selectedCustomer?.stateID} // Pre-filled with stateID
      />
      <ZInputTwo
        name="cityID"
        type="number"
        label="City ID"
        placeholder="Enter city ID"
        value={selectedCustomer?.cityID} // Pre-filled with cityID
      />
      <ZInputTwo
        name="countryID"
        type="number"
        label="Country ID"
        placeholder="Enter country ID"
        value={selectedCustomer?.countryID} // Pre-filled with countryID
      />
      <ZInputTwo
        name="representativeName"
        type="text"
        label="Representative Name"
        placeholder="Enter representative name"
        value={selectedCustomer?.representativeName} // Pre-filled with representativeName
      />
      <ZInputTwo
        name="representativeContactNo"
        type="text"
        label="Representative Contact No"
        placeholder="Enter representative contact number"
        value={selectedCustomer?.representativeContactNo} // Pre-filled with representativeContactNo
      />
      <ZInputTwo
        name="representativeDesignation"
        type="text"
        label="Representative Designation"
        placeholder="Enter representative designation"
        value={selectedCustomer?.representativeDesignation} // Pre-filled with representativeDesignation
      />
      <ZInputTwo
        name="payableAmount"
        type="number"
        label="Payable Amount"
        placeholder="Enter payable amount"
        value={selectedCustomer?.payableAmount} // Pre-filled with payableAmount
      />
      <ZInputTwo
        name="receivableAmount"
        type="number"
        label="Receivable Amount"
        placeholder="Enter receivable amount"
        value={selectedCustomer?.receivableAmount} // Pre-filled with receivableAmount
      />
      <ZInputTwo
        name="salesPercentage"
        type="number"
        label="Sales Percentage"
        placeholder="Enter sales percentage"
        value={selectedCustomer?.salesPercentage} // Pre-filled with salesPercentage
      />
      <ZSelect
            name="status"
            label="Status"
            options={[
              { label: "Active", value: true },
              { label: "Inactive", value: false },
            ]}
            value={selectedCustomer?.status || ""}
            placeholder="Select status"
          />
    </div>
      </ZFormTwo>
    </div>
  );
};

export default EditCustomer;
