"use client";
import React, { useEffect } from "react";
import ZFormTwo from "@/components/Form/ZFormTwo";
import ZInputTwo from "@/components/Form/ZInputTwo";
import ZInputTextArea from "@/components/Form/ZInputTextArea";
import { useAppDispatch } from "@/redux/Hook/Hook";
import { setIsEditModalOpen } from "@/redux/Modal/ModalSlice";

import ZCheckbox from "@/components/Form/ZCheckbox";
import { useUpdateBranchMutation } from "@/redux/Feature/Admin/branch/branchesApi";
import { useGetBusinessesQuery } from "@/redux/Feature/Admin/businesses/businesses";
import ZSelect from "@/components/Form/ZSelect";

const EditBranch = ({ selectedBranch }) => {
  console.log(selectedBranch);
  const dispatch = useAppDispatch();
  const [
    updateBranch,
    {
      isLoading: CIsLoading,
      isError: CIsError,
      error,
      isSuccess: CIsSuccess,
      data,
    },
  ] = useUpdateBranchMutation();

  const { data: businessData, isLoading: businessLoading } =
    useGetBusinessesQuery();


  const handleSubmit = (data) => {
    const updatedData = { data, id: selectedBranch.branchID };
    updateBranch(updatedData);
  };

  const handleCloseAndOpen = () => {
    dispatch(setIsEditModalOpen());
  };

  const businessOptions = businessData?.data?.map((business) => ({
    label: business.businessName,
    value: business.businessID,
  }));


  return (
    <div className="">
      <ZFormTwo
        isLoading={CIsLoading}
        isSuccess={CIsSuccess}
        isError={CIsError}
        error={error}
        submit={handleSubmit}
        closeModal={handleCloseAndOpen}
        formType="edit"
        data={data}
        buttonName="Update Branch"
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 mt-10">
          <ZSelect
            name="businessID"
            label="Business Name"
            placeholder="Select business"
            options={businessOptions}
            isLoading={businessLoading}
            value={selectedBranch?.businessID}
            required

          />
          <ZInputTwo
            name="branchName"
            type="text"
            label="Branch Name"
            placeholder="Enter branch name"
            value={selectedBranch.branchName}
            required

          />
          <ZInputTextArea
            name="branchAddressDescription"
            label="Branch Address Description"
            placeholder="Enter branch address description"
            value={selectedBranch.branchAddressDescription}
            required

          />
          <ZInputTwo
            name="branchCustomAddress"
            type="text"
            label="Branch Custom Address"
            placeholder="Enter branch custom address"
            value={selectedBranch.branchCustomAddress}
            required
          />
          <ZInputTwo
            name="branchMobile"
            type="text"
            label="Branch Mobile"
            placeholder="Enter branch mobile"
            value={selectedBranch.branchMobile}
            required

          />
          <ZInputTwo
            name="branchEmail"
            type="email"
            label="Branch Email"
            placeholder="Enter branch email"
            value={selectedBranch.branchEmail}
            required

          />
          <ZInputTwo
            name="branchArea"
            type="text"
            label="Branch Area"
            placeholder="Enter branch area"
            value={selectedBranch.branchArea}
            required
          />
          <ZInputTwo
            name="cityID"
            type="number"
            label="City ID"
            placeholder="Enter city ID"
            value={selectedBranch.cityID}
            required

          />
          <ZInputTwo
            name="cityName"
            type="text"
            label="City Name"
            placeholder="Enter city name"
            value={selectedBranch.cityName}
            required

          />
          <ZInputTwo
            name="regionID"
            type="number"
            label="Region ID"
            placeholder="Enter region ID"
            value={selectedBranch.regionID}
            required

          />
          <ZInputTwo
            name="regionName"
            type="text"
            label="Region Name"
            placeholder="Enter region name"
            value={selectedBranch.regionName}
            required

          />
          <ZInputTwo
            name="countryID"
            type="number"
            label="Country ID"
            placeholder="Enter country ID"
            value={selectedBranch.countryID}
            required

          />
          <ZInputTwo
            name="countryCode"
            type="text"
            label="Country Code"
            placeholder="Enter country code"
            value={selectedBranch.countryCode}
            required

          />
          <ZInputTwo
            name="countryName"
            type="text"
            label="Country Name"
            placeholder="Enter country name"
            value={selectedBranch.countryName}
            required

          />
          <ZInputTwo
            name="mapLink"
            type="text"
            label="Map Link"
            placeholder="Enter map link"
            value={selectedBranch.mapLink}
            required

          />
          <ZInputTwo
            name="coordinates.latitude"
            type="number"
            label="Latitude"
            placeholder="Enter latitude"
            value={selectedBranch.latitude}
            required

          />
          <ZInputTwo
            name="coordinates.longitude"
            type="number"
            label="Longitude"
            placeholder="Enter longitude"
            value={selectedBranch.longitude}
            required

          />
          <ZInputTwo
            name="location.lat"
            type="number"
            label="Location Latitude"
            placeholder="Enter location latitude"
            value={selectedBranch.lat}
            required

          />
          <ZInputTwo
            name="location.lng"
            type="number"
            label="Location Longitude"
            placeholder="Enter location longitude"
            value={selectedBranch.lng}
            required

          />
          <ZInputTwo
            name="branchQRCode"
            type="text"
            label="Branch QR Code"
            placeholder="Enter branch QR code"
            value={selectedBranch.branchQRCode}
            required

          />

          <ZCheckbox
            isSuccess={CIsSuccess}
            checkedAttributed={true}
            label={"Is MainBranch"}
            name="isMainBranch"
            value={selectedBranch.isMainBranch}
            required

          />

          <ZCheckbox
            isSuccess={CIsSuccess}
            checkedAttributed={true}
            label={"Is Delivery"}
            name="isDelivery"
            value={selectedBranch.isDelivery}
            required

          />
          <ZCheckbox
            isSuccess={CIsSuccess}
            checkedAttributed={true}
            label={"Is Inhouse"}
            name="isInHouse"
            value={selectedBranch.isInHouse}
            required

          />
          <ZCheckbox
            isSuccess={CIsSuccess}
            checkedAttributed={true}
            label={"Is Pickup"}
            name="isPickup"
            value={selectedBranch.isPickup}
            required

          />
        </div>
      </ZFormTwo>
    </div>
  );
};

export default EditBranch;
