import baseApi from '../../../Api/baseApi';
import { getTagsByModuleName } from "@/redux/Tag/Tag";

const addressApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    // Add Address
    addAddress: builder.mutation({
      query: (data) => ({
        url: "/addresses/create",
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: data,
      }),
      invalidatesTags: getTagsByModuleName('Address'),
    }),

    // Get Addresses
    getAddresses: builder.query({
      query: () => ({
        url: "/addresses",
      }),
      providesTags: getTagsByModuleName('Address'),
    }),

    // Update Address
    updateAddress: builder.mutation({
      query: ({ id, data }) => ({
        url: `/addresses/update/${id}`,
        headers: {
          "Content-Type": "application/json",
        },
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: getTagsByModuleName('Address'),
    }),

    // Delete Address
    deleteAddress: builder.mutation({
      query: (id) => ({
        url: `/addresses/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: getTagsByModuleName('Address'),
    }),
  }),
});

export const {
  useAddAddressMutation,
  useGetAddressesQuery,
  useUpdateAddressMutation,
  useDeleteAddressMutation,
} = addressApi;
