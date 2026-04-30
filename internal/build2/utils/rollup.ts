import { hdPackage, getPackageDependencies } from '@hd-custom/build-utils'

type OutputOptions = Record<string, unknown>
type RollupBuild = {
  write: (option: OutputOptions) => Promise<unknown>
}

export const generateExternal = async (options: { full: boolean }) => {
  const { dependencies, peerDependencies } = getPackageDependencies(hdPackage)

  return (id: string) => {
    const packages: string[] = [...peerDependencies, 'vue', 'vue-router', '@vueuse/core']
    if (!options.full) {
      packages.push('@vue', ...dependencies)
    }
    return [...new Set(packages)].some((pkg) => id === pkg || id.startsWith(`${pkg}/`))
  }
}

export function writeBundles(bundle: RollupBuild, options: OutputOptions[]) {
  return Promise.all(options.map((option) => bundle.write(option)))
}

export function formatBundleFilename(name: string, minify: boolean, ext: string) {
  return `${name}${minify ? '.min' : ''}.${ext}`
}
