import { api } from './index'

export const productApi = api.injectEndpoints({
    endpoints: (build) => ({
        getProducts: build.query({
            query: (params) => ({
                url: '/products',
                params
            }),
            providesTags: ["newproject-products"]
        }),
        getProductById: build.query({
            query: (id) => ({
                url: `/products/${id}`
            }),
            providesTags: ["newproject-products"]
        }),
        createProduct: build.mutation({
            query: (body) => ({
                url: "/products",
                method: "POST",
                body
            }),
            invalidatesTags: ["newproject-products"]
        }),
        deleteProduct: build.mutation({
            query: (id) => ({
                url: `/products/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["newproject-products"]
        }),
        updateProduct: build.mutation({
            query: ({ id, body }) => ({
                url: `/products/${id}`,
                method: "PUT", // or "PATCH"
                body
            }),
            invalidatesTags: ["newproject-products"]
        })
    }),
})

export const {
    useGetProductsQuery,
    useCreateProductMutation,
    useDeleteProductMutation,
    useUpdateProductMutation
} = productApi