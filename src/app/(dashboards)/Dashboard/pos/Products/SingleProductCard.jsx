/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import { array, func, object } from "prop-types";

const SingleProductCard = ({ item, setAddedProduct, addedProduct }) => {
  const {
    // product_images,
    productTitle,
    // brand_id,
    // product_sale_price,
    // get_brand: { brand_name },
  } = item;
  // console.log(item);

  const handleAddedProduct = () => {
    const exist = addedProduct?.find((obj) => obj?.productID == item?.productID);
    if (exist) {
      const filterTheProduct = addedProduct?.filter((it) => it?.productID !== item?.productID);
      setAddedProduct([...filterTheProduct]);
    } else {
      setAddedProduct([...addedProduct, item]);
    }
  };

  return (
    <div
      onClick={() => {
        handleAddedProduct();
      }}
      className={`bg-white  relative mb-10  cursor-pointer p-1 rounded-lg shadow ${
        addedProduct?.some((it) => it?.productID == item?.productID) ? "ring-2" : ""
      }`}
    >
      <div className="flex justify-center w-full">
        <img
          className="h-[100px] object-cover w-full"
          src={`https://via.placeholder.com/150x150.png?text=Product`}
        />
      </div>
      {/* product name start */}
      <div className="mt-4 px-2 font-poppins">
        <p className="font-semibold text-sm">{productTitle}</p>
        {/* <p className=" text-sm text-gray-500">{brand_name}</p> */}
      </div>
      {/* product name end */}

      {/* price and code */}
      <p className="bg-[#6571FF] text-white rounded-lg w-[40%] absolute top-2 left-2 
      text-[10px] p-1">
        ${Number(100).toFixed(2)}
      </p>

      <p className="bg-[#0099FB] text-white rounded-lg w-[35%] absolute top-2 right-2 
      text-[10px] p-1">
        TL2515
      </p>
    </div>
  );
};

export default SingleProductCard;
SingleProductCard.propTypes = {
  item: object,
  setAddedProduct: func,
  addedProduct: array,
};
