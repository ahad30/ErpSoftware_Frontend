"use client"
import { useEffect, useState } from "react";
import store from "@/redux/store/store";
import "./globals.css";
import { Provider } from "react-redux";
import { Toaster } from "sonner";
import LoadingPage from "@/components/LoadingPage";

export default function RootLayout({ children }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <html lang="en">
      <body>

         {
          isLoading ? ( 
                <div>
                  <LoadingPage/>
                </div>
          ): 
          (
            <>
            <Provider store={store}>
            <Toaster expand={true} richColors />
           <div>{children}</div>
           </Provider> 
           </>
          )
         }

      </body>
    </html>
  );
}
