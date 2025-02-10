export function showToast(message: string): void {
  const toast = document.createElement('div')
  toast.className = 'toast'
  toast.innerText = message

  // 添加样式
  toast.style.cssText = `
    position: fixed;
    top: 16px;
    left: 50%;
    transform: translateX(-50%);
    background-color: #fff2f0;
    border: 1px solid #ffccc7;
    padding: 0 16px;
    height: 40px;
    line-height: 40px;
    border-radius: 4px;
    color: #fe4d50;
    font-size: 14px;
    z-index: 9999;
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
  `

  document.body.appendChild(toast)

  // 显示动画
  setTimeout(() => {
    toast.style.opacity = '1'
  }, 10)

  // 隐藏并移除
  setTimeout(() => {
    toast.style.opacity = '0'
    setTimeout(() => {
      toast.remove()
    }, 400)
  }, 3000)
}
