import { apiSlice } from '../../../app/apiSlice';

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: ({ data }) => {
        return {
          url: `${process.env.REACT_APP_END_POINT}/token/`,
          method: 'POST',
          body: data,
        };
      },
    }),
  }),
});

export const { useLoginUserMutation } = authApi;
