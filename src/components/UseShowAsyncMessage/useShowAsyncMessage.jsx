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
  path
) => {
  const router = useRouter();
  return useEffect(() => {
    if (isLoading) {
      toast.loading("Loading...", { id: 1 });
    }
    if (isError) {
      const errorMsg = error?.data?.errorMessages[0]?.message;
      toast.error(errorMsg, { id: 1 });
    }
    else if (isSuccess && data) {
      
      toast.success(data?.message, { id: 1 });
      if (path) {
        router.push(path);
      }
    }
  }, [isLoading, isError, error, isSuccess, data, path]);
};

export default useShowAsyncMessage;
