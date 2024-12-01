"use client";
import React, { useState, useEffect } from "react";
import ZFormTwo from "@/components/Form/ZFormTwo";
import ZInputTwo from "@/components/Form/ZInputTwo";
import ZInputTextArea from "@/components/Form/ZInputTextArea";
import { useAppDispatch, useAppSelector } from "@/redux/Hook/Hook";
import { setIsAddModalOpen } from "@/redux/Modal/ModalSlice";
import { useAddProductVariationApiMutation } from "@/redux/Feature/Admin/product/productVariationApi";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import BreadCrumb from "@/components/BreadCrumb/BreadCrumb";
import ZCheckbox from "@/components/Form/ZCheckbox";


function generateUniqueId(length = 8) {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}


const AddVariation = () => {
  const dispatch = useAppDispatch();
  const [createProductVariation, { isLoading, isError, error, isSuccess, data }] =
    useAddProductVariationApiMutation();
  const { isAddModalOpen } = useAppSelector((state) => state.modal);

  useEffect(() => {
    if (!isAddModalOpen) {
      // setSerialNumbers([1]);
    }
  }, [isAddModalOpen]);


  const handleSubmit = (formData) => {
      console.log(formData)
      createProductVariation({...formData, productID : 1});
  };



  return (
    <div>
      <BreadCrumb/>
      <ZFormTwo
        isLoading={isLoading}
        isSuccess={isSuccess}
        isError={isError}
        error={error}
        submit={handleSubmit}
        formType="create"
        data={data}
        buttonName="Create"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mt-5">
         
          <ZInputTwo
            name="sku"
            type="text"
            label="SKU"
            placeholder="Enter SKU"
          />
          <ZInputTwo
            name="stock"
            type="number"
            label="Stock Quantity"
            placeholder="Enter Stock Quantity"
          />
          <ZInputTwo
            name="min_stock"
            type="number"
            label="Minimum Stock"
            placeholder="Enter Minimum Stock"
          />
          <ZInputTwo
            name="max_stock"
            type="number"
            label="Maximum Stock"
            placeholder="Enter Maximum Stock"
          />
          <ZInputTwo
            name="salePrice"
            type="number"
            label="Sale Price"
            placeholder="Enter Sale Price"
          />
          <ZInputTwo
            name="serialNo"
            type="number"
            label="Serial No"
            placeholder="Enter Serial No"
          />
          <ZInputTwo
            name="purchasePrice"
            type="number"
            label="Purchase Price"
            placeholder="Enter Purchase Price"
          />
          <ZInputTwo
            name="wholeSalePrice"
            type="number"
            label="Wholesale Price"
            placeholder="Enter Wholesale Price"
          />
          <ZInputTwo
            name="retailPrice"
            type="number"
            label="Retail Price"
            placeholder="Enter Retail Price"
          />
          <ZInputTwo
            name="expiryDate"
            type="date"
            label="Expiry Date"
            placeholder="Enter Expiry Date"
          />
          {/* <ZInputTextArea
            name="qrCode"
            label="QR Code"
            placeholder="Enter QR Code Data"
          /> */}
          <ZInputTextArea
            name="productImage"
            label="Product Image URL"
            placeholder="Enter Product Image URL"
          />
         {/* <ZCheckbox
            isSuccess={isSuccess}
            // checkedAttributed={true}
            label={"Is Download"}
            name="is_downloadable"
          />

          <ZCheckbox
            isSuccess={isSuccess}
            // checkedAttributed={true}
            label={"Is Virtual"}
            name="is_virtual"
          />
           <ZCheckbox
            isSuccess={isSuccess}
            // checkedAttributed={true}
            label={"Is Warranty"}
            name="is_warranty"
          />
           <ZCheckbox
            isSuccess={isSuccess}
            // checkedAttributed={true}
            label={"Is Guarantee"}
            name="is_guaranty"
          />         */}

          {/* Dynamic Serial Numbers Input */}
          {/* <div className="mb-3">
            <h4 className="text-lg font-semibold mb-3">Serial Numbers</h4>
            <div className="max-h-[400px] overflow-y-scroll thin-scrollbar">
              {serialNumbers.map((_, index) => (
                <div key={index} className="flex items-center gap-4 mb-2">
                  <ZInputTwo
                    name={`serialNumbers.${index}`}
                    type="text"
                    label={`Serial Number ${index + 1}`}
                    placeholder="Enter Serial Number"
                  />
                  {index === 0 && (
                    <button
                      type="button"
                      onClick={handleAddSerial}
                      className="bg-blue-500 text-white py-1 px-2 rounded"
                    >
                      <AiOutlinePlus size={15} />
                    </button>
                  )}
                  {index !== 0 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveSerial(index)}
                      className="bg-red-500 text-white py-1 px-2 rounded"
                    >
                      <AiOutlineMinus size={15} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div> */}
        </div>
      </ZFormTwo>
    </div>
  );
};


export default AddVariation;