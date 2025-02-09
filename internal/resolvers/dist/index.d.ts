interface YtoCustomResolverOptions {
    /**
     * 是否导入样式文件
     * @default true
     */
    importStyle?: boolean;
}
declare const YtoCustomResolver: (options?: YtoCustomResolverOptions) => {
    type: "component";
    resolve: (name: string) => {
        name: string;
        from: string;
        sideEffects: string[];
    };
};

export { YtoCustomResolver, type YtoCustomResolverOptions };
