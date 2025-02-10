import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { ElMessage } from 'element-plus'
const MODE = import.meta.env.MODE

type Result<T> = {
  code: number
  message: string
  result: T
}

export const baseConfig = {
  baseURL: '/api',
  timeout: 50000,
  withCredentials: true,
}

export class RequestHttp {
  instance: AxiosInstance
  resInterceptors: any
  tokenErrorCodes = ['TOKEN_ERROR', 'TOKEN_EXPIRED', 'TOKEN_NULL']
  constructor(config: AxiosRequestConfig = baseConfig) {
    // 创建 axios 实例
    this.instance = axios.create(config)
    this.instance.interceptors.request.use(
      (config) => {
        // 添加 token
        let token = sessionStorage.getItem('authorization') as string
        if (token) {
          if (token.indexOf('"') !== -1) {
            const regex = /^"(.*)"$/
            const matches: any = token.match(regex)
            token = matches[1]
          }
          config.headers.authorization = token
        }
        return config
      },

      (error) => {
        return Promise.reject(error)
      },
    )

    this.resInterceptors = this.instance.interceptors.response.use(
      async (res: AxiosResponse) => {
        const { status, data } = res
        const isTokenError = this.tokenErrorCodes?.includes(data.code)
        if (status === 200 && data.success) {
          return Promise.resolve(res.data.data)
        } else if (isTokenError) {
          if (MODE !== 'development') {
            ElMessage.error(res.data.message)
            tokenError()
          }
        }
        ElMessage.error(res.data.message)
        return Promise.reject(res.data)
      },

      (error: any) => {
        const res: any = error.response?.data
        if (MODE === 'development' && res?.message?.includes('token')) {
          console.log('res____________', MODE, res)
        }
        ElMessage.error(res?.message || '')
        return Promise.reject(error.response)
      },
    )
  }

  //|| res.data.message.includes('token')

  // 定义请求方法

  public removeResponseInterceptors() {
    this.instance.interceptors.response.eject(this.resInterceptors)
  }

  public request(config: AxiosRequestConfig): Promise<AxiosResponse> {
    return this?.instance.request(config)
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

function tokenError() {
  // token 失效
  let systemConfig: any = window.sessionStorage.getItem('system-config')
  try {
    systemConfig = JSON.parse(systemConfig)
  } catch (error) {
    console.error('symtemconfig解析失败', error)
  }
  setTimeout(() => {
    window.location = systemConfig.portalDomain
    window.sessionStorage.clear()
  }, 1000)
}
