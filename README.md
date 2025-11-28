# AI时代汝瓷英语 - 智能英语学习平台

一个基于 Next.js 15 和 TailwindCSS 构建的现代化英语学习平台，结合 AI 技术提供个性化学习体验。

## 🌟 功能特性

- **首页** - 精美的渐变设计，展示平台特色和学习统计
- **课程目录** - 可筛选的课程列表，支持按分类和难度筛选
- **课程详情** - 详细的课程信息、学习目标和课时列表
- **词汇库** - 强大的词汇搜索和筛选功能，配有音标和例句
- **互动练习** - 多种练习类型，实时反馈和进度跟踪

## 🛠️ 技术栈

- **框架**: Next.js 15 (App Router)
- **语言**: TypeScript
- **样式**: TailwindCSS 3.4
- **字体**: Google Fonts (Inter)

## 📦 安装步骤

### 前置要求

确保您的系统已安装：
- Node.js 18.0 或更高版本
- npm 或 yarn 包管理器

### 安装依赖

```bash
# 使用 npm
npm install

# 或使用 yarn
yarn install

# 或使用 pnpm
pnpm install
```

## 🚀 运行项目

### 开发模式

```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看应用。

### 生产构建

```bash
# 构建项目
npm run build

# 启动生产服务器
npm start
```

## 📁 项目结构

```
AI_RuWare_English_Site/
├── app/                      # Next.js App Router 页面
│   ├── courses/             # 课程相关页面
│   │   ├── [id]/           # 动态课程详情页
│   │   └── page.tsx        # 课程目录页
│   ├── vocabulary/          # 词汇库页面
│   │   └── page.tsx
│   ├── practice/            # 互动练习页面
│   │   └── page.tsx
│   ├── layout.tsx           # 根布局
│   ├── page.tsx             # 首页
│   └── globals.css          # 全局样式
├── components/              # 可复用组件
│   ├── Header.tsx           # 导航头部
│   ├── Footer.tsx           # 页脚
│   ├── CourseCard.tsx       # 课程卡片
│   └── VocabularyCard.tsx   # 词汇卡片
├── public/                  # 静态资源
├── next.config.js           # Next.js 配置
├── tailwind.config.js       # TailwindCSS 配置
├── tsconfig.json            # TypeScript 配置
└── package.json             # 项目依赖
```

## 🎨 设计特色

- **渐变配色** - 使用现代化的渐变色彩方案
- **响应式设计** - 完美适配桌面端和移动端
- **流畅动画** - 精心设计的过渡效果和悬停动画
- **教育主题** - 简洁清晰的界面，专注学习体验

## 🔧 自定义配置

### 修改主题色

编辑 `tailwind.config.js` 中的 `theme.extend.colors` 部分：

```javascript
colors: {
  primary: {
    // 自定义主色调
  },
  secondary: {
    // 自定义辅助色
  },
}
```

### 添加新页面

在 `app/` 目录下创建新文件夹和 `page.tsx` 文件即可自动生成路由。

## 📝 待办事项

- [ ] 集成真实的 API 数据
- [ ] 添加用户认证系统
- [ ] 实现学习进度持久化
- [ ] 添加更多练习类型
- [ ] 集成语音识别功能
- [ ] 添加社区讨论功能

## 📄 许可证

本项目仅供学习和演示使用。

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📧 联系方式

如有问题或建议，请通过以下方式联系：
- 邮箱: support@airuware.com
- 网站: https://airuware.com

---

**注意**: 本项目目前使用模拟数据。在生产环境中，需要连接真实的后端 API。
