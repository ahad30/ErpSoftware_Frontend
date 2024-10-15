import baseApi from '../../../Api/baseApi';
import { getTagsByModuleName } from "@/redux/Tag/Tag";


const businessesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    addBusinesses: builder.mutation({
      query: (data) => ({
        url: "/erp-businesses/create",
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: data,
      }),
      invalidatesTags:getTagsByModuleName('ErpBusinesses')
      // tags.filter(tag => tag.name === 'ErpBusinesses').map(tag => tag.tag), 
    }),

    // Get Categories
    getBusinesses: builder.query({
      query: () => ({
        url: "/erp-businesses",
      }),
      providesTags:getTagsByModuleName('ErpBusinesses')

    }),

    // Update ErpBusinesses
    updateBusinesses: builder.mutation({
      query: ({ id, data }) => ({
        url: `/erp-businesses/update/${id}`,
        headers: {
          "Content-Type": "application/json",
        },
        method: "PATCH",
        body: data,
      }),
      invalidatesTags:getTagsByModuleName('ErpBusinesses')

    }),

    // Delete ErpBusinesses mutation in RTK Query
    deleteBusinesses: builder.mutation({
      query: (id) => ({
        url: `/erp-businesses/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: getTagsByModuleName('ErpBusinesses')

    }),
  }),
});

export const {
  useAddBusinessesMutation,
  useGetBusinessesQuery,
  useUpdateBusinessesMutation,
  useDeleteBusinessesMutation,
} = businessesApi;
