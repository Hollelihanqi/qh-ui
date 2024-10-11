/*
 * @Author: DESKTOP-7338OS6\LHQ LHQ
 * @Date: 2024-07-16 10:57:37
 * @LastEditors: DESKTOP-7338OS6\LHQ LHQ
 * @LastEditTime: 2024-07-18 10:01:20
 * @FilePath: \yto-engine\docs3\.vitepress\vitepress\utils\index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { endingSlashRE, isActive, isExternal, normalize } from "../../utils/vitepdistutils";

import type { Route } from "vitepress";

export * from "./colors";

export {
  isArray,
  isNullish,
  isExternal,
  isActive,
  normalize,
  joinUrl,
  ensureEndingSlash,
  ensureStartingSlash,
  removeExtention,
} from "../../utils/vitepdistutils";

export function utoa(data: string): string {
  return btoa(unescape(encodeURIComponent(data)));
}

export const throttleAndDebounce = (fn: () => any, delay: number) => {
  let timeout: ReturnType<typeof setTimeout>;
  let called = false;
  return () => {
    if (timeout) {
      clearTimeout(timeout);
    }
    if (!called) {
      fn();
      called = true;
      setTimeout(() => {
        called = false;
      }, delay);
    } else {
      timeout = setTimeout(fn, delay);
    }
  };
};

// When match === true, meaning `path` is a string for build regex
export const isActiveLink = (route: Route, pathPattern: string, match?: boolean) => {
  if (!match) return isActive(route, pathPattern);
  const regex = new RegExp(pathPattern);

  return regex.test(normalize(`/${route.data.relativePath}`));
};

export function createGitHubUrl(
  docsRepo: string,
  docsDir: string,
  docsBranch: string,
  path: string,
  folder = "examples/",
  ext = ".vue"
) {
  const base = isExternal(docsRepo) ? docsRepo : `https://github.com/${docsRepo}`;
  return `${base.replace(endingSlashRE, "")}/edit/${docsBranch}/${
    docsDir ? `${docsDir.replace(endingSlashRE, "")}/` : ""
  }${folder || ""}${path}${ext || ""}`;
}

export function createCrowdinUrl(targetLang: string) {
  let translateLang = "";
  // for zh-CN zh-HK zh-TW, maybe later we will have cases like Chinese lang
  // for now we just keep it as simple as possible.
  if (targetLang.startsWith("zh-")) {
    translateLang = targetLang.split("-").join("").toLocaleLowerCase();
  } else {
    translateLang = targetLang.split("-").shift()!.toLocaleLowerCase();
  }
  return `https://crowdin.com/translate/element-plus/all/en-${translateLang}`;
}
