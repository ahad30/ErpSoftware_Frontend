"use client";
import React from "react";
import ZFormTwo from "@/components/Form/ZFormTwo";
import ZInputTwo from "@/components/Form/ZInputTwo";
import ZInputTextArea from "@/components/Form/ZInputTextArea";
import { useAppDispatch } from "@/redux/Hook/Hook";
import { setIsAddModalOpen } from "@/redux/Modal/ModalSlice";
import { useAddCategoryMutation } from "@/redux/Feature/Admin/category/category";



const AddCategory = () => {
   const dispatch = useAppDispatch()
  const [creatCategory,{ isLoading: CIsloading, isError: CIsError,
    error : CError,
    isSuccess: CIsSuccess, data}] = useAddCategoryMutation();

  const handleSubmit = (data) => {
    creatCategory(data);
  };
  
  const handleCloseAndOpen = () => {
    dispatch(setIsAddModalOpen())
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
        formType="create"  
        data = {data}
        buttonName="Create">
        <div className="grid grid-cols-1  gap-3 mt-10">
  
          <ZInputTwo
            name="sysCategoryName"
            type="text"
            label="Category Name"
            defaultKey={""}
            placeholder={"Enter your category"}

          />
            <ZInputTwo
            name="sysCategoryImage"
            type="text"
            label="Category Image"
            defaultKey={""}
            placeholder={"Enter your category"}
          />
          {/* <ZImageInput name="sysCategoryImage" label="Category Image" /> */}
          {/* <ZMultipleImage name="categoryImage" label="Category MultipleImage" dragDrop/> */}
          <ZInputTextArea name="sysCategoryDesc" label={"Category Description"} placeholder={"Enter your description"}/>
        </div>
      </ZFormTwo>
    </div>
  );
};

export default AddCategory;
