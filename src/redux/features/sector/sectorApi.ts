import { api } from "../../api/apiSlice";

const sectorApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllSector: builder.query({
      query: () => "sectors",
      providesTags: ["userData"],
    }),
  }),
});

export const { useGetAllSectorQuery } = sectorApi;
