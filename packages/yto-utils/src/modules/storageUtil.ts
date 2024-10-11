export class StorageUtil {
  private static storageType: 'local' | 'session' = 'session' // 默认使用 sessionStorage

  public static setDefaultType(type: 'local' | 'session') {
    StorageUtil.storageType = type
  }
  public static set(key: string, value: any, type?: 'local' | 'session') {
    const storage = type || StorageUtil.storageType === 'local' ? localStorage : sessionStorage
    storage.setItem(key, JSON.stringify(value))
  }

  public static get(key: string, type?: 'local' | 'session'): any {
    const storage = type || StorageUtil.storageType === 'local' ? localStorage : sessionStorage
    const item = storage.getItem(key)
    return item ? JSON.parse(item) : null
  }

  public static remove(key: string, type?: 'local' | 'session') {
    const storage = type || StorageUtil.storageType === 'local' ? localStorage : sessionStorage
    storage.removeItem(key)
  }

  public static clear(type?: 'local' | 'session') {
    const storage = type || StorageUtil.storageType === 'local' ? localStorage : sessionStorage
    storage.clear()
  }
}
