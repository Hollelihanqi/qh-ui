import fs from "fs";
import path from "path";
import glob from "fast-glob";
import { docRoot, docsDirName, projRoot } from "@yto-custom/build-utils";
// import { REPO_BRANCH, REPO_PATH } from "@yto-uplus/build-constants";
// import { getLang, languages } from "../utils/lang";
// import footerLocale from "../i18n/component/footer.json";

import type { Plugin } from "vite";

type Append = Record<"headers" | "footers" | "scriptSetups", string[]>;

let compPaths: string[];
// compPaths [ 'E:/HQ/element-plus/docs/en-US/component' ]
// pattern {en-US,en-US}/component
export function MarkdownTransform(): Plugin {
  return {
    name: "element-plus-md-transform",

    enforce: "pre",

    async buildStart() {
      const pattern = `components`;
      compPaths = await glob(pattern, {
        cwd: docRoot,
        absolute: true,
        onlyDirectories: true,
      });
    },

    async transform(code, id) {
      if (!id.endsWith(".md")) return;
      if (id.includes("docs3/index.md") || id.includes("docs3/home/index.md")) {
        return code
      }
      //E:/yto-engine/docs3/index.md
      const componentId = path.basename(id, ".md");
      let append: any = {
        headers: [],
        footers: [],
        scriptSetups: [],
      };
      if (!id.includes("docs3/index.md") && !id.includes("docs3/home/index.md")) {
        append = {
          headers: [],
          footers: [],
          // scriptSetups: [`const demos = import.meta.globEager('../../examples/${componentId}/*.vue')`],
          scriptSetups: [`const demos = import.meta.glob('../examples/${componentId}/*.vue',{ eager: true })`],
        };
        code = transformVpScriptSetup(code, append);
      }
      // const modules = import.meta.glob('../../examples/text-ellipsis/*.vue')
      // console.log("modules", modules)
      // console.log("compPathshas", id.startsWith(compPaths[0]));

      if (compPaths.some((compPath) => id.startsWith(compPath))) {
        code = transformComponentMarkdown(id, componentId, code, append);
      }

      // return combineMarkdown(code, [combineScriptSetup(append.scriptSetups), ...append.headers], append.footers);
      return combineMarkdown(code, [combineScriptSetup(append.scriptSetups)], append.footers);
    },
  };
}

const combineScriptSetup = (codes: string[]) =>
  `\n<script setup>
${codes.join("\n")}
</script>
`;

const combineMarkdown = (code: string, headers: string[], footers: string[]) => {
  const frontmatterEnds = code.indexOf("---\n\n");
  const firstHeader = code.search(/\n#{1,6}\s.+/);
  const sliceIndex = firstHeader < 0 ? (frontmatterEnds < 0 ? 0 : frontmatterEnds + 4) : firstHeader;

  if (headers.length > 0) code = code.slice(0, sliceIndex) + headers.join("\n") + code.slice(sliceIndex);
  code += footers.join("\n");

  return `${code}\n`;
};

const vpScriptSetupRE = /<vp-script\s(.*\s)?setup(\s.*)?>([\s\S]*)<\/vp-script>/;

const transformVpScriptSetup = (code: string, append: Append) => {
  const matches = code.match(vpScriptSetupRE);
  if (matches) code = code.replace(matches[0], "");
  const scriptSetup = matches?.[3] ?? "";
  if (scriptSetup) append.scriptSetups.push(scriptSetup);
  return code;
};

// const GITHUB_BLOB_URL = `https://github.com/${REPO_PATH}/blob/${REPO_BRANCH}`;
// const GITHUB_TREE_URL = `https://github.com/${REPO_PATH}/tree/${REPO_BRANCH}`;
const transformComponentMarkdown = (id: string, componentId: string, code: string, append: Append) => {
  // const lang = getLang(id);
  // const docUrl = `${GITHUB_BLOB_URL}/${docsDirName}/en-US/component/${componentId}.md`;
  // const componentUrl = `${GITHUB_TREE_URL}/packages/components/${componentId}`;
  const componentPath = path.resolve(projRoot, `packages/yto-custom/src/components/${componentId}`);

  const isComponent = fs.existsSync(componentPath);

  // const links = [[footerLocale[lang].docs, docUrl]];
  // if (isComponent) links.unshift([footerLocale[lang].component, componentUrl]);
  // const linksText = links
  //   .filter((i) => i)
  //   .map(([text, link]) => `[${text}](${link})`)
  //   .join(" • ");

  const sourceSection = `
## source

linksText`;

  //   const contributorsSection = `
  // ## contributors

  // <Contributors id="${componentId}" />`;

  // append.footers.push(sourceSection, isComponent ? contributorsSection : "");
  return code;
};
