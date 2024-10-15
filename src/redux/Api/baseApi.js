import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { tags } from "../Tag/Tag";

const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BACKEND_URL,
  }),
  tagTypes: tags.map(tag => tag.tag),
  endpoints: () => ({}),
});

export default baseApi;
