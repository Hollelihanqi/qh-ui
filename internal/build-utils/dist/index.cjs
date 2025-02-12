'use strict';

const fs = require('fs');
const promises = require('fs/promises');
const node_process = require('node:process');
const consola = require('consola');
const path = require('path');
const findWorkspacePackages = require('@pnpm/find-workspace-packages');

const writeJson = (path, data, spaces = 0) => promises.writeFile(path, JSON.stringify(data, void 0, spaces), "utf-8");
const ensureDir = async (path) => {
  if (!fs.existsSync(path)) await promises.mkdir(path, { recursive: true });
};

function errorAndExit(err) {
  consola.consola.error(err);
  node_process.exit(1);
}

const projRoot = path.resolve(__dirname, "..", "..", "..");
const pkgRoot = path.resolve(projRoot, "packages");
const ytoCustomRoot = path.resolve(pkgRoot, "yto-custom");
const compRoot = path.resolve(pkgRoot, "components");
const themeRoot = path.resolve(pkgRoot, "theme-chalk");
const hookRoot = path.resolve(pkgRoot, "hooks");
const directiveRoot = path.resolve(pkgRoot, "directives");
const utilRoot = path.resolve(pkgRoot, "utils");
const buildRoot = path.resolve(projRoot, "internal", "build");
const docsDirName = "docs";
const docRoot = path.resolve(projRoot, docsDirName);
const vpRoot = path.resolve(docRoot, ".vitepress");
const buildOutput = path.resolve(projRoot, "dist");
const ytoOutput = path.resolve(buildOutput, "yto-custom");
const projPackage = path.resolve(projRoot, "package.json");
const compPackage = path.resolve(compRoot, "package.json");
const themePackage = path.resolve(themeRoot, "package.json");
const hookPackage = path.resolve(hookRoot, "package.json");
const directivePackage = path.resolve(directiveRoot, "package.json");
const utilPackage = path.resolve(utilRoot, "package.json");
const ytoPackage = path.resolve(ytoCustomRoot, "package.json");
const docPackage = path.resolve(docRoot, "package.json");

const getWorkspacePackages = () => findWorkspacePackages.findWorkspacePackages(projRoot);
const getWorkspaceNames = async (dir = projRoot) => {
  const pkgs = await findWorkspacePackages.findWorkspacePackages(projRoot);
  return pkgs.filter((pkg) => pkg.dir.startsWith(dir)).map((pkg) => pkg.manifest.name).filter((name) => !!name);
};
const getPackageManifest = (pkgPath) => {
  return require(pkgPath);
};
const getPackageDependencies = (pkgPath) => {
  const manifest = getPackageManifest(pkgPath);
  const { dependencies = {}, peerDependencies = {} } = manifest;
  return {
    dependencies: Object.keys(dependencies),
    peerDependencies: Object.keys(peerDependencies)
  };
};
const excludeFiles = (files) => {
  const excludes = ["node_modules", "gulpfile", "dist"];
  return files.filter((path) => !excludes.some((exclude) => path.includes(exclude)));
};

exports.buildOutput = buildOutput;
exports.buildRoot = buildRoot;
exports.compPackage = compPackage;
exports.compRoot = compRoot;
exports.directivePackage = directivePackage;
exports.directiveRoot = directiveRoot;
exports.docPackage = docPackage;
exports.docRoot = docRoot;
exports.docsDirName = docsDirName;
exports.ensureDir = ensureDir;
exports.errorAndExit = errorAndExit;
exports.excludeFiles = excludeFiles;
exports.getPackageDependencies = getPackageDependencies;
exports.getPackageManifest = getPackageManifest;
exports.getWorkspaceNames = getWorkspaceNames;
exports.getWorkspacePackages = getWorkspacePackages;
exports.hookPackage = hookPackage;
exports.hookRoot = hookRoot;
exports.pkgRoot = pkgRoot;
exports.projPackage = projPackage;
exports.projRoot = projRoot;
exports.themePackage = themePackage;
exports.themeRoot = themeRoot;
exports.utilPackage = utilPackage;
exports.utilRoot = utilRoot;
exports.vpRoot = vpRoot;
exports.writeJson = writeJson;
exports.ytoCustomRoot = ytoCustomRoot;
exports.ytoOutput = ytoOutput;
exports.ytoPackage = ytoPackage;
