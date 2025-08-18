#!/usr/bin/env node

import { program } from 'commander';
import { findCompatibleVersions } from './lib/version-checker.js';

program
  .name('pkgcompat')
  .description('CLI tool to find npm package versions compatible with a Node.js version')
  .version('1.0.0')
  .argument('<package-name>', 'Name of the npm package to check')
  .option('-l, --latest', 'Only show the latest compatible version')
  .option('-r, --range <range>', 'Specify a version range to check (e.g., ">=1.0.0 <2.0.0")')
  .option(
    '-n, --node-version <version>',
    'Specify Node.js version to check against (e.g., "18.12.0")'
  )
  .action(async (packageName, options) => {
    try {
      // Use provided Node.js version or default to current version
      const nodeVersion = options.nodeVersion
        ? options.nodeVersion.startsWith('v')
          ? options.nodeVersion
          : `v${options.nodeVersion}`
        : process.version;

      console.log(`Checking compatibility with Node.js version: ${nodeVersion}`);

      const compatibleVersions = await findCompatibleVersions(
        packageName,
        nodeVersion,
        options.range
      );

      if (compatibleVersions.length === 0) {
        console.log(`No compatible versions found for ${packageName} with Node.js ${nodeVersion}`);
        return;
      }

      if (options.latest) {
        console.log(`Latest compatible version: ${compatibleVersions[0]}`);
      } else {
        console.log(`Compatible versions for ${packageName} with Node.js ${nodeVersion}:`);
        compatibleVersions.forEach((version) => console.log(`  ${version}`));
      }
    } catch (error) {
      console.error('Error:', error.message);
      process.exit(1);
    }
  });

program.parse();
