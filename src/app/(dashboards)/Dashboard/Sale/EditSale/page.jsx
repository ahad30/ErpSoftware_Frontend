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

  const addedProductPrice = addedProducts?.reduce(
    (accumulator, currentValue) => {
      return (
        accumulator +
        Number(currentValue?.salePrice * currentValue?.quantity)
      );
    },
    0
  );


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

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 items-center gap-x-6 gap-y-10 mb-10">
        
      <div>
          <label htmlFor="">Date:*</label>
          <div className="mt-3">
            <Space className="w-full" direction="vertical">
              <DatePicker
                style={{ width: "100%", padding: "3px" }}
                value={startDate}
                onChange={(e) => setStartDate(e)}
              />
            </Space>
          </div>
        </div>

        <div>
          <label htmlFor="">Warehouse:*</label>
          <div className="mt-3">
            <Select
              style={{ width: "100%" }}
              virtual={true}
              allowClear={true}
              showSearch
              placeholder={"Choose Warehouse"}
              filterOption={filterOption}
              value={selectedWarehouse}
              options={wData || []}
              loading={wIsLoading}
              disabled={true}
              onChange={(value) => setSelectedWarehouse(value)}              
            />
          </div>
        </div>

        <div>
          <label htmlFor="">Customer:*</label>
          <div className="mt-3">
            <Select
              style={{ width: "100%" }}
              virtual={true}
              allowClear={true}
              showSearch
              placeholder={"Choose Customer"}
              filterOption={filterOption}
              value={selectedCustomer}
              options={cData || []}
              loading={cIsLoading}
              disabled={cIsLoading}
              onChange={(value) => setSelectedCustomer(value)}
              
            />
          </div>
        </div>
        <div>
          <label htmlFor="">Business:*</label>
          <div className="mt-3">
            <Select
              style={{ width: "100%" }}
              virtual={true}
              allowClear={true}
              showSearch
              placeholder={"Choose Business"}
              filterOption={filterOption}
              value={selectedBusiness}
              options={businessOptions || []}
              loading={businessIsLoading}
              disabled={businessIsLoading}
              onChange={(value) => setSelectedBusiness(value)}
              
            />
          </div>
        </div>
        <div>
          <label htmlFor="">Branch:*</label>
          <div className="mt-3">
            <Select
              style={{ width: "100%" }}
              virtual={true}
              allowClear={true}
              showSearch
              placeholder={"Choose Branch"}
              value={selectedBranch}
              filterOption={filterOption}
              options={branchOptions || []}
              loading={branchIsLoading}
              disabled={branchIsLoading}
              onChange={(value) => setSelectedBranch(value)}
              
            />
          </div>
        </div>
            {/* Product Search */}
            <div className="lg:col-span-3 relative">
          <label htmlFor="">Product:*</label>
          <div className="mt-3">
            <Search
              value={productSearch}
              placeholder="Search Product by Name"
              onSearch={(value) => setProductSearch(value)}
              onChange={(e) => setProductSearch(e.target.value)}
              allowClear
              enterButton={<CiSearch size={20} />}
              loading={pIsLoading}
            />
          </div>

          {productSearch && (
            <div className="mt-3 absolute bg-white rounded-md w-full overflow-hidden text-left whitespace-nowrap border border-gray-200 z-40">
              {searchedProducts?.length > 0 ? (
                <ul className="text-[#6c757d]">
                  {searchedProducts.map((product) => (
                    <li
                      className="hover:bg-[#6571FF] px-3 py-1 hover:text-white text-base"
                      key={product.productID}
                      onClick={() => handleAddProduct(product.productID)}
                    >
                      {product.productTitle}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-center text-red-500 font-bold py-2">
                  No Product found
                </p>
              )}
            </div>
          )}
        </div>

        {/* Product table */}
            <div className="lg:col-span-3">
                   <label htmlFor="">Order Items:*</label>
                   <div className="max-h-[30vh] overflow-y-scroll scrollbar-0 mt-3">
                     <table className="divide-y w-full divide-gray-300 overflow-x-scroll wrapper">
                       <thead className="border bg-green-500 text-white">
                         <tr className="divide-x divide-gray-300">
                           <th className=" py-2 text-center text-xs px-2">#</th>
                           <th className="py-2 text-center text-xs whitespace-nowrap">
                             Product Name
                           </th>
                           {/* <th className="py-2 text-center text-xs whitespace-nowrap px-4">
                             Sku
                           </th>  */}
                           <th className="py-2 text-center text-xs whitespace-nowrap">
                             Quantity
                           </th>
                           <th className="py-2 text-center text-xs whitespace-nowrap">
                             Price
                           </th>
                           {/* <th className="py-2 text-center text-xs px-2 ">Subtotal</th> */}
                           <th className="py-2 text-xs text-center px-2">Action</th>
                         </tr>
                       </thead>
                       <tbody className="bg-white divide-y divide-gray-300">
                         {addedProducts?.map((product, index) => (
                           <tr  key={product.productVariantID || product.productID} className="whitespace-nowrap w-full">
                             <td className="text-center py-2 text-sm text-gray-500">
                               {index + 1}
                             </td>
                             <td className="text-center py-2 px-2 text-sm text-gray-500 font-bold">
                               {product.productTitle}
                               <p className="text-sm">({product.attributes})</p>
                             </td>
                             {/* <td className="text-center py-2 text-sm text-gray-500 px-2">
                               {product?.sku}
                             </td>  */}
                             <td className="text-center py-2 px-2 text-sm text-gray-500">
                               <button
                                 onClick={() =>
                                   handleQuantityChange(product.productID, "decrement" , product.productVariantID)
                                 }
                                 className="px-3 py-1 bg-gray-200 disabled:bg-gray-500 disabled:cursor-not-allowed text-gray-700 rounded-l focus:outline-none hover:bg-gray-300"
                               >
                                 -
                               </button>
                               <span className="px-4 py-1 bg-gray-100 text-gray-700">
                                 {product.quantity}
                               </span>
                               <button
                                 onClick={() =>
                                   handleQuantityChange(product.productID, "increment" , product.productVariantID)
                                 }
                                 className="px-3 py-1 bg-gray-200 text-gray-700 disabled:bg-gray-500 disabled:cursor-not-allowed rounded-r focus:outline-none hover:bg-gray-300"
                               >
                                 +
                               </button>
                             </td>
                             <td className="text-center py-2 text-sm text-gray-500 px-2">
                               {product?.salePrice * product.quantity}
                             </td>
                           
                             {/* <td className="text-center py-2 text-sm text-gray-500 px-2">
                             Tk{ Number(addedProductPrice)*product.quantity}
                             
                             </td> */}
                             <td className="flex justify-center py-5 text-sm text-gray-500">
                               <RiDeleteBin6Line
                                 onClick={() => handleRemoveProduct(product.productID, product.productVariantID)}
                                 className="text-red-500 cursor-pointer"
                                 size={20}
                               ></RiDeleteBin6Line>
                             </td>
                           </tr>
                         ))}
         
                         {addedProducts.length === 0 && (
                           <tr>
                             <td
                               colSpan={7}
                               className="text-center w-full text-xl mt-12 py-4 text-red-500 font-bold"
                             >
                               No data Found
                             </td>
                           </tr>
                         )}
                         <tr>
                           <td
                             colSpan={7}
                             className="text-center w-full text-lg mt-12 py-4 text-blue-500 font-bold"
                           >
                             Sub Total : {addedProductPrice} Tk
                           </td>
                         </tr>
                       </tbody>
                     </table>
                   </div>
                 </div>

       

        {/* Tax */}
        <div>
          <label htmlFor="">Order Tax:*</label>

          <div className="border border-gray-300 flex justify-between w-full items-center px-2 rounded-lg mt-3">
            <input
              placeholder="Tax"
              className="border-0  w-full focus:border-0 focus:ring-0 py-1 outline-none"
              type="number"
              value={tax}
              onChange={(e) => {
                const value = e.target.value;
                if (value >= 0) {
                  setTax(value);
                }
              }}
            />

            <span className="bg-gray-300 rounded-r-md px-2 py-1 -me-2"> Tk</span>
          </div>
        </div>

        {/*  Discount */}
        <div>
          <label htmlFor="">Discount:*</label>

          <div className="border border-gray-300 flex justify-between w-full items-center px-2 rounded-lg mt-3">
            <input
              placeholder="Discount"
              className="border-0 focus:border-0 w-full focus:ring-0 py-1 outline-none"
              type="number"
              value={discount}
              onChange={(e) => {
                const value = e.target.value;
                if (value >= 0) {
                  setDiscount(value);
                }
              }}
            />
            <span className="bg-gray-300 rounded-r-md px-2 py-1 -me-2">%</span>
          </div>
        </div>

         {/*  shipping */}
         <div>
          <label htmlFor="">Shipping:*</label>

          <div className="border border-gray-300 flex justify-between w-full items-center px-2 rounded-lg mt-3">
            <input
              placeholder="Shipping"
              className="border-0 w-full focus:border-0 focus:ring-0 py-1 outline-none"
              type="number"
              value={shipping}
              onChange={(e) => {
                const value = e.target.value;

                if (value >= 0) {
                  setShipping(value);
                }
              }}
            />
            <span className="bg-gray-300 rounded-r-md px-2 py-1 -me-2">Tk</span>
          </div>
        </div>



             {/* Paid */}
             <div>
          <label htmlFor="">Paid Amount:*</label>

          <div className="border border-gray-300 flex justify-between w-full items-center px-2 rounded-lg mt-3">
            <input
              placeholder="Paid Amount"
              className="border-0  w-full focus:border-0 focus:ring-0 py-1 outline-none"
              type="number"
              // value={Number(paid) == 0 ? "Paid" : paid}
              value={paid}
              onChange={(e) => {
                const value = e.target.value;
                if (value >= 0) {
                  setPaid(value);
                  // handleTaxAndDiscount(e.target?.value, "Tax");
                }
              }}
            />

            <span className="bg-gray-300 rounded-r-md px-2 py-1 -me-2"> Tk</span>
          </div>
        </div>
         
         {/* Due */}
         <div>
          <label htmlFor="">Due Amount:*</label>

          <div className="border border-gray-300 flex justify-between w-full items-center px-2 rounded-lg mt-3">
            <input
              readOnly
              placeholder="Due Amount"
              className="border-0  w-full focus:border-0 focus:ring-0 py-1 outline-none"
              type="number"
              value={due}
             
            />

            <span className="bg-gray-300 rounded-r-md px-2 py-1 -me-2"> Tk</span>
          </div>
        </div>
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

            {/* Description */}
            <div>
        <label htmlFor="">Note:*</label>

        <div className="mt-3 mb-5">
          <TextArea 
           value={description}
          onChange={(e) => setDescription(e.target.value)}
          allowClear />
        </div>
      </div>

      {/* Order Summary */}
      <div className="flex justify-end">
        <div className="flex w-full lg:w-[35%]  flex-col  bg-white  space-y-4 divide-y border border-gray-300  lg:mt-5">
          <div className="pt-4 space-y-2">
            <div>
              <div className="flex justify-between px-5">
                <span>Tax</span>
                <span>{tax} %</span>
              </div>
            </div>
          </div>
          <div className="pt-4 space-y-2">
            <div className="space-y-6">
              <div className="flex justify-between px-5">
                <span>Discount</span>
                <span className="">{discount} %</span>
              </div>
            </div>
          </div>
          <div className="pt-4 space-y-2">
            <div className="space-y-6">
              <div className="flex justify-between px-5">
                <span>Shipping</span>
                <span className="">{shipping} Tk</span>
              </div>
            </div>
          </div>
          <div className="pt-4 pb-4 space-y-2">
            <div className="space-y-6">
              <div className="flex justify-between px-5">
                <span className="text-[#6571FF]">Grand Total</span>
                <span className="text-[#6571FF]">{totalPrice} Tk</span>
              </div>
            </div>
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