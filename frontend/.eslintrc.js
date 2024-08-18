/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json", // Ensure this path is correct
    tsconfigRootDir: __dirname // Ensure this points to the root directory
  },
  extends: [
    "next", // Next.js linting rules
    "next/core-web-vitals", // Core Web Vitals rules for Next.js
    "@typescript-eslint/recommended" // TypeScript linting rules
  ],
  ignorePatterns: [
    "node_modules/", // Exclude the node_modules directory
    "build/", // Exclude the build directory
    "postcss.config.js" // Exclude the PostCSS config file
  ],
  overrides: [
    {
      files: ["*.js"], // Apply JavaScript-specific rules
      excludedFiles: ["tailwind.config.js"], // Exclude specific files
      rules: {
        // JavaScript-specific rules here
      }
    }
  ]
};
