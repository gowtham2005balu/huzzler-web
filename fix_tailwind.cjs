const fs = require('fs');

try {
  if (fs.existsSync('tailwind.config.js')) {
    fs.renameSync('tailwind.config.js', 'tailwind.config.js.bak');
    console.log('SUCCESS: Disabled the legacy tailwind.config.js to allow v4 auto-discovery.');
  } else {
    console.log('tailwind.config.js already disabled.');
  }
} catch(e) {
  console.error(e);
}
