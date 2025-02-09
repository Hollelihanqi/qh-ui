import { existsSync } from 'fs';
import { writeFile, mkdir } from 'fs/promises';
import { resolve } from 'path';
import { findWorkspacePackages } from '@pnpm/find-workspace-packages';

const writeJson = (path, data, spaces = 0) => writeFile(path, JSON.stringify(data, void 0, spaces), "utf-8");
const ensureDir = async (path) => {
  if (!existsSync(path))
    await mkdir(path, { recursive: true });
};

const projRoot = resolve(__dirname, "..", "..", "..");
const pkgRoot = resolve(projRoot, "packages");
const ytoCustomRoot = resolve(pkgRoot, "yto-custom");
const compRoot = resolve(pkgRoot, "components");
const themeRoot = resolve(pkgRoot, "theme-chalk");
const hookRoot = resolve(pkgRoot, "hooks");
const directiveRoot = resolve(pkgRoot, "directives");
const utilRoot = resolve(pkgRoot, "utils");
const buildRoot = resolve(projRoot, "internal", "build");
const docsDirName = "docs";
const docRoot = resolve(projRoot, docsDirName);
const vpRoot = resolve(docRoot, ".vitepress");
const buildOutput = resolve(projRoot, "dist");
const ytoOutput = resolve(buildOutput, "yto-custom");
const projPackage = resolve(projRoot, "package.json");
const compPackage = resolve(compRoot, "package.json");
const themePackage = resolve(themeRoot, "package.json");
const hookPackage = resolve(hookRoot, "package.json");
const directivePackage = resolve(directiveRoot, "package.json");
const utilPackage = resolve(utilRoot, "package.json");
const ytoPackage = resolve(ytoCustomRoot, "package.json");
const docPackage = resolve(docRoot, "package.json");

const getWorkspacePackages = () => findWorkspacePackages(projRoot);
const getWorkspaceNames = async (dir = projRoot) => {
  const pkgs = await findWorkspacePackages(projRoot);
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

export { buildOutput, buildRoot, compPackage, compRoot, directivePackage, directiveRoot, docPackage, docRoot, docsDirName, ensureDir, excludeFiles, getPackageDependencies, getPackageManifest, getWorkspaceNames, getWorkspacePackages, hookPackage, hookRoot, pkgRoot, projPackage, projRoot, themePackage, themeRoot, utilPackage, utilRoot, vpRoot, writeJson, ytoCustomRoot, ytoOutput, ytoPackage };
