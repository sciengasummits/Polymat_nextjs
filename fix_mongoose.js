const fs = require('fs');
const path = require('path');

const modelsDir = path.join(__dirname, 'src', 'models');

const files = fs.readdirSync(modelsDir);

for (const file of files) {
  if (file.endsWith('.js')) {
    const filePath = path.join(modelsDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace export default mongoose.model('X', XSchema);
    // with export default mongoose.models.X || mongoose.model('X', XSchema);
    content = content.replace(/export default mongoose\.model\('([^']+)',\s*([a-zA-Z0-9_]+)\);/g, (match, modelName, schemaName) => {
      return `export default mongoose.models.${modelName} || mongoose.model('${modelName}', ${schemaName});`;
    });
    
    fs.writeFileSync(filePath, content, 'utf8');
  }
}

console.log('Fixed mongoose model exports.');
