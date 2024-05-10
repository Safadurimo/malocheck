import globals from "globals";
import pluginJs from "@eslint/js";


export default [
  {
    languageOptions: { globals: globals.browser },
    ignores: [".example_app_react/dist/assets"]
  },
  pluginJs.configs.recommended,
];