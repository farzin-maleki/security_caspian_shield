// Optional hosting preparation only; the authored site needs no build step.
// Copy the public files into the directory supported by Sites hosting.
const fs = require('node:fs');
const path = require('node:path');
const project = __dirname;
const destination = path.join(project, 'build');
fs.mkdirSync(destination, {recursive: true});
fs.copyFileSync(path.join(project, 'index.html'), path.join(destination, 'index.html'));
fs.cpSync(path.join(project, 'dist'), path.join(destination, 'dist'), {recursive: true});
console.log('Static publication files prepared in build/.');
