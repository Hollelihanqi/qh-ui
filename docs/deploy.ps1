# 一键部署 docs（VitePress 静态站点）到内部服务器，用 nginx 容器托管
# 用法：在仓库根目录执行  pnpm docs:deploy
# 改服务器/用户/目录/端口只动下面几行即可
#
# 流程：docs:build -> 暂存 dist + nginx.conf + docker-compose.yml -> tar 打包
#       -> ssh 清空远端目录 -> scp 上传 -> ssh 解压并 docker compose up -d
# 输出文案用英文，避免 PowerShell 控制台中文乱码。

$ErrorActionPreference = 'Stop'

$Server    = 'root@10.0.157.73'           # 部署目标：SSH 用户@IP（与 E:\devops\deploy.ps1 一致）
$RemoteDir = '/opt/docs/hd-ui'            # 服务器上放 docs 的目录（按需修改）

Write-Host '==> 1/5 build docs...' -ForegroundColor Cyan
$repoRoot = Split-Path -Parent $PSScriptRoot
Push-Location $repoRoot
try {
  pnpm docs:build
  if ($LASTEXITCODE -ne 0) { throw 'pnpm docs:build failed' }

  $distDir = 'docs/.vitepress/dist'
  if (-not (Test-Path $distDir)) { throw "build output not found: $distDir" }

  Write-Host '==> 2/5 stage dist + nginx config...' -ForegroundColor Cyan
  # 暂存目录：dist 产物 + nginx.conf + docker-compose.yml 放一起，一次性打包上传
  # 用仓库本地的 .deploy-stage，避免依赖 $env:TEMP（某些 pnpm 派生进程下为空）
  $stage = Join-Path $repoRoot '.deploy-stage'
  if (Test-Path $stage) { Remove-Item $stage -Recurse -Force }
  New-Item -ItemType Directory -Path $stage -Force | Out-Null
  Copy-Item -Path "$distDir\*" -Destination $stage -Recurse -Force
  Copy-Item -Path "$PSScriptRoot\nginx.conf", "$PSScriptRoot\docker-compose.yml" -Destination $stage -Force

  $pkg = 'docs-deploy.tgz'
  tar czf $pkg -C $stage .
  if ($LASTEXITCODE -ne 0) { throw 'tar pack failed' }
  Remove-Item $stage -Recurse -Force -ErrorAction SilentlyContinue

  Write-Host '==> 3/5 upload to server (enter server password if prompted)...' -ForegroundColor Cyan
  # 清空远端目录内容（保留目录本身，nginx 容器的 bind mount 仍指向它），目录不存在则创建
  ssh -o StrictHostKeyChecking=accept-new $Server "mkdir -p $RemoteDir && find $RemoteDir -mindepth 1 -delete"
  if ($LASTEXITCODE -ne 0) { throw 'remote dir cleanup failed' }
  scp -o StrictHostKeyChecking=accept-new $pkg "${Server}:${RemoteDir}/"
  if ($LASTEXITCODE -ne 0) { throw 'scp upload failed' }

  Write-Host '==> 4/5 extract on server...' -ForegroundColor Cyan
  ssh $Server "cd $RemoteDir && tar xzf $pkg && rm -f $pkg"
  if ($LASTEXITCODE -ne 0) { throw 'remote extract failed' }

  Write-Host '==> 5/5 start nginx container (first run pulls image)...' -ForegroundColor Cyan
  # docker compose up -d：首次拉 nginx:alpine 镜像并起容器；后续幂等，内容更新靠 bind mount 实时生效
  ssh $Server "cd $RemoteDir && docker compose up -d"
  if ($LASTEXITCODE -ne 0) { throw 'docker compose up failed' }

  Remove-Item $pkg -ErrorAction SilentlyContinue
} finally {
  Pop-Location
}

Write-Host "==> done. docs served at http://10.0.157.73:8081 (dir: ${Server}:${RemoteDir})" -ForegroundColor Green
