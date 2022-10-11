import { Store } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
import { AppDispatch } from "store";
import { logOut } from "store/features/auth/slice";
import { RootState } from "store/reducers";

const axios401ResponseInterceptor = (store: Store<RootState>) => [
  (response: AxiosResponse) => response,
  (error: any) => {
    const dispatch = store.dispatch as AppDispatch;
    if (error?.response?.status === 401) {
      dispatch(logOut());
    }
    return Promise.reject(error);
  },
];

export const createAxiosInterceptor = (store: Store<RootState>) => {
  axios.interceptors.response.use(...axios401ResponseInterceptor(store));
};
