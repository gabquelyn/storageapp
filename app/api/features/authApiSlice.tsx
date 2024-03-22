"use client";
import { apiSlice } from "../apiSlice";
import { logOut, setCredentials} from "../authSlice"
const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    signUp: builder.mutation({
      query: (credentials) => ({
        url: "/auth/signup",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    updatePassword: builder.mutation({
      query: (credentials) => ({
        url: "/auth/update",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    sendLogOut: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(logOut(null));
          dispatch(apiSlice.util.resetApiState());
        } catch (err) {
          console.log(err);
        }
      },
    }),
    refresh: builder.mutation({
      query: () => ({
        url: "/auth/refresh",
        method: "GET",
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const response = await queryFulfilled;
          dispatch(setCredentials({ ...response.data }));
          dispatch(apiSlice.util.resetApiState());
        } catch (err) {
          console.log(err);
        }
      },
    }),
    forgot: builder.mutation({
      query: (email) => ({
        url: "/auth/forgot",
        method: "POST",
        body: { email },
      }),
    }),
    reset: builder.mutation({
      query: (credentials) => ({
        url: `/auth/reset/${credentials.token}`,
        method: "POST",
        body: { ...credentials },
      }),
    }),
    verify: builder.query({
      query: (credential) =>
        `/auth/${credential.userId}/verify/${credential.token}`,
    }),
  }),
});

export const {
  useLoginMutation,
  useSignUpMutation,
  useSendLogOutMutation,
  useRefreshMutation,
  useVerifyQuery,
  useForgotMutation,
  useResetMutation,
  useUpdatePasswordMutation
} = authApiSlice;
