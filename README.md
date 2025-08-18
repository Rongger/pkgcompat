# pkgcompat

A CLI tool to find npm package versions compatible with the current Node.js version.

## Installation

```bash
# Install globally
pnpm add -g pkgcompat

# Or run directly with npx
npx pkgcompat <package-name>
```

## Usage

```bash
# Show all compatible versions of a package with current Node.js version
pkgcompat <package-name>

# Show only the latest compatible version
pkgcompat <package-name> --latest

# Check compatibility within a specific version range
pkgcompat <package-name> --range ">=1.0.0 <2.0.0"

# Check compatibility with a specific Node.js version
pkgcompat <package-name> --node-version "18.12.0"
pkgcompat <package-name> -n "18.12.0"

# Limit the number of versions to show (default: all)
pkgcompat <package-name> --limit 10
```

## Example

```bash
# Check compatible versions of express
pkgcompat express

# Output:
# Checking compatibility with Node.js version: v20.11.0
# Compatible versions for express with Node.js v20.11.0:
#   4.21.2
#   4.21.1
#   4.21.0
#   ...
```

## How it works

This tool uses the `package-json` library to fetch package metadata from the npm registry and `semver` to check version compatibility against your current Node.js version (or a specified version). It examines the `engines.node` field in each package version to determine compatibility.