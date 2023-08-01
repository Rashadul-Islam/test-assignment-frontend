/* eslint-disable react-hooks/exhaustive-deps */
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSignUpUserMutation } from "@/redux/features/user/userApi";
import toast from "react-hot-toast";
import { useAppSelector } from "@/redux/hook";

const SignUp = () => {
  const navigate = useNavigate();
  const { token } = useAppSelector((state) => state.user);

  const [signUpUser, { data, isSuccess, isError }] = useSignUpUserMutation();
  interface LoginData {
    email: string | "";
    password: string | "";
    rePassword: string | "";
  }

  const [signUpData, setSignUpData] = useState<LoginData>({
    email: "",
    password: "",
    rePassword: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setSignUpData((prevData) => {
        return {
          ...prevData,
          [name]: value,
        };
    });
  };

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (signUpData.password !== signUpData.rePassword) {
      toast.error("Both password should be same");
    } else {
      signUpUser(signUpData);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(`${data?.message}`);
      setSignUpData({
        email: "",
        password: "",
        rePassword: "",
      });
      navigate("/signin");
    }
    if (isError) {
      toast.error("Got error..!");
    }
  }, [isSuccess, isError]);

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, []);

  return (
    <div>
      <div className="w-full bg-gray-900">
        <form
          id="form"
          onSubmit={handleSubmit}
          className="flex flex-col h-screen md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 items-center mx-5 md:mx-0 md:my-0"
        >
          <div className="md:w-1/3 max-w-sm">
            <img
              src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              alt="Sample image"
            />
          </div>
          <div className="md:w-1/3 max-w-sm">
            <div className="my-5 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
              <p className="mx-4 mb-0 text-center font-semibold text-white">
                Signin
              </p>
            </div>
            <input
              className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded"
              type="email"
              name="email"
              value={signUpData?.email}
              required
              onChange={handleInputChange}
              placeholder="Email Address"
            />
            <input
              className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
              type="password"
              name="password"
              value={signUpData?.password}
              required
              onChange={handleInputChange}
              placeholder="Password"
            />
            <input
              className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
              type="password"
              name="rePassword"
              required
              onChange={handleInputChange}
              value={signUpData?.rePassword}
              placeholder="Retype Password"
            />
            <div className="text-center flex justify-between items-center lg:flex-row md:flex-col">
              <button
                className="mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white uppercase rounded text-xs tracking-wider"
                type="submit"
              >
                Signup
              </button>
              <div className="mt-4 font-semibold text-sm text-slate-500 text-center md:text-left">
                Already have an account?{" "}
                <Link
                  className="text-red-600 hover:underline hover:underline-offset-4"
                  to="/signin"
                >
                  Signin
                </Link>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
