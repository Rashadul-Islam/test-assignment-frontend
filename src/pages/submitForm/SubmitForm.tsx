import React, { useState, ChangeEvent, useEffect } from "react";
import { useGetAllSectorQuery } from "@/redux/features/sector/sectorApi";
import { IOptions, ISector } from "@/types/sector";
import { useCreateUserDataMutation } from "@/redux/features/userData/userDataApi";
import { toast } from "react-hot-toast";

const SubmitForm = () => {
  const { data } = useGetAllSectorQuery(null);
  const [name, setName] = useState<string>();
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [agreeTerms, setAgreeTerms] = useState<boolean>(false);
  const [createUserData, { isSuccess, isError }] = useCreateUserDataMutation();

  const handleOptionChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );
    setSelectedOptions(selectedOptions);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const options = {
      name: name,
      sector: selectedOptions,
      agreeTerms: agreeTerms,
    };
    createUserData(options);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Successfully submited!");
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      toast.error(`Data already submited`);
    }
  }, [isError]);

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
            className="bg-gray-50 border border-white text-gray-900 text-sm outline-none block w-full p-2.5 "
            placeholder="John Doe"
            onChange={(e) => setName(e.target.value)}
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
            value={selectedOptions}
            onChange={handleOptionChange}
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
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
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

export default SubmitForm;
