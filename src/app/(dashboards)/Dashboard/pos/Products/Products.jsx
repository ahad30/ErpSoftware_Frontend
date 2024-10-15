"use client";
import { array, func } from "prop-types";
import CategoryBrandsAndWareHouse from "./CategoryBrandsAndWareHouse";
import { useEffect, useState } from "react";
import { useGetProductsQuery } from "@/redux/Feature/Admin/product/productApi";
// import { useGetProductsForPosQuery } from "../../../features/Pos/Pos";
import SingleProductCard from "./SingleProductCard";
import ProductsSkeleton from "./ProductsSkeleton";
import { Pagination } from "antd";
// import { useDispatch, useSelector } from "react-redux";
// import useGetCurrentPage from "../../../Hooks/useGetCurrentPage";
// import { incrementByAmount } from "../../../features/Page/pageSlice";
// import Paginator from "@/components/Paginator/Paginator";

const Products = ({ setAddedProduct, addedProduct }) => {
  // const ActivePageNumber = useSelector((state) => state?.pageSlice?.value);

  const [singleCategory, setSingleCategory] = useState("category");
  const [singleBrands, setSingleBrands] = useState("brand");
  const [singleWarehouse, setSingleWarehouse] = useState("warehouse");
  const [singleScanCode, setSingleScanCode] = useState("");
  const [productsData, setProductsData] = useState([]);

  // const { data, isLoading, isFetching } = useGetProductsForPosQuery({
  //   warehouseId: singleWarehouse?.id ? singleWarehouse?.id : "",
  //   brandId: singleBrands?.id ? singleBrands?.id : "",
  //   categoryId: singleCategory?.id ? singleCategory?.id : "",
  //   scanCode: singleScanCode ? singleScanCode : "",
  //   pageNumber: ActivePageNumber,
  // });


  const { data, error, isLoading  , isFetching} = useGetProductsQuery();
   

// console.log(data)

  // const dispatch = useDispatch();
  // const pageNumber = useGetCurrentPage();
  
  useEffect(() => {
    // if (pageNumber > 1) {
    //   dispatch(incrementByAmount(pageNumber));
    // }
    setProductsData(data?.data);
  }, 
  [
    data,
    data?.data?.data, 
    // ActivePageNumber,
    // dispatch, 
    // pageNumber
  ]);

  return (
    <>
    <div className="bg-white rounded-lg">
      {/* category  */}
      <div className="bg-white rounded-t-lg p-3 ">
        <CategoryBrandsAndWareHouse
          singleCategory={singleCategory}
          setSingleCategory={setSingleCategory}
          singleBrands={singleBrands}
          setSingleBrands={setSingleBrands}
          singleWarehouse={singleWarehouse}
          setSingleWarehouse={setSingleWarehouse}
        ></CategoryBrandsAndWareHouse>
      </div>

      {/* product */}
      <div className="bg-[#FCFCFC]  rounded-b-lg px-3 max-h-[50vh] overflow-y-scroll scrollbar-0">
        <div className="grid grid-cols-2 gap-x-5 mt-5 lg:grid-cols-5">
          {isFetching ? (
            <div className="col-span-5 grid grid-cols-5 gap-x-3">
              {[...Array(5)].map((item, index) => (
                <ProductsSkeleton key={index}></ProductsSkeleton>
              ))}
            </div>
          ) : (
            productsData?.map(
              (item) =>
                item?.productID !== 0 && (
                  <SingleProductCard
                    setAddedProduct={setAddedProduct}
                    key={item?.productID}
                    item={item}
                    addedProduct={addedProduct}
                  ></SingleProductCard>
                )
            )
          )}

          {data?.data?.data?.length == 0 && (
            <p className="text-center text-2xl my-12 font-normal col-span-2 lg:col-span-5">
              No data is Available
            </p>
          )}
        </div>


        {/* <div className="mt-5 mb-[-40px]">
          <Paginator links={data?.data?.links}></Paginator>
        </div> */}

      </div>

      <div className="py-9">
      <Pagination 
       align="center"
       defaultCurrent={1} 
       total={200} 
       responsive={true}
       />
      </div>
    </div>
    </>
  );
};

export default Products;

Products.propTypes = {
  setAddedProduct: func,
  addedProduct: array,
};
