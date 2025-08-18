# QWEN.md - Context for `pkgcompat`

## Project Type
This is a JavaScript/Node.js CLI tool project that helps developers find npm package versions compatible with specific Node.js versions.

## Project Overview
The project is named "check-pkg-node-compat" and provides a CLI tool called `pkgcompat`. Its primary purpose is to help developers determine which versions of an npm package are compatible with a specific Node.js version. It includes:
- **package-json** for fetching package metadata from the npm registry.
- **semver** for checking version compatibility.
- **commander** for parsing command-line arguments.

The project is configured to use ES modules (`"type": "module"` in `package.json`).

## Package Manager
This project uses [pnpm](https://pnpm.io/) for package management. Do not use `npm` or `yarn` to manage dependencies.

## Building and Running
- **Setup:** `pnpm install` to install dependencies.
- **Prepare:** `pnpm run prepare` (runs `husky install`) to set up git hooks. This is automatically run after `pnpm install` if Husky is installed.

### CLI Usage
```bash
# Show all compatible versions of a package with current Node.js version
pkgcompat <package-name>

# Show only the latest compatible version
pkgcompat <package-name> --latest

# Check compatibility within a specific version range
pkgcompat <package-name> --range ">=1.0.0 <2.0.0"

# Check compatibility with a specific Node.js version
pkgcompat <package-name> --node-version "18.12.0"
```

## Development Conventions
- **Code Style:** Code formatting is managed by Prettier with the configuration in `.prettierrc`. This includes single quotes, trailing commas, a print width of 100 characters, and 2-space indentation.
- **Linting:** ESLint is used with recommended rules and is integrated with Prettier to avoid conflicts (`eslint-config-prettier`, `eslint-plugin-prettier`).
- **Git Hooks:** Husky is used to install a pre-commit hook that runs `lint-staged`. This ensures that code is automatically linted and formatted before being committed.
- **Module System:** The project is configured to use ES Modules (`"type": "module" in `package.json`).