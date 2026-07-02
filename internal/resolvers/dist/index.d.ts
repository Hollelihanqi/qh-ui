/**
 * 组件解析器。
 *
 * 组件 JS 入口（es/components/<name>/index.mjs）自身已 import 它的样式索引
 * （style/index.mjs，含传递依赖的 theme-chalk css），所以这里只返回 from、
 * 不再单独声明样式 sideEffects。样式随组件 JS 一起加载，css 按模块路径去重。
 */
declare const HdCustomResolver: () => {
    type: "component";
    resolve: (name: string) => {
        name: string;
        from: string;
    } | undefined;
};
/**
 * dev 预构建插件（可选）。
 *
 * hd-ui 组件都是 node_modules 里的 .mjs，dev 下首次用到会被 vite 按需预构建并 reload。
 * 路由懒加载 + 每个新页面用到新组件 → 切菜单时反复 reload。
 * 在 vite plugins 里加一行 hdUiDevPlugin()，启动时把所有组件入口一次性预构建，
 * 即可杜绝运行时补构建造成的 reload。生产构建不受影响。
 *
 * 用法：
 *   import { HdCustomResolver, hdUiDevPlugin } from '@rdeam/hd-ui/resolvers'
 *   plugins: [Components({ resolvers: [HdCustomResolver()] }), hdUiDevPlugin()]
 */
declare function hdUiDevPlugin(): {
    name: string;
    config(config: any): void;
};

export { HdCustomResolver, hdUiDevPlugin };
