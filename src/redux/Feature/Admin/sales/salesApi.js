import baseApi from "@/redux/Api/baseApi";
import { getTagsByModuleName } from "@/redux/Tag/Tag";

const salesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Add Sales Order
    addSalesOrder: builder.mutation({
      query: (data) => ({
        url: "/sales-order/create",
        // headers: {
        //   "Content-Type": "application/json",
        // },
        method: "POST",
        body: data,
      }),
      invalidatesTags: getTagsByModuleName('SalesOrder')
    }),

    // Get Sales Orders
    getSalesOrders: builder.query({
      query: () => ({
        url: "/sales-order",
      }),
      providesTags: getTagsByModuleName('SalesOrder')
    }),
    // Get Sales Order by Id
    getSalesOrderById: builder.query({
      query: (id) => ({
        url: `/sales-order/${id}`,
      }),
      providesTags: getTagsByModuleName('SalesOrder')
    }),

    // Update Sales Order
    updateSalesOrder: builder.mutation({
      query: ({ id, data }) => ({
        url: `/sales-order/update/${id}`,
        // headers: {
        //   "Content-Type": "application/json",
        // },
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: getTagsByModuleName('SalesOrder')
    }),

    // Delete Sales Order
    deleteSalesOrder: builder.mutation({
      query: (id) => ({
        url: `/sales-order/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: getTagsByModuleName('SalesOrder')
    }),
  }),
});

export const {
  useAddSalesOrderMutation,
  useGetSalesOrdersQuery,
  useGetSalesOrderByIdQuery,
  useUpdateSalesOrderMutation,
  useDeleteSalesOrderMutation,
} = salesApi;

export default salesApi;
