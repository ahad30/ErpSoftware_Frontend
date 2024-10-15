"use client";
import React from "react";
import ZFormTwo from "@/components/Form/ZFormTwo";
import ZInputTwo from "@/components/Form/ZInputTwo";
import ZInputTextArea from "@/components/Form/ZInputTextArea";
import { useAppDispatch } from "@/redux/Hook/Hook";
import {  setIsEditModalOpen } from "@/redux/Modal/ModalSlice";
import { useUpdateAddonsMutation } from "@/redux/Feature/Admin/addons/addons";


const EditAddons = ({selectedCategory}) => {
  // console.log(selectedCategory)
   const dispatch = useAppDispatch()
  const [editCategory,{ isLoading: CIsloading, isError: CIsError,
    error : CError,
    isSuccess: CIsSuccess, data}] = useUpdateAddonsMutation();

  const handleSubmit = (data) => {
    const formData = {
      addonName: data?.addonName,
      addonImage: data?.addonImage,
      addonIcon: data?.addonIcon,
    }; 
    editCategory({ data: formData, id:selectedCategory?.id });
  };

  const handleCloseAndOpen = () => {
    dispatch(setIsEditModalOpen())
  }


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
        data = {data}
        buttonName="Update">
        <div className="grid grid-cols-1  gap-3 mt-10">
  
          <ZInputTwo
            value={selectedCategory?.name}
            name="addonName"
            type="text"
            label="Addon Name"
            defaultKey={""}
            placeholder={"Enter your Addon Name"}
            required
          />
            <ZInputTwo
            value={selectedCategory?.image}
            name="addonImage"
            type="text"
            label="Addon Image"
            defaultKey={""}
            placeholder={"Enter your Addon Image"}
            required
          />
          {/* <ZImageInput name="addonImage" label="Category Image" /> */}
          {/* <ZMultipleImage name="categoryImage" label="Category MultipleImage" dragDrop/> */}
          <ZInputTextArea
          required
            value={selectedCategory?.desc}         
           name="addonIcon" label={"Addon Description"} placeholder={"Enter your description"}/>
        </div>
      </ZFormTwo>
    </div>
  );
};

export default EditAddons;