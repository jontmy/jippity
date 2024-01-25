/** @type {import("eslint").Linter.Config} */
const config = {
    parser: "@typescript-eslint/parser",
    parserOptions: {
        project: true
    },
    plugins: ["@typescript-eslint"],
    extends: [
        "next/core-web-vitals",
        "plugin:@typescript-eslint/strict-type-checked",
        "plugin:@typescript-eslint/stylistic-type-checked"
    ],
    rules: {
        "@typescript-eslint/array-type": "off",
        "@typescript-eslint/consistent-type-definitions": ["error", "type"],
        "@typescript-eslint/no-confusing-void-expression": [
            "error",
            {
                ignoreArrowShorthand: true
            }
        ],
        "react/no-unescaped-entities": "off",
        "@typescript-eslint/consistent-type-imports": [
            "error",
            {
                prefer: "type-imports",
                fixStyle: "inline-type-imports"
            }
        ],
        "@typescript-eslint/no-misused-promises": [
            "error",
            {
                checksVoidReturn: {
                    attributes: false
                }
            }
        ],
        "@typescript-eslint/restrict-template-expressions": [
            "warn",
            {
                allowBoolean: true
            }
        ],
        "@typescript-eslint/no-non-null-assertion": "off",
        "@typescript-eslint/no-unused-vars": [
            "error",
            {
                varsIgnorePattern: "^_",
                argsIgnorePattern: "^_"
            }
        ]
    }
};

module.exports = config;
