import axios from "axios";
import { getToken, getLanguage } from "./Tokens";
import { environment } from "../config";
export const BASE_URL: string = environment.apiKey;
// Get request Function
export const apiGetRequest = (endpoint: string, token = null, props = {}) =>
  ApiRequest("GET", endpoint, token, props);

// Post request Function
export const apiPostRequest = (endpoint: string, payload: any, token = null) =>
  ApiRequest("POST", endpoint, token, { data: payload });

// Patch request Function
export const apiPatchRequest = (endpoint: string, payload: any, token = null) =>
  ApiRequest("PATCH", endpoint, token, { data: payload });

// Put Request Function
export const apiPutRequest = (endpoint: string, payload: any, token = null) =>
  ApiRequest("PUT", endpoint, token, { data: payload });

// Delete Request Function
export const apiDeleteRequest = (endpoint: string, token = null, props = {}) =>
  ApiRequest("DELETE", endpoint, token, props);

// Api Request for all the api methods
export const ApiRequest = (
  method: string,
  endpoint: string,
  token: any = null,
  props: any = {}
) => {
  if (!token) {
    token = getToken();
  }
  const params: any = {
    method,
    baseURL: BASE_URL,
    url: endpoint,
    params:
      method.toLowerCase() === "get" || method.toLowerCase() === "delete"
        ? props
        : undefined,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      language: getLanguage(),
    },
  };
  Object.assign(params, props);
  if (token) {
    params.headers.Authorization = token;
  }
  return axios(params);
};
