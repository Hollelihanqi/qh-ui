import { existsSync, readdirSync } from 'node:fs';
import path, { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const COMPONENT_EXPORT_PREFIX = "Hd";

const HdCustomResolver = () => {
  return {
    type: "component",
    resolve: (name) => {
      if (name.startsWith(COMPONENT_EXPORT_PREFIX)) {
        const componentName = name.slice(COMPONENT_EXPORT_PREFIX.length);
        const jsname = componentName.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
        return {
          name,
          from: `@rdeam/hd-ui/es/components/${jsname}/index.mjs`
        };
      }
    }
  };
};
function hdUiDevPlugin() {
  return {
    name: "hd-ui:optimize-deps",
    config(config) {
      const componentsDir = path.resolve(dirname(fileURLToPath(import.meta.url)), "..", "es", "components");
      if (!existsSync(componentsDir)) return;
      const entries = readdirSync(componentsDir, { withFileTypes: true }).filter((d) => d.isDirectory()).flatMap((d) => [
        `@rdeam/hd-ui/es/components/${d.name}/index.mjs`,
        `@rdeam/hd-ui/es/components/${d.name}/style/index.mjs`
      ]);
      config.optimizeDeps = config.optimizeDeps ?? {};
      config.optimizeDeps.include = [...config.optimizeDeps.include ?? [], ...entries];
    }
  };
}

export { HdCustomResolver, hdUiDevPlugin };
