"use client"
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export const UseErrorMessages = (error) => {
  return useEffect(() => {
    if (error && error?.data && error?.data?.errors) {
      const messages = [];

      for (const key in error?.data?.errors) {
        if (Array.isArray(error?.data?.errors[key])) {
          error?.data?.errors[key].forEach((errorMessage) => {
            toast.error(errorMessage, { id: 1 });
          });
        }
      }

      // setErrorMessages(messages);
    }
  }, [error]);
};
