import { apiSlice } from "../apiSlice";
const fileApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getfiles: builder.query({
      query: () => ({
        url: "/file",
      }),
      providesTags: [{ type: "File", id: "List" }],
    }),
    getFolderFiles: builder.query({
      query: (folderId) => ({
        url: `/file/folder/${folderId}`,
      }),
      providesTags: [{ type: "File", id: "List" }],
    }),
    uploadFiles: builder.mutation({
      query: (formData) => ({
        url: "/file",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: [{ type: "File", id: "List" }],
    }),
    createFolder: builder.mutation({
      query: (details) => ({
        url: "/file/newfolder",
        method: "POST",
        body: { ...details },
      }),
      invalidatesTags: [{ type: "File", id: "List" }],
    }),
  }),
});

export const {
  useGetfilesQuery,
  useCreateFolderMutation,
  useUploadFilesMutation,
  useGetFolderFilesQuery,
} = fileApiSlice;
