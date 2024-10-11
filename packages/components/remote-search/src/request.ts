import axios, { AxiosInstance, AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'

const baseConfig = {
  baseURL: '',
  timeout: 50000,
  withCredentials: true,
}

class RequestHttp {
  instance: AxiosInstance
  resInterceptors: any
  CancelToken: any
  constructor(config: AxiosRequestConfig) {
    // 创建 axios 实例
    this.instance = axios.create(config)
    this.CancelToken = axios.CancelToken
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
}

const request = new RequestHttp(baseConfig)

export default request
