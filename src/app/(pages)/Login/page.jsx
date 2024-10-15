"use client"
import { useLoginMutation } from "@/redux/Feature/auth/authApi";
import ZEmail from "@/components/Form/ZEmail";
import ZInputTwo from "@/components/Form/ZInputTwo";
import ZFormTwo from "@/components/Form/ZFormTwo";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Cookies from "js-cookie";

const Login = () => {
  const router = useRouter();
  const [
    login,
    {
      isLoading: lIsloading,
      error,
      isError: lIsError,
      isSuccess: lIsSuccess,
      data: loginData,
    },
  ] = useLoginMutation();
 
  const handleSubmit = async (data) => {
    try {
      const { data: loginData } = await login(data);
      if (loginData?.data?.token) {
        localStorage.setItem("authToken", loginData?.data?.token); 
        Cookies.set("authToken", loginData?.data?.token, {
          expires: 1, 
          path: "/", 
          secure: false
        });
        router.push("/Dashboard/AdminHome");
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
        <div className="relative py-3 sm:max-w-xl sm:mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
          <div className="relative px-4 py-10 bg-white md:m-0 md:rounded-none m-2 rounded-md shadow-lg sm:rounded-3xl sm:p-20">

            <div className="max-w-md mx-auto text-center">
              <ZFormTwo
                isLoading={lIsloading}
                error={error}
                isError={lIsError}
                isSuccess={lIsSuccess}
                submit={handleSubmit}
                data={loginData}
                buttonName={'Login'}
              >
                <div>
                  <h1 className="text-2xl font-semibold">
                    Welcome to Inventory Management
                  </h1>
                  <h1 className="text-2xl mt-2 text-center">Admin Login Here</h1>
                </div>
                <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                  <div className="relative mb-8">
                    <ZEmail label={"Email"} name={"email"} />
                  </div>
                  <div className="relative">
                    <ZInputTwo
                      required={1}
                      name="password"
                      type="password"
                      label="password"
                      defaultKey={""}
                      placeholder={"Enter your password"}
                    />
                  </div>
                </div>
              </ZFormTwo>
            </div>

            <div className="flex justify-center mt-5">
              <p className="text-sm text-gray-500">
                If you are a user login here
                <Link href="/UserLogin">
                  <button className="underline text-blue-500 ms-2">
                    User Login
                  </button>
                </Link>
              </p>
            </div> 
            
          </div>
        </div>
    </div>
  );
};

export default Login;
