import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

interface ApiResponse<T> {
  code: number;
  status_code: string;
  message: string;
  data: T;
}

async function apiRequest<T>(
  url: string,
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH" = "GET",
  data?: unknown,
  config?: AxiosRequestConfig
): Promise<ApiResponse<T>> {
  try {
    const response: AxiosResponse<ApiResponse<T>> = await axios({
      url,
      method,
      data,
      ...config,
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || "An error occurred");
    } else {
      throw new Error("An unknown error occurred");
    }
  }
}

export default apiRequest;
