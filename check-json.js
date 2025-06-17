const fs = require('fs');
const path = require('path');

function checkJson(dir) {
  fs.readdirSync(dir).forEach(f => {
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) {
      checkJson(p);
    } else if (f.endsWith('.json')) {
      try {
        JSON.parse(fs.readFileSync(p, 'utf-8'));
        console.log('✔️', p);
      } catch (e) {
        console.error('❌', p, '\n', e.message);
      }
    }
  });
}

checkJson('./public/locales');
