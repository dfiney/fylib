const fs = require('fs');
const path = require('path');

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  let entries = fs.readdirSync(src, { withFileTypes: true });

  for (let entry of entries) {
    let srcPath = path.join(src, entry.name);
    let destPath = path.join(dest, entry.name);

    entry.isDirectory() ? copyDir(srcPath, destPath) : fs.copyFileSync(srcPath, destPath);
  }
}

const baseDir = path.resolve(__dirname, '..');
const srcSchematics = path.join(baseDir, 'schematics');
const distSchematics = path.join(baseDir, 'dist', 'schematics');

// Copy collection.json
fs.mkdirSync(distSchematics, { recursive: true });
fs.copyFileSync(path.join(srcSchematics, 'collection.json'), path.join(distSchematics, 'collection.json'));

// Copy schema.json
fs.mkdirSync(path.join(distSchematics, 'ng-add'), { recursive: true });
fs.copyFileSync(path.join(srcSchematics, 'ng-add', 'schema.json'), path.join(distSchematics, 'ng-add', 'schema.json'));

// Copy templates
copyDir(path.join(srcSchematics, 'templates'), path.join(distSchematics, 'templates'));

console.log('Schematics assets copied successfully.');
