/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  //extends: ["@repo/eslint-config/next.js"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json", // Make sure this path is correct
  },
  ignorePatterns: ["postcss.config.js"],
  overrides: [
    {
      files: ["*.js"],
      excludedFiles: ["tailwind.config.js"],
      rules: {
        // your JavaScript-specific rules
      }
    }
  ]
};
