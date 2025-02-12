import * as _pnpm_find_workspace_packages from '@pnpm/find-workspace-packages';
import { ProjectManifest } from '@pnpm/types';

declare const writeJson: (path: string, data: any, spaces?: number) => Promise<void>;
declare const ensureDir: (path: string) => Promise<void>;

declare function errorAndExit(err: Error): never;

declare const projRoot: string;
declare const pkgRoot: string;
declare const ytoCustomRoot: string;
declare const compRoot: string;
declare const themeRoot: string;
declare const hookRoot: string;
declare const directiveRoot: string;
declare const utilRoot: string;
declare const buildRoot: string;
declare const docsDirName = "docs";
declare const docRoot: string;
declare const vpRoot: string;
/** `/dist` */
declare const buildOutput: string;
/** `/dist/yto-custom` */
declare const ytoOutput: string;
declare const projPackage: string;
declare const compPackage: string;
declare const themePackage: string;
declare const hookPackage: string;
declare const directivePackage: string;
declare const utilPackage: string;
declare const ytoPackage: string;
declare const docPackage: string;

declare const getWorkspacePackages: () => Promise<_pnpm_find_workspace_packages.Project[]>;
declare const getWorkspaceNames: (dir?: string) => Promise<string[]>;
declare const getPackageManifest: (pkgPath: string) => ProjectManifest;
declare const getPackageDependencies: (pkgPath: string) => Record<"dependencies" | "peerDependencies", string[]>;
declare const excludeFiles: (files: string[]) => string[];

export { buildOutput, buildRoot, compPackage, compRoot, directivePackage, directiveRoot, docPackage, docRoot, docsDirName, ensureDir, errorAndExit, excludeFiles, getPackageDependencies, getPackageManifest, getWorkspaceNames, getWorkspacePackages, hookPackage, hookRoot, pkgRoot, projPackage, projRoot, themePackage, themeRoot, utilPackage, utilRoot, vpRoot, writeJson, ytoCustomRoot, ytoOutput, ytoPackage };
