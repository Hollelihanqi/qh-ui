interface HdCustomResolverOptions {
    /**
     * 是否自动导入组件样式文件。
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
