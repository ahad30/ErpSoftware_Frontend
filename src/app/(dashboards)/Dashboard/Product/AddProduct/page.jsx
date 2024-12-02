"use client";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import ZFormTwo from "@/components/Form/ZFormTwo";
import ZInputTwo from "@/components/Form/ZInputTwo";
import ZSelect from "@/components/Form/ZSelect";
import ZCheckbox from "@/components/Form/ZCheckbox";
import BreadCrumb from "@/components/BreadCrumb/BreadCrumb";
import { useGetErpCategoryQuery } from "@/redux/Feature/Admin/erpcategory/erpcategory";
import { useGetBrandQuery } from "@/redux/Feature/Admin/brand/brandApi";
import { useGetBusinessesQuery } from "@/redux/Feature/Admin/businesses/businesses";
import { useAddProductMutation } from "@/redux/Feature/Admin/product/productApi";
import ZInputTextArea from "@/components/Form/ZInputTextArea";
import { useGetProductVariationApiQuery } from "@/redux/Feature/Admin/product/productVariationApi";
import { useGetBranchesQuery } from "@/redux/Feature/Admin/branch/branchesApi";
import ZRadio from "@/components/Form/ZRadio";
import ZImageInput from "@/components/Form/ZImageInput";
import { useGetAttributesQuery } from "@/redux/Feature/Admin/product/attributesApi";
import { Button, Spin } from "antd";
import ZNumber from "@/components/Form/ZNumber";

const AddProduct = () => {
   // attribute State - 1 from db
   const [attributeValue, setAttributeValue] = useState([]);

   // selected attribute State - 2
   const [selectedAttribute, setSelectedAttribute] = useState([]);
   // attribute options for selected options state-3
   const [attributeOptions, setAttributeOptions] = useState([]);
     //  product type state - 4
  const [productType, setProductType] = useState("");
    // selectedAttribute UnderTheValue - 5
  const [selectedAttributeUnderTheValue, setSelectedAttributeUnderTheValue] =useState([]);
   // per sku - 6
  const [perSku, setPerSku] = useState([]);
   //  skus - 7
  const [skus, setSkus] = useState([]);

  //  refresh state for variant
  const [refresh, setRefresh] = useState(false);
 

    // image file , price , quantity - 8 for vairant product
    const [priceQuantityImage, setPriceQuantityImage] = useState({
      price: "",
      image: "",
      quantity: "",
    });
  
    // single -----> image file , price , quantity - 9
    const [singlePriceQuantityImage, singleSetPriceQuantityImage] = useState({
      singlePrice: "",
      images: "",
      singleQuantity: "",
    });

  const router = useRouter();
  const pathName = usePathname()

  const { data: eData, isLoading: eLoading } = useGetErpCategoryQuery();
  const { data: bData, isLoading: bLoading } = useGetBrandQuery();
  const { data: businessData, isLoading: businessLoading } =
    useGetBusinessesQuery();
  const { data: allBranchData, error, isLoading: branchIsLoading } = useGetBranchesQuery();
  const { data: attributeWithValue, isLoading: attributeIsLoading  } = useGetAttributesQuery();
  const [
    createProduct,
    {
      isLoading: CIsloading,
      isError: CIsError,
      error: CError,
      isSuccess: CIsSuccess,
      data,
    },
  ] = useAddProductMutation();

  //  console.log(attributeWithValue);

  const businessOptions = businessData?.data?.map((business) => ({
    label: business.businessName,
    value: business.businessID,
  }));

  const categoryData = eData?.data?.map((eCategory) => ({
    label: eCategory.erpCategoryName,
    value: eCategory.erpCategoryID,
  }));

  const brandData = bData?.data?.map((brand) => ({
    label: brand.brandName,
    value: brand.brandID,
  }));

  const branchData = allBranchData?.data?.map((branch) => ({
    label: branch.branchName,
    value: branch.branchID,
  }));


  useEffect(() => {
    if (
      Array.isArray(attributeWithValue?.data) &&
      attributeWithValue?.data?.length > 0
    ) {
      const attributeOptions = attributeWithValue?.data?.map((item) => ({
        label: item.attributeName,
        value: item.attributeName,
      }));
      setAttributeOptions([...attributeOptions]);
      setAttributeValue([...attributeWithValue.data]);
    }
  }, [attributeWithValue, attributeWithValue?.data]);


  useEffect(() => {
    if (selectedAttribute) {
      const arr = [];
      for (let index = 0; index < selectedAttribute.length; index++) {
        const element = selectedAttribute[index];
        const findTheAttributeWithValue = attributeValue?.find(
          (item) => item.attributeName == element
        );

        if (findTheAttributeWithValue) {
          arr.push({ ...findTheAttributeWithValue });
        }
      }
      setSelectedAttributeUnderTheValue([...(arr || [])]);
    }
  }, [selectedAttribute.length, selectedAttribute, attributeValue]);

  useEffect(() => {
    setSkus([]);
  }, [productType]);


  useEffect(() => {
    if (CIsSuccess) {
      router.push("/Dashboard/Product");
    }
  }, [CIsSuccess, router]);

  const handleRefreshVariantState = () => {
    setPerSku([]);
    // setPriceQuantityImage({
    //   price: "",
    //   image: "",
    //   quantity: "",
    // });
    setRefresh(!refresh);
  };


  const handleSubmit = (data) => {
    console.log(data)
   // createProduct(data);
 };

  if (eLoading || bLoading || attributeIsLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p><Spin size="large"/></p>
      </div>
    );
  }

  return (
    <div className="">
     <div className={`${pathName === "/Dashboard/pos" ? "hidden" : ""}`}>
     <BreadCrumb />
     </div>
      <ZFormTwo
        isLoading={CIsloading}
        isSuccess={CIsSuccess}
        isError={CIsError}
        error={CError}
        submit={handleSubmit}
        formType="create"
        data={data}
        buttonName="Create"
      >
       
          {
            pathName === "/Dashboard/pos" ? 
(<>
   <div className="grid md:grid-cols-2 grid-cols-1 gap-3 mt-10">
  <ZInputTwo
            name="productTitle"
            type="text"
            label="Product Title"
            placeholder="Enter product title"
          />
          <ZInputTwo
            name="sku"
            type="text"
            label="SKU"
            placeholder="Enter SKU"
          />
           <ZSelect
            name="variationID"
            label="Variation Name"
            placeholder="Select Variation"
            options={variationData}
            isLoading={variationIsLoading}
          />
           <ZSelect
            name="businessID"
            label="Business Name"
            placeholder="Select business"
            options={businessOptions}
            isLoading={businessLoading}
          />
           <ZSelect
            name="branchIDs"
            mode={"multiple"}
            label="Branch Name"
            placeholder="Select Available Branch"
            options={branchData}
            isLoading={branchIsLoading}
          />

          <ZSelect
            name="erpCategoryID"
            isLoading={eLoading}
            label="Product Category"
            options={categoryData}
            placeholder="Select category"
          />
          <ZSelect
            name="brandID"
            isLoading={bLoading}
            label="Product Brand"
            options={brandData}
            placeholder="Select brand"
          />




          <ZInputTextArea
            name="description"
            type="text"
            label="Description"
            placeholder="Enter product description"
          />
      </div>

</>)

           :(
           <>

          <div className="grid md:grid-cols-2 grid-cols-1 gap-3 mt-10">

           <ZInputTwo
            name="productTitle"
            type="text"
            label="Product Title"
            placeholder="Enter product title"
          />
          <ZInputTwo
            name="productSubtitle"
            type="text"
            label="Subtitle"
            placeholder="Enter product subtitle"
          />
           <ZInputTwo
            name="sku"
            type="text"
            label="SKU"
            placeholder="Enter SKU"
          />     

          <ZSelect
            name="erpCategoryID"
            isLoading={eLoading}
            label="Product Category"
            options={categoryData}
            placeholder="Select category"
          />

          <ZSelect
            name="brandID"
            isLoading={bLoading}
            label="Product Brand"
            options={brandData}
            placeholder="Select brand"
          />

         <ZSelect
            name="businessID"
            label="Business Name"
            placeholder="Select business"
            options={businessOptions}
            isLoading={businessLoading}
          />

         <ZSelect
            name="branchIDs"
            mode={"multiple"}
            label="Branch Name"
            placeholder="Select Available Branch"
            options={branchData}
            isLoading={branchIsLoading}
          />
         <ZSelect
            name="notAvailableBranchIDs"
            mode={"multiple"}
            label="Not available Branch Name"
            placeholder="Select Not Available Branch"
            options={branchData}
            isLoading={branchIsLoading}
          />

               
       <div className="col-span-2">
       <ZInputTextArea
            name="productDescription"
            type="text"
            label="Description"
            placeholder="Enter product description"
          />
       </div>
       <ZInputTwo
            name="expiryDate"
            type="date"
            label="Expiry Date"
            placeholder="Enter Expiry Date"
        />

       <ZImageInput label="Product Image" name="productImage"></ZImageInput>

          <ZSelect
            name="isActive"
            label="Status"
            options={[
              { label: "Active", value: true },
              { label: "Inactive", value: false },
            ]}
            placeholder="Select status"
          />

        <div className="mt-7 lg:col-span-2">
          <h5 className="text-xl  pb-2 mb-2  ">Type of products</h5>
          <ZRadio
            options={[
              {
                name: "Without Variant",
                value: "1",
              },
              {
                name: "With Variant",
                value: "0",
              },
            ]}
            name={"isVariation"}
            label={"Product type"}
            setProductType={setProductType}
          ></ZRadio>
        </div>



        {/* single Product type start */}
         
         {productType === "1" &&
          (
            <>
            
            <ZNumber
            name="stock"
            type="number"
            label="Stock Quantity"
            placeholder="Enter Stock Quantity"
            refresh={refresh}
            />
          
          <ZNumber
            name="min_stock"
            type="number"
            label="Minimum Stock"
            placeholder="Enter Minimum Stock"
            refresh={refresh}

          />
          <ZNumber
            name="max_stock"
            type="number"
            label="Maximum Stock"
            placeholder="Enter Maximum Stock"
            refresh={refresh}

          />
          <ZNumber
            name="salePrice"
            type="number"
            label="Sale Price"
            placeholder="Enter Sale Price"
            refresh={refresh}

          />
          <ZNumber
            name="serialNo"
            type="number"
            label="Serial No"
            placeholder="Enter Serial No"
            refresh={refresh}

          />
          <ZNumber
            name="purchasePrice"
            type="number"
            label="Purchase Price"
            placeholder="Enter Purchase Price"
            refresh={refresh}

          />
          <ZNumber
            name="wholeSalePrice"
            type="number"
            label="Wholesale Price"
            placeholder="Enter Wholesale Price"
            refresh={refresh}

          />
          <ZNumber
            name="retailPrice"
            type="number"
            label="Retail Price"
            placeholder="Enter Retail Price"
            refresh={refresh}

          />
            </>
          )
         }
         </div>

           {/* variant Product type start */}
           {productType === "0" && (
          <div className="mb-3">
            {/* per sku  */}

            {/* multiple attribute */}
            <ZSelect
              setSelectedAttributes={setSelectedAttribute}
              options={attributeOptions}
              isLoading={attributeIsLoading}
              mode={"multiple"}
              label={"Select Attributes"}
              name={"attribute-selected"}
              defaultKey="product"
              placeholder={"Select Variant Name"}
              refresh={refresh}
            ></ZSelect>

            {/* selected attribute underTheValue */}
            <div className="border border-gray-400 p-3">
              {/* attribute value */}
              <div className="mt-12 grid lg:grid-cols-5 gap-5">
                {selectedAttributeUnderTheValue.map((item) => {
                  return (
                    <ZSelect
                      key={item?.id}
                      options={item?.values?.map((option) => ({
                        value: `${item?.attributeName}-${option?.attributeValue}`,
                        label: option?.attributeValue,
                      }))}
                      isLoading={attributeIsLoading}
                      mode={undefined}
                      label={`${item.attributeName} value`}
                      name={`${item.attributeName}`}
                      setPerSku={setPerSku}
                      defaultKey="product"
                      selectedAttribute={selectedAttribute}
                      refresh={refresh}
                      placeholder={`Select ${item.attributeName} value`}
                    ></ZSelect>
                  );
                })}
              </div>
              {/* image, quantity, price*/}
              <div className="grid grid-cols-1 items-center gap-x-2 lg:grid-cols-3">
              <>
            
            <ZNumber
            name="variationStock"
            type="number"
            label="Stock Quantity"
            placeholder="Enter Stock Quantity"
            />
          
          <ZNumber
            name="variation_min_stock"
            type="number"
            label="Minimum Stock"
            placeholder="Enter Minimum Stock"
          />
          <ZNumber
            name="variation_max_stock"
            type="number"
            label="Maximum Stock"
            placeholder="Enter Maximum Stock"
          />
          <ZNumber
            name="variationSalePrice"
            type="number"
            label="Sale Price"
            placeholder="Enter Sale Price"
          />
          <ZNumber
            name="variationSerialNo"
            type="number"
            label="Serial No"
            placeholder="Enter Serial No"
          />
          <ZNumber
            name="variationPurchasePrice"
            type="number"
            label="Purchase Price"
            placeholder="Enter Purchase Price"
          />
          <ZNumber
            name="variationWholeSalePrice"
            type="number"
            label="Wholesale Price"
            placeholder="Enter Wholesale Price"
          />
          <ZNumber
            name="variationRetailPrice"
            type="number"
            label="Retail Price"
            placeholder="Enter Retail Price"
          />
            </>
              </div>

              {/* button */}
              <div className="flex justify-end">
                <Button
                  htmlType="button"
                  // onClick={() => handleAddPerSkuInSkus()}
     
                  style={{ backgroundColor: "#162447", color: "white" }}
          
                >
                  + Add Variant
                </Button>
              </div>
            </div>
            {/* per sku end */}
          </div>
        )}

      



          {/* <ZCheckbox
            isSuccess={CIsSuccess}
            checkedAttribute={true}
            label="Is All Branch"
            name="isAllBranch"
          />
          <ZCheckbox
            isSuccess={CIsSuccess}
            checkedAttribute={true}
            label="Is In-house Available"
            name="isInHouseAvailable"
          />
          <ZCheckbox
            isSuccess={CIsSuccess}
            checkedAttribute={true}
            label="Is Pickup Available"
            name="isPickupAvailable"
          />
          <ZCheckbox
            isSuccess={CIsSuccess}
            checkedAttribute={true}
            label="Is Delivery Available"
            name="isDeliveryAvailable"
          />

          <ZCheckbox
            isSuccess={CIsSuccess}
            checkedAttribute={false}
            label="Is Featured"
            name="isFeatured"
          />
          <ZCheckbox
            isSuccess={CIsSuccess}
            checkedAttribute={false}
            label="Has Color Variations"
            name="isColorVariations"
          />

          <ZCheckbox
            isSuccess={CIsSuccess}
            checkedAttribute={true}
            label="Is VAT Applicable"
            name="isVATApplicable"
          />
          <ZCheckbox
            isSuccess={CIsSuccess}
            checkedAttribute={false}
            label="Is SD Applicable"
            name="isSDApplicable"
          /> */}
           </>)
          }
        
      </ZFormTwo>
    </div>
  );
};

export default AddProduct;
