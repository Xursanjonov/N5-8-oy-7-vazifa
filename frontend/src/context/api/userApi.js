import { api } from './index'

export const userApi = api.injectEndpoints({
    endpoints: (build) => ({
        getUsers: build.query({
            query: (params) => ({
                url: '/users',
                params
            }),
            providesTags: ["newproject-users"]
        }),
        signIn: build.mutation({
            query: (body) => ({
                url: "/users/sign-in",
                method: "POST",
                body
            }),
            invalidatesTags: ["newproject-users"]
        }),
        signUp: build.mutation({
            query: ({ body }) => ({
                url: "/users/sign-up",
                method: "POST",
                body
            }),
            invalidatesTags: ["newproject-users"]
        }),
        updateUser: build.mutation({
            query: ({ id, body }) => ({
                url: "/users/" + id,
                method: "PUT",
                body
            }),
            invalidatesTags: ["newproject-users"]
        }),
        deleteUser: build.mutation({
            query: (id) => ({
                url: "/users/" + id,
                method: "DELETE"
            }),
            invalidatesTags: ["newproject-users"]
        }),
    }),
})

export const {
    useGetUsersQuery,
    useSignUpMutation,
    useSignInMutation,
    useDeleteUserMutation
} = userApi