"use client";
import React from "react";
import ZFormTwo from "@/components/Form/ZFormTwo";
import ZInputTwo from "@/components/Form/ZInputTwo";
import ZSelect from "@/components/Form/ZSelect";
import { useAppDispatch } from "@/redux/Hook/Hook";
import { setIsEditModalOpen } from "@/redux/Modal/ModalSlice";
import { useUpdateAddressMutation } from "@/redux/Feature/Admin/address/addressApi";

const EditAddress = ({ selectedAddress }) => {
    // console.log(selectedAddress);
  const dispatch = useAppDispatch();
  const [editAddress, { isLoading, isError, error, isSuccess, data }] = useUpdateAddressMutation();

  const handleSubmit = (data) => {
    const formData = {
      address: data?.address,
      countryID: data?.countryID,
      countryName: data?.countryName,
      regionID: data?.regionID,
      regionName: data?.regionName,
      cityID: data?.cityID,
      cityName: data?.cityName,
      zipCode: data?.zipCode,
      status: data?.status,
    };

    editAddress({ data: formData, id: selectedAddress?.addressID });
  };

  const handleCloseAndOpen = () => {
    dispatch(setIsEditModalOpen());
  };

  return (
    <div className="">
      <ZFormTwo
        isLoading={isLoading}
        isSuccess={isSuccess}
        isError={isError}
        error={error}
        submit={handleSubmit}
        closeModal={handleCloseAndOpen}
        formType="edit"
        data={data}
        buttonName="Update Address"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mt-10">
          <ZInputTwo
            value={selectedAddress?.addressDescription}
            name="address"
            type="text"
            label="Address"
            defaultKey=""
            placeholder="Enter address"
            required
          />
          <ZSelect
            value={selectedAddress?.countryID}
            name="countryID"
            label="Country"
            options={[
              { label: "United States", value: selectedAddress?.countryID }
            ]}
            placeholder="Select a country"
            required
          />
          <ZInputTwo
            value={selectedAddress?.countryName}
            name="countryName"
            type="text"
            label="Country Name"
            defaultKey=""
            placeholder="Enter country name"
            required
          />
          <ZSelect
            value={selectedAddress?.regionID}
            name="regionID"
            label="Region"
            options={[
              { label: "California", value: selectedAddress?.regionID },

            ]}
            placeholder="Select a region"
            required
          />
          <ZInputTwo
            value={selectedAddress?.regionName}
            name="regionName"
            type="text"
            label="Region Name"
            defaultKey=""
            placeholder="Enter region name"
            required
          />
          <ZSelect
            value={selectedAddress?.cityID}
            name="cityID"
            label="City"
            options={[
              { label: "Los Angeles", value: selectedAddress?.cityID }
            ]}
            placeholder="Select a city"
            required
          />
          <ZInputTwo
            value={selectedAddress?.cityName}
            name="cityName"
            type="text"
            label="City Name"
            defaultKey=""
            placeholder="Enter city name"
            required
          />
          <ZInputTwo
            value={selectedAddress?.zipCode}
            name="zipCode"
            type="text"
            label="Zip Code"
            defaultKey=""
            placeholder="Enter zip code"
            required
          />
          <ZSelect
            value={selectedAddress?.status}
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

export default EditAddress;
