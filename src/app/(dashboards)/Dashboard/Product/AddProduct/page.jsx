"use client";
import React, { useEffect } from "react";
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

const AddProduct = () => {
  const router = useRouter();
  const pathName = usePathname()
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

  const { data: eData, isLoading: eLoading } = useGetErpCategoryQuery();
  const { data: bData, isLoading: bLoading } = useGetBrandQuery();
  const { data: businessData, isLoading: businessLoading } =
    useGetBusinessesQuery();

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

  const handleSubmit = (data) => {
    //  console.log(data)
    createProduct(data);
  };

  // useEffect(() => {
  //   if (CIsSuccess) {
  //     router.push("/Dashboard/Product");
  //   }
  // }, [CIsSuccess, router]);

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
        <div className="grid md:grid-cols-2 grid-cols-1 gap-3 mt-10">
          {
            pathName === "/Dashboard/pos" ? 
(<>
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
            name="businessID"
            label="Business Name"
            placeholder="Select business"
            options={businessOptions}
            isLoading={businessLoading}
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

</>)

           :(<>
            <ZInputTwo
            name="productID"
            type="number"
            label="Product Id"
            placeholder="Enter product Id"
          />
          <ZSelect
            name="businessID"
            label="Business Name"
            placeholder="Select business"
            options={businessOptions}
            isLoading={businessLoading}
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
            name="isActive"
            label="Status"
            options={[
              { label: "Active", value: true },
              { label: "Inactive", value: false },
            ]}
            placeholder="Select status"
          />
          <ZInputTwo
            name="productTitle"
            type="text"
            label="Product Title"
            placeholder="Enter product title"
          />
          <ZInputTwo
            name="subtitle"
            type="text"
            label="Subtitle"
            placeholder="Enter product subtitle"
          />
          <ZInputTextArea
            name="description"
            type="text"
            label="Description"
            placeholder="Enter product description"
          />
          <ZInputTwo
            name="sku"
            type="text"
            label="SKU"
            placeholder="Enter SKU"
          />
          <ZCheckbox
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
          />
           </>)
          }
        </div>
      </ZFormTwo>
    </div>
  );
};

export default AddProduct;
