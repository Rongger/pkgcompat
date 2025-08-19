const semver = require('semver');
const { getPackageJson } = require('./package-json');

/**
 * Find versions of a package that are compatible with a given Node.js version
 * @param {string} packageName - Name of the package
 * @param {string} nodeVersion - Current Node.js version (e.g., 'v18.12.0')
 * @param {string} range - Optional version range to check
 * @param {number} limit - Optional limit for the number of versions to return
 * @returns {Promise<string[]>} Array of compatible versions
 */
async function findCompatibleVersions(packageName, nodeVersion, range = null, limit = null) {
  try {
    // Normalize Node.js version (remove 'v' prefix if present)
    const normalizedNodeVersion = nodeVersion.startsWith('v') ? nodeVersion.slice(1) : nodeVersion;

    // Get package metadata
    const metadata = await getPackageJson(packageName);

    // Check if metadata has versions
    if (!metadata.versions) {
      throw new Error(`No versions found for package ${packageName}`);
    }

    // Get all versions
    const versions = Object.keys(metadata.versions);

    // Filter versions based on range if specified
    let filteredVersions = versions;
    if (range) {
      filteredVersions = versions.filter((version) => semver.satisfies(version, range));
    }

    // Sort versions in descending order (newest first)
    const sortedVersions = filteredVersions.sort((a, b) => semver.rcompare(a, b));

    // Filter versions that are compatible with the current Node.js version
    const compatibleVersions = [];
    for (const version of sortedVersions) {
      const packageJson = metadata.versions[version];
      const engines = packageJson.engines;

      // If no engines specified, assume compatibility
      if (!engines || !engines.node) {
        compatibleVersions.push(version);
        continue;
      }

      // Check if Node.js version satisfies the engine requirement
      if (semver.satisfies(normalizedNodeVersion, engines.node)) {
        compatibleVersions.push(version);
      }
    }

    // Apply limit if specified
    const result = limit ? compatibleVersions.slice(0, limit) : compatibleVersions;

    return result;
  } catch (error) {
    throw new Error(`Failed to find compatible versions: ${error.message}`);
  }
}

module.exports = {
  findCompatibleVersions,
};
