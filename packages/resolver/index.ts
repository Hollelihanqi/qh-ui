export const resolveComponent = () => {
  return {
    type: 'component',
    resolve: (name) => {
      if (name.startsWith('Yto')) {
        const componentName = name.slice(3) // 去除 'Yto' 前缀
        const jsname = componentName.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
        return {
          name: name,
          from: `@yto/custom/es/${jsname}.js`,
        }
      }
    },
  }
}
