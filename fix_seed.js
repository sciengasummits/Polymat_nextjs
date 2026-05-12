const fs = require('fs');

let content = fs.readFileSync('src/lib/seedData.js', 'utf8');

// We need to replace the Liutex specific strings inside polymatDefaults with Polymat strings.
content = content.replace(/'POLYMAT AND VORTEX\\nIDENTIFICATION'/g, "'Polymers and Composite\\nMaterials'");
content = content.replace(/International Conference on Liutex and Vortex Identification/g, 'Annual International Conference on Polymers and Composite Materials');
content = content.replace(/where global experts unite to shape the future of fluid mechanics/g, 'where global experts unite to shape the future of material science and polymer engineering');

content = content.replace(/'Liutex and Vortex Identification and Its Applications'/g, "'Innovations in Polymer Science and Composite Materials'");
content = content.replace(/The International Conference on Liutex Theory and Applications in Vortex Identification and Vortex Dynamics is a premier international platform dedicated to advancing the understanding of Liutex theory and its transformative applications in vortex identification and vortex dynamics./g, 'The Annual International Conference on Polymers and Composite Materials is a premier global platform dedicated to advancing the understanding of cutting-edge materials science and composite applications that are transforming industries worldwide.');
content = content.replace(/This conference brings together leading researchers, academicians, computational scientists, engineers, and industry professionals to explore recent developments, theoretical foundations, numerical methods, and real-world applications of Liutex-based vortex analysis./g, 'This conference brings together leading researchers, academicians, scientists, engineers, and industry professionals to explore recent developments, theoretical foundations, innovative applications, and real-world implementations of Polymers and Composite Materials solutions.');

content = content.replace(/'Promote advancements in Liutex theory'/g, "'Promote advancements in Polymers and Composite Materials research'");
content = content.replace(/'Explore innovations in vortex identification techniques'/g, "'Explore innovations in composite materials applications'");
content = content.replace(/'Discuss computational and experimental approaches in vortex dynamics'/g, "'Discuss computational and experimental approaches in material characterization'");
content = content.replace(/'Bridge academia and industry in fluid mechanics research'/g, "'Bridge academia and industry in materials science research'");
content = content.replace(/'Encourage collaboration across aerospace, mechanical, civil, and environmental engineering domains'/g, "'Encourage collaboration across engineering, physics, chemistry, and biotechnology domains'");

content = content.replace(/'Fundamentals of Liutex Theory'/g, "'Polymer Materials and Composites'");
content = content.replace(/'Vortex Identification Methods \(Q-criterion, \?2, \? method, Liutex\)'/g, "'Smart Materials and Functional Coatings'");
content = content.replace(/'Turbulence Modeling and Analysis'/g, "'Biomaterials and Tissue Engineering'");
content = content.replace(/'Computational Fluid Dynamics \(CFD\) Applications'/g, "'Energy Storage and Conversion Materials'");
content = content.replace(/'Vortex Dynamics in Aerospace Engineering'/g, "'Sustainable and Green Polymers'");
content = content.replace(/'Data-Driven and AI Approaches in Flow Field Identification'/g, "'Advanced Polymers and Composite Applications'");

content = content.replace(/'POLYMAT VORTEX SUMMIT CONFERENCES APPROACH'/g, "'POLYMAT SUMMIT CONFERENCES APPROACH'");
content = content.replace(/info@polymatvortexsummit.com/g, "contact@polymatsummit.com");

fs.writeFileSync('src/lib/seedData.js', content, 'utf8');
console.log("Updated seedData.js");
