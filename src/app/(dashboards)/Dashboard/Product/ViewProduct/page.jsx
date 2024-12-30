"use client";
import React from 'react'
import { useSearchParams } from 'next/navigation';

const ViewProduct = () => {
    const searchParams = useSearchParams();
    const productId = searchParams.get('id');
    console.log(productId);
  return (
    <div>
      Ahad
    </div>
  )
}

export default ViewProduct;
