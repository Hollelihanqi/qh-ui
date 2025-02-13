interface RequestConfig {
  baseURL: string
  url: string
  method: string
  params?: any
  headers?: any
}

interface RequestResponse {
  results: Array<{
    userName: string
    userCode: string
    deptName: string
    jobName: string
  }>
}

// 模拟请求数据
const mockData = [
  {
    userName: '张三',
    userCode: '001',
    deptName: '技术部',
    jobName: '前端开发',
  },
  {
    userName: '李四',
    userCode: '002',
    deptName: '产品部',
    jobName: '产品经理',
  },
]

export const request = {
  request: (config: RequestConfig): Promise<RequestResponse> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // 模拟根据关键词过滤数据
        const filteredResults = mockData.filter(
          (item) => item.userName.includes(config.params.keyword) || item.userCode.includes(config.params.keyword),
        )
        resolve({ results: filteredResults })
      }, 300)
    })
  },
}
