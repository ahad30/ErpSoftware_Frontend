"use client";
import React, { useEffect, useState } from "react";
import ZFormTwo from "@/components/Form/ZFormTwo";
import ZInputTwo from "@/components/Form/ZInputTwo";
import { useAppDispatch, useAppSelector } from "@/redux/Hook/Hook";
import { setIsAddModalOpen } from "@/redux/Modal/ModalSlice";
import {
  useAddAttributesMutation,
  useAddAttributesValueMutation,
} from "@/redux/Feature/Admin/product/attributesApi";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { Button } from "antd";
import BreadCrumb from "@/components/BreadCrumb/BreadCrumb";

const AddAttributes = () => {
  const dispatch = useAppDispatch();
  const [addonPages, setAddonPages] = useState([1]);
  const { isAddModalOpen } = useAppSelector((state) => state.modal);
  // const router = useRouter();

  const [
    createAttribute,
    { isLoading, isError, isSuccess, error, data },
  ] = useAddAttributesMutation();

  // Hook for second API call
  const [addAttributesValue , {  isVSuccess, isLoading: valueIsLoading, data: vData }] = useAddAttributesValueMutation();


 
  useEffect(() => {
    if (!isAddModalOpen) {
      setAddonPages([1]);
    }
    // if(isSuccess){
    //   router.push("/Dashboard/Variation")
    // }
    
  }, [isAddModalOpen]);
  
  
  const handleSubmit = async (formData) => {

    try {  
      const result = await createAttribute({
        attributeName: formData.attributeName,
      }).unwrap(); 
  
      // Extract the attribute ID from the response
      const attributeID = result?.data?.attributeID;
      // console.log(result)
      if (!attributeID) {
        throw new Error("Attribute ID not found in response");
      }
  
  
      for (const value of addonPages) {
        if (value) {
          await addAttributesValue({
            attributeID: attributeID,
            attributeValue: value,
          });
        }
      }
      setAddonPages([""])
      // console.log("Both APIs executed successfully!");
    } catch (err) {
      console.error("Error executing APIs:", err);
    }
  };
  
  
  const handleAddPage = () => {
    setAddonPages([...addonPages, addonPages.length + 1]);
  };

  const handleRemovePage = (pageValue) => {
    const updatedPages = addonPages.filter((item) => item !== pageValue);
    setAddonPages([...updatedPages]);
  };


  const handleInputChange = (index, value) => {
    const updatedPages = [...addonPages];
    updatedPages[index] = value;
    setAddonPages(updatedPages);
  };
  
  const handleCloseAndOpen = () => {
    dispatch(setIsAddModalOpen());
  };

  return (
    <div className="">
         <div>
        {/* <BreadCrumb /> */}
      </div>
      <ZFormTwo
        isLoading={isLoading || valueIsLoading}
        isSuccess={isSuccess || isVSuccess}
        isError={isError}
        error={error}
        submit={handleSubmit}
        closeModal={handleCloseAndOpen}
        formType="create"
        data={data || vData}
        buttonName={`Create`}
      >
        <div className="grid grid-cols-1 gap-3 mt-10">
          {/* Attribute Name */}
          <ZInputTwo
            required
            name="attributeName"
            type="text"
            label="Attribute Name"
            placeholder="Enter Attribute Name"
          />
          {/* Attribute Value */}
          <div>
            <h4 className="text-lg font-semibold mb-3">Attribute Value</h4>
            <div className="max-h-[400px] overflow-y-scroll thin-scrollbar mb-5">
              {addonPages.map((page, index) => (
                <div
                  key={index}
                  className="flex  gap-4 items-center"
                >
                   <div className="w-[90%]">
                   <ZInputTwo
                      required={1}
                      name={`attributeValue-${index}`}
                      type="text"
                      label="Value Name"
                      placeholder="Enter Value Name"
                      onChange={(e) =>
                        handleInputChange(index, e.target.value)
                      }

                    />
                   </div>
                  <div className="">
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
        {/* <div className="flex justify-end">
                   
                   <Button
                      htmlType="submit"
                      style={{ backgroundColor: "#162447", color: "white" }}
                    >
                      Submit
                    </Button>

                  </div> */}
      </ZFormTwo>
    </div>
  );
};

export default AddAttributes;
