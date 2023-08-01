import React, { useState, useEffect } from "react";
import { useGetAllSectorQuery } from "@/redux/features/sector/sectorApi";
import { IOptions, ISector } from "@/types/sector";
import { toast } from "react-hot-toast";
import {
  useGetuserDataQuery,
  useUpdateUserDataMutation,
} from "@/redux/features/userData/userDataApi";

const EditForm = () => {
  const { data: userData } = useGetuserDataQuery(null);
  const [updateUserData, { isSuccess, isError }] = useUpdateUserDataMutation();
  const { data } = useGetAllSectorQuery(null);
  const [state, setState] = useState<{
    name?: string;
    sector: string[];
    agreeTerms: boolean;
  }>({
    name: "",
    sector: [],
    agreeTerms: false,
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateUserData(state);
  };

  useEffect(() => {
    if (userData) {
      setState(userData?.data);
    }
  }, [userData]);

  useEffect(() => {
    if (isSuccess) {
      toast.success("User data updated successfully!");
    }
    if (isError) {
      toast.error("Something went wrong!");
    }
  }, [isSuccess, isError]);

  return (
    <div className="lg:w-[40%] md:w-[60%] w-[90%] mx-auto mt-[50px] mb-[100px]">
      <form onSubmit={handleSubmit}>
        <p className="text-white text-center mb-7">
          Please fill up the form carefully
        </p>
        <div className="mb-6">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-white"
          >
            Your Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="bg-gray-50 border border-white text-gray-900 text-sm outline-none block w-full p-2.5 "
            placeholder="John Doe"
            defaultValue={state?.name}
            onChange={(e) =>
              setState((prevState) => ({
                ...prevState,
                [e.target.name]: e.target.value,
              }))
            }
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="sectors"
            className="block mb-2 text-sm font-medium text-white"
          >
            Select an option
          </label>
          <select
            multiple
            value={state?.sector}
            onChange={(e) => {
              const selectedOptions = Array.from(
                e.target.selectedOptions,
                (option) => option.value
              );
              setState({ ...state, sector: selectedOptions });
            }}
            required
            id="sectors"
            size={5}
            className="bg-gray-50 outline-none text-gray-900 text-sm block w-full p-2.5"
          >
            {data?.data?.map((sector: ISector) => (
              <React.Fragment key={sector?.tag}>
                <option className="text-bold p-2" value="" disabled>
                  {sector?.tag}
                </option>

                {sector?.options &&
                  sector?.options?.map((data: IOptions) => (
                    <option
                      key={data?.value}
                      className="px-10 p-1"
                      value={data?.value}
                    >
                      {data?.data}
                    </option>
                  ))}
              </React.Fragment>
            ))}
          </select>
        </div>
        <div className="flex items-start mb-6">
          <div className="flex items-center h-5">
            <input
              id="remember"
              type="checkbox"
              name="agreeTerms"
              checked={state?.agreeTerms}
              onChange={(e) =>
                setState((prevState) => ({
                  ...prevState,
                  [e.target.name]: e.target.checked,
                }))
              }
              className="w-4 h-4 bg-gray-50 focus:ring-3 focus:ring-blue-300 "
              required
            />
          </div>
          <label
            htmlFor="remember"
            className="ml-2 text-sm font-medium text-white"
          >
            Agree to terms
          </label>
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default EditForm;
