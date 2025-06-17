# Rizz Lines Generator

一个多语言情话生成器，支持多种语言和多种风格。

## 功能特点

- 支持6种不同风格的情话：
  - 最佳情话 (Best)
  - 经典情话 (Classic)
  - 圆滑情话 (Smooth)
  - 搞笑情话 (Funny)
  - 大胆情话 (Bold)
  - 现代情话 (Modern)

- 支持多种语言：
  - 英语 (English)
  - 中文 (Chinese)
  - 日语 (Japanese)
  - 韩语 (Korean)
  - 法语 (French)
  - 德语 (German)
  - 俄语 (Russian)
  - 西班牙语 (Spanish)
  - 葡萄牙语 (Portuguese)

## 工作原理

1. 首次加载：
   - 每个分类从预设的 `rizzlines.json` 数据库中随机选择一条对应语言的情话
   - 确保初始展示的内容符合所选语言

2. 生成新内容：
   - 点击"生成新的"按钮时，调用 API 生成新的情话
   - 新生成的内容会自动保存到数据库中
   - 支持多语言自动翻译

## 项目结构

```
├── components/
│   └── rizz_generator.tsx    # 主要组件
├── pages/
│   └── api/
│       └── rizzlines.js      # API 实现
├── public/
│   └── rizzlines.json        # 数据库文件
├── CURSORRULES.md           # 实现逻辑说明
└── README.md                # 项目说明
```

## 开发指南

1. 数据库结构 (`rizzlines.json`):
```json
{
  "Rizz pick-up lines": [
    {
      "en": "English version",
      "zh": "中文版本",
      "ja": "日本語版",
      // ... 其他语言
    }
  ]
}
```

2. API 使用:
```typescript
// 获取特定分类和语言的情话
GET /api/rizzlines?category=best&language=zh

// 生成新的情话
POST /api/generate?category=best&language=zh
```

## 注意事项

1. 初始加载时使用预设数据库中的内容
2. 新生成的内容会自动保存到数据库
3. 确保所有生成的内容都有对应的多语言翻译
4. 保持数据库文件格式的一致性

# SEO Optimization Guide for Rizz Lines Articles

## 1. 关键词布局
- 主关键词（如"rizz lines"）应出现在：
  - 页面<title>、meta description、og:title、og:description
  - H1主标题
  - H2/H3副标题（可用长尾词如best rizz lines, corny rizz lines等）
  - 正文首段和多处自然穿插
  - 图片alt属性
  - 内链锚文本

## 2. 结构化内容
- H1唯一且含主关键词
- H2/H3分组内容，包含长尾关键词
- 有目录（Contents）锚点跳转，提升用户体验和SEO
- 有相关内容推荐/内链
- 有图片，配alt文本，描述性强且含关键词

## 3. 其他SEO细节
- meta description简明扼要，含主关键词
- URL结构简洁、含关键词
- 内容丰富，正文自然穿插主关键词及变体
- 图片命名、alt文本要有描述性和关键词
- 适当加内链（如"Try our Rizz Line Generator"）

## 4. 文章页结构建议（Next.js/React）
- <title>、<meta>、<h1>、<h2>、正文、图片alt、内链都要出现"rizz lines"及其变体
- 图片命名、alt文本要有描述性和关键词
- 目录、锚点、分组内容提升可读性和SEO
- 适当加内链

## 5. 示例结构
- 头部SEO标签（title/meta/og/canonical）
- H1主标题
- 目录导航（Contents）
- H2分组（如What is Rizz?、Best Rizz Lines、How to Use Rizz Lines Effectively）
- 每段自然穿插rizz lines及长尾词
- 图片引用，alt含关键词
- 结尾加内链

## 6. 推荐实践
- 参考parade等高权重站点的SEO结构
- 保持页面唯一H1，合理分组H2/H3
- 让主关键词和长尾词自然分布在各级标题、正文、图片alt、meta、内链中
- 保持内容丰富、结构清晰、体验友好 