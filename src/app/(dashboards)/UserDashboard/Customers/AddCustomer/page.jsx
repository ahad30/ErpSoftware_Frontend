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
import { useAddCustomerMutation } from "@/redux/Feature/User/customersApi";
import { usePathname } from "next/navigation";

const AddCustomer = () => {
  const dispatch = useAppDispatch();
  const pathName = usePathname();

  const [
    createCustomer,
    {
      isLoading: CIsloading,
      isError: CIsError,
      error: CError,
      isSuccess: CIsSuccess,
      data,
    },
  ] = useAddCustomerMutation();

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
        buttonName="Create"
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 mt-10">
            
     
          { pathName === "/Dashboard/pos" ? 
         (
          <>
          <ZInputTwo
            name="customerName"
            type="text"
            label="Customer Name"
            placeholder="Enter customer name"
          />
          <ZInputTwo
            name="customerEmail"
            type="email"
            label="Customer Email"
            placeholder="Enter customer email"
          />
          <ZInputTwo
            name="customerContactNo"
            type="number"
            label="Customer Contact No"
            placeholder="Enter customer contact number"
          />
           <ZSelect
            name="businessID"
            label="Business Name"
            placeholder="Select business"
            options={businessOptions}
            isLoading={businessLoading}
          />

          </>
         )


            :(<>
            <ZInputTwo
            name="customerName"
            type="text"
            label="Customer Name"
            placeholder="Enter customer name"
          />
          <ZInputTwo
            name="companyName"
            type="text"
            label="Company Name"
            placeholder="Enter company name"
          />
          <ZInputTwo
            name="customerNameBn"
            type="text"
            label="Customer Name (Bangla)"
            placeholder="Enter customer name in Bangla"
          />
          <ZInputTwo
            name="customerEmail"
            type="email"
            label="Customer Email"
            placeholder="Enter customer email"
          />
          <ZInputTwo
            name="customerContactNo"
            type="number"
            label="Customer Contact No"
            placeholder="Enter customer contact number"
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
            
          />
          </>)
          }
     
        </div>
      </ZFormTwo>
    </div>
  );
};

export default AddCustomer;
