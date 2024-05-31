import { redirect } from "next/navigation";
type CustomOpts = RequestInit & {
  baseUrl?: string;
  withCredentials?: boolean; // Add withCredentials option
};

const request = async <Response>(
  method: "POST" | "PUT" | "PATCH" | "DELETE" | "GET",
  url: string,
  body: any | undefined,
  options: CustomOpts | undefined
) => {
  const baseUrl =
    options?.baseUrl === undefined
      ? process.env.NEXT_PUBLIC_API_ENDPOINT
      : options.baseUrl;
  const fullUrl = url.startsWith("/")
    ? `${baseUrl}${url}`
    : `${baseUrl}/${url}`;
  const { baseUrl: _baseUrl, withCredentials, ...headers } = options ?? {};
  let fetchOptions: RequestInit = {
    headers: {
      ...(headers.headers ?? {}),
    },
    credentials: withCredentials ? "include" : "same-origin",
  };
  if (method !== "GET") {
    fetchOptions.method = method;
    fetchOptions.body = body ?? {};
    fetchOptions.cache = "no-store";
  }
  const result = await fetch(fullUrl, fetchOptions);

  const data: Response = await result.json();
  // if (result.status === 401 && result.statusText === "Unauthorized") {
  //   if (typeof window !== undefined) {
  //     //clear jwt
  //     await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/auth/logout`, {
  //       method: "GET",
  //       headers: { "Content-Type": "application/json" },
  //       credentials: "include",
  //     });
  //     location.href = "?showLoginModal=1";
  //   }
  // }
  return data;
};
const http = {
  get<Response>(url: string, options: CustomOpts | undefined) {
    return request<Response>("GET", url, undefined, options);
  },
  put<Response>(url: string, body: any, options: CustomOpts | undefined) {
    return request<Response>("PUT", url, JSON.stringify(body), options);
  },
  patch<Response>(url: string, body: any, options: CustomOpts | undefined) {
    return request<Response>("PATCH", url, JSON.stringify(body), options);
  },
  post<Response>(url: string, body: any, options: CustomOpts | undefined) {
    return request<Response>("POST", url, JSON.stringify(body), options);
  },
  delete<Response>(url: string, body: any, options: CustomOpts | undefined) {
    return request<Response>("DELETE", url, JSON.stringify(body), options);
  },
};
export default http;
