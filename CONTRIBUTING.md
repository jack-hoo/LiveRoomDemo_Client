# 贡献指南

感谢你愿意为 LiveRoomDemo 出一份力。这是一个以学习和演示为目的的项目，
所以**可读性优先于炫技**，代码清楚好懂比少写两行更重要。

## 开始之前：Node 版本

本项目的构建链停留在 webpack 2 + node-sass 4.x，**只能用 Node 8 安装依赖**：

```bash
nvm install 8
nvm use 8
node -v        # v8.x.x
npm install
```

Node 9 及以上会在 `npm install` 阶段就失败（node-sass 没有对应的预编译二进制）。
背景和可选的现代化路线见 [README.zh-CN.md 的「环境要求」](README.zh-CN.md#环境要求)。

## 提 Issue

提问题前请先搜一下已有的 Issue，避免重复。

**报 Bug** 请提供：

- 复现步骤
- 期望的行为 vs 实际的行为
- 环境：Node 版本、npm 版本、浏览器及版本、操作系统
- 浏览器控制台的报错信息
- 服务端是否正常运行、服务端版本

> 聊天室连不上、接口 404 这类问题，请先确认服务端已启动，
> 且服务端的 `CORS_ALLOWED_ORIGINS` 包含了你访问的地址。

**提需求**请说明你想解决的问题，而不只是你想要的方案。

## 提 Pull Request

```bash
# 1. Fork 后 clone 你的仓库
git clone https://github.com/你的用户名/LiveRoomDemo_Client.git
cd LiveRoomDemo_Client

# 2. 开一个分支
git checkout -b fix/chatroom-invoke-id

# 3. 改代码并验证
nvm use 8
npm install
npm run dev      # 本地确认效果
npm run build    # 确认生产构建不报错

# 4. 提交并推送
git commit -m "fix: 聊天室 invokeId 计数器未初始化导致始终为 NaN"
git push origin fix/chatroom-invoke-id
```

### 代码规范

- 缩进 2 空格，不用 Tab（`.editorconfig` 里已有约定）
- 文件编码 UTF-8，换行符 LF
- 组件文件名保持与现有风格一致
- **注释写「为什么」，不写「是什么」**
- 不要提交注释掉的死代码，Git 会记住它
- **不要把地址写死在组件里**。接口前缀、直播源、推流地址等一律放进
  `config/prod.env.js`，通过 `src/config/index.js` 读取
- 新增配置项请同步更新 [README.zh-CN.md 的「配置」](README.zh-CN.md#配置)

### 关于工具链版本

本项目**刻意保持 webpack 2 + Vue 2 不动**，以保留项目原貌。
迁移到 Vite / Vue 3 的 PR 请先开 Issue 讨论——那是一次大改，需要先对齐目标和范围。

修 Bug、补文档、改样式的 PR 随时欢迎。

### 提交信息

推荐 [Conventional Commits](https://www.conventionalcommits.org/) 风格：

```
fix: 修复 v-for 缺少 key 导致的列表复用问题
feat: 播放器支持配置封面图
docs: 补充 Node 8 的说明
style: 统一组件缩进
refactor: 把 tab 与路由的对应关系提取成常量表
chore: 更新 .gitignore
```

中英文都可以，说清楚做了什么就行。

### 验证

本项目没有自动化测试。提 PR 前请至少手工确认：

- [ ] `npm run build` 能跑通
- [ ] 开发模式下页面正常显示，控制台没有新增报错或 Vue 警告
- [ ] 聊天室能连上、能收发消息、弹幕能正常飘出
- [ ] 改动涉及的页面在手机尺寸下显示正常

## 行为准则

参与本项目即表示你同意遵守 [行为准则](CODE_OF_CONDUCT.md)。

## 安全问题

发现安全漏洞**请不要**公开提 Issue，请通过 GitHub 的
[私密安全公告](https://github.com/jack-hoo/LiveRoomDemo_Client/security/advisories/new)
反馈。

## 许可

提交代码即表示你同意以 [MIT 协议](LICENSE) 授权你的贡献。
