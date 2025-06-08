import fs from 'fs';
import path from 'path';

const DATA_PATH = path.join(process.cwd(), 'rizzlines.json');
const THRESHOLD = 100; // 你可以改成50

function loadData() {
  return JSON.parse(fs.readFileSync(DATA_PATH, 'utf-8'));
}

function saveData(data) {
  fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2), 'utf-8');
}

export default function handler(req, res) {
  if (req.method === 'GET') {
    const { category, type } = req.query;
    const data = loadData();
    if (!data[category] || data[category].length === 0) {
      return res.status(404).json({ error: 'No data for this category' });
    }
    if (type === 'random') {
      const lines = data[category];
      const randomLine = lines[Math.floor(Math.random() * lines.length)];
      return res.status(200).json({ line: randomLine });
    }
    return res.status(400).json({ error: 'Invalid type' });
  }

  if (req.method === 'POST') {
    const { category, line } = req.body;
    if (!category || !line) {
      return res.status(400).json({ error: 'Missing category or line' });
    }
    const data = loadData();
    if (!data[category]) data[category] = [];
    // 去重
    if (data[category].includes(line)) {
      return res.status(200).json({ message: 'Duplicate, not added' });
    }
    data[category].push(line);
    // 达到阈值自动存储
    if (data[category].length % THRESHOLD === 0) {
      saveData(data);
    }
    return res.status(200).json({ message: 'Added', count: data[category].length });
  }

  res.status(405).json({ error: 'Method not allowed' });
}
