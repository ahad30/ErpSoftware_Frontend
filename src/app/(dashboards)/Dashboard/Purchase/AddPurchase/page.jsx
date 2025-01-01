/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import React, { useState, useEffect, useRef } from "react";
import { DatePicker, Input, Select, Space } from "antd";
import dayjs from "dayjs";
import BreadCrumb from "@/components/BreadCrumb/BreadCrumb";
import { useGetWarehousesQuery } from "@/redux/Feature/User/warehouses/warehousesApi";
import { useGetSuppliersQuery } from "@/redux/Feature/User/suppliers/suppliersApi";
import { CiSearch } from "react-icons/ci";
import { useGetProductsQuery } from "@/redux/Feature/Admin/product/productApi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { toast } from "sonner";
import { useAddPurchaseOrderMutation } from "@/redux/Feature/Admin/purchase/purchaseApi";
import useShowAsyncMessage from "@/components/UseShowAsyncMessage/useShowAsyncMessage";
import { UseErrorMessages } from "@/components/UseErrorMessages/UseErrorMessages";

const { Search, TextArea } = Input;
const AddPurchase = () => {
  const [startDate, setStartDate] = useState(dayjs());
  const [productSearch, setProductSearch] = useState("");
  const [addedProducts, setAddedProducts] = useState([]);
  const [searchedProducts, setSearchedProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [shipping, setShipping] = useState(0);
  const [tax, setTax] = useState(0);
  // const [error, setError] = useState(false);
  const [temporaryValue, setTemporaryValue] = useState({
    TDiscount: 0,
    TShipping: 0,
    TTax: 0,
    IShipping: 0,
    IDiscount: 0,
    ITax: 0,
  });
  const { data: warehouseData, isLoading: wIsLoading } =
    useGetWarehousesQuery();
  const { data: supplierData, isLoading: sIsLoading } = useGetSuppliersQuery();
  const { data: productData, isLoading: pIsLoading } = useGetProductsQuery();
  const [
    createNewPurchase,
    {
      data,
      isError,
      isLoading,
      isSuccess: purchaseIsSuccess,
      error,
    },
  ] = useAddPurchaseOrderMutation();

  const wData = warehouseData?.data?.map((warehouse) => ({
    label: warehouse.warehouseName,
    value: warehouse.warehouseID,
  }));

  const sData = supplierData?.data?.map((supplier) => ({
    label: supplier.supplierName,
    value: supplier.supplierID,
  }));

  const pData = productData?.data?.map((product) => ({
    label: product?.productTitle,
    value: product?.productID,
    productPurchasePrice: product?.productPurchasePrice,
    productVariant: product?.productVariant
      ? product?.productVariant
      : "This is a without variation product",
  }));
  console.log(addedProducts);

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
    if (purchaseIsSuccess) {
      setAddedProducts([]);
      setDiscount(0);
      setTax(0);
      setShipping(0);
    }
  }, [purchaseIsSuccess]);

  useEffect(() => {
    toast.dismiss(1);
  }, []);

  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  const handleAddProduct = (value) => {
    const selectedProduct = pData.find((product) => product.value === value);

    if (selectedProduct) {
      // Check if the product is already in the addedProducts array
      const isProductAlreadyAdded = addedProducts.some(
        (product) => product.value === selectedProduct.value
      );

      if (!isProductAlreadyAdded) {
        setAddedProducts((prevProducts) => [
          ...prevProducts,
          { ...selectedProduct, quantity: 1 },
        ]);
        setProductSearch("");
        setSearchedProducts([]);
        // toast.success("Product added to table");
      } else {
        toast.error("Product is already added");
      }
    }
  };

  const handleQuantityChange = (productID, action) => {
    setAddedProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.value === productID
          ? {
              ...product,
              quantity:
                action === "increment"
                  ? product.quantity + 1
                  : product.quantity > 1
                  ? product.quantity - 1
                  : 1,
            }
          : product
      )
    );
  };

  const handleRemoveProduct = (productID) => {
    setAddedProducts((prevProducts) =>
      prevProducts.filter((product) => product.value !== productID)
    );
  };

  const addedProductPrice = addedProducts?.reduce(
    (accumulator, currentValue) => {
      return (
        accumulator +
        Number(currentValue?.productPurchasePrice * currentValue?.quantity)
      );
    },
    0
  );

  useEffect(() => {
    const addedProductPrice = addedProducts?.reduce(
      (accumulator, currentValue) => {
        return (
          accumulator +
          Number(currentValue?.productPurchasePrice * currentValue?.quantity)
        );
      },
      0
    );
    setTotalPrice(addedProductPrice);
  }, [addedProducts]);

  // const handleTaxAndDiscount = (value, type) => {
  //   let updatedTotal = totalPrice;

  //   if (type === "Discount") {
  //     setDiscount(value);
  //     updatedTotal -= totalPrice * (Number(value)/ 100);
  //   } else if (type === "Tax") {
  //     setTax(value);
  //     updatedTotal += totalPrice * (Number(value) / 100);
  //   }

  //   setTotalPrice(updatedTotal);
  // };

  // const handleShipping = (value) => {
  //   setShipping(value);
  //   const updatedTotal = addedProducts.reduce(
  //     (accumulator, product) =>
  //       accumulator + product.productPurchasePrice * product.quantity,
  //     0
  //   ) + Number(value);

  //   setTotalPrice(updatedTotal);
  // };

  // const handleTaxAndDiscount = (value, from) => {

  //   const count =
  //      from === "Discount"
  //       ? Number(totalPrice) - Number(totalPrice) * (Number(value) / 100)
  //       : from === "Tax"
  //       ? Number(totalPrice) + Number(totalPrice) * (Number(value) / 100)
  //       : 0;

  //     if (from === "Discount") {
  //       setDiscount(value);
  //     }
  //     if (from === "Tax") {
  //       setTax(value);
  //     }
  //     setTotalPrice(count);

  // };

  // const handleShipping = (value) => {
  //   // console.log(temporaryValue)
  //   if (temporaryValue.TShipping === 0) {
  //     setTemporaryValue((prev) => ({
  //       ...prev,
  //       IShipping: totalPrice,
  //     }));
  //   }

  //   if (value === "") {
  //     setTotalPrice(temporaryValue.IShipping);
  //   }
  //   if (value > temporaryValue.TShipping) {
  //     setTemporaryValue((prev) => ({
  //       ...prev,
  //       TShipping: parseFloat(value),
  //     }));
  //     const count = parseFloat(totalPrice) + parseFloat(value);
  //     if (count < 0) {
  //       setError(true);
  //       toast.error("Provided Value is too low");
  //     } else {
  //       setError(false);
  //       setShipping(value);
  //       setTotalPrice(count);
  //     }
  //   }
  //   if (value < temporaryValue.TShipping) {
  //     // temporaryValue.TShipping = value;
  //     const count = parseFloat(totalPrice) - parseFloat(value);
  //     if (count < 0) {
  //       setError(true);
  //       toast.error("Provided Value is too high");
  //     } else {
  //       setError(false);
  //       setShipping(value);
  //       setTotalPrice(count);
  //     }
  //   }
  // };

  const updateTotalPrice = () => {
    const productTotal = addedProducts.reduce(
      (acc, product) => acc + product.productPurchasePrice * product.quantity,
      0
    );
    // const productTotal = 18.85;

    // Ensure shipping is a valid number
    const shippingCost = Number(shipping) || 0;

    // Correct tax calculation
    const taxAmount = parseFloat(((productTotal) * (Number(tax) / 100)).toFixed(2)) || 0;
    console.log(taxAmount);

    // Correct discount calculation
    const discountAmount = 
    parseFloat(((productTotal) * (Number(discount) / 100)).toFixed(2))  || 0;
    console.log(discountAmount);

    // Final total price calculation
    const finalTotal =   parseFloat((productTotal  - discountAmount + taxAmount + shippingCost).toFixed(2));
    console.log(finalTotal);
    setTotalPrice(finalTotal);
  };
  useEffect(() => {
    updateTotalPrice();
  }, [addedProducts, discount, shipping, tax]);

  

  const createPurchase = async () => {
    const productItems = addedProducts.map((item) => ({
      productID: item.value,
      productVariantID: item.productVariantID || null,
      quantity: item.quantity,
      purchasePrice: item.productPurchasePrice,
      totalPrice: item.productPurchasePrice * item.quantity,
    }));
  
    const productTotal = addedProducts.reduce(
      (acc, product) => acc + product.productPurchasePrice * product.quantity,
      0
    );
  
    const shippingCost = parseFloat(shipping) || 0;
    const discountAmount = parseFloat(discount) || 0;
    const taxAmount = parseFloat(tax) || 0;
  
    const finalAmount = parseFloat(
      (
        productTotal +
        shippingCost +
        (productTotal * taxAmount) / 100 -
        (productTotal * discountAmount) / 100
      ).toFixed(2)
    );
  
    const purchaseData = {
      warehouseID: "", 
      supplierID: "", 
      businessID: "", 
      branchID: "",
      orderDate: startDate.format("YYYY-MM-DD"),
      purchaseItem: productItems,
      discountAmount: Number(discount),
      shippingAmount: Number(shipping),
      taxAmount: Number(tax),
      finalAmount: finalAmount,
      paidAmount: "",
      dueAmount: "",
      status: "pending",
      notes: "This is a test purchase.",
    };
  
    try {
      // Adding purchase order via mutation
      const response = await createNewPurchase({ data: purchaseData });
      console.log("Response:", response);
    } catch (error) {
      console.error("Error:", error);
    }
  
    // Optionally, call createNewPurchase with the necessary data if needed
    // createNewPurchase(purchaseData);
  };
  

  useShowAsyncMessage(
    isLoading,
    isError,
    error,
    purchaseIsSuccess,
    data
  );
  // UseErrorMessages(error);

  if (!productData) return <div className="text-center">Loading...</div>;

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
                defaultValue={startDate}
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
              options={wData || []}
              loading={wIsLoading}
              disabled={wIsLoading}
            />
          </div>
        </div>

        <div>
          <label htmlFor="">Supplier:*</label>
          <div className="mt-3">
            <Select
              style={{ width: "100%" }}
              virtual={true}
              allowClear={true}
              showSearch
              placeholder={"Choose Supplier"}
              filterOption={filterOption}
              options={sData || []}
              loading={sIsLoading}
              disabled={sIsLoading}
            />
          </div>
        </div>

        <div className="lg:col-span-3 relative">
          <label htmlFor="">Product:*</label>
          <div className="mt-3">
            <Search
              value={productSearch}
              placeholder="Search Product by Code Name"
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
                    Product
                  </th>
                  <th className="py-2 text-center text-xs whitespace-nowrap">
                    Quantity
                  </th>
                  <th className="py-2 text-center text-xs whitespace-nowrap">
                    Price
                  </th>
                  {/* <th className="py-2 text-center text-xs whitespace-nowrap px-4">
                    Tax
                  </th>  */}
                  {/* <th className="py-2 text-center text-xs px-2 ">Subtotal</th> */}
                  <th className="py-2 text-xs text-center px-2">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-300">
                {addedProducts?.map((product, index) => (
                  <tr key={product.value} className="whitespace-nowrap w-full">
                    <td className="text-center py-2 text-sm text-gray-500">
                      {index + 1}
                    </td>
                    <td className="text-center py-2 px-2 text-sm text-gray-500 font-bold">
                      {product.label}
                    </td>
                    <td className="text-center py-2 px-2 text-sm text-gray-500">
                      <button
                        onClick={() =>
                          handleQuantityChange(product.value, "decrement")
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
                          handleQuantityChange(product.value, "increment")
                        }
                        className="px-3 py-1 bg-gray-200 text-gray-700 disabled:bg-gray-500 disabled:cursor-not-allowed rounded-r focus:outline-none hover:bg-gray-300"
                      >
                        +
                      </button>
                    </td>
                    <td className="text-center py-2 text-sm text-gray-500 px-2">
                      {product?.productPurchasePrice * product.quantity}
                    </td>
                    {/* <td className="text-center py-2 text-sm text-gray-500 px-2">
                    </td>  */}
                    {/* <td className="text-center py-2 text-sm text-gray-500 px-2">
                    ${ Number(addedProductPrice)*product.quantity}
                    
                    </td> */}
                    <td className="flex justify-center py-2 text-sm text-gray-500">
                      <RiDeleteBin6Line
                        onClick={() => handleRemoveProduct(product.value)}
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
                    Sub Total : ${addedProductPrice}
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
              value={Number(tax) == 0 ? "Tax" : tax}
              onChange={(e) => {
                const value = e.target.value;
                if (value >= 0) {
                  setTax(value);
                  // handleTaxAndDiscount(e.target?.value, "Tax");
                }
              }}
            />

            <span className="bg-gray-300 rounded-r-md px-2 py-1 -me-2"> $</span>
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
              value={Number(discount) == 0 ? "Discount" : discount}
              onChange={(e) => {
                const value = e.target.value;
                if (value >= 0) {
                  setDiscount(value);
                  // handleTaxAndDiscount(value, "Discount");
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
              value={Number(shipping) == 0 ? "Shipping" : shipping}
              onChange={(e) => {
                const value = e.target.value;

                if (value >= 0) {
                  setShipping(value);
                  // handleShipping(value);
                }
              }}
            />
            <span className="bg-gray-300 rounded-r-md px-2 py-1 -me-2">$</span>
          </div>
        </div>

        {/* Purchase Status */}
        <div>
          <label htmlFor="">Status:*</label>
          <div className="mt-3">
            <Select
              name="purchaseStatus"
              style={{ width: "100%" }}
              options={[
                { label: "Received", value: "Received" },
                { label: "Pending", value: "Pending" },
                { label: "Ordered", value: "Ordered" },
              ]}
              placeholder="Select Purchase status"
            />
          </div>
        </div>
      </div>
      {/* Description */}
      <div>
        <label htmlFor="">Note:*</label>

        <div className="mt-3 mb-5">
          <TextArea allowClear />
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
                <span className="">{shipping} $</span>
              </div>
            </div>
          </div>
          <div className="pt-4 pb-4 space-y-2">
            <div className="space-y-6">
              <div className="flex justify-between px-5">
                <span className="text-[#6571FF]">Grand Total</span>
                <span className="text-[#6571FF]">{totalPrice} $</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Submit button */}
      <div className="flex justify-end mt-10 mb-8">
        <div
          onClick={() => {
            if (error === true) {
              toast.error("you can't create pos");
            } else {
              createPurchase();
            }
          }}
          className={`bg-primary w-full lg:w-[20%] py-1 lg:py-2  rounded-lg flex justify-center items-center gap-x-2 text-base font-medium text-white ${
            error === true
              ? "disabled:cursor-none bg-green-200"
              : "cursor-pointer bg-[#2FC989] "
          }`}
        >
          <p>Submit</p>
        </div>
      </div>
    </>
  );
};

export default AddPurchase;
