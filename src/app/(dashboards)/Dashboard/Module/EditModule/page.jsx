"use client";
import React from "react";
import ZFormTwo from "@/components/Form/ZFormTwo";
import ZInputTwo from "@/components/Form/ZInputTwo";
import ZInputTextArea from "@/components/Form/ZInputTextArea";
import { useAppDispatch } from "@/redux/Hook/Hook";
import {  setIsEditModalOpen } from "@/redux/Modal/ModalSlice";
import { useUpdateModuleMutation } from "@/redux/Feature/Admin/module/module";


const EditModule = ({selectedModule}) => {
  // console.log(selectedModule);
   const dispatch = useAppDispatch()
  const [editModule,{ isLoading: CIsloading, isError: CIsError,
    error : CError,
    isSuccess: CIsSuccess, data}] = useUpdateModuleMutation();

  const handleSubmit = (data) => {
    const formData = {
      moduleName: data?.moduleName,
      moduleImage: data?.moduleImage,
      moduleIcon: data?.moduleIcon,
    }; 
    editModule({ data: formData, id:selectedModule?.id });
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
            value={selectedModule?.name}
            name="moduleName"
            type="text"
            label="Module Name"
            defaultKey={""}
            placeholder={"Enter your module"}
            required
          />
            <ZInputTwo
            value={selectedModule?.image}
            name="moduleImage"
            type="text"
            label="Module Image"
            defaultKey={""}
            placeholder={"Enter your module"}
            required
          />

          <ZInputTextArea
          required
            value={selectedModule?.desc}         
           name="moduleIcon" label={"Module Icon"} placeholder={"Enter your Icon"}/>
        </div>
      </ZFormTwo>
    </div>
  );
};

export default EditModule;