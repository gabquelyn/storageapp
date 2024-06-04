import { apiSlice } from "../apiSlice";
const shareSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    initaiteShare: builder.query({
      query: (details) => ({
        url: `/share/${details.type}/${details.id}`,
      }),
      providesTags: [{ type: "Share", id: "List" }],
    }),
    toggleVisibility: builder.mutation({
      query: (details) => ({
        url: `/share/toggle/${details.type}/${details.id}`,
        method: "GET",
      }),
      invalidatesTags: [{ type: "Share", id: "List" }],
    }),
    shareDetails: builder.query<filemetaData[], string>({
      query: (code) => ({
        url: `/share/${code}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useInitaiteShareQuery,
  useToggleVisibilityMutation,
  useShareDetailsQuery,
} = shareSlice;
