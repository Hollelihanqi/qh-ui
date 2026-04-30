#!/usr/bin/env node
import { spawn } from 'node:child_process'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

/**
 * 发布脚本。
 *
 * 执行流程：
 * 1. 在项目根目录执行 `pnpm build`，生成 `dist/hd-custom`。
 * 2. 切换到 `dist/hd-custom` 目录执行 `npm publish`。
 *
 * 使用场景：
 * - 需要手动完成“构建 + 发布”时执行 `pnpm publish:dist`。
 *
 * 风险提示：
 * - 这个脚本会真实发布 npm 包。
 * - 执行前请确认版本号、npm 登录状态、registry 和 dist 产物都正确。
 */
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const projRoot = resolve(__dirname, '..')

/**
 * 执行外部命令，并把命令输出直接透传到当前终端。
 *
 * @param command 命令名称，例如 `pnpm`、`npm`
 * @param args 命令参数，使用数组可以减少跨平台 shell 转义问题
 * @param cwd 命令执行目录，默认是项目根目录
 */
function run(command: string, args: string[], cwd = projRoot) {
  return new Promise<void>((resolveCommand, rejectCommand) => {
    const child = spawn(command, args, {
      cwd,
      // Windows 下 pnpm/npm 是 shim 文件，需要 shell 才能正常解析。
      shell: process.platform === 'win32',
      stdio: 'inherit',
    })

    child.on('error', rejectCommand)
    child.on('close', (code) => {
      if (code === 0) {
        resolveCommand()
        return
      }

      rejectCommand(new Error(`${command} ${args.join(' ')} failed with exit code ${code}`))
    })
  })
}

async function main() {
  // 发布前强制重新构建，避免把过期 dist 发布出去。
  await run('pnpm', ['build'])

  // 必须在产物包目录发布，否则 npm 会尝试发布 monorepo 根目录。
  await run('npm', ['publish'], resolve(projRoot, 'dist/hd-custom'))
  console.log('发布完成')
}

try {
  await main()
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error))
  process.exitCode = 1
}
