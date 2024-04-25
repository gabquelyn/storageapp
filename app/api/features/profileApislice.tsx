import { apiSlice } from "../apiSlice";
const profileApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query({
      query: () => "/profile",
      providesTags: [{ type: "Profile", id: "list" }],
    }),
    updateProfile: builder.mutation({
      query: (details) => ({
        url: "profile",
        method: "POST",
        body: { ...details },
      }),
      invalidatesTags: [{ type: "Profile", id: "list" }],
    }),
  }),
});

export const { useGetProfileQuery, useUpdateProfileMutation } = profileApiSlice;
