import { api } from "../../api/apiSlice";

const sectorApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllSector: builder.query({
      query: () => "sectors",
    }),
  }),
});

export const { useGetAllSectorQuery } = sectorApi;
