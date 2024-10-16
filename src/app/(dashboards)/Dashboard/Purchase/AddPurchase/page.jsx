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

const { Search , TextArea} = Input;
const AddPurchase = () => {
  const [startDate, setStartDate] = useState(dayjs());
  const [productSearch, setProductSearch] = useState("");
  const [addedProducts, setAddedProducts] = useState([]);
  const [searchedProducts, setSearchedProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [shipping, setShipping] = useState(0);
  const [tax, setTax] = useState(0.0);
  const [error, setError] = useState(false);
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


  const wData = warehouseData?.data?.map((warehouse) => ({
    label: warehouse.warehouseName,
    value: warehouse.warehouseID,
  }));

  const sData = supplierData?.data?.map((supplier) => ({
    label: supplier.supplierName,
    value: supplier.supplierID,
  }));

  const pData = productData?.data?.map((product) => ({
    label: product.productTitle,
    value: product.productID,
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

  const onChange = (date) => {
    setStartDate(date);
  };

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
  
  useEffect(() => {
    toast.dismiss(1);
  }, []);

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
      return accumulator + Number(currentValue?.product_sale_price);
    },
    0
  );

  useEffect(() => {
    const addedProductPrice = addedProducts?.reduce(
      (accumulator, currentValue) => {
        return accumulator + Number(currentValue?.product_sale_price);
      },
      0
    );
    setTotalPrice(addedProductPrice);
  }, [addedProducts]);

  const handleTextAndDiscount = (value, from) => {
    if (value < 0) {
      setError(true);
      return toast.error("Value must be greater than zero");
    }

    const count =
      from === "Discount"
        ? Number(totalPrice) - Number(totalPrice) * (Number(value) / 100)
        : from === "Tax"
        ? Number(totalPrice) + Number(totalPrice) * (Number(value) / 100)
        : 0;
    if (count < 0) {
      setError(true);
      toast.error("Provided Value is too high");
    } else {
      setError(false);
      if (from === "Discount") {
        setDiscount(value);
      }
      if (from === "Tax") {
        setTax(value);
      }
      setTotalPrice(count);
    }
  };
  // handleShipping
  // console.log(temporaryValue);

  const handleShipping = (value) => {
    // console.log(temporaryValue)
    if (temporaryValue.TShipping === 0) {
      setTemporaryValue((prev) => ({
        ...prev,
        IShipping: totalPrice,
      }));
    }

    // console.log(temporaryValue);

    if (value === "") {
      // console.log("hello");
      setTotalPrice(temporaryValue.IShipping);
    }
    if (value > temporaryValue.TShipping) {
      // temporaryValue.TShipping = value;
      setTemporaryValue((prev) => ({
        ...prev,
        TShipping: parseFloat(value),
      }));
      const count = parseFloat(totalPrice) + parseFloat(value);
      if (count < 0) {
        setError(true);
        toast.error("Provided Value is too high");
      } else {
        setError(false);
        setShipping(value);
        setTotalPrice(count);
      }
    }
    if (value < temporaryValue.TShipping) {
      // temporaryValue.TShipping = value;
      const count = parseFloat(totalPrice) - parseFloat(value);
      if (count < 0) {
        setError(true);
        toast.error("Provided Value is too high");
      } else {
        setError(false);
        setShipping(value);
        setTotalPrice(count);
      }
    }
  };

  // const [
  //   createNewPos,
  //   { data, isError, isLoading, isSuccess, error: posError },
  // ] = useNewInvoiceMutation();

  // const createPos = () => {
  //   createNewPos({
  //     items: addedProduct?.map((item) => item?.id),
  //     discount: Number(discount),
  //     shipping: Number(shipping),
  //     tax: Number(tax),
  //   });
  // };

  // useShowAsyncMessage(isLoading, isError, posError, isSuccess, data);
  // UseErrorMessages(posError);

  // useEffect(() => {
  //   if (isSuccess) {
  //     setAddedProduct([]);
  //     setDiscount(0);
  //     setTax(0);
  //     setDiscount(0);
  //   }
  // }, [isSuccess]);



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
                onChange={onChange}
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


      <div className='lg:col-span-3 relative'>
          <label htmlFor="">Product:*</label>
          <div className='mt-3'>
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

      {
        productSearch &&   <div className="mt-3 absolute bg-white rounded-md w-full overflow-hidden text-left whitespace-nowrap border border-gray-200 z-40" >
           
           {searchedProducts?.length > 0 ? (
           <ul className="text-[#6c757d]">
             {searchedProducts.map((product) => (
               <li className="hover:bg-[#6571FF] px-3 py-1 hover:text-white text-base" 
               key={product.productID} onClick={() => handleAddProduct(product.productID)}>
             {product.productTitle}
               </li>
             ))}
           </ul>
         ) : (
           <p className="text-center text-red-500 font-bold py-2">No Product found</p>
         )}
       
       </div>
      }
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
                  <th className="py-2 text-center text-xs px-2">Subtotal</th>
                  <th className="py-2 text-xs text-center px-2">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-300">
                {addedProducts?.map((product, index) => (
                  <tr key={product.value} className="whitespace-nowrap w-full">
                    <td className="text-center py-2 text-sm text-gray-500">
                      {index + 1}
                    </td>
                    <td className="text-center py-2 px-2 text-sm text-gray-500">
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
                      ${100 * product.quantity}
                    </td>
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
                      colSpan={5}
                      className="text-center w-full text-xl mt-12 py-4 text-red-500 font-bold"
                    >
                      No data Found
                    </td>
                  </tr>
                )}
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
              handleTextAndDiscount(e.target?.value, "Tax");
            }
          }}
        />

        <span className="bg-gray-300 rounded-r-md px-2 py-1 -me-2">%</span>
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
                // value={Number(tax) == 0 ? "Discount" : discount}
                // value={
                //   Number(discount) > 100 || discount === 0
                //     ? "Discount"
                //     : discount
                // }
                onChange={(e) => {
                  const value = e.target.value;
                  if (value >= 0) {
                    setDiscount(value);
                    handleTextAndDiscount(value, "Discount");
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
                    handleShipping(value);
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
            name="saleStatus"
            style={{ width: '100%'}}
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

   <TextArea  allowClear/>
 </div>
           </div>

           {/* Order Summary */}
     <div className="flex justify-end">
     <div className="flex w-full lg:w-[35%]  flex-col  bg-white  space-y-4 divide-y border border-gray-300  lg:mt-5">
	

	<div className="pt-4 space-y-2">
		<div>
			<div className="flex justify-between px-5">
				<span>Tax</span>
				<span>{tax} $</span>
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
				<span className="text-[#6571FF]"> $</span>
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
                createPos();
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
