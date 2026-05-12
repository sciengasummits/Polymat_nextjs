const fs = require('fs');
const path = require('path');

const directory = './src';

function replaceInFile(filePath) {
    if (!filePath.endsWith('.js') && !filePath.endsWith('.jsx')) return;
    
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    content = content.replace(/Liutex Theory/gi, 'Polymer Science');
    content = content.replace(/Turbulence Mechanism/gi, 'Composite Materials');
    content = content.replace(/CFD, and AI in flow field analysis/gi, 'Nanocomposites, and Advanced Polymers');
    content = content.replace(/Vortex Identification Methods \(Q, λ2, Ω, Liutex\)/g, 'Polymer Characterization Methods');
    content = content.replace(/CFD Applications, Aerospace Vortex Dynamics, and AI in Flow Field Analysis/g, 'Industrial Applications, Advanced Composites, and Smart Polymers');
    content = content.replace(/Liutex-based rotation definitions/g, 'Polymer Matrix applications');
    content = content.replace(/Liutex Fundamentals/g, 'Polymer Fundamentals');
    content = content.replace(/Liutex Theory, Vortex Dynamics, and CFD/gi, 'Polymer Science, Composite Materials, and Advanced Polymers');
    content = content.replace(/Mathematical Definition of Liutex/g, 'Fundamentals of Polymers');
    content = content.replace(/Principal Coordinate System/g, 'Polymer Synthesis');
    content = content.replace(/Liutex vs\. Vorticity/g, 'Polymer Properties');
    content = content.replace(/Applying Liutex theory to enhance turbulence models and understand energy cascades/g, 'Applying Polymer science to enhance composite models and understand material properties');
    content = content.replace(/Liutex-based RANS Models/g, 'Polymer Models');
    content = content.replace(/Liutex Applications in Ocean Engineering/g, 'Polymer Applications in Engineering');
    content = content.replace(/Vortex Identification Methods \(Q-criterion, \?2, \?, Liutex\)/g, 'Polymer Material Methods');

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
