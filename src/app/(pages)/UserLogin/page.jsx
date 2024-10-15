"use client";
import { useUserLoginMutation } from "@/redux/Feature/auth/authApi";
import ZInputTwo from "@/components/Form/ZInputTwo";
import ZFormTwo from "@/components/Form/ZFormTwo";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Cookies from "js-cookie";



const UserLogin = () => {
  const router = useRouter();
  const [userLogin, { isLoading: lIsloading, error,
    isError: lIsError,
    isSuccess: lIsSuccess, data:userLoginData }] = useUserLoginMutation();

  const handleSubmit = async (data) => {
    try {
      const {data:userLoginData } = await userLogin(data);
      if ( userLoginData?.data?.token && userLoginData?.data?.user?.role === "user") {
        localStorage.setItem("authToken", userLoginData?.data?.token);
        Cookies.set("authToken", userLoginData?.data?.token, {
          expires: 1, 
          path: "/", 
          secure: false
        });
        router.push('/UserDashboard/UserBusiness')
      }

    } catch (error) {
      console.error("Login failed:", error);
    }

  }


  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
        <div className="relative py-3 sm:w-[40%] sm:mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
          <div className="relative px-4 py-10 bg-white md:m-0 md:rounded-none m-2 rounded-md shadow-lg sm:rounded-3xl sm:p-20">
            <div className="max-w-md mx-auto text-center">
              <ZFormTwo
                isLoading={lIsloading}
                error={error}
                isError={lIsError}
                isSuccess={lIsSuccess}
                submit={handleSubmit}
                data={userLoginData}
                buttonName={'Login'}
              >
                <div>
                
                  <h1 className="text-2xl mt-2 text-center">User Login Here</h1>
                </div>
                <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                  <div className="relative mb-8">
                  <ZInputTwo
            name="identifier"
            type="text"
            label="User Name"
            defaultKey={""}
            placeholder={"Enter your username..."}
            required={1}

          />
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

            <div className="flex justify-center items-center mt-5">
              <div>
                <p className="text-sm text-gray-500">
                  No account?
                  <Link href="/Register">
                    <button className="underline text-blue-500 ms-2">
                      Register Now
                    </button>
                  </Link>
                </p>
              </div>
          </div>
          
        </div>
    </div>
    </div>
  );
};

export default UserLogin;
