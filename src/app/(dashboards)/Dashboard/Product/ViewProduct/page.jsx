"use client";
import React from 'react'
import { useSearchParams } from 'next/navigation';
import { useGetProductsByIdQuery } from '@/redux/Feature/Admin/product/productApi';

const ViewProduct = () => {
    const searchParams = useSearchParams();
    const productId = searchParams.get('id');
    const { data, isLoading, error } = useGetProductsByIdQuery(productId);
    console.log(data)

  return (
    <div>
      Ahad
    </div>
  )
}

export default ViewProduct;
