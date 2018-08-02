const _ang = require('./angular.json');
const shell = require('shelljs');

Object
  .keys(_ang.projects)
  .filter(k => !k.includes('libraries'))
  .forEach(k => {
    const m = k.replace('ngx-', '');
    shell.exec(`npm run build:${m} && cd dist/${k} && npm publish --access=public`);
  });
