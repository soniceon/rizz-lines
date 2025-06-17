import fs from 'fs';
import path from 'path';

const DATA_PATH = path.join(process.cwd(), 'rizzlines.json');

// 清理中文内容，移除拼音和英文解释
function cleanChineseContent(text) {
  // 移除括号及其内容（包括中英文括号）
  text = text.replace(/[\(（].*?[\)）]/g, '');
  // 移除方括号及其内容
  text = text.replace(/[\[【].*?[\]】]/g, '');
  // 移除拼音（假设拼音是由拉丁字母组成的）
  text = text.replace(/[a-zA-Z\s]+/g, '');
  // 移除多余的标点符号
  text = text.replace(/[,，.。\s]+$/g, '');
  // 移除多余的空格
  text = text.trim();
  return text;
}

function loadData() {
  try {
    const data = JSON.parse(fs.readFileSync(DATA_PATH, 'utf-8'));
    return data;
  } catch (error) {
    console.error('Error loading data:', error);
    return { "Rizz pick-up lines": [] };
  }
}

function saveData(data) {
  try {
    fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (error) {
    console.error('Error saving data:', error);
    return false;
  }
}

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { category, language = 'en' } = req.query;

  if (!category) {
    return res.status(400).json({ error: 'Category is required' });
  }

  try {
    const data = loadData();
    const allLines = data["Rizz pick-up lines"];
    
    if (!Array.isArray(allLines) || allLines.length === 0) {
      return res.status(200).json([]);
    }

    // 筛选出包含指定语言的条目
    const availableLines = allLines.filter(item => item[language]);

    if (availableLines.length === 0) {
      return res.status(200).json([]);
    }

    // 随机选择一条
    const randomLine = availableLines[Math.floor(Math.random() * availableLines.length)];
    
    // 获取当前语言的内容
    let content = randomLine[language];
    
    // 如果是中文内容，进行额外的清理
    if (language === 'zh') {
      content = cleanChineseContent(content);
    }

    res.status(200).json([content]);
  } catch (error) {
    console.error('Error processing request:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
