const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'huzzler-landing_5 2 (1)', 'huzzler-landing_5', 'src', 'components');
const destDir = path.join(__dirname, 'src', 'pages', 'LandingPage', 'components');

// Create destination directory if it doesn't exist
if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

// Read and copy all files
const files = fs.readdirSync(srcDir);
files.forEach(file => {
  const srcFile = path.join(srcDir, file);
  const destFile = path.join(destDir, file);
  
  // Only copy files
  if (fs.lstatSync(srcFile).isFile()) {
    fs.copyFileSync(srcFile, destFile);
    console.log(`Copied ${file} to ${destDir}`);
  }
});

console.log('\n--- SUCCESS ---');
console.log('All landing page components have been copied successfully!');
