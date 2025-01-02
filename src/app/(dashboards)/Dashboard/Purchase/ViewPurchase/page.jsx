"use client";
import { useSearchParams } from 'next/navigation';
import React from 'react'

const ViewPurchase = () => {
    const searchParams = useSearchParams();
    const purchaseID = searchParams.get('id');
  return (
    <div>ViewPurchase</div>
  )
}

export default ViewPurchase;