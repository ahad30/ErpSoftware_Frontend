"use client";
import { array } from "prop-types";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { RiDeleteBin6Line } from "react-icons/ri";
import { RxReset } from "react-icons/rx";
import { MdCancel, MdDone } from "react-icons/md";
import { useGetCustomersQuery } from "@/redux/Feature/User/customersApi";
import ZSelect from "@/components/Form/ZSelect";
import ZFormTwo from "@/components/Form/ZFormTwo";
import Search from "../Products/Search";
import AddPosProduct from "../AddPosProduct";
import AddCustomerPos from "../AddCustomerPos";
import { Select } from "antd";



const AddedItemCalculation = ({ setAddedProduct, addedProduct }) => {
  // console.log(addedProduct)
  const { data: customerData, isLoading: customerIsLoading } =
    useGetCustomersQuery();
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

  const cData = customerData?.data?.map((customer) => ({
    label: customer.customerName,
    value: customer.customerID,
  }));

  const handleRemoveItem = (id) => {
    const filterItem = addedProduct?.filter((item) => item?.productID  !== id);
    setAddedProduct([...filterItem]);
  };

  const addedProductPrice = addedProduct?.reduce(
    (accumulator, currentValue) => {
      return accumulator + Number(currentValue?.product_sale_price);
    },
    0
  );

  useEffect(() => {
    const addedProductPrice = addedProduct?.reduce(
      (accumulator, currentValue) => {
        return accumulator + Number(currentValue?.product_sale_price);
      },
      0
    );
    setTotalPrice(addedProductPrice);
  }, [addedProduct]);

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


  const handleQuantityChange = (action) => {
    setQuantity((prevQuantity) => {
      if (action === "increment") {
        return prevQuantity + 1;
      } else if (action === "decrement" && prevQuantity > 1) {
        return prevQuantity - 1;
      }
      return prevQuantity;
    });
  };

  return (
    <div className="mb-16 lg:mb-0">
      <div className="flex flex-col lg:flex-row items-center py-2 px-2 gap-x-4 mb-5 lg:mb-0">     
      {/* Customer */}
        <div className="lg:w-1/3 w-full mt-6">
          <div className="flex items-center gap-2">
            <div className="w-full">
              <ZFormTwo>
                <ZSelect
                  name="customerID"
                  placeholder="Select Customer"
                  options={cData}
                  isLoading={customerIsLoading}
                />
              </ZFormTwo>
            </div>
            <div>
           <AddCustomerPos/>
            </div>
          </div>
        </div>
        
        {/* Search Product */}

        <div className="lg:w-[70%] w-full">
          <div className="flex items-center gap-2">
          <div className="w-full"><Search/></div>
          <div>

            <AddPosProduct/>
          </div>
          </div>
        </div>
       
      </div>

      <div className="max-h-[30vh] overflow-y-scroll scrollbar-0 px-1">
      
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
              <th className="py-2 text-center text-xs px-2">Price</th>

              <th className="py-2 text-xs text-center px-2">
                Action
              </th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-300">
            {addedProduct?.map((item, index) => (
              <tr key={item?.productID} className="whitespace-nowrap w-full">
                <td className="text-center py-2 text-sm text-gray-500">
                  {index}
                </td>
                <td className="text-center py-2 px-2 text-sm text-gray-500">
                  {item?.productTitle}
                </td>
                <td className="text-center py-2 px-2 text-sm text-gray-500">
            <button
              onClick={() => handleQuantityChange("decrement")}
              className="px-3 py-1 bg-gray-200 disabled:bg-gray-500 disabled:cursor-not-allowed text-gray-700 rounded-l focus:outline-none hover:bg-gray-300"
            >
              -
            </button>
            <span className="px-4 py-1 bg-gray-100 text-gray-700">
              {quantity}
            </span>
            <button
          
              onClick={() => handleQuantityChange("increment")}
              className="px-3 py-1 bg-gray-200 text-gray-700 disabled:bg-gray-500 disabled:cursor-not-allowed rounded-r focus:outline-none hover:bg-gray-300"
            >
              +
            </button>
                </td>

                <td className="text-center  py-2 text-sm text-gray-500 px-2">
                  {/* {Number(item?.product_sale_price).toFixed(2)} */}
                  {quantity*100}
                </td>
                <td className="flex justify-center  py-2 text-sm text-gray-500">
                  <RiDeleteBin6Line
                    onClick={() => handleRemoveItem(item?.productID)}
                    className="text-red-500 cursor-pointer"
                    size={20}
                  ></RiDeleteBin6Line>
                </td>
              </tr>
            ))}

            <tr className="">
              {" "}
              {addedProduct?.length === 0 && (
                <td
                  colSpan={5}
                  className="text-center w-full text-xl mt-12 py-4 text-red-500 font-bold"
                >
                  No data Found
                </td>
              )}
            </tr>
          </tbody>
        </table>
      </div>

      <div className="lg:absolute md:bottom-6 bg-white lg:px-3">

        {/* calculated section */}
        <div className="">
          {/* discount tax shipping start  */}
          <div className="grid grid-cols-1 p-2 lg:grid-cols-3 lg:gap-[1rem] gap-y-3">
            {/*  tax */}

            <div className="border border-gray-300 flex justify-between w-full items-center px-2 rounded-lg">
              <input
                placeholder="Tax"
                className="border-0  w-full focus:border-0 focus:ring-0 py-1 outline-none"
                type="number"
                value={Number(tax) == 0 ? "tax" : tax}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value >= 0) {
                    setTax(value);
                    handleTextAndDiscount(e.target?.value, "Tax");
                  }
                }}
              />

              <span>%</span>
            </div>

            {/*  Discount */}
            <div className="border border-gray-300 flex justify-between w-full items-center px-2 rounded-lg">
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
              <span>%</span>
            </div>

            {/*  shipping */}
            <div className="border border-gray-300 flex justify-between w-full items-center px-2 rounded-lg">
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
              <span>$</span>
            </div>


           {/* Sale Status */}
            <div className="">

            <Select
            name="saleStatus"
            style={{ width: '100%'}}
            options={[
              { label: "Received", value: "Received" },
              { label: "Delivered", value: "Delivered" },
            ]}
            placeholder="Select Sale status"
            
          />
            </div>


            {/* Payment Status */}
            <div className="">

            <Select
            name="paymentStatus"
            style={{ width: '100%' }}
            options={[
              { label: "Paid", value: "Paid" },
              { label: "Unpaid", value: "Unpaid" },
              { label: "Pending", value: "Pending" },
            ]}
            placeholder="Select Payment status"
            
          />
            </div>

          </div>
          {/* discount tax shipping end  */}

          {/* sidebar text Calculation start */}

          <div className="text-right">
            <p className="text-lg text-gray-600 my-2 font-semibold">
              Sub Total: {Number(addedProductPrice).toFixed(2)}
            </p>
            <p className="text-xl my-2 font-semibold">
              {/* Total: {Number(totalPrice).toFixed(2)}
               */}
              Total Payable: {totalPrice}
            </p>
          </div>

          {/* sidebar text Calculation end */}
        </div>


        {/* button section */}
        <div className="flex gap-x-3 p-2 justify-center">
          <div
            onClick={() => setAddedProduct([])}
            className=" cursor-pointer bg-red-500 w-full lg:w-[25%] py-1 lg:py-2 rounded-lg flex justify-center items-center gap-x-2 text-base font-medium text-white"
          >
            <p>Cancel</p>
            <MdCancel size={25}/>
          </div>

          <div
            onClick={() => {
              if (error === true) {
                toast.error("you can't create pos");
              } else {
                createPos();
              }
            }}
            className={`bg-[#2FC989] w-full lg:w-[25%] py-1 lg:py-2  rounded-lg flex justify-center items-center gap-x-2 text-base font-medium text-white ${
              error === true
                ? "disabled:cursor-none bg-green-200"
                : "cursor-pointer bg-[#2FC989] "
            }`}
          >
            <p>Submit</p>
            <MdDone size={25}></MdDone>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddedItemCalculation;

AddedItemCalculation.propTypes = {
  addedProduct: array,
};
