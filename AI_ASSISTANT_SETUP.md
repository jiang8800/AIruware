# AI 助教页面设置指南

## 📝 配置步骤

### 1. 获取 OpenAI API Key

1. 访问 [OpenAI Platform](https://platform.openai.com/api-keys)
2. 登录您的 OpenAI 账户
3. 点击 "Create new secret key"
4. 复制生成的 API key

### 2. 配置环境变量

1. 在项目根目录创建 `.env.local` 文件
2. 添加以下内容：

```
OPENAI_API_KEY=your_actual_api_key_here
```

3. 将 `your_actual_api_key_here` 替换为您的实际 API key

### 3. 安装依赖

运行以下命令安装 OpenAI SDK：

```bash
npm install
```

### 4. 启动开发服务器

```bash
npm run dev
```

### 5. 访问 AI 助教页面

打开浏览器访问：`http://localhost:3000/assistant`

## 🔒 安全提示

- **不要**将 `.env.local` 文件提交到 Git 仓库
- `.env.local` 已经在 `.gitignore` 中被忽略
- 如果需要分享配置示例，使用 `.env.local.example` 文件

## 🎯 功能说明

AI 助教可以帮助学生：

1. **优化英文表达** - 提供更地道、更自然的英文句子
2. **详细解释** - 用中文解释为什么改进后的表达更好
3. **语法要点** - 指出需要注意的语法知识点
4. **词汇建议** - 提供更好的词汇选择建议

## 📊 API 使用说明

### 请求格式

```json
POST /api/assistant
{
  "sentence": "Your English sentence here"
}
```

### 响应格式

```json
{
  "improvedSentence": "Improved version of the sentence",
  "explanation": "中文解释",
  "grammarPoints": ["语法要点1", "语法要点2"],
  "vocabularyTips": ["词汇建议1", "词汇建议2"]
}
```

## 💰 费用说明

- OpenAI API 按使用量计费
- GPT-4 模型的费用相对较高
- 建议在 OpenAI 控制台设置使用限额
- 可以考虑使用 GPT-3.5-turbo 降低成本（需修改 `app/api/assistant/route.ts` 中的 model 参数）

## 🔧 故障排除

### API Key 未配置

如果看到错误："API key not configured"

- 检查 `.env.local` 文件是否存在
- 确认 `OPENAI_API_KEY` 变量名拼写正确
- 重启开发服务器

### API 调用失败

- 检查 API key 是否有效
- 确认 OpenAI 账户有足够的余额
- 查看浏览器控制台和终端的错误信息

## 📚 更多资源

- [OpenAI API 文档](https://platform.openai.com/docs)
- [OpenAI Node.js SDK](https://github.com/openai/openai-node)
- [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
