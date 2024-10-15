"use client";
import React from "react";
import ZFormTwo from "@/components/Form/ZFormTwo";
import ZInputTwo from "@/components/Form/ZInputTwo";
import ZInputTextArea from "@/components/Form/ZInputTextArea";
import { useAppDispatch } from "@/redux/Hook/Hook";
import { setIsAddModalOpen } from "@/redux/Modal/ModalSlice";
import { useAddModuleMutation } from "@/redux/Feature/Admin/module/module";



const AddModule = () => {
   const dispatch = useAppDispatch()
  const [createModule,{ isLoading: CIsloading, isError: CIsError,
    error : CError,
    isSuccess: CIsSuccess, data}] = useAddModuleMutation();

  const handleSubmit = (data) => {
    createModule(data);
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
            name="moduleName"
            type="text"
            label="Module Name"
            defaultKey={""}
            placeholder={"Enter your module name"}

          />
            <ZInputTwo
            name="moduleImage"
            type="text"
            label="Module Image"
            defaultKey={""}
            placeholder={"Enter your module image"}
          />
          {/* <ZImageInput name="moduleImage" label="Category Image" /> */}
          {/* <ZMultipleImage name="categoryImage" label="Category MultipleImage" dragDrop/> */}
          <ZInputTextArea name="moduleIcon" label={"Module Icon"} placeholder={"Enter your Icon"}/>
        </div>
      </ZFormTwo>
    </div>
  );
};

export default AddModule;
