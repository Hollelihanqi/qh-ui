import * as _pnpm_find_workspace_packages from '@pnpm/find-workspace-packages';
import { ProjectManifest } from '@pnpm/types';

declare const writeJson: (path: string, data: any, spaces?: number) => any;
declare const ensureDir: (path: string) => Promise<void>;

declare function errorAndExit(err: Error): never;

declare const projRoot: any;
declare const pkgRoot: any;
declare const hdCustomRoot: any;
declare const compRoot: any;
declare const themeRoot: any;
declare const hookRoot: any;
declare const directiveRoot: any;
declare const utilRoot: any;
declare const buildRoot: any;
declare const docsDirName = "docs";
declare const docRoot: any;
declare const vpRoot: any;
/** `/dist` */
declare const buildOutput: any;
/** `/dist/hd-custom` */
declare const hdOutput: any;
declare const projPackage: any;
declare const compPackage: any;
declare const themePackage: any;
declare const hookPackage: any;
declare const directivePackage: any;
declare const utilPackage: any;
declare const hdPackage: any;
declare const docPackage: any;

declare const getWorkspacePackages: () => Promise<_pnpm_find_workspace_packages.Project[]>;
declare const getWorkspaceNames: (dir?: any) => Promise<string[]>;
declare const getPackageManifest: (pkgPath: string) => ProjectManifest;
declare const getPackageDependencies: (pkgPath: string) => Record<"dependencies" | "peerDependencies", string[]>;
declare const excludeFiles: (files: string[]) => string[];

export { buildOutput, buildRoot, compPackage, compRoot, directivePackage, directiveRoot, docPackage, docRoot, docsDirName, ensureDir, errorAndExit, excludeFiles, getPackageDependencies, getPackageManifest, getWorkspaceNames, getWorkspacePackages, hdCustomRoot, hdOutput, hdPackage, hookPackage, hookRoot, pkgRoot, projPackage, projRoot, themePackage, themeRoot, utilPackage, utilRoot, vpRoot, writeJson };
