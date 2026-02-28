export default [
  {
    files: ["**/*.js"],
    rules: {
      "no-unused-vars": "warn",
      "no-undef": "warn",
      "semi": ["warn", "always"],
      "no-console": "off"
    },
    languageOptions: {
      ecmaVersion: 2022,
      globals: {
        document: "readonly",
        window: "readonly",
        navigator: "readonly",
        console: "readonly",
        alert: "readonly",
        confirm: "readonly",
        URL: "readonly",
        localStorage: "readonly",
        Blob: "readonly",
        setTimeout: "readonly"
      }
    }
  }
];
