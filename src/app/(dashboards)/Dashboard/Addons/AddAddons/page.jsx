"use client";
import React, { useState, useEffect } from "react";
import ZFormTwo from "@/components/Form/ZFormTwo";
import ZInputTwo from "@/components/Form/ZInputTwo";
import ZInputTextArea from "@/components/Form/ZInputTextArea";
import { useAppDispatch, useAppSelector } from "@/redux/Hook/Hook";
import { setIsAddModalOpen } from "@/redux/Modal/ModalSlice";
import { useAddAddonsMutation } from "@/redux/Feature/Admin/addons/addons";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

const AddAddons = () => {
  const dispatch = useAppDispatch();
  const [createAddons, { isLoading, isError, error, isSuccess, data }] =
    useAddAddonsMutation();
  const { isAddModalOpen } = useAppSelector((state) => state.modal);
  const [addonPages, setAddonPages] = useState([1]);

  useEffect(() => {
    if (!isAddModalOpen) {
      setAddonPages([1]);
    }
  }, [isAddModalOpen]);

  const handleSubmit = (data) => {
    createAddons(data);
  };

  const handleAddPage = () => {
    setAddonPages([...addonPages, addonPages.length + 1]);
  };

  const handleRemovePage = (pageValue) => {
    const updatedPages = addonPages.filter((item) => item !== pageValue);
    setAddonPages([...updatedPages]);
  };



  const handleCloseAndOpen = () => {
    dispatch(setIsAddModalOpen());
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
        formType="create"
        data={data}
        buttonName="Create"
      >
        <div className="grid grid-cols-1 gap-3 mt-10">
          <ZInputTwo
            name="addonName"
            type="text"
            label="Addon Name"
            placeholder="Enter your Addon Name"
          />
          <ZInputTwo
            name="addonImage"
            type="text"
            label="Addon Image"
            placeholder="Enter your Addon Image"
          />
          <ZInputTextArea
            name="addonIcon"
            label="Addon Description"
            placeholder="Enter your description"
          />

          {/* Addon Pages Section */}
          <div>
            <h4 className="text-lg font-semibold mb-3">Addon Pages</h4>
            <div className="max-h-[400px] overflow-y-scroll thin-scrollbar mb-5">
              {addonPages.map((page, index) => (
                <div
                  key={index}
                  className="flex justify-between gap-4 items-center"
                >
                  <div className="w-[85%] flex items-center gap-2">
                    <ZInputTwo
                      name={`addonPage.${index}.pageName`}
                      type="text"
                      label="Page Name"
                      placeholder="Enter Page Name"


                    />

                    <ZInputTwo
                      name={`addonPage.${index}.pageRoute`}
                      type="text"
                      label="Page Route"
                      placeholder="Enter Page Route"
  

                    />
                  </div>
                  <div className="w-[15%]">
                    {index === 0 && (
                      <button
                        type="button"
                        onClick={handleAddPage}
                        className="bg-blue-500 text-white py-1 mt-2 px-2 rounded"
                      >
                        <AiOutlinePlus size={15} />
                      </button>
                    )}
                    {index !== 0 && (
                      <button
                        type="button"
                        onClick={() => handleRemovePage(page)}
                        className="bg-red-500 text-white rounded px-2 py-1 mt-2 "
                      >
                        <AiOutlineMinus size={15} />
                      </button>
                      
                    )}
                  </div>
                </div>
                
              ))}
            </div>
          </div>
        </div>
      </ZFormTwo>
    </div>
  );
};

export default AddAddons;
