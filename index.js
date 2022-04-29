const core = require('@actions/core');
const github = require('@actions/github');
const { promises: fs } = require('fs')
const inlineCss = require('inline-css');
const path = require('path');

(async function()
{
    try {
        const html_file_path = core.getInput('html-path');
        let content = await fs.readFile(html_file_path, 'utf8');
        
        const html = await inlineCss(content, {url: `file://${path.resolve(html_file_path)}`});
        let result = await fs.writeFile(html_file_path, html);
      } catch (error) {
        core.setFailed(error);
      }
})();
