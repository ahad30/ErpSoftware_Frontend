"use client";

import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import ZInputTwo from "@/components/Form/ZInputTwo";
import ZSelect from "@/components/Form/ZSelect";
import ZFormTwo from "@/components/Form/ZFormTwo";
import { useAppDispatch } from "@/redux/Hook/Hook";
import { setIsAddModalOpen } from "@/redux/Modal/ModalSlice";
import { useAddAddressMutation } from "@/redux/Feature/Admin/address/addressApi";

const AddAddress = () => {
  const dispatch = useAppDispatch();

  const [addAddress, { isLoading, isError, isSuccess, error , data}] = useAddAddressMutation();

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
    addAddress(formData);
  };

  const handleCloseAndOpen = () => {
    dispatch(setIsAddModalOpen());
  };

  return (
    <div>

        <ZFormTwo
          isLoading={isLoading}
          isSuccess={isSuccess} 
          isError={isError}
          data={data}
          error={error}
          submit={handleSubmit}
          closeModal={handleCloseAndOpen}
          formType="create"
          buttonName="Add Address"
        >
          <div className="grid grid-cols-1 gap-3 mt-10">
            <ZInputTwo
              name="address"
              type="text"
              label="Address"
              placeholder="Enter address"
              required
            />
            <ZSelect
              name="countryID"
              label="Country"
              options={[
                { label: "United States", value: 1 },
              ]}
              placeholder="Select a country"
              required
            />
            <ZInputTwo
              name="countryName"
              type="text"
              label="Country Name"
              placeholder="Enter country name"
              required
            />
            <ZSelect
              name="regionID"
              label="Region"
              options={[
                { label: "California", value: 1 },
              ]}
              placeholder="Select a region"
              required
            />
            <ZInputTwo
              name="regionName"
              type="text"
              label="Region Name"
              placeholder="Enter region name"
              required
            />
            <ZSelect
              name="cityID"
              label="City"
              options={[
                { label: "Los Angeles", value: 1 },
              ]}
              placeholder="Select a city"
              required
            />
            <ZInputTwo
              name="cityName"
              type="text"
              label="City Name"
              placeholder="Enter city name"
              required
            />
            <ZInputTwo
              name="zipCode"
              type="text"
              label="Zip Code"
              placeholder="Enter zip code"
              required
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

export default AddAddress;
