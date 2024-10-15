"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import ZFormTwo from "@/components/Form/ZFormTwo";
import ZInputTwo from "@/components/Form/ZInputTwo";
import { useAppDispatch } from "@/redux/Hook/Hook";
import { setIsAddModalOpen } from "@/redux/Modal/ModalSlice";
import { useAddBusinessesMutation } from "@/redux/Feature/Admin/businesses/businesses";
import { useGetCategoryQuery } from "@/redux/Feature/Admin/category/category";
import ZSelect from "@/components/Form/ZSelect";
import BreadCrumb from "@/components/BreadCrumb/BreadCrumb";

const AddBusinesses = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [createBusiness, { isLoading: CIsloading, isError: CIsError, error: CError, isSuccess: CIsSuccess, data: bdata }] = useAddBusinessesMutation();

  const { data, error: SysError, isLoading: SysLoading } = useGetCategoryQuery();

  const categoryData = data?.data?.map((category) => ({
    label: category.sysCategoryName,
    value: category.sysCategoryID,
  }));

  const handleSubmit = (data) => {
    console.log(data)
    createBusiness(data);
  };

  useEffect(() => {
    if (CIsSuccess) {
      // router.push("/Dashboard/Businesses");
    }
  }, [CIsSuccess, router]);



  return (
    <div className="">
      <BreadCrumb/>
      <ZFormTwo
        isLoading={CIsloading}
        isSuccess={CIsSuccess}
        isError={CIsError}
        error={CError}
        submit={handleSubmit}
        formType="create"
        data={bdata}
        buttonName="Create"
      >
        <div className="grid md:grid-cols-2 grid-cols-1 gap-3 mt-10">
          <ZSelect name='sysCategoryID' label='Business category' options={categoryData}
          placeholder="Enter your business category"
          />
          <ZInputTwo
            name="businessUsername"
            type="text"
            label="Business Username"
            defaultKey=""
            placeholder="Enter business username"
          />
          <ZInputTwo
            name="businessName"
            type="text"
            label="Business Name"
            defaultKey=""
            placeholder="Enter business name"
          />
          <ZInputTwo
            name="businessLegalName"
            type="text"
            label="Business Legal Name"
            defaultKey=""
            placeholder="Enter business legal name"
          />
          <ZInputTwo
            name="businessEmail"
            type="email"
            label="Business Email"
            defaultKey=""
            placeholder="Enter business email"
          />
          <ZInputTwo
            name="businessCustomerFacingEmail"
            type="email"
            label="Customer Facing Email"
            defaultKey=""
            placeholder="Enter customer-facing email"
          />
          <ZInputTwo
            name="businessMobile"
            type="number"
            label="Business Mobile"
            defaultKey=""
            placeholder="Enter business mobile"
          />
          <ZInputTwo
            name="businessLogo"
            type="text"
            label="Business Logo URL"
            defaultKey=""
            placeholder="Enter business logo URL"
          />
          <ZInputTwo
            name="businessWebURL"
            type="text"
            label="Business Website URL"
            defaultKey=""
            placeholder="Enter business website URL"
          />
          <ZInputTwo
            name="TradeLicenseNo"
            type="text"
            label="Trade License No."
            defaultKey=""
            placeholder="Enter trade license number"
          />
          <ZInputTwo
            name="BINNo"
            type="text"
            label="BIN No."
            defaultKey=""
            placeholder="Enter BIN number"
          />
          <ZInputTwo
            name="TINNo"
            type="text"
            label="TIN No."
            defaultKey=""
            placeholder="Enter TIN number"
          />
          <ZInputTwo
            name="DBIDNo"
            type="text"
            label="DBID No."
            defaultKey=""
            placeholder="Enter DBID number"
          />
          <ZInputTwo
            name="countryCode"
            type="text"
            label="Country Code"
            defaultKey=""
            placeholder="Enter country code"
          />
          <ZInputTwo
            name="currencyCode"
            type="text"
            label="Currency Code"
            defaultKey=""
            placeholder="Enter currency code"
          />
          <ZInputTwo
            name="businessQRCode"
            type="text"
            label="Business QR Code URL"
            defaultKey=""
            placeholder="Enter business QR code URL"
          />
          <ZInputTwo
            name="noOfBranches"
            type="number"
            label="Number of Branches"
            defaultKey=""
            placeholder="Enter number of branches"
          />

        </div>
      </ZFormTwo>
    </div>
  );
};

export default AddBusinesses;
