module.exports = {
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module', // 确保支持 ES Module
  },
  env: {
    browser: true, // 浏览器环境
    node: true, // 支持 Node.js 环境（启用 global, process, module 等全局变量）
    es6: true, // ECMAScript 6 特性
  },
  extends: [
    'eslint:recommended', // 根据需要扩展推荐配置
    'plugin:vue/recommended' // 如果是 Vue 项目
  ],
  rules: {

    // 设置为 off，表示关闭规则，允许使用 v-html
    'vue/no-v-html': 'off',

    // 值为 0，表示关闭规则，自闭合标签不是强制要求 <img src="example.jpg"> <!-- 允许不使用自闭合 -->
    'vue/html-self-closing': 0,

    // 如果需要允许混用 CommonJS 和 ES Module，可以禁用相关规则
    'import/extensions': 'off',

    // 强制使用单引号
    quotes: ['error', 'single', { 'avoidEscape': true }],

    // 强制在语句末尾使用分号 always never
    semi: ['error', 'never'],
  },
  overrides: [
    {
      files: ['*.vue', './src/*.js', '*.jsx', '*.ts', '*.tsx'],
      rules: {
        quotes: ['error', 'single', { 'avoidEscape': true }],
      }
    },
    // {
    //   files: ["**/*.{ts,tsx}"],
    //   rules: {
    //     quotes: ["error", "single"], // .ts 和 .tsx 文件使用单引号
    //     semi: ["error", "never"], // 不使用分号
    //   },
    // },
  ]
}
