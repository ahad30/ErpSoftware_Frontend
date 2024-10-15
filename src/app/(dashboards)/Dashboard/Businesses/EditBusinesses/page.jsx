"use client";
import React from "react";
import ZFormTwo from "@/components/Form/ZFormTwo";
import ZInputTwo from "@/components/Form/ZInputTwo";
import { useUpdateBusinessesMutation } from "@/redux/Feature/Admin/businesses/businesses";
import { useAppDispatch } from "@/redux/Hook/Hook";
import { setIsEditModalOpen } from "@/redux/Modal/ModalSlice";
import ZSelect from "@/components/Form/ZSelect";
import { useGetCategoryQuery } from "@/redux/Feature/Admin/category/category";

const EditBusinesses = ({ selectedCategory }) => {
  console.log(selectedCategory);
  const dispatch = useAppDispatch();
  const [
    editBusiness,
    {
      isLoading: CIsloading,
      isError: CIsError,
      error: CError,
      isSuccess: CIsSuccess,
      data,
    },
  ] = useUpdateBusinessesMutation();

  const {
    data: sysdata,
    error: SysError,
    isLoading: SysLoading,
  } = useGetCategoryQuery();

  const categoryData = sysdata?.data?.map((category) => ({
    label: category.sysCategoryName,
    value: category.sysCategoryID,
  }));

  const handleSubmit = (data) => {
    // Preparing the data for submission
    const formData = {
      businessID: selectedCategory?.id,
      sysCategoryID: data.sysCategoryID,
      businessUsername: data.businessUsername,
      businessName: data.businessName,
      businessLegalName: data.businessLegalName,
      businessEmail: data.businessEmail,
      businessCustomerFacingEmail: data.businessCustomerFacingEmail,
      businessMobile: data.businessMobile,
      businessLogo: data.businessLogo,
      businessWebURL: data.businessWebURL,
      TradeLicenseNo: data.TradeLicenseNo,
      BINNo: data.BINNo,
      TINNo: data.TINNo,
      DBIDNo: data.DBIDNo,
      countryCode: data.countryCode,
      currencyCode: data.currencyCode,
      businessQRCode: data.businessQRCode,
      noOfBranches: data.noOfBranches,
    };
    // Calling the editBusiness mutation
    editBusiness({ data: formData, id: selectedCategory?.id });
    console.log(formData);
  };

  const handleCloseAndOpen = () => {
    dispatch(setIsEditModalOpen());
  };

  return (
    <div className="">
      <ZFormTwo
        isLoading={CIsloading}
        isSuccess={CIsSuccess}
        isError={CIsError}
        error={CError}
        submit={handleSubmit}
        closeModal={handleCloseAndOpen}
        formType="edit"
        data={data}
        buttonName="Update"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mt-10">
          <ZSelect
            value={selectedCategory?.sysCategoryID}
            name="sysCategoryID"
            label="Business category"
            options={categoryData}
            placeholder="Enter your business category"
          />
          <ZInputTwo
            value={selectedCategory?.username}
            name="businessUsername"
            type="text"
            label="Business Username"
            defaultKey=""
            placeholder="Enter business username"
            required
          />
          <ZInputTwo
            value={selectedCategory?.name}
            name="businessName"
            type="text"
            label="Business Name"
            defaultKey=""
            placeholder="Enter business name"
            required
          />
          <ZInputTwo
            value={selectedCategory?.legalName}
            name="businessLegalName"
            type="text"
            label="Business Legal Name"
            defaultKey=""
            placeholder="Enter business legal name"
            required
          />
          <ZInputTwo
            value={selectedCategory?.email}
            name="businessEmail"
            type="email"
            label="Business Email"
            defaultKey=""
            placeholder="Enter business email"
            required
          />
          <ZInputTwo
            value={selectedCategory?.customerFacingEmail}
            name="businessCustomerFacingEmail"
            type="email"
            label="Customer Facing Email"
            defaultKey=""
            placeholder="Enter customer-facing email"
            required
          />
          <ZInputTwo
            value={selectedCategory?.mobile}
            name="businessMobile"
            type="text"
            label="Business Mobile"
            defaultKey=""
            placeholder="Enter business mobile"
            required
          />
          <ZInputTwo
            value={selectedCategory?.logo}
            name="businessLogo"
            type="text"
            label="Business Logo URL"
            defaultKey=""
            placeholder="Enter business logo URL"
            required
          />
          <ZInputTwo
            value={selectedCategory?.webURL}
            name="businessWebURL"
            type="text"
            label="Business Website URL"
            defaultKey=""
            placeholder="Enter business website URL"
            required
          />
          <ZInputTwo
            value={selectedCategory?.TradeLicenseNo}
            name="TradeLicenseNo"
            type="text"
            label="Trade License No."
            defaultKey=""
            placeholder="Enter trade license number"
            required
          />
          <ZInputTwo
            value={selectedCategory?.binNo}
            name="BINNo"
            type="text"
            label="BIN No."
            defaultKey=""
            placeholder="Enter BIN number"
            required
          />
          <ZInputTwo
            value={selectedCategory?.tinNo}
            name="TINNo"
            type="text"
            label="TIN No."
            defaultKey=""
            placeholder="Enter TIN number"
            required
          />
          <ZInputTwo
            value={selectedCategory?.dbidNo}
            name="DBIDNo"
            type="text"
            label="DBID No."
            defaultKey=""
            placeholder="Enter DBID number"
            required
          />
          <ZInputTwo
            value={selectedCategory?.countryCode}
            name="countryCode"
            type="text"
            label="Country Code"
            defaultKey=""
            placeholder="Enter country code"
            required
          />
          <ZInputTwo
            value={selectedCategory?.currencyCode}
            name="currencyCode"
            type="text"
            label="Currency Code"
            defaultKey=""
            placeholder="Enter currency code"
            required
          />
          <ZInputTwo
            value={selectedCategory?.qrCode}
            name="businessQRCode"
            type="text"
            label="Business QR Code URL"
            defaultKey=""
            placeholder="Enter business QR code URL"
            required
          />
          <ZInputTwo
            value={selectedCategory?.noOfBranches}
            name="noOfBranches"
            type="number"
            label="Number of Branches"
            defaultKey=""
            placeholder="Enter number of branches"
            required
          />
        </div>
      </ZFormTwo>
    </div>
  );
};

export default EditBusinesses;
