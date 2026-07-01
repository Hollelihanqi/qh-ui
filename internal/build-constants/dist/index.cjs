'use strict';

const PKG_PREFIX = "@hd-custom";
const PKG_NAME = "@rdeam/hd-ui";
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

exports.COMPONENT_EXPORT_PREFIX = COMPONENT_EXPORT_PREFIX;
exports.COMPONENT_STYLE_PREFIX = COMPONENT_STYLE_PREFIX;
exports.PKG_BRAND_NAME = PKG_BRAND_NAME;
exports.PKG_CAMELCASE_NAME = PKG_CAMELCASE_NAME;
exports.PKG_NAME = PKG_NAME;
exports.PKG_PREFIX = PKG_PREFIX;
exports.REPO_BRANCH = REPO_BRANCH;
exports.REPO_NAME = REPO_NAME;
exports.REPO_OWNER = REPO_OWNER;
exports.REPO_PATH = REPO_PATH;
exports.getComponentExportName = getComponentExportName;
exports.getComponentStyleName = getComponentStyleName;
exports.toCamelCase = toCamelCase;
exports.toPascalCase = toPascalCase;
