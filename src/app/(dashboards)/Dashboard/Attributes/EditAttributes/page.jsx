"use client";
import React, { useEffect, useState } from "react";
import ZFormTwo from "@/components/Form/ZFormTwo";
import ZInputTwo from "@/components/Form/ZInputTwo";
import ZSelect from "@/components/Form/ZSelect";
import { useAppDispatch, useAppSelector } from "@/redux/Hook/Hook";
import { setIsEditModalOpen } from "@/redux/Modal/ModalSlice";
import { useDeleteAttributesValuesMutation, useUpdateAttributesMutation, useUpdateAttributesValueMutation } from "@/redux/Feature/Admin/product/attributesApi";
import { Alert } from "antd";
import { CiTrash } from "react-icons/ci";

const EditAttributes = ({ selectedAttribute }) => {
  console.log(selectedAttribute)
  const [attributeValues, setAttributeValues] = useState([]);
  const [previousAttributeValues, setPreviousAttributeValues] = useState([]);
  const [deletedIds, setDeletedIds] = useState([]);

  const dispatch = useAppDispatch();
  const [updateAttribute, { isLoading, isError, isSuccess, error, data }] =
    useUpdateAttributesMutation();
  const [
    updateAttributeValue,
    { isLoading: valueIsLoading, isSuccess: valueIsSuccess , data: valueData },
  ] = useUpdateAttributesValueMutation();
  const { isEditModalOpen } = useAppSelector((state) => state.modal);
  const [deleteAttributeValue, { isLoading: deleteIsLoading, isSuccess: dIsSuccess, isError: dIsError, data: dData }] = useDeleteAttributesValuesMutation();

  useEffect(() => {
    if (selectedAttribute) {
      setAttributeValues(
        selectedAttribute?.values?.map((value) => ({
          label: value.name,
          value: value.id,
        })) || []
      );
    }
  }, [selectedAttribute]);



  useEffect(() => {
    if (selectedAttribute?.values || !isEditModalOpen || valueIsSuccess) {
      setPreviousAttributeValues(selectedAttribute?.values);
    }
  }, [selectedAttribute?.values, selectedAttribute, valueIsSuccess, isEditModalOpen]);



  const handlePreviousItemDelete = async(id) => {
  // const result = await deleteAttributeValue(id);
    setDeletedIds([...deletedIds, id]);
    const filterData = previousAttributeValues.filter((item) => item.id !== id);
    setPreviousAttributeValues([...filterData]);
  }


  const handleSubmit = async (formData) => {
    console.log("Form Data Submitted:", formData);
  
    try {
      
      const updatedData = {
        attributeName: formData.attributeName,
        values: previousAttributeValues.map((item) => ({
          id: item.id,
          name: item.name,
        })),
      };
  
      console.log("Updated Data to Submit:", updatedData);
  
      // Hit the API with the updated data
      await updateAttribute({
        id: selectedAttribute?.id,
        data: updatedData,
      }).unwrap();
  
      console.log("Attribute updated successfully!");
    } catch (err) {
      console.error("Error updating attribute:", err);
    }
  };
  


  // console.log(attributeValues)
  

  const handleCloseAndOpen = () => {
    dispatch(setIsEditModalOpen());
  };

  return (
    <div>
            <div>
        <h3 className="border-b mb-2 font-bold border-black ">
          Previous values
        </h3>
        <div className="grid mb-12 pt-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5">
          {previousAttributeValues?.length > 0
            ? previousAttributeValues?.map((item) => (
                <div key={item?.id} className="relative">
                  <Alert message={item?.name} type="info" />
                  <span
                    onClick={() =>handlePreviousItemDelete(item?.id)}
                    className="cursor-pointer absolute bg-red-500 p-1 rounded-full -top-2 -right-2 text-white"
                  >
                    <CiTrash size={20}></CiTrash>
                  </span>
                </div>
              ))
            : "There are no previous values"}      
        </div>
      </div>
      <ZFormTwo
        isLoading={isLoading || valueIsLoading}
        isSuccess={isSuccess}
        isError={isError}
        error={error}
        submit={handleSubmit}
        closeModal={handleCloseAndOpen}
        formType="edit"
        data={data || valueData}
        buttonName="Update Attribute"
      >
        <div className="grid grid-cols-1 gap-3 mt-10">
          {/* Attribute Name */}
          <ZInputTwo
            required
            name="attributeName"
            type="text"
            label="Attribute Name"
            placeholder="Enter Attribute Name"
            value={selectedAttribute?.name || ""}
          />

          {/* <ZSelect
            name="attributeValues"
            mode={"multiple"}
            label="Attribute Values"
            placeholder="Select or Add Attribute Values"
            options={attributeValues}
            value={attributeValues}
            onChange={(selected) => {
              setAttributeValues(selected);
            }}
          /> */}
        </div>
      </ZFormTwo>
    </div>
  );
};

export default EditAttributes;
