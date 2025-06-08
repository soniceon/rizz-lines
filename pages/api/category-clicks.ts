import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

const file = path.join(process.cwd(), 'category_clicks.json');

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { category } = req.body;
    let data: Record<string, number> = {};
    if (fs.existsSync(file)) data = JSON.parse(fs.readFileSync(file, 'utf-8'));
    data[category] = (data[category] || 0) + 1;
    fs.writeFileSync(file, JSON.stringify(data));
    res.status(200).json({ success: true });
  } else if (req.method === 'GET') {
    let data: Record<string, number> = {};
    if (fs.existsSync(file)) data = JSON.parse(fs.readFileSync(file, 'utf-8'));
    const top = Object.entries(data)
      .sort((a, b) => b[1] - a[1])
      .map(([cat]) => cat)
      .slice(0, 6);
    res.status(200).json({ top });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
} 