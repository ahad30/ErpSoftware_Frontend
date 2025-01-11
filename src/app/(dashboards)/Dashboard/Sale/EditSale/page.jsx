/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useState, useEffect } from "react";
import { DatePicker, Input, Select, Space } from "antd";
import dayjs from "dayjs";
import { useSearchParams } from "next/navigation";
import BreadCrumb from "@/components/BreadCrumb/BreadCrumb";
import { useGetWarehousesQuery } from "@/redux/Feature/User/warehouses/warehousesApi";
import { CiSearch } from "react-icons/ci";
import { useGetProductsQuery } from "@/redux/Feature/Admin/product/productApi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { toast } from "sonner";
import { useGetSalesOrderByIdQuery, useUpdateSalesOrderMutation } from "@/redux/Feature/Admin/sales/salesApi";
import useShowAsyncMessage from "@/components/UseShowAsyncMessage/useShowAsyncMessage";
import { useGetBusinessesQuery } from "@/redux/Feature/Admin/businesses/businesses";
import { useGetBranchesQuery } from "@/redux/Feature/Admin/branch/branchesApi";
import { useGetCustomersQuery } from "@/redux/Feature/User/customersApi";

const { Search, TextArea } = Input;

const EditSale = () => {
  const searchParams = useSearchParams();
  const saleID = searchParams.get('id');
  const [startDate, setStartDate] = useState("");
  const [description, setDescription] = useState("");
  const [selectedWarehouse, setSelectedWarehouse] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [selectedBusiness, setSelectedBusiness] = useState("");
  const [selectedBranch, setSelectedBranch] = useState(""); 
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedPaymentStatus, setSelectedPaymentStatus] = useState("");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const [productSearch, setProductSearch] = useState("");
  const [addedProducts, setAddedProducts] = useState([]);
  const [searchedProducts, setSearchedProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [shipping, setShipping] = useState(0);
  const [tax, setTax] = useState(0);
  const [paid, setPaid] = useState(0);
  const [due, setDue] = useState(0);

  const { data: warehouseData, isLoading: wIsLoading } = useGetWarehousesQuery();
  const { data: customerData, isLoading: cIsLoading } = useGetCustomersQuery();
  const { data: businessData, isLoading: businessIsLoading } = useGetBusinessesQuery();
  const { data: branchData, isLoading: branchIsLoading } = useGetBranchesQuery();
  const { data: productData, isLoading: pIsLoading } = useGetProductsQuery();
  
  const {
    data: singleSaleData,
    isError: singleSaleIsError,
    isLoading: singleSaleIsLoading,
    isSuccess: singleSaleIsSuccess,
    error: singleSaleError,
  } = useGetSalesOrderByIdQuery(saleID);

  const [
    updateSale,
    {
      data,
      isError,
      isLoading,
      isSuccess,
      error,
    },
  ] = useUpdateSalesOrderMutation();

  const wData = warehouseData?.data?.map((warehouse) => ({
    label: warehouse.warehouseName,
    value: warehouse.warehouseID,
  }));

  const cData = customerData?.data?.map((customer) => ({
    label: customer.customerName,
    value: customer.customerID,
  }));

  const businessOptions = businessData?.data?.map((business) => ({
    label: business.businessName,
    value: business.businessID,
  }));

  const branchOptions = branchData?.data?.map((branch) => ({
    label: branch.branchName,
    value: branch.branchID,
  }));

  useEffect(() => {
    if (productSearch && productData) {
      const filteredProducts = productData?.data?.filter((product) =>
        product.productTitle.toLowerCase().includes(productSearch.toLowerCase())
      );
      setSearchedProducts(filteredProducts);
    } else {
      setSearchedProducts([]);
    }
  }, [productSearch, productData]);

  useEffect(() => {
    const saleData = singleSaleData?.data
    if (singleSaleIsSuccess && saleData) {
      setAddedProducts(saleData.items.map(item => ({
        productTitle: item?.productTitle || "Not Defined",
        productID: item.productID,
        productVariantID: item.productVariantID || null,
        quantity: item.quantity,
        salePrice: item.salePrice,
        totalPrice: parseFloat(item.totalPrice)
      })));
      setStartDate(dayjs(saleData.orderDate || ""));
      setDescription(saleData.notes || "");
      setSelectedWarehouse(saleData.warehouseID || null);
      setSelectedCustomer(saleData.customerID || null);
      setSelectedBusiness(parseInt(saleData.businessID) || null);
      setSelectedBranch(saleData.branchID || null);
      setSelectedStatus(saleData?.status || null);
      setSelectedPaymentStatus(saleData?.paymentStatus || null);
      setSelectedPaymentMethod(saleData?.paymentMethod || null);
      setPaid(saleData.paidAmount || 0);
      setDue(saleData.dueAmount || 0);
      setShipping(saleData.shippingAmount);
      setDiscount(saleData.discountAmount);
      setTax(saleData.taxAmount);
    }
  }, [singleSaleIsSuccess]);

  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  const handleAddProduct = (value) => {
    const selectedProduct = productData?.data?.find((product) => product.productID === value);

    if (selectedProduct) {
      const isProductAlreadyAdded = addedProducts.some(
        (product) => product.productID === selectedProduct.productID
      );

      if (!isProductAlreadyAdded) {
        if (selectedProduct.productVariant.length > 0) {
          const variants = selectedProduct.productVariant.map((variant) => ({
            productID: selectedProduct.productID,
            quantity: 1,
            productTitle: selectedProduct.productTitle,
            sku: variant.sku,
            stock: variant.stock,
            salePrice: variant.salePrice,
            productVariantID: variant.productVariantID,
            attributes: variant.attribute_combination.map(
              (attr) => `${attr.attributeName}: ${attr.attributeValue}`
            ).join(", "),
          }));
    
          setAddedProducts((prevData) => [...prevData, ...variants]);
        } 
        else {
          const productEntry = {
            productID: selectedProduct.productID,
            productTitle: selectedProduct.productTitle,
            sku: selectedProduct.sku || "N/A",
            stock: selectedProduct.productInitialQty,
            salePrice: selectedProduct.productRetailPrice,
            attributes: "No Variants",
            quantity: 1
          };
    
          setAddedProducts((prevData) => [...prevData, productEntry]);
        }
        setProductSearch("");
        setSearchedProducts([]);
      } else {
        toast.error("Product is already added");
      }
    }
  };

  const handleQuantityChange = (productID, action, productVariantID = null) => {
    setAddedProducts((prevProducts) =>
      prevProducts.map((product) => {
        const isMatch = product.productID === productID && 
                        (productVariantID ? product.productVariantID === productVariantID : true);
        
        if (isMatch) {
          let newQuantity = product.quantity;
          if (action === "increment") {
            newQuantity += 1;
          } else if (action === "decrement" && newQuantity > 1) {
            newQuantity -= 1;
          }
          return { ...product, quantity: newQuantity };
        }
        
        return product;
      })
    );
  };

  const handleRemoveProduct = (productID, productVariantID = null) => {
    setAddedProducts((prevData) =>
      prevData.filter(
        (item) =>
          item.productID !== productID ||
          (productVariantID && item.productVariantID !== productVariantID)
      )
    );
  };

  const calculateAmounts = () => {
    const productTotal = addedProducts.reduce(
      (acc, product) => acc + product.salePrice * product.quantity,
      0
    );
  
    const shippingCost = parseFloat(shipping) || 0;
    const discountAmount = parseFloat(((productTotal) * (Number(discount) / 100)).toFixed(2)) || 0;
    const taxAmount = parseFloat(((productTotal) * (Number(tax) / 100)).toFixed(2)) || 0;
    const paidAmount = parseFloat(paid) || 0;
  
    const finalTotal = parseFloat((productTotal - discountAmount + taxAmount + shippingCost).toFixed(2));
    const dueAmount = parseFloat((finalTotal - paidAmount).toFixed(2));
  
    return {
      productTotal,
      shippingCost,
      discountAmount,
      taxAmount,
      finalTotal,
      paidAmount,
      dueAmount
    };
  };

  const updateTotalPrice = () => {
    const { finalTotal, dueAmount } = calculateAmounts();
    setTotalPrice(finalTotal);
    setDue(dueAmount);
  };

  useEffect(() => {
    updateTotalPrice();
  }, [addedProducts, discount, shipping, tax, paid]);

  const updateSaleOrder = async () => {
    const saleItems = addedProducts.map((item) => ({
      productID: item.productID,
      productVariantID: item.productVariantID || null,
      quantity: item.quantity,
      salePrice: item.salePrice,
      totalPrice: item.salePrice * item.quantity,
    }));
  
    const { finalTotal, dueAmount } = calculateAmounts();
  
    const saleData = { 
      data: {
        warehouseID: selectedWarehouse,
        customerID: selectedCustomer,
        businessID: selectedBusiness,
        branchID: selectedBranch,
        orderDate: startDate.format("YYYY-MM-DD"),
        saleItems: saleItems,
        discountAmount: Number(discount),
        shippingAmount: Number(shipping),
        taxAmount: Number(tax),
        totalAmount: finalTotal,
        paidAmount: Number(paid),
        dueAmount: dueAmount,
        status: selectedStatus,
        paymentStatus: selectedPaymentStatus,
        paymentMethod: selectedPaymentMethod,
        notes: description,
      }
    };
  
    try {
      const response = await updateSale({ data: saleData, id: saleID });
      console.log("Response:", response);
    } 
    catch (error) {
      console.error("Error:", error);
    }
  };

  const path = "/Dashboard/Sale";
  useShowAsyncMessage(
    isLoading,
    isError,
    error,
    isSuccess,
    data,
    path
  );

  if (!singleSaleData) return <div className="text-center">Loading...</div>;

  return (
    <>
      <BreadCrumb />
      {/* Form fields similar to AddSale but with updated status and payment options */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 items-center gap-x-6 gap-y-10 mb-10">
        {/* ... Other form fields ... */}

        {/* Status */}
        <div>
          <label htmlFor="">Status:*</label>
          <div className="mt-3">
            <Select
              style={{ width: "100%" }}
              value={selectedStatus}
              options={[
                { label: "Pending", value: "pending" },
                { label: "Shipped", value: "shipped" },
                { label: "Completed", value: "completed" },
                { label: "Cancelled", value: "cancelled" },
                { label: "Returned", value: "returned" },
              ]}
              placeholder="Select Sale status"
              onChange={(value) => setSelectedStatus(value)}
            />
          </div>
        </div>

        {/* Payment Status */}
        <div>
          <label htmlFor="">Payment Status:*</label>
          <div className="mt-3">
            <Select
              style={{ width: "100%" }}
              value={selectedPaymentStatus}
              options={[
                { label: "Pending", value: "pending" },
                { label: "Paid", value: "paid" },
                { label: "Failed", value: "failed" },
                { label: "Refunded", value: "refunded" },
              ]}
              placeholder="Select Payment status"
              onChange={(value) => setSelectedPaymentStatus(value)}
            />
          </div>
        </div>

        {/* Payment Method */}
        <div>
          <label htmlFor="">Payment Method:*</label>
          <div className="mt-3">
            <Select
              style={{ width: "100%" }}
              value={selectedPaymentMethod}
              options={[
                { label: "Cash", value: "cash" },
                { label: "Credit Card", value: "credit_card" },
                { label: "Debit Card", value: "debit_card" },
                { label: "Bank Transfer", value: "bank_transfer" },
              ]}
              placeholder="Select Payment Method"
              onChange={(value) => setSelectedPaymentMethod(value)}
            />
          </div>
        </div>
      </div>

      {/* Submit button */}
      <div className="flex justify-end mt-10 mb-8">
        <div
          onClick={updateSaleOrder}
          className="bg-[#2FC989] w-full lg:w-[20%] py-1 lg:py-2 rounded-lg flex justify-center items-center gap-x-2 text-base font-medium text-white cursor-pointer"
        >
          {isLoading ? "Processing..." : "Update Sale"}
        </div>
      </div>
    </>
  );
};

export default EditSale;