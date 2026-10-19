# Lucy 网站

线上地址：https://philixz.github.io/lucy-website/
仓库：https://github.com/philixz/lucy-website

此目录是网站的独立 Git 仓库，后续网页修改以此处为准。Lucy桌宠/landing 为之前的开发稿，不会自动同步到这里。

## 文件入口
- index.html：线上动效首页。
- motion.html：旧小样入口，保留兼容。
- motion.css、motion.js：首页样式与交互。
- original.html、style.css：原版对比页面。
- main.js、download-config.js：两版共用的网盘下载逻辑与公开链接配置。
- 图片/GIF 与页面同级，引用采用相对路径，兼容 GitHub Pages 子目录。

## 本地预览
在本目录打开终端，运行 `node scripts/preview.cjs`，浏览器打开 http://127.0.0.1:4174/ 。Ctrl+C 停止服务。

## 修改与上线
1. 修改前先运行 `git pull --ff-only`。如果已有未提交修改，先保存提交再拉取。
2. 修改 index.html 或对应样式、脚本、素材；用本地预览检查。
3. 执行 `git diff`、`git status`，确认仅提交打算公开的文件。
4. `git add 文件名`，再执行 `git commit -m "说明本次修改"`。
5. `git push`，等待 GitHub Actions 的 pages build and deployment 变绿。
6. 打开线上网址检查；必要时 Ctrl+F5 刷新缓存。

提交使用本机已有 Git 身份；本项目尚未设置个人身份时，请运行 `git config user.name "你的名字"` 和 `git config user.email "你的GitHub提交邮箱"`（仅对此仓库生效）。

首次推送可能要求 Git Credential Manager 登录。请在其官方 GitHub 登录流程自行完成；不要把 Token 或密码粘贴到聊天、源码或配置文件。

只改下载地址：编辑 download-config.js 中 url，填写 HTTPS 网盘公开分享链接；extractionCode 为可选公开提取码。
不要提交安装包、API Key、登录凭据、用户数据。网站无需打包或构建，推送 main 后 Pages 自动部署，网址不变。

## 部署手册
完整首次上线、日常更新、排错和回滚流程见 [GitHub Pages 部署与更新手册](docs/GitHub-Pages部署与更新手册.md)。
