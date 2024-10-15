"use client";
import React from "react";
import ZFormTwo from "@/components/Form/ZFormTwo";
import ZInputTwo from "@/components/Form/ZInputTwo";
import ZInputTextArea from "@/components/Form/ZInputTextArea";
import { useUpdateErpCategoryMutation } from "@/redux/Feature/Admin/erpcategory/erpcategory";
import { useAppDispatch } from "@/redux/Hook/Hook";
import {  setIsEditModalOpen } from "@/redux/Modal/ModalSlice";


const EditErpCategory = ({selectedCategory}) => {
  // console.log(selectedCategory)
   const dispatch = useAppDispatch()
  const [editCategory,{ isLoading: CIsloading, isError: CIsError,
    error : CError,
    isSuccess: CIsSuccess, data}] = useUpdateErpCategoryMutation();

  const handleSubmit = (data) => {
    const formData = {
      erpCategoryName: data?.erpCategoryName,
      erpCategoryImage: data?.erpCategoryImage,
      erpCategoryDesc: data?.erpCategoryDesc,
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
            name="erpCategoryName"
            type="text"
            label="Category Name"
            defaultKey={""}
            placeholder={"Enter your category"}
            required
          />
            <ZInputTwo
            value={selectedCategory?.image}
            name="erpCategoryImage"
            type="text"
            label="Category Image"
            defaultKey={""}
            placeholder={"Enter your category"}
            required
          />
          {/* <ZImageInput name="erpCategoryImage" label="Category Image" /> */}
          {/* <ZMultipleImage name="categoryImage" label="Category MultipleImage" dragDrop/> */}
          <ZInputTextArea
          required
            value={selectedCategory?.desc}         
           name="erpCategoryDesc" label={"Category Description"} placeholder={"Enter your description"}/>
        </div>
      </ZFormTwo>
    </div>
  );
};

export default EditErpCategory;