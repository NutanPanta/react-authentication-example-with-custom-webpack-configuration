import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { logout } from '../features/auth/reducers/authSlice';
import { REHYDRATE } from 'redux-persist';

const baseQuery = fetchBaseQuery({
  baseUrl: '',
  // credentials: 'include',
  prepareHeaders: (headers, { getState, dispatch }) => {
    const token = getState().auth.token;

    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }

    return headers;
  },
});

const baseQueryWithAuthValidation = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  let status = result?.error?.status;

  return status === 403
    ? console.log('Forbidden')
    : status === 401
    ? (api.dispatch(logout()), api.dispatch(apiSlice.util.resetApiState()))
    : result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithAuthValidation,
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === REHYDRATE) {
      return action.payload[reducerPath];
    }
  },
  endpoints: (builder) => ({}),
});
