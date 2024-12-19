"use client";
import React from "react";
import ZFormTwo from "@/components/Form/ZFormTwo";
import ZInputTwo from "@/components/Form/ZInputTwo";
import ZInputTextArea from "@/components/Form/ZInputTextArea";
import { useAppDispatch } from "@/redux/Hook/Hook";
import { setIsAddModalOpen } from "@/redux/Modal/ModalSlice";
import { useAddErpCategoryMutation } from "@/redux/Feature/Admin/erpcategory/erpcategory";



const AddErpCategory = () => {
   const dispatch = useAppDispatch()
  const [creatErpCategory,{ isLoading: CIsloading, isError: CIsError,
    error : CError,
    isSuccess: CIsSuccess, data}] = useAddErpCategoryMutation();

  const handleSubmit = (data) => { 
    creatErpCategory(data);
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
          required
            name="erpCategoryName"
            type="text"
            label="Category Name"
            defaultKey={""}
            placeholder={"Enter your category"}

          />
            <ZInputTwo
            // required
            name="erpCategoryImage"
            type="text"
            label="Category Image"
            defaultKey={""}
            placeholder={"Enter your category"}
          />

          <ZInputTextArea name="erpCategoryDesc" label={"Category Description"} 
          // required
          placeholder={"Enter your description"}/>
        </div>
      </ZFormTwo>
    </div>
  );
};

export default AddErpCategory;
