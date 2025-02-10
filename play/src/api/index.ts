import { RequestHttp } from './axios'

export const request = new RequestHttp()

export const mergeFile = (params = {}) => {
  return request.request({
    url: '/v2/mergeChunks',
    method: 'POST',
    data: params,
  })
}
