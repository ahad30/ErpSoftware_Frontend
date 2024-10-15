/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import React, { useState } from 'react';
import { DatePicker, Select, Space } from 'antd';
import dayjs from 'dayjs';
import BreadCrumb from '@/components/BreadCrumb/BreadCrumb';
import { useGetWarehousesQuery } from '@/redux/Feature/User/warehouses/warehousesApi';
import { useGetSuppliersQuery } from '@/redux/Feature/User/suppliers/suppliersApi';
import { CiSearch } from 'react-icons/ci';

const page = () => {
  const [startDate, setStartDate] = useState(dayjs());
  const [productSearch , setProductSearch] = useState('')
  const { data: warehouseData, isLoading: wIsLoading } =
  useGetWarehousesQuery();
  const { data: supplierData, isLoading: sIsLoading } =
  useGetSuppliersQuery();

  const wData = warehouseData?.data?.map((warehouse) => ({
    label: warehouse.warehouseName,
    value: warehouse.warehouseID,
  }));
  const sData = supplierData?.data?.map((supplier) => ({
    label: supplier.supplierName,
    value: supplier.supplierID,
  }));


  const onChange = (date) => {
    setStartDate(date);
  };

  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  return (
    <>
       <BreadCrumb/> 
      <div className='mt-8 grid grid-cols-1 lg:grid-cols-3 items-center gap-4'>
       <div>
       <label htmlFor="">Date:*</label>
       <div className='mt-3'>
       <Space className='w-full' direction="vertical">
        <DatePicker 
         style={{width: "100%" , padding : "3px"}}
        defaultValue={startDate} onChange={onChange} />
      </Space>
       </div>
       </div>
      
     <div>
     <label htmlFor="">Warehouse:*</label>
      <div className='mt-3'>
      <Select
             style={{width: "100%"}}
            virtual={true}
            allowClear={true}
            showSearch
            placeholder={'Choose Warehouse'}
            // onChange={(value) => {
            //   field.onChange(value);
            //   onChange(value);
            // }}
            filterOption={filterOption}
            options={ wData|| []}
            loading={wIsLoading ? wIsLoading : false}
            disabled={wIsLoading ? wIsLoading : false}
          />
      </div>
     </div>

     <div>
     <label htmlFor="">Supplier:*</label>
     <div className='mt-3'>
     <Select
            style={{width: "100%"}}
            virtual={true}
            allowClear={true}
            showSearch
            placeholder={'Choose Supplier'}
            // onChange={(value) => {
            //   field.onChange(value);
            //   onChange(value);
            // }}
            filterOption={filterOption}
            options={ sData|| []}
            loading={wIsLoading ? wIsLoading : false}
            disabled={wIsLoading ? wIsLoading : false}
          />
     </div>
     </div>

     <div className='col-span-3'>
     <label htmlFor="">Product:*</label>
     <div className='mt-3'>
     <Select
            style={{width: "100%"}}
            virtual={true}
            suffixIcon={<CiSearch size={20}/>}
            allowClear={true}
            showSearch
            onSearch={(value) => setProductSearch(value)}
            placeholder={'Search Product by Code Name'}
            // onChange={(value) => {
            //   field.onChange(value);
            //   onChange(value);
            // }}
            filterOption={filterOption}
            options={productSearch ? [
                {
                  value: 'jack',
                  label: 'Jack',
                },
                {
                  value: 'lucy',
                  label: 'Lucy',
                },
                {
                  value: 'tom',
                  label: 'Tom',
                },
              ] : [] || []}
            loading={wIsLoading ? wIsLoading : false}
            disabled={wIsLoading ? wIsLoading : false}
          />
     </div>
     </div>

      </div>
    </>
    
  );
};

export default page;
