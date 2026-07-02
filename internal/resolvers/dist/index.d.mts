interface HdCustomResolverOptions {
    /**
     * 是否自动导入组件样式文件。
     *
     * 样式入口是每个组件的 es/components/<name>/style/index.mjs，它内部 import 自身
     * 与依赖组件的 theme-chalk css。同一 css 被多个组件引用时由打包器按模块路径去重，
     * 因此 resolver 无需维护任何组件依赖表。
     *
     * @default true
     */
    importStyle?: boolean;
}
declare const HdCustomResolver: (options?: HdCustomResolverOptions) => {
    type: "component";
    resolve: (name: string) => {
        name: string;
        from: string;
        sideEffects: string[] | undefined;
    } | undefined;
};

export { HdCustomResolver };
export type { HdCustomResolverOptions };
