const COMPONENT_EXPORT_PREFIX = "Hd";

function getSideEffects(componentName, importStyle) {
  if (!importStyle) return;
  return [`@rdeam/hd-ui/es/components/${componentName}/style/index.mjs`];
}
const HdCustomResolver = (options = {}) => {
  const resolvedOptions = {
    importStyle: true,
    ...options
  };
  return {
    type: "component",
    resolve: (name) => {
      if (name.startsWith(COMPONENT_EXPORT_PREFIX)) {
        const componentName = name.slice(COMPONENT_EXPORT_PREFIX.length);
        const jsname = componentName.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
        return {
          name,
          from: `@rdeam/hd-ui/es/components/${jsname}/index.mjs`,
          sideEffects: getSideEffects(jsname, resolvedOptions.importStyle)
        };
      }
    }
  };
};

export { HdCustomResolver };
