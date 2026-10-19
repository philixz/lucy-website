# 静态网站部署到 GitHub Pages：可复用操作手册

适用：HTML、CSS、JavaScript、图片组成的静态网站。以 Lucy 动效小样为例，记录于 2026-10-19。带后端、数据库或框架构建的网站，需要另配构建和服务，不能直接套用全部步骤。

## 先分清三个东西

- Git：管理本地版本，commit 只保存到本机。
- GitHub 仓库：接收 push 后的文件与历史。
- GitHub Pages：把指定分支和目录发布成可浏览的网址。

流程：本地编辑 → 本地预览 → commit → push → Pages 构建部署 → 公网验收。仓库创建、浏览器登录、文件上传都不等于网页已上线。

## 本项目的固定配置

| 项目 | 值 |
| --- | --- |
| 网站 | https://philixz.github.io/lucy-website/ |
| 仓库 | https://github.com/philixz/lucy-website |
| 本地维护目录 | Lucy网站（独立 Git 仓库） |
| 发布分支与目录 | main / 根目录 |
| 默认首页 | index.html（动效小样） |
| 对比页面 | original.html |
| 兼容入口 | motion.html |
| 下载配置 | download-config.js |
| 本地预览 | node scripts/preview.cjs，访问 http://127.0.0.1:4174/ |

相邻的 Lucy桌宠/landing 是历史开发稿，不会自动同步到网站仓库。今后以 Lucy网站 为唯一网站维护源。index.html 与 motion.html 当前是两份页面，内容改动需同步检查。

## 首次上线：只需要做一次

### 准备文件

确认要展示的版本成为 index.html，且在发布根目录；其他文件按引用路径放置。不要只上传 ZIP，也不要让首页藏在多余的外层目录。

使用相对路径，例如 `motion.css`、`moon.gif`、`original.html`。项目网址含 /lucy-website/，以 `/` 开头的链接会跳到用户域名根目录，容易指向错误页面。文件名大小写也要完全一致。

只提交计划公开的网站文件。安装包可放网盘；账号、Key、Token、运行数据不进入仓库。前端 download-config.js 是公开配置，不是保密后端接口。

### 创建仓库并上传

GitHub 新建独立仓库。免费个人方案采用公开仓库发布 Pages。本次使用 lucy-website，不覆盖已有个人主页仓库。

首次可以选择 Add file → Upload files，将解压后的网站文件上传并提交。此次为方便浏览器批量上传，把资源放在根目录并同步修改了 HTML/CSS/JS 引用；这是本次操作选择，GitHub Pages 本身支持 assets 子目录，不要求展平。

如果以后使用 Git 推送，不必再通过网页上传。

### 开启 Pages

Settings → Pages → Build and deployment：

- Source：Deploy from a branch
- Branch：main
- Folder：/ (root)
- 点击 Save

进入 Actions，等待 pages build and deployment 的 build、deploy 成功，再打开 Pages 给出的实际网址。保存配置成功不等于部署完成。以后推送这个分支，会自动再次部署。

## 建立独立本地仓库

本项目已经完成，不要重复 init、clone 或重新绑定 remote。新电脑或其他项目可参考：

```powershell
git clone https://github.com/philixz/lucy-website.git Lucy网站
cd Lucy网站
git remote -v
git status --short --branch
```

clone 会保留线上历史并设置 origin；比在已有文件夹里重新 init 再强推更稳妥。

本机没有提交身份时，设置仅对当前仓库生效的身份：

```powershell
git config user.name "你的名字"
git config user.email "你的GitHub提交邮箱"
```

身份用于标注提交作者，不等于登录授权。浏览器已登录 GitHub，也不代表本机 Git 有推送权限。第一次 git push 如出现 Git Credential Manager 登录，用户在官方流程完成授权即可；不要把密码或 Token 放在远程 URL、聊天或源码中。

## 日常更新：每次照这个顺序

在 Lucy网站 目录执行，每条命令成功后再继续：

```powershell
git status --short --branch
git pull --ff-only
```

如果有未提交修改，先检查并保存自己的工作，不要直接覆盖；如果不能快进，先处理分支分歧。

修改文件后启动预览：

```powershell
node scripts/preview.cjs
```

检查完成后用 Ctrl+C 停止，再检查差异、提交需要的文件。例如只修改首页与样式：

```powershell
git diff
git add index.html motion.html motion.css
git diff --cached --stat
git commit -m "调整首页布局与按钮效果"
git push origin main
```

上面的 git add 文件名按实际改动替换；如果改了图片或其他脚本，一并明确加入。不要为了方便把未知文件全部提交。

### 发布验收

- Actions 最新工作流成功，且对应本次提交。
- 打开线上网址，标题和改动确实出现；必要时 Ctrl+F5。
- 图片、背景、GIF 无缺失；动作卡片与动效开关正常。
- 手机窄屏可读，按钮与导航能用。
- 下载未配置时显示待开放；配置后能打开正确网盘，提取码和分享有效期正确。

需要确认本地与远程一致时：

```powershell
git status --short --branch
git rev-parse HEAD
git ls-remote origin refs/heads/main
```

两边提交哈希相同表示代码已同步；Pages 是否发布成功还要看 Actions。网址无需重新申请。

## 修改网盘下载入口

编辑 download-config.js 的 url、label 和 extractionCode。url 为完整 HTTPS 公开分享链接，提取码没有则留空。未设置或不合法的链接会显示“下载待开放”。

我们使用普通新标签页跳转，不对网盘预发 HEAD 请求，避免跨域限制把可用链接误判为失败。修改后按上面的 commit、push 流程发布；不需要上传安装包到网站。

## 出错时怎么处理

| 现象 | 本次经验与处理 |
| --- | --- |
| 已 commit，网页没更新 | commit 还在本机；检查是否 push，以及 Pages 发布分支是否正确 |
| 浏览器登录了，push 仍要求登录 | 两套认证；完成 Git Credential Manager 的授权 |
| Windows schannel 握手失败 | 本次用 Git 自带 OpenSSL 后克隆成功；这是特定环境的解决办法，不保证适用于所有网络问题 |
| 文件已上传，但访问 404 | 检查 Pages 是否启用、Actions 是否完成，以及根目录是否有 index.html |
| 页面有文字但图片/样式不见 | 检查路径、大小写和子目录；不能混用原 assets 路径与本次展平后的文件 |
| 最新工作流成功但仍是旧页面 | 确认访问正确网址和提交；强制刷新后再判断缓存问题 |
| push 被拒绝 non-fast-forward | 先 fetch 检查他人修改，合并或变基后验证；不要直接 force push |
| 自动化无法识别 Edge 网址 | 本次停止了桌面操作，改用可识别网址的内置浏览器，并由用户完成登录 |

仅在出现同类 TLS 问题且当前 Git 支持 OpenSSL 时尝试：

```powershell
# 克隆前单次使用
git -c http.sslBackend=openssl clone https://github.com/philixz/lucy-website.git Lucy网站
# 已在仓库内时，仅修改该仓库设置
git config --local http.sslBackend openssl
```

不要关闭证书校验。网络、代理或认证问题应分别排查。

## 更新有问题，如何回滚

先确认工作区干净，找到需要撤销的普通提交：

```powershell
git log --oneline -8
# 把占位符换成已确认的坏提交哈希；此命令会创建一条撤销提交
git revert <坏提交哈希>
git push origin main
```

若冲突，不要盲目继续；可用 git revert --abort 取消本次撤销，再处理。合并提交或多个相互依赖的提交需单独判断，不能机械套用。避免 reset --hard 加 force push 改写已发布历史。回滚推送后同样等待 Pages 并做公网验收。

## 本次完成记录

- 首次浏览器上传提交：2a32030；Pages 工作流 39275965887 成功。
- 独立仓库维护说明与预览工具提交：82ca9a2；本机 Git 授权后推送成功，本地与远程哈希一致。
- 已验证：公网首页、角色及卡片图片、月球 GIF、动效开关。
- 尚未开放：安装包网盘链接。国内不同网络的访问体验仍需朋友反馈。

## 官方参考

- [Pages 发布源设置](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)
- [GitHub 认证方式](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/about-authentication-to-github)
