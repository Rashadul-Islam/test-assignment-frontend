import { api } from "../../api/apiSlice";

const userDataApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createUserData: builder.mutation({
      query: (data) => ({
        url: "userData/create-user-data",
        method: "POST",
        body: data,
      }),
    }),
    getuserData: builder.query({
      query: () => "userData",
      providesTags: ["userData"],
    }),
    updateUserData: builder.mutation({
      query: (data) => ({
        url: "userData/update-user-data",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["userData"],
    }),
  }),
});

export const {
  useCreateUserDataMutation,
  useUpdateUserDataMutation,
  useGetuserDataQuery,
} = userDataApi;
