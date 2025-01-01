import baseApi from "@/redux/Api/baseApi";
import { getTagsByModuleName } from "@/redux/Tag/Tag";

const purchaseApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Add Purchase Order
    addPurchaseOrder: builder.mutation({
      query: (data) => ({
        url: "/purchase-order/create",
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: data,
      }),
      invalidatesTags: getTagsByModuleName('PurchaseOrder')
    }),

    // Get Purchase Orders
    getPurchaseOrders: builder.query({
      query: () => ({
        url: "/purchase-order",
      }),
      providesTags: getTagsByModuleName('PurchaseOrder')
    }),
    // Get Purchase Order by Id
    getPurchaseOrderById: builder.query({
      query: (id) => ({
        url: `/purchase-order/${id}`,
      }),
      providesTags: getTagsByModuleName('PurchaseOrder')
    }),

    // Update Purchase Order
    updatePurchaseOrder: builder.mutation({
      query: ({ id, data }) => ({
        url: `/purchase-order/update/${id}`,
        headers: {
          "Content-Type": "application/json",
        },
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: getTagsByModuleName('PurchaseOrder')
    }),

    // Delete Purchase Order
    deletePurchaseOrder: builder.mutation({
      query: (id) => ({
        url: `/purchase-order/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: getTagsByModuleName('PurchaseOrder')
    }),
  }),
});

export const {
  useAddPurchaseOrderMutation,
  useGetPurchaseOrdersQuery,
  useGetPurchaseOrderByIdQuery,
  useUpdatePurchaseOrderMutation,
  useDeletePurchaseOrderMutation,
} = purchaseApi;

export default purchaseApi;
