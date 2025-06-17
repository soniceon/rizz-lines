# Cursor Rules - Rizz Lines Generator

## 数据流转逻辑

### 1. 首页展示逻辑
- 首页展示6个固定分类：
  - best (最佳)
  - classic (经典)
  - smooth (圆滑)
  - funny (搞笑)
  - bold (大胆)
  - modern (现代)
- 每个分类初始展示时，从 `rizzlines.json` 中随机抽取一条对应语言的内容
- 初始数据来源：`rizzlines.json` 文件

### 2. 内容生成逻辑
- 第一次展示：从 `rizzlines.json` 中随机获取
- 点击"生成新的"按钮：
  1. 调用 API 生成新的内容
  2. API 根据当前选择的分类和语言生成内容
  3. 生成的内容自动保存到 `rizzlines.json` 中对应分类和语言下
  4. 返回新生成的内容给前端展示

### 3. 数据存储结构
```json
{
  "Rizz pick-up lines": [
    {
      "en": "English content",
      "zh": "中文内容",
      "ja": "日本語の内容",
      // ... 其他语言
    }
  ]
}
```

## 实现检查清单

### 前端 (components/rizz_generator.tsx)
- [ ] 实现6个固定分类的展示
- [ ] 实现从 `rizzlines.json` 随机获取初始内容
- [ ] 实现语言切换功能
- [ ] 实现"生成新的"按钮功能

### API (pages/api/rizzlines.js)
- [ ] 实现从 `rizzlines.json` 读取数据
- [ ] 实现按分类和语言筛选数据
- [ ] 实现随机选择功能
- [ ] 实现新生成内容的存储功能

### 数据文件
- [ ] 确保 `rizzlines.json` 格式正确
- [ ] 确保所有分类都有足够的初始数据
- [ ] 确保支持所有需要的语言 