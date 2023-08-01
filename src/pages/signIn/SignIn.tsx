/* eslint-disable react-hooks/exhaustive-deps */
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSignInUserMutation } from "../../redux/features/user/userApi";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { userSignIn } from "@/redux/features/user/userSlice";

const SignIn = () => {
  const dispatch = useAppDispatch();
  const { state } = useLocation();
  const navigate = useNavigate();
  const { token } = useAppSelector((state) => state.user);

  interface ILoginData {
    email: string;
    password: string;
  }
  const [signInUser, { data }] = useSignInUserMutation();
  const [loginData, setLoginData] = useState<ILoginData>({
    email: "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    signInUser(loginData);
  };

  useEffect(() => {
    if (data?.data?.accessToken) {
      dispatch(userSignIn(data?.data));
      navigate(state?.from ? state?.from : "/");
    }
  }, [data]);

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, []);

  return (
    <div>
      <div className="w-full bg-gray-900">
        <section className="flex flex-col h-screen md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 items-center mx-5 md:mx-0 md:my-0">
          <div className="md:w-1/3 max-w-sm">
            <img
              src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              alt="Sample image"
            />
          </div>
          <form onSubmit={handleSubmit} className="md:w-1/3 max-w-sm">
            <div className="my-5 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
              <p className="mx-4 mb-0 text-center font-semibold text-white">
                Signin
              </p>
            </div>
            <input
              className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded"
              type="email"
              name="email"
              onChange={handleInputChange}
              placeholder="Email Address"
              required
            />
            <input
              className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
              type="password"
              name="password"
              onChange={handleInputChange}
              placeholder="Password"
              required
            />
            <div className="text-center flex justify-between items-center lg:flex-row md:flex-col">
              <button
                className="mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white uppercase rounded text-xs tracking-wider"
                type="submit"
              >
                Signin
              </button>
              <div className="mt-4 font-semibold text-sm text-slate-500 text-center md:text-left">
                Don't have an account?{" "}
                <Link
                  className="text-red-600 hover:underline hover:underline-offset-4"
                  to="/signup"
                >
                  Signup
                </Link>
              </div>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
};

export default SignIn;
