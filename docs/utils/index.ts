interface RequestConfig {
  baseURL?: string
  url: string
  method: string
  params?: Record<string, any>
  headers?: Record<string, any>
}

interface RequestResponse {
  results: any[]
}

class Request {
  request(config: RequestConfig): Promise<RequestResponse> {
    // 这里模拟一个请求
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          results: [
            {
              userName: '张三',
              userCode: '001',
              deptName: '技术部',
              jobName: '工程师',
            },
            {
              userName: '李四',
              userCode: '002',
              deptName: '产品部',
              jobName: '产品经理',
            },
          ],
        })
      }, 300)
    })
  }
}

export const request = new Request()
