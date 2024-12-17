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
import { VariantProductTable } from "@/components/VariantProductTable";
import { toast } from "sonner";
import { variantExists } from "@/components/helper/SameVariantExist";

function generateUniqueId(length = 2) {
  const chars = "123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return parseInt(result, 10); 
}

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
  const [selectedAttributeUnderTheValue, setSelectedAttributeUnderTheValue] =
    useState([]);
  // per sku - 6
  const [perSku, setPerSku] = useState([]);
  //  skus - 7
  const [skus, setSkus] = useState([]);

  //  refresh state for variant
  const [refresh, setRefresh] = useState(false);

  // image file , price , quantity - 8 for vairant product
  const [priceQuantityImage, setPriceQuantityImage] = useState({
    // image:"",
    variationStock: "",
    variation_min_stock: "",
    variation_max_stock: "",
    variationSalePrice: "",
    variationSerialNo: "",
    variationPurchasePrice: "",
    variationWholeSalePrice: "",
    variationRetailPrice: "",
  });

  // single -----> image file , price , quantity - 9
  const [singlePriceQuantityImage, singleSetPriceQuantityImage] = useState({
    // images:"",
    stock: "",
    min_stock: "",
    max_stock: "",
    salePrice: "",
    serialNo: "",
    purchasePrice: "",
    wholeSalePrice: "",
    retailPrice: "",
  });

  const router = useRouter();
  const pathName = usePathname();

  const { data: eData, isLoading: eLoading } = useGetErpCategoryQuery();
  const { data: bData, isLoading: bLoading } = useGetBrandQuery();
  const { data: businessData, isLoading: businessLoading } =
    useGetBusinessesQuery();
  const {
    data: allBranchData,
    error,
    isLoading: branchIsLoading,
  } = useGetBranchesQuery();
  const { data: attributeWithValue, isLoading: attributeIsLoading } =
    useGetAttributesQuery();
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

  const handleAddPerSkuInSkus = () => {
    const attributes = [];
    const valuesName = [];

    if (perSku.length === 0) {
      toast.error("Select minimum an attribute value", {
        id: 2,
        duration: 1000,
        position: "top-right",
      });
    }
    if (priceQuantityImage.variationStock === "") {
      toast.error("Enter variation stock", { id: 1 });
    }
    if (priceQuantityImage.variation_min_stock === "") {
      toast.error("Enter minimum variation stock", { id: 2 });
    }
    if (priceQuantityImage.variation_max_stock === "") {
      toast.error("Enter maximum variation stock", { id: 3 });
    }
    if (priceQuantityImage.variationSalePrice === "") {
      toast.error("Enter variation sale price", { id: 4 });
    }
    if (priceQuantityImage.variationSerialNo === "") {
      toast.error("Enter variation serial number", { id: 5 });
    }
    if (priceQuantityImage.variationPurchasePrice === "") {
      toast.error("Enter variation purchase price", { id: 6 });
    }
    if (priceQuantityImage.variationWholeSalePrice === "") {
      toast.error("Enter variation wholesale price", { id: 7 });
    }
    if (priceQuantityImage.variationRetailPrice === "") {
      toast.error("Enter variation retail price", { id: 8 });
    }

    if (
      perSku.length > 0 &&
      priceQuantityImage.variationStock &&
      priceQuantityImage.variation_min_stock &&
      priceQuantityImage.variation_max_stock &&
      priceQuantityImage.variationSalePrice &&
      priceQuantityImage.variationSerialNo &&
      priceQuantityImage.variationPurchasePrice &&
      priceQuantityImage.variationWholeSalePrice &&
      priceQuantityImage.variationRetailPrice
    ) {
      perSku.forEach((element) => {
        // const proPertyKey = element.split("-")[0];
        // const proPertyValue = element.split("-")[1];
        // valuesName.push(proPertyValue);
        // attributes[proPertyKey] = proPertyValue;
        const [attributeName, attributeValue] = element.split("-");
        valuesName.push(attributeValue);
        attributes.push({ attributeName, attributeValue });
      });

      const sku = {
        variationId:generateUniqueId(),
        sku: `${valuesName.join("-")}`,
        variationStock: priceQuantityImage.variationStock,
        variation_min_stock: priceQuantityImage.variation_min_stock,
        variation_max_stock: priceQuantityImage.variation_max_stock,
        variationSalePrice: priceQuantityImage.variationSalePrice,
        variationSerialNo: priceQuantityImage.variationSerialNo,
        variationPurchasePrice: priceQuantityImage.variationPurchasePrice,
        variationWholeSalePrice: priceQuantityImage.variationWholeSalePrice,
        variationRetailPrice: priceQuantityImage.variationRetailPrice,
        attributes,
      };

      console.log(sku);

      if (skus.length === 0) {
        setSkus([...skus, { ...sku }]);
        handleRefreshVariantState();
      } 
      else if (skus.length > 0) {
        const skusAttributes = skus.map((sku) => sku.attributes);
        const exist = variantExists(skusAttributes, sku.attributes);
        if (!exist) {
          setSkus([...skus, { ...sku }]);
          handleRefreshVariantState();
        } else {
          toast.error("Already exists the variant of the product", {
            duration: 2000,
          });
        }
      }
    }
  };

  const handleRefreshVariantState = () => {
    setPerSku([]);
    setPriceQuantityImage({
      variationStock: "",
      variation_min_stock: "",
      variation_max_stock: "",
      variationSalePrice: "",
      variationSerialNo: "",
      variationPurchasePrice: "",
      variationWholeSalePrice: "",
      variationRetailPrice: "",
    });
    setRefresh(!refresh);
  };

  const handleSubmit = (data) => {

    const modifiedData = {
      is_single_product: Number(data.is_single_product),
      branchIDs: data.branchIDs,
      brandID: data.brandID,
      businessID: data.businessID,
      erpCategoryID: data.erpCategoryID,
      expiryDate: data.expiryDate,
      isActive: data.isActive,
      notAvailableBranchIDs: data.notAvailableBranchIDs,
      productDescription: data.productDescription,
      // productImage: data.productImage,
      productSubtitle: data.productSubtitle,
      productTitle: data.productTitle,

    };

    // Check if product is single
    if (modifiedData.is_single_product === 1) {
      // Validation for single product fields
      if (data.sku === "") {
        toast.error("Single product sku is required", {
          id: 10,
          duration: 2000,
          position: "top-right",
        });
      }

      if (data.salePrice === "") {
        toast.error("Single product sale price required", {
          id: 10,
          duration: 1000,
          position: "top-right",
        });
      }

      if (data.stock === "") {
        toast.error("Single product stock required", {
          id: 2,
          duration: 1000,
          position: "top-right",
        });
      }
      if (data.min_stock === "") {
        toast.error("Single product min stock required", {
          id: 2,
          duration: 1000,
          position: "top-right",
        });
      }
      if (data.max_stock === "") {
        toast.error("Single product max stock required", {
          id: 2,
          duration: 1000,
          position: "top-right",
        });
      }
      if (data.serialNo === "") {
        toast.error("Single product serial number required", {
          id: 3,
          duration: 1000,
          position: "top-right",
        });
      }
      if (data.purchasePrice === "") {
        toast.error("Single product purchase price required", {
          id: 4,
          duration: 1000,
          position: "top-right",
        });
      }
      if (data.wholeSalePrice === "") {
        toast.error("Single product wholesale price required", {
          id: 5,
          duration: 1000,
          position: "top-right",
        });
      }
      if (data.retailPrice === "") {
        toast.error("Single product retail price required", {
          id: 6,
          duration: 1000,
          position: "top-right",
        });
      }

      // Only proceed if all required fields are filled
      if (
        data.salePrice &&
        data.stock &&
        data.serialNo &&
        data.purchasePrice &&
        data.wholeSalePrice &&
        data.retailPrice &&
        data.min_stock &&
        data.max_stock &&
        data?.sku
      ) {
        const singleProductData = {
          ...modifiedData,
          sku:data?.sku,
          stock: data.stock,
          min_stock: data.min_stock,
          max_stock: data.max_stock,
          salePrice: data.salePrice,
          serialNo: data.serialNo,
          purchasePrice: data.purchasePrice,
          wholeSalePrice: data.wholeSalePrice,
          retailPrice: data.retailPrice,
        };

        console.log(singleProductData);
        // createProduct(singleProductData);
      }
    }
    // Check if the product is a variant product
    else if (modifiedData.is_single_product === 0) {
      if (skus.length > 0) {
        const variantProductData = {
          ...modifiedData,
            productVariant: skus.map((sku, index) => ({
            key: index,
            attribute_combination: sku.attributes,
            sku: sku.sku,
            variationId: sku?.variationId,
            variationStock: sku.variationStock,
            variation_min_stock: sku.variation_min_stock,
            variation_max_stock: sku.variation_max_stock,
            variationSalePrice: sku.variationSalePrice,
            variationSerialNo: sku.variationSerialNo,
            variationPurchasePrice: sku.variationPurchasePrice,
            variationWholeSalePrice: sku.variationWholeSalePrice,
            variationRetailPrice: sku?.variationRetailPrice,
          })),
        };
        console.log(variantProductData);
        // createProduct(variantProductData);
      } else {
        toast.error("Missing variant attribute", {
          id: 1,
          duration: 1000,
          position: "top-right",
        });
      }
    }
  };

  if (eLoading || bLoading || attributeIsLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p>
          <Spin size="large" />
        </p>
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
        buttonName="Submit"
      >
        {pathName === "/Dashboard/pos" ? (
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

              <div className="lg:col-span-2">
                <ZInputTextArea
                  name="description"
                  type="text"
                  label="Description"
                  placeholder="Enter product description"
                />
              </div>
            </div>
          </>
        ) : (
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

          { productType == 1 &&
                 <ZInputTwo
                 name="sku"
                 type="text"
                 label="SKU"
                 placeholder="Enter SKU"
               />     
     
        } 
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

              <div className="lg:col-span-2">
                <ZInputTextArea
                  name="productDescription"
                  type="text"
                  label="Description"
                  placeholder="Enter product description"
                />
              </div>

              <ZSelect
                name="notAvailableBranchIDs"
                mode={"multiple"}
                label="Not available Branch Name"
                placeholder="Select Not Available Branch"
                options={branchData}
                isLoading={branchIsLoading}
              />

              <ZInputTwo
                name="expiryDate"
                type="date"
                label="Expiry Date"
                placeholder="Enter Expiry Date"
              />

              <ZImageInput
                label="Product Image"
                name="productImage"
              ></ZImageInput>

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
                  name={"is_single_product"}
                  label={"Product type"}
                  setProductType={setProductType}
                ></ZRadio>
              </div>

              {/* single Product type start */}

              {productType === "1" && (
                <>
                  <ZNumber
                    name="stock"
                    label="Stock Quantity"
                    placeholder="Enter Stock Quantity"
                    refresh={refresh}
                    defaultKey="singleProduct"
                    setPriceQuantityImage={singleSetPriceQuantityImage}
                  />

                  <ZNumber
                    name="min_stock"
                    label="Minimum Stock"
                    placeholder="Enter Minimum Stock"
                    refresh={refresh}
                    defaultKey="singleProduct"
                    setPriceQuantityImage={singleSetPriceQuantityImage}
                  />
                  <ZNumber
                    name="max_stock"
                    label="Maximum Stock"
                    placeholder="Enter Maximum Stock"
                    refresh={refresh}
                    defaultKey="singleProduct"
                    setPriceQuantityImage={singleSetPriceQuantityImage}
                  />
                  <ZNumber
                    name="salePrice"
                    label="Sale Price"
                    placeholder="Enter Sale Price"
                    refresh={refresh}
                    defaultKey="singleProduct"
                    setPriceQuantityImage={singleSetPriceQuantityImage}
                  />

                  <ZNumber
                    name="serialNo"
                    label="Serial No"
                    placeholder="Enter Serial No"
                    refresh={refresh}
                    defaultKey="singleProduct"
                    setPriceQuantityImage={singleSetPriceQuantityImage}
                  />

                  <ZNumber
                    name="purchasePrice"
                    label="Purchase Price"
                    placeholder="Enter Purchase Price"
                    refresh={refresh}
                    defaultKey="singleProduct"
                    setPriceQuantityImage={singleSetPriceQuantityImage}
                  />
                  <ZNumber
                    name="wholeSalePrice"
                    label="Wholesale Price"
                    placeholder="Enter Wholesale Price"
                    refresh={refresh}
                    defaultKey="singleProduct"
                    setPriceQuantityImage={singleSetPriceQuantityImage}
                  />
                  <ZNumber
                    name="retailPrice"
                    label="Retail Price"
                    placeholder="Enter Retail Price"
                    refresh={refresh}
                    defaultKey="singleProduct"
                    setPriceQuantityImage={singleSetPriceQuantityImage}
                  />
                </>
              )}
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
                  label={"Select Variations"}
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
                        label="Stock Quantity"
                        placeholder="Enter Stock Quantity"
                        defaultKey="product"
                        setPriceQuantityImage={setPriceQuantityImage}
                        refresh={refresh}
                      />

                      <ZNumber
                        name="variation_min_stock"
                        label="Minimum Stock"
                        placeholder="Enter Minimum Stock"
                        defaultKey="product"
                        setPriceQuantityImage={setPriceQuantityImage}
                        refresh={refresh}
                      />
                      <ZNumber
                        name="variation_max_stock"
                        label="Maximum Stock"
                        placeholder="Enter Maximum Stock"
                        defaultKey="product"
                        setPriceQuantityImage={setPriceQuantityImage}
                        refresh={refresh}
                      />
                      <ZNumber
                        name="variationSalePrice"
                        label="Sale Price"
                        placeholder="Enter Sale Price"
                        defaultKey="product"
                        setPriceQuantityImage={setPriceQuantityImage}
                        refresh={refresh}
                      />

                      <ZNumber
                        name="variationSerialNo"
                        label="Serial No"
                        placeholder="Enter Serial No"
                        defaultKey="product"
                        setPriceQuantityImage={setPriceQuantityImage}
                        refresh={refresh}
                      />
                      <ZNumber
                        name="variationPurchasePrice"
                        label="Purchase Price"
                        placeholder="Enter Purchase Price"
                        defaultKey="product"
                        setPriceQuantityImage={setPriceQuantityImage}
                        refresh={refresh}
                      />
                      <ZNumber
                        name="variationWholeSalePrice"
                        type="number"
                        label="Wholesale Price"
                        placeholder="Enter Wholesale Price"
                        defaultKey="product"
                        setPriceQuantityImage={setPriceQuantityImage}
                        refresh={refresh}
                      />
                      <ZNumber
                        name="variationRetailPrice"
                        type="number"
                        label="Retail Price"
                        placeholder="Enter Retail Price"
                        defaultKey="product"
                        setPriceQuantityImage={setPriceQuantityImage}
                        refresh={refresh}
                      />
                    </>
                  </div>

                  {/* button */}
                  <div className="flex justify-end">
                    <Button
                      htmlType="button"
                      onClick={() => handleAddPerSkuInSkus()}
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
          </>
        )}
      </ZFormTwo>
      <VariantProductTable skus={skus} setSkus={setSkus}></VariantProductTable>
    </div>
  );
};

export default AddProduct;
