import { apiSlice } from "../apiSlice";
const subscriptionApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSubscription: builder.query({
      query: () => "/payment/subscription",
      providesTags: [{ type: "Subscription", id: "List" }],
    }),
    subscribe: builder.mutation({
      query: () => ({
        url: "/payment/create",
        method: "POST",
      }),
      invalidatesTags: [{ type: "Subscription", id: "List" }],
    }),
  }),
});

export const { useGetSubscriptionQuery, useSubscribeMutation } =
  subscriptionApiSlice;
