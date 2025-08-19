const packageJson = require('package-json');

/**
 * Get package metadata from npm registry
 * @param {string} packageName - Name of the package
 * @param {string} version - Specific version or tag (default: 'latest')
 * @returns {Promise<object>} Package metadata
 */
async function getPackageJson(packageName, version = 'latest') {
  try {
    // For 'latest' version, we need to get all versions
    if (version === 'latest') {
      const metadata = await packageJson(packageName, { allVersions: true });
      return metadata;
    } else {
      const metadata = await packageJson(packageName, { version });
      return metadata;
    }
  } catch (error) {
    throw new Error(`Failed to fetch package data for ${packageName}: ${error.message}`);
  }
}

module.exports = {
  getPackageJson,
};
