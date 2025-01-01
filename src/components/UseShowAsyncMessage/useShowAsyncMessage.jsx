/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";



const useShowAsyncMessage = (
  isLoading,
  isError,
  error,
  isSuccess,
  data,
  path,
  setModalIsOpen = false
) => {
  const router = useRouter();
  return useEffect(() => {
    if (isLoading) {
      toast.loading(<p>Loading...</p>, { id: 1 });
    }
    if (isError) {
      const errorMsg = error?.data?.errorMessages[0]?.message;

      // const errorMessa;
      toast.error(errorMsg, { id: 1 });
    }
    else if (isSuccess && data?.status) {
      //   setAddedProduct([]);
      //   setTax("");
      //   setDiscount("");
      //   setShipping("");
      toast.success(data?.message, { id: 1 });
      if (setModalIsOpen) {
        setModalIsOpen(false);
      }
      if (path) {
        router.push(path);
      }
      // return navigate("/dashboard/product");
    }
  }, [isLoading, isError, error, isSuccess, data, path]);
};

export default useShowAsyncMessage;
