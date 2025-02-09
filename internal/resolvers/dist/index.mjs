function getSideEffects(componentName, importStyle) {
  if (!importStyle) return;
  return [
    `@yto/custom/theme-chalk/yto-${componentName}.css`
  ];
}
const YtoCustomResolver = (options = {}) => {
  const resolvedOptions = {
    importStyle: true,
    ...options
  };
  return {
    type: "component",
    resolve: (name) => {
      if (name.startsWith("Yto")) {
        const componentName = name.slice(3);
        const jsname = componentName.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
        return {
          name,
          from: `@yto/custom/es/components/${jsname}/index.mjs`,
          sideEffects: getSideEffects(jsname, resolvedOptions.importStyle)
        };
      }
    }
  };
};

export { YtoCustomResolver };
