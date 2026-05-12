const fs = require('fs');
const path = require('path');

const directory = './src';

function replaceInFile(filePath) {
    if (!filePath.endsWith('.js') && !filePath.endsWith('.jsx')) return;
    
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    // Brochure & general text
    content = content.replace(/Advanced Materials And Nanotechnology/gi, 'Polymers and Composite Materials');
    content = content.replace(/Advanced Materials and Nanotechnology/gi, 'Polymers and Composite Materials');
    content = content.replace(/Advanced Materials/gi, 'Polymers and Composite Materials');
    content = content.replace(/nanotech@sciengasummits\.com/gi, 'polymat@sciengasummits.com');

    // Themes
    content = content.replace(/Nanomaterials Synthesis & Characterization/g, 'Polymer Synthesis & Characterization');
    content = content.replace(/Advanced Energy Storage Materials/g, 'Advanced Composite Materials');
    content = content.replace(/Carbon Nanostructures & Graphene/g, 'Biopolymers & Medical Polymers');
    content = content.replace(/Nanoelectronics & Nanosensors/g, 'Smart & Functional Polymers');
    content = content.replace(/Polymers & Nanocomposites/g, 'Polymer Matrix Composites');
    content = content.replace(/Biomaterials & Tissue Engineering/g, 'Polymer Rheology & Processing');
    content = content.replace(/Quantum Nanotechnology/g, 'Sustainable & Green Polymers');
    content = content.replace(/Green Nanotechnology/g, 'Polymer Degradation & Stability');
    content = content.replace(/Nanotoxicology & Environmental Safety/g, 'Polymers for Energy Applications');
    content = content.replace(/Advanced Manufacturing & 3D Printing/g, 'Industrial Applications of Polymers');
    content = content.replace(/Smart Materials & Functional Surfaces/g, 'Fibers, Films & Membranes');
    content = content.replace(/Nanotechnology in Medicine & Healthcare/g, 'Adhesives, Coatings & Sealants');
    content = content.replace(/Optoelectronic Materials & Devices/g, 'Recycling of Plastics & Composites');
    content = content.replace(/Magnetic & Spintronic Materials/g, 'Self-Healing Polymers');
    content = content.replace(/Nanofluidics & Nanoscale Transport/g, 'Elastomers & Rubbers');
    content = content.replace(/Nanophotonics & Plasmonics/g, 'Polymer Blends & Alloys');
    content = content.replace(/Ceramics & Glass Materials/g, 'Nanocomposites & Hybrid Materials');
    content = content.replace(/Computational Materials Science/g, 'Polymer Physics & Modeling');

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
