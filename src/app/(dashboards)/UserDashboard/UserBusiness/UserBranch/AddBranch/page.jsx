"use client";
import React from "react";
import ZFormTwo from "@/components/Form/ZFormTwo";
import ZInputTwo from "@/components/Form/ZInputTwo";
import ZInputTextArea from "@/components/Form/ZInputTextArea";
import ZSelect from "@/components/Form/ZSelect";
import { useAppDispatch } from "@/redux/Hook/Hook";
import { setIsAddModalOpen } from "@/redux/Modal/ModalSlice";
import { useAddBranchMutation } from "@/redux/Feature/Admin/branch/branchesApi";
import { useGetBusinessesQuery } from "@/redux/Feature/Admin/businesses/businesses";
import BreadCrumb from "@/components/BreadCrumb/BreadCrumb";
import ZCheckbox from "@/components/Form/ZCheckbox";

const AddBranch = () => {
  const [
    createBranch,
    {
      isLoading: CIsloading,
      isError: CIsError,
      error: CError,
      isSuccess: CIsSuccess,
      data,
    },
  ] = useAddBranchMutation();

  const { data: businessData, isLoading: businessLoading } =
    useGetBusinessesQuery();

  const handleSubmit = (data) => {
    // console.log(data);
    createBranch(data);
  };



  const businessOptions = businessData?.data?.map((business) => ({
    label: business.businessName,
    value: business.businessID,
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
        closeModal={handleCloseAndOpen}
        formType="create"
        data={data}
        buttonName="Create Branch"
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 mt-10">
          <ZSelect
            name="businessID"
            label="Business Name"
            placeholder="Select business"
            options={businessOptions}
            isLoading={businessLoading}
          />
          <ZInputTwo
            name="branchName"
            type="text"
            label="Branch Name"
            placeholder="Enter branch name"
          />
          <ZInputTextArea
            name="branchAddressDescription"
            label="Branch Address Description"
            placeholder="Enter branch address description"
          />
          <ZInputTwo
            name="branchCustomAddress"
            type="text"
            label="Branch Custom Address"
            placeholder="Enter branch custom address"
          />
          <ZInputTwo
            name="branchMobile"
            type="text"
            label="Branch Mobile"
            placeholder="Enter branch mobile"
          />
          <ZInputTwo
            name="branchEmail"
            type="email"
            label="Branch Email"
            placeholder="Enter branch email"
          />
          <ZInputTwo
            name="branchArea"
            type="text"
            label="Branch Area"
            placeholder="Enter branch area"
          />
          <ZInputTwo
            name="cityID"
            type="number"
            label="City ID"
            placeholder="Enter city ID"
          />
          <ZInputTwo
            name="cityName"
            type="text"
            label="City Name"
            placeholder="Enter city name"
          />
          <ZInputTwo
            name="regionID"
            type="number"
            label="Region ID"
            placeholder="Enter region ID"
          />
          <ZInputTwo
            name="regionName"
            type="text"
            label="Region Name"
            placeholder="Enter region name"
          />
          <ZInputTwo
            name="countryID"
            type="number"
            label="Country ID"
            placeholder="Enter country ID"
          />
          <ZInputTwo
            name="countryCode"
            type="text"
            label="Country Code"
            placeholder="Enter country code"
          />
          <ZInputTwo
            name="countryName"
            type="text"
            label="Country Name"
            placeholder="Enter country name"
          />
          <ZInputTwo
            name="mapLink"
            type="text"
            label="Map Link"
            placeholder="Enter map link"
          />
          <ZInputTwo
            name="coordinates.latitude"
            type="number"
            label="Latitude"
            placeholder="Enter latitude"
          />
          <ZInputTwo
            name="coordinates.longitude"
            type="number"
            label="Longitude"
            placeholder="Enter longitude"
          />
          <ZInputTwo
            name="location.lat"
            type="number"
            label="Location Latitude"
            placeholder="Enter location latitude"
          />
          <ZInputTwo
            name="location.lng"
            type="number"
            label="Location Longitude"
            placeholder="Enter location longitude"
          />
          <ZInputTwo
            name="branchQRCode"
            type="text"
            label="Branch QR Code"
            placeholder="Enter branch QR code"
          />

          <ZCheckbox
            isSuccess={CIsSuccess}
            checkedAttributed={true}
            label={"Is MainBranch"}
            name="isMainBranch"
          />

        <ZCheckbox
            isSuccess={CIsSuccess}
            checkedAttributed={true}
            label={"Is Delivery"}
            name="isDelivery"
          />
           <ZCheckbox
            isSuccess={CIsSuccess}
            checkedAttributed={true}
            label={"Is Inhouse"}
            name="isInHouse"
          />
           <ZCheckbox
            isSuccess={CIsSuccess}
            checkedAttributed={true}
            label={"Is Pickup"}
            name="isPickup"
          />        
        </div>
      </ZFormTwo>
    </div>
  );
};

export default AddBranch;
