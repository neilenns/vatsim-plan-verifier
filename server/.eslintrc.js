module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "standard-with-typescript",
    "prettier",
    "plugin:security/recommended-legacy",
    //    "plugin:you-dont-need-lodash-underscore/compatible",
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {},
};
