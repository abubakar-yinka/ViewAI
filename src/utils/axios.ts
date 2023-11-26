import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import { setupInterceptorsTo } from "./interceptors";

const API_BASE_URL = "https://randomuser.me/api";

const axiosClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

const interceptedAxiosClientInstance = setupInterceptorsTo(axiosClient);

type MethodEnum = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export const apiCall = async (
  method: MethodEnum,
  route: string,
  body: any = null
): Promise<
  | AxiosResponse<any, any>
  | AxiosError<unknown, any>
  | AxiosResponse<unknown, any>
  | void
> => {
  const onSuccess = (response: AxiosResponse): AxiosResponse => response.data;
  const onError = (error: AxiosError) => {
    console.log("Axios error:", error);
    if (error.response && error.response.data) {
      throw new Error((error.response.data as any)?.message);
    } else {
      throw new Error(error?.message);
    }
  };

  return interceptedAxiosClientInstance({
    method,
    url: route,
    data: body,
  })
    .then(onSuccess)
    .catch(onError);
};
