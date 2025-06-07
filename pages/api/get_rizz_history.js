import fs from 'fs';
import path from 'path';

const historyFilePath = path.join(process.cwd(), 'data', 'rizz_history.json');

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Read existing data
    const historyData = fs.readFileSync(historyFilePath, 'utf-8');
    const history = JSON.parse(historyData);

    res.status(200).json({ history });
  } catch (error) {
    console.error('Error reading rizz history:', error);
    // If file doesn't exist, return empty array
    if (error.code === 'ENOENT') {
        return res.status(200).json({ history: [] });
    }
    res.status(500).json({ error: 'Failed to retrieve rizz history' });
  }
} 