const PKG_PREFIX = "@hd-custom";
const PKG_NAME = "@hd/custom";
const PKG_CAMELCASE_NAME = "HdCustom";
const PKG_BRAND_NAME = "Hd Custom";
const COMPONENT_EXPORT_PREFIX = "Hd";
const COMPONENT_STYLE_PREFIX = "hd";
function toPascalCase(name) {
  return name.split("-").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join("");
}
function toCamelCase(name) {
  const pascalName = toPascalCase(name);
  return pascalName.charAt(0).toLowerCase() + pascalName.slice(1);
}
function getComponentExportName(componentName) {
  return `${COMPONENT_EXPORT_PREFIX}${toPascalCase(componentName)}`;
}
function getComponentStyleName(componentName) {
  return `${COMPONENT_STYLE_PREFIX}-${componentName}`;
}

const REPO_OWNER = "hd-custom";
const REPO_NAME = "hd-custom";
const REPO_PATH = `${REPO_OWNER}/${REPO_NAME}`;
const REPO_BRANCH = "dev";

export { COMPONENT_EXPORT_PREFIX, COMPONENT_STYLE_PREFIX, PKG_BRAND_NAME, PKG_CAMELCASE_NAME, PKG_NAME, PKG_PREFIX, REPO_BRANCH, REPO_NAME, REPO_OWNER, REPO_PATH, getComponentExportName, getComponentStyleName, toCamelCase, toPascalCase };
