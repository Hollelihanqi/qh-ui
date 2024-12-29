import axios, { AxiosInstance, AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'

type Result<T> = {
  code: number
  message: string
  result: T
}

export const baseConfig = {
  baseURL: '',
  timeout: 50000,
  withCredentials: true,
}

export class RequestHttp {
  instance: AxiosInstance
  resInterceptors: any
  CancelToken: any
  constructor(config: AxiosRequestConfig) {
    // 创建 axios 实例
    this.instance = axios.create(config)
    this.CancelToken = axios.CancelToken
    // this.instance.interceptors.request.use(
    //     (config) => {
    //         // 添加 token
    //         let token = sessionStorage.getItem("authorization") as string;
    //         if (token) {
    //             token = JSON.parse(token);
    //             config.headers.authorization = token;
    //         }
    //         return config;
    //     },
    //     (error) => {
    //         return Promise.reject(error);
    //     }
    // );

    this.resInterceptors = this.instance.interceptors.response.use(
      (res: AxiosResponse) => {
        if (res.status === 200 && (res.data.success || res.data.status === 0)) {
          return Promise.resolve(res.data.data)
        } else {
          console.error(res.data.message)
          return Promise.reject(res.data)
        }
      },
      (error: AxiosError) => {
        return Promise.reject(error.response)
      },
    )
  }

  // 定义请求方法

  public removeResponseInterceptors() {
    this.instance.interceptors.response.eject(this.resInterceptors)
  }

  public request(config: AxiosRequestConfig): Promise<AxiosResponse> {
    return this.instance.request(config)
  }

  public get<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<Result<T>>> {
    return this.instance.get(url, config)
  }

  public post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<Result<T>>> {
    return this.instance.post(url, data, config)
  }

  public put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<Result<T>>> {
    return this.instance.put(url, data, config)
  }

  public delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<Result<T>>> {
    return this.instance.delete(url, config)
  }
}

export const request = new RequestHttp(baseConfig)
export default request
