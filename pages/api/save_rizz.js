import fs from 'fs';
import path from 'path';

const historyFilePath = path.join(process.cwd(), 'data', 'rizz_history.json');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { line, category } = req.body;

  if (!line || !category) {
    return res.status(400).json({ error: 'Missing line or category in request body' });
  }

  try {
    // Read existing data
    const historyData = fs.readFileSync(historyFilePath, 'utf-8');
    const history = JSON.parse(historyData);

    // Check for duplicates before adding
    const isDuplicate = history.some(item => item.line === line);
    if (isDuplicate) {
      console.log('Duplicate rizz line, not saving:', line);
      return res.status(200).json({ message: 'Rizz line already exists' });
    }

    // Add new entry
    history.push({ line, category, timestamp: new Date().toISOString() });

    // Write updated data back to the file
    fs.writeFileSync(historyFilePath, JSON.stringify(history, null, 2), 'utf-8');

    res.status(200).json({ message: 'Rizz line saved successfully' });
  } catch (error) {
    console.error('Error saving rizz line:', error);
    res.status(500).json({ error: 'Failed to save rizz line' });
  }
} 