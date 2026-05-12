const fs = require('fs');
const path = require('path');

const directory = './src';

function replaceInFile(filePath) {
    if (!filePath.endsWith('.js') && !filePath.endsWith('.jsx')) return;
    
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    content = content.replace(/LIUTEXSUMMIT2026/g, 'POLYMATSUMMIT2026');
    content = content.replace(/liutexsummit2026/g, 'polymatsummit2026');
    content = content.replace(/LIUTEX2026/g, 'POLYMAT2026');
    content = content.replace(/LIUTEX THEORY AND TURBULENCE MECHANISM/g, 'POLYMERS AND COMPOSITE MATERIALS');
    content = content.replace(/LIUTEX/g, 'POLYMAT');

    if (content !== original) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated ${filePath}`);
    }
}

function walk(dir) {
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat && stat.isDirectory()) {
            walk(fullPath);
        } else {
            replaceInFile(fullPath);
        }
    });
}

walk(directory);
