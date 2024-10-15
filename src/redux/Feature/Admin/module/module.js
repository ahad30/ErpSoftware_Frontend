import baseApi from '../../../Api/baseApi';
import { getTagsByModuleName } from "@/redux/Tag/Tag";


const moduleApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    
    // Add Module
    addModule: builder.mutation({
      query: (data) => ({
        url: "/erp-module/create",
        headers: {
          'Content-Type': 'application/json',
        },
        method: "POST",
        body: data,
      }),
      invalidatesTags:getTagsByModuleName('Module')
      
    }),

    // Get Categories
    getModule: builder.query({
      query: () => ({
        url: "/erp-module",
      }),
      providesTags:getTagsByModuleName('Module')
    }),

      // Get Module by ID
      getModuleById: builder.query({
        query: (id) => ({
          url: `/erp-module/module/${id}`,
        }),
        providesTags: getTagsByModuleName('Module'),
      }),

    // Update Module
    updateModule: builder.mutation({
      query: ({ id, data }) => ({
        url: `/erp-module/update/${id}`,
        headers: {
          'Content-Type': 'application/json',
        },
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: getTagsByModuleName('Module')
    }),

    // Delete Module
    deleteModule: builder.mutation({
      query: (id) => ({
        url: `/erp-module/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags:getTagsByModuleName('Module')
    }),

  }),
});

export const { 
  useAddModuleMutation,
  useGetModuleQuery, 
  useGetModuleByIdQuery,
  useUpdateModuleMutation,
  useDeleteModuleMutation,
} = moduleApi;
