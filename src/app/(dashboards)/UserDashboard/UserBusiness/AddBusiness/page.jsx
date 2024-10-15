/* eslint-disable react-hooks/rules-of-hooks */
"use client"
import React, { useEffect, useRef, useState } from 'react';
import { Button, message, Steps, theme } from 'antd';
import ZInputTwo from '@/components/Form/ZInputTwo';
import ZFormTwo from '@/components/Form/ZFormTwo';
import BreadCrumb from '@/components/BreadCrumb/BreadCrumb';
import UserBranch from '../UserBranch/page';
import { useAddBusinessesMutation } from '@/redux/Feature/Admin/businesses/businesses';
import { useGetCategoryQuery } from '@/redux/Feature/Admin/category/category';
import ZSelect from '@/components/Form/ZSelect';

const Page = () => {
  const [current, setCurrent] = useState(0);
  const [formData, setFormData] = useState({});
  const formRef = useRef(null); // Reference to the form

  const [createBusiness, { isLoading: CIsloading, isError: CIsError, error: CError, isSuccess: CIsSuccess, data: bdata }] = useAddBusinessesMutation();
  const { data: categoryResponse, error: SysError, isLoading: SysLoading } = useGetCategoryQuery();

  const categoryData = categoryResponse?.data?.map((category) => ({
    label: category.sysCategoryName,
    value: category.sysCategoryID,
  }));

  const steps = [
    {
      title: 'Step 1',
      content: (
<div className="grid md:grid-cols-3 grid-cols-1 gap-3 mt-10">
  <ZSelect
    name="sysCategoryID"
    label="Business Category"
    options={categoryData}
    placeholder="Select business category"
    required
  />
  <ZInputTwo
    name="businessUsername"
    type="text"
    label="Business Username"
    defaultKey=""
    placeholder="Enter business username"
    required
  />
  <ZInputTwo
    name="businessName"
    type="text"
    label="Business Name"
    defaultKey=""
    placeholder="Enter business name"
    required
  />
  <ZInputTwo
    name="businessLegalName"
    type="text"
    label="Business Legal Name"
    defaultKey=""
    placeholder="Enter business legal name"
    required
  />
  <ZInputTwo
    name="businessEmail"
    type="email"
    label="Business Email"
    defaultKey=""
    placeholder="Enter business email"
    required
  />
  <ZInputTwo
    name="businessCustomerFacingEmail"
    type="email"
    label="Customer Facing Email"
    defaultKey=""
    placeholder="Enter customer-facing email"
    required
  />
  <ZInputTwo
    name="businessMobile"
    type="number"
    label="Business Mobile"
    defaultKey=""
    placeholder="Enter business mobile"
    required
  />
  <ZInputTwo
    name="businessLogo"
    type="text"
    label="Business Logo URL"
    defaultKey=""
    placeholder="Enter business logo URL"
    required
  />
  <ZInputTwo
    name="businessWebURL"
    type="text"
    label="Business Website URL"
    defaultKey=""
    placeholder="Enter business website URL"
    required
  />
  <ZInputTwo
    name="TradeLicenseNo"
    type="text"
    label="Trade License No."
    defaultKey=""
    placeholder="Enter trade license number"
    required
  />
  <ZInputTwo
    name="BINNo"
    type="text"
    label="BIN No."
    defaultKey=""
    placeholder="Enter BIN number"
    required
  />
  <ZInputTwo
    name="TINNo"
    type="text"
    label="TIN No."
    defaultKey=""
    placeholder="Enter TIN number"
    required
  />
  <ZInputTwo
    name="DBIDNo"
    type="text"
    label="DBID No."
    defaultKey=""
    placeholder="Enter DBID number"
    required
  />
  <ZInputTwo
    name="countryCode"
    type="text"
    label="Country Code"
    defaultKey=""
    placeholder="Enter country code"
    required
  />
  <ZInputTwo
    name="currencyCode"
    type="text"
    label="Currency Code"
    defaultKey=""
    placeholder="Enter currency code"
    required
  />
  <ZInputTwo
    name="businessQRCode"
    type="text"
    label="Business QR Code URL"
    defaultKey=""
    placeholder="Enter business QR code URL"
    required
  />
  <ZInputTwo
    name="noOfBranches"
    type="number"
    label="Number of Branches"
    defaultKey=""
    placeholder="Enter number of branches"
    required
  />
</div>

      ),
    },
    {
      title: 'Step 2',
      content: (
        <div>
          <UserBranch />
        </div>
      ),
    },
    {
      title: 'Initialize',
    }
  ];

  
  const next = () => {   
    formRef.current?.handleSubmit((data) => {
      setFormData(data);
      if (current === 0) {
        createBusiness(data); 
      }
    })   
  };

  useEffect(() => {
    if(CIsSuccess){
      setCurrent(current+1)
    }
  }, [CIsSuccess]);

  const handleSubmit = (data) => {
    console.log(data)
    createBusiness(data);
  };


  const prev = () => {
    setCurrent(current - 1);
  };

  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));


  return (
    <>
      <BreadCrumb />
      <ZFormTwo
        isLoading={CIsloading}
        isSuccess={CIsSuccess}
        isError={CIsError}
        error={CError}
        formType="create"
        data={bdata}
        submit={handleSubmit}
      >
        <Steps current={current} items={items} className="max-w-3xl mx-auto mb-5 mt-7" responsive={1} />
        <div className="max-w-3xl mx-auto">
          {steps[current].content}
        </div>
        <div className="max-w-3xl mx-auto">
          <div className="flex justify-end mt-5">
            {current < steps.length - 1 && (
              <Button type="primary" htmlType="submit" onClick={next}>
                Next
              </Button>
            )}
            {current === steps.length - 1 && (
              <Button type="primary" htmlType="submit" onClick={() => message.success('Processing complete!')}>
                Initialize
              </Button>
            )}
            {current > 0 && (
              <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
                Previous
              </Button>
            )}
          </div>
        </div>
      </ZFormTwo>
    </>
  );
};

export default Page;
