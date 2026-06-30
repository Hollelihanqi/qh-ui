#!/usr/bin/env node
import { spawn } from 'node:child_process'
import { readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

/**
 * 打 release tag 脚本。
 *
 * 执行流程：
 * 1. 读取 `packages/hd-custom/package.json` 的当前版本号。
 * 2. 按 nx.json 的 `releaseTagPattern: "v{version}"` 生成 tag 名（如 `v2.0.0`）。
 * 3. 创建本地附注 tag（不 push，push 交给 `push-tags`）。
 *
 * 使用场景：
 * - 在 `release:ui` 流程里、`commit-version` 之后执行，作为 git 操作的唯一打 tag 入口。
 *
 * 风险提示：
 * - 如果同名 tag 已存在，说明该版本可能已发布过，脚本会直接报错退出，避免覆盖。
 */
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const projRoot = resolve(__dirname, '..')

/**
 * 执行外部命令，并把命令输出直接透传到当前终端。
 *
 * @param command 命令名称，例如 `git`
 * @param args 命令参数，使用数组可以减少跨平台 shell 转义问题
 * @param cwd 命令执行目录，默认是项目根目录
 */
function run(command: string, args: string[], cwd = projRoot) {
  return new Promise<void>((resolveCommand, rejectCommand) => {
    const child = spawn(command, args, {
      cwd,
      // Windows 下部分命令是 shim 文件，需要 shell 才能正常解析。
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

/**
 * 判断本地是否已存在指定 tag。
 *
 * @param tag tag 名称
 */
function tagExists(tag: string) {
  return new Promise<boolean>((resolveCheck, rejectCheck) => {
    // `git tag --list <tag>` 命中时输出 tag 名，未命中时输出为空。
    const child = spawn('git', ['tag', '--list', tag], {
      cwd: projRoot,
      shell: process.platform === 'win32',
    })

    let output = ''
    child.stdout?.on('data', (chunk) => {
      output += String(chunk)
    })
    child.on('error', rejectCheck)
    child.on('close', () => resolveCheck(output.trim() === tag))
  })
}

async function main() {
  const pkgPath = resolve(projRoot, 'packages/hd-custom/package.json')
  const { version } = JSON.parse(readFileSync(pkgPath, 'utf-8')) as { version?: string }

  if (!version) {
    throw new Error(`未能从 ${pkgPath} 读取到 version 字段`)
  }

  // 与 nx.json 的 releaseTagPattern: "v{version}" 保持一致。
  const tag = `v${version}`

  if (await tagExists(tag)) {
    throw new Error(`tag ${tag} 已存在，请确认该版本是否已发布；如需重打请先手动删除该 tag`)
  }

  await run('git', ['tag', '-a', tag, '-m', `chore(release): ${tag}`])
  console.log(`已创建 tag ${tag}`)
}

try {
  await main()
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error))
  process.exitCode = 1
}
