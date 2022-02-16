#!/usr/bin/env node

const { execSync } = require('child_process');
const parseArgs = require('minimist');
const path = require('path');

const getExistingVersions = (name) => {
  try {
    const rawVersions = execSync(`npm view ${name} versions -json`, { stdio: 'pipe' });
    return JSON.parse(rawVersions.toString().trim());
  } catch (e) {
    const npmOutput = JSON.parse(e.stdout.toString().trim());

    if (npmOutput.error.code === 'E404') {
      console.log(`${name} cannot be found. If this is the first time this package is being published, run "npm publish" manually.`);
    } else {
      console.log(e.stdout.toString().trim());
    }

    process.exit(1);
  }
};

const hasExistingVersion = (name, version) => getExistingVersions(name).includes(version);

(() => {
  const { name, version } = require(path.join(process.cwd(), 'package.json'));

  if (hasExistingVersion(name, version)) {
    console.log(`${name}@${version} has already been published.`);
    process.exit(0);
  }

  console.log(`${name}@${version} has not been published. Publishing...`);

  const args = parseArgs(process.argv.slice(2), { boolean: ['use-public'] });
  execSync(`npm publish ${args['use-public'] ? '--access public' : ''}`);
})();
