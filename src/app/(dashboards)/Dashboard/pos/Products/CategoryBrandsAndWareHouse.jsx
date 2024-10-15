"use client";
import { func, object } from "prop-types";
import CategorySkeleton from "./CategorySkeleton";
import { useGetErpCategoryQuery } from "@/redux/Feature/Admin/erpcategory/erpcategory";
import { useGetBrandQuery } from "@/redux/Feature/Admin/brand/brandApi";
import { useGetWarehousesQuery } from "@/redux/Feature/User/warehouses/warehousesApi";
// import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/css';
// import 'swiper/css/pagination';
// import { Navigation, Pagination, Autoplay} from 'swiper/modules';

const CategoryBrandsAndWareHouse = ({
  singleCategory,
  setSingleCategory,
  singleBrands,
  setSingleBrands,
  singleWarehouse,
  setSingleWarehouse,
}) => {
  const { data: allCategory, isLoading: allCategoryIsLoading } =
    useGetErpCategoryQuery();
  const { data: allBrands, isLoading: allBrandIsLoading } = useGetBrandQuery();
  const { data: allWarHouse, isLoading: allWareHouseIsLoading } =
    useGetWarehousesQuery();

  const handleCategory = (id) => {
    const findTheCategory = allCategory?.data?.find((item) => item?.erpCategoryID === id);
    setSingleCategory(findTheCategory);
  };

  const handleBrands = (id) => {
    const findTheBrands = allBrands?.data?.find((item) => item?.brandID === id);
    setSingleBrands(findTheBrands);
  };

  const handleWarehouse = (id) => {
    const findTheWarehouse = allWarHouse?.data?.find((item) => item?.warehouseID === id);
    setSingleWarehouse(findTheWarehouse);
  };
  return (
    <div className="  grid-cols-1 grid gap-y-3">
    {/* brands, category , wareHouse start */}

    {/* category  start */}
    <div className={`${allCategoryIsLoading ? "flex gap-x-3" : ""}`}>
      {allCategoryIsLoading ? (
        [...Array(3)].map((item, index) => (
          <CategorySkeleton key={index}></CategorySkeleton>
        ))
      ) : (
        <div className="flex gap-x-3">
          <button
            onClick={() => setSingleCategory("category")}
            className={`min-w-[150px]  py-2 rounded-lg text-sm 
           ${
             singleCategory == "category"
               ? "bg-[#6571FF] text-white"
               : "bg-gray-100 text-black "
           }
          `}
          >
            All Category
          </button>
          <div className="flex gap-x-3  overflow-x-scroll wrapper">
            {allCategory?.data?.map((item, index) => (
              <button
                onClick={() => handleCategory(item?.erpCategoryID)}
                className={`min-w-[200px] rounded-lg text-sm py-2 ${
                  singleCategory?.id == item?.erpCategoryID
                    ? "bg-[#6571FF] text-white"
                    : "bg-gray-100 text-black "
                }`}
                key={index}
              >
                {item?.erpCategoryName}
              </button>
            ))}
          </div>
        </div>
      )}
      {allCategory?.data?.length == 0 && (
        <p className="text-center text-xl font-normal">
          Category is Not Available
        </p>
      )}
    </div>
    {/* category end */}

    {/* brand  start */}
    <div className={`${allBrandIsLoading ? "flex gap-x-3" : ""}`}>
      {allBrandIsLoading ? (
        [...Array(4)].map((item, index) => (
          <CategorySkeleton key={index}></CategorySkeleton>
        ))
      ) : (
        <div className="flex gap-x-3">
          <button
            onClick={() => setSingleBrands("brand")}
            className={`min-w-[150px]  py-2 rounded-lg text-sm 
         ${
           singleBrands == "brand"
             ? "bg-[#6571FF] text-white"
             : "bg-gray-100 text-black "
         }
        `}
          >
            All Brands
          </button>
          <div className="flex gap-x-3 overflow-x-scroll wrapper">
            {allBrands?.data?.map((item, index) => (
              <button
                onClick={() => handleBrands(item?.brandID)}
                className={`min-w-[200px] rounded-lg text-sm py-2 ${
                  singleBrands?.id == item?.brandID
                    ? "bg-[#6571FF] text-white"
                    : "bg-gray-100 text-black "
                }`}
                key={index}
              >
                {item?.brandName}
              </button>
            ))}
          </div>
        </div>
      )}
      {allBrands?.data?.length == 0 && (
        <p className="text-center text-xl font-normal">
          Brands is Not Available
        </p>
      )}
    </div>
    {/* brand end */}

    {/* warehouse  start */}
    <div className={`${allWareHouseIsLoading ? "flex gap-x-3" : ""}`}>
      {allWareHouseIsLoading ? (
        [...Array(5)].map((item, index) => (
          <CategorySkeleton key={index}></CategorySkeleton>
        ))
      ) : (
        <div className="flex gap-x-3">
          <button
            onClick={() => setSingleWarehouse("warehouse")}
            className={`min-w-[150px]  py-2 rounded-lg text-sm 
           ${
             singleWarehouse == "warehouse"
               ? "bg-[#6571FF] text-white"
               : "bg-gray-100 text-black "
           }
          `}
          >
            All Warehouse
          </button>
          <div className="flex gap-x-3 overflow-x-scroll wrapper">
            {allWarHouse?.data?.map((item, index) => (
              <button
                onClick={() => handleWarehouse(item?.warehouseID)}
                className={`min-w-[200px]  rounded-lg text-sm py-2 ${
                  singleWarehouse?.id == item?.warehouseID
                    ? "bg-[#6571FF] text-white"
                    : "bg-gray-100 text-black"
                }`}
                key={index}
              >
                {item?.warehouseName}
              </button>
            ))}
          </div>
        </div>
      )}

      {allWarHouse?.data?.length == 0 && (
        <p className="text-center text-xl font-normal">
          Warehouse is Not Available
        </p>
      )}
    </div>
    {/* warehouse end */}

    {/* brands, category , wareHouse end */}
  </div>
    // <div className=" grid-cols-1 grid gap-y-3">


    //   {/* category  start */}
    //   <div className={`${allCategoryIsLoading ? "flex gap-x-3" : ""}`}>
    //     {allCategoryIsLoading ? (
    //       [...Array(3)].map((item, index) => (
    //         <CategorySkeleton key={index}></CategorySkeleton>
    //       ))
    //     ) : (
    //       <div className="flex gap-x-3">
    //         <button
    //           onClick={() => setSingleCategory("category")}
    //           className={`min-w-[150px]  py-2 rounded-lg text-sm 
    //          ${
    //            singleCategory == "category"
    //              ? "bg-[#6571FF] text-white"
    //              : "bg-gray-100 text-black "
    //          }
    //         `}
    //         >
    //           All Category
    //         </button>
    //         <Swiper
    //  slidesPerView={3}
    //  spaceBetween={100}
    //  navigation
    // modules={[Navigation, Pagination, Autoplay]}
    //   className="mySwiper"
    // >
    //   {allCategory?.data?.map((item, index) => (
    //     <SwiperSlide key={index}>
    //      <button
    //         onClick={() => handleCategory(item?.erpCategoryID)}
    //         className={`min-w-[200px] rounded-lg text-sm py-2 ${
    //           singleCategory?.id == item?.erpCategoryID
    //             ? "bg-[#6571FF] text-white"
    //             : "bg-gray-100 text-black"
    //         }`}
    //       >
    //         {item?.erpCategoryName}
    //       </button>
    //     </SwiperSlide>
    //   ))}
    // </Swiper>
    //       </div>
    //     )}
    //     {allCategory?.data?.length == 0 && (
    //       <p className="text-center text-xl font-normal">
    //         Category is Not Available
    //       </p>
    //     )}
    //   </div>
    //   {/* category end */}

    //   {/* brand  start */}
    //   <div className={`${allBrandIsLoading ? "flex gap-x-3" : ""}`}>
    //     {allBrandIsLoading ? (
    //       [...Array(4)].map((item, index) => (
    //         <CategorySkeleton key={index}></CategorySkeleton>
    //       ))
    //     ) : (

    //       <div className="flex gap-x-3">
    //         <button
    //           onClick={() => setSingleBrands("brand")}
    //           className={`min-w-[150px]  py-2 rounded-lg text-sm 
    //        ${
    //          singleBrands == "brand"
    //            ? "bg-[#6571FF] text-white"
    //            : "bg-gray-100 text-black "
    //        }
    //       `}
    //         >
    //           All Brands
    //         </button>

    //         <Swiper
    //  slidesPerView={3}
    //  spaceBetween={100}
    //  navigation
    // modules={[Navigation, Pagination]}
    //   className="mySwiper"
    // >          
    //          {allBrands?.data?.map((item, index) => (
    //           <SwiperSlide key={index}>
    //             <button
    //               onClick={() => handleBrands(item?.brandID)}
    //               className={`min-w-[200px] rounded-lg text-sm py-2 ${
    //                 singleBrands?.id == item?.brandID
    //                   ? "bg-[#6571FF] text-white"
    //                   : "bg-gray-100 text-black "
    //               }`}
    //               key={index}
    //             >
    //               {item?.brandName}
    //             </button>
    //           </SwiperSlide>
    //           ))}
     
    //    </Swiper>
    //     </div>
    //     )}
    //     {allBrands?.data?.length == 0 && (
    //       <p className="text-center text-xl font-normal">
    //         Brands is Not Available
    //       </p>
    //     )}
   
    //   </div>
    //   {/* brand end */}

    //   {/* warehouse  start */}
    //   <div className={`${allWareHouseIsLoading ? "flex gap-x-3" : ""}`}>
    //     {allWareHouseIsLoading ? (
    //       [...Array(5)].map((item, index) => (
    //         <CategorySkeleton key={index}></CategorySkeleton>
    //       ))
    //     ) : (
    //       <div className="flex gap-x-3">
    //         <button
    //           onClick={() => setSingleWarehouse("warehouse")}
    //           className={`min-w-[150px]  py-2 rounded-lg text-sm 
    //          ${
    //            singleWarehouse == "warehouse"
    //              ? "bg-[#6571FF] text-white"
    //              : "bg-gray-100 text-black "
    //          }
    //         `}
    //         >
    //           All Warehouse
    //         </button>

    //         <Swiper
    //  slidesPerView={3}
    //  spaceBetween={100}
    //  navigation
    // modules={[Navigation, Pagination]}
    //   className="mySwiper"
    // >        
    //           {allWarHouse?.data?.map((item, index) => (
    //             <SwiperSlide key={index}>
    //             <button
    //               onClick={() => handleWarehouse(item?.warehouseID)}
    //               className={`min-w-[200px]  rounded-lg text-sm py-2 ${
    //                 singleWarehouse?.id == item?.warehouseID
    //                   ? "bg-[#6571FF] text-white"
    //                   : "bg-gray-100 text-black"
    //               }`}
    //               key={index}
    //             >
    //               {item?.warehouseName}
    //             </button>
    //             </SwiperSlide>
    //           ))}
    //       </Swiper>
    //         </div>
    //     )}

    //     {allWarHouse?.data?.length == 0 && (
    //       <p className="text-center text-xl font-normal">
    //         Warehouse is Not Available
    //       </p>
    //     )}
    //   </div>
    //   {/* warehouse end */}

    // </div>
  );
};

export default CategoryBrandsAndWareHouse;

CategoryBrandsAndWareHouse.propTypes = {
  singleCategory: object,
  setSingleCategory: func,
  singleBrands: object,
  setSingleBrands: func,
  singleWarehouse: object,
  setSingleWarehouse: func,
};
