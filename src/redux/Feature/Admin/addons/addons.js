import baseApi from '../../../Api/baseApi';
import { getTagsByModuleName } from "@/redux/Tag/Tag";


const addonsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Add Addons
    addAddons: builder.mutation({
      query: (data) => ({
        url: "/erp-addon/create",
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: data,
      }),
      invalidatesTags: getTagsByModuleName("Addons"),
    }),

    // Get Categories
    getAddons: builder.query({
      query: () => ({
        url: "/erp-addon",
      }),
      providesTags: getTagsByModuleName("Addons"),
    }),

    // Get Module by ID
    getAddonsById: builder.query({
      query: (id) => ({
        url: `/erp-addon/addon/${id}`,
      }),
      providesTags: getTagsByModuleName("Addons"),
    }),

    // Update Addons
    updateAddons: builder.mutation({
      query: ({ id, data }) => ({
        url: `/erp-addon/update/${id}`,
        headers: {
          "Content-Type": "application/json",
        },
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: getTagsByModuleName("Addons"),
    }),

    // Delete Addons
    deleteAddons: builder.mutation({
      query: (id) => ({
        url: `/erp-addon/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: getTagsByModuleName("Addons"),
    }),
  }),
});

export const {
  useAddAddonsMutation,
  useGetAddonsQuery,
  useGetAddonsByIdQuery,
  useUpdateAddonsMutation,
  useDeleteAddonsMutation,
} = addonsApi;
