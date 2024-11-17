"use client";
import React, { useEffect, useState } from "react";
import ZFormTwo from "@/components/Form/ZFormTwo";
import ZInputTwo from "@/components/Form/ZInputTwo";
import ZSelect from "@/components/Form/ZSelect";
import { useAppDispatch } from "@/redux/Hook/Hook";
import { setIsEditModalOpen } from "@/redux/Modal/ModalSlice";
import { useUpdateAttributesMutation, useUpdateAttributesValueMutation } from "@/redux/Feature/Admin/product/attributesApi";

const EditAttributes = ({ selectedAttribute }) => {
  const dispatch = useAppDispatch();

  const [updateAttribute, { isLoading, isError, isSuccess, error, data }] =
    useUpdateAttributesMutation();

  const [
    updateAttributeValue,
    { isLoading: valueIsLoading, isSuccess: valueIsSuccess },
  ] = useUpdateAttributesValueMutation();

  const [attributeValues, setAttributeValues] = useState([]);

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

  const handleSubmit = async (formData) => {
    console.log("Form Data Submitted:", formData);

    try {
    //   const formValues = formData.attributeValues || [];
      const formData2 = {
        attributeName: formData.attributeName,
      };

      // Update the attribute name
      await updateAttribute({
        id: selectedAttribute?.id,
        data: formData2,
      }).unwrap();

    //   const currentValues = selectedAttribute?.values || [];
    //   const existingValues = formValues.filter((value) =>
    //     currentValues.some((current) => current.id === value.value)
    //   );

    //   console.log(existingValues);

    //   if (existingValues.length === 0) {
    //     console.log("No existing values to update.");
    //     return;
    //   }

      // Loop over the existing values and update them
      for (const value of attributeValues) {
        await updateAttributeValue({
          id: value.value,
          data: {
            // attributeID: selectedAttribute.id,
            attributeValue: value.label,
          },
        });
      }

      console.log("Attribute and values updated successfully!");
    } catch (err) {
      console.error("Error updating attribute:", err);
    }
  };

  const handleCloseAndOpen = () => {
    dispatch(setIsEditModalOpen());
  };

  return (
    <div>
      <ZFormTwo
        isLoading={isLoading || valueIsLoading}
        isSuccess={isSuccess || valueIsSuccess}
        isError={isError}
        error={error}
        submit={handleSubmit}
        closeModal={handleCloseAndOpen}
        formType="edit"
        data={data}
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

          {/* Attribute Values */}
          <ZSelect
            name="attributeValues"
            mode={"multiple"}
            label="Attribute Values"
            placeholder="Select or Add Attribute Values"
            options={attributeValues}
            value={attributeValues}
            onChange={(selected) => {
              setAttributeValues(selected);
            }}
          />
        </div>
      </ZFormTwo>
    </div>
  );
};

export default EditAttributes;
