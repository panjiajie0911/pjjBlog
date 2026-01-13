<!--
 * @Author: 潘家杰 panjiajie@chexiao.co
 * @Date: 2026-01-06 17:43:22
 * @LastEditors: 潘家杰 panjiajie@chexiao.co
 * @LastEditTime: 2026-01-13 14:39:25
 * @FilePath: \pjjBlog\docs\test\unitTest.md
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->

# 单元测试框架 Jest 和 react 的最佳实践

Jest 是 JavaScript 的框架，把它理解为给前端代码做 “自动化体检” 的工具。在 react 中搭配使用，可以用于冒烟测试**_react 组件_**，**_react hook_**等等

## 安装

在最佳实践中，需要安装以下的 npm 包

```bash
pnpm i jest @testing-library/react @testing-library/jest-dom --save-dev

```

## jest.config.js

在项目的根目录下，运行**_ npx jest --init _** 初始化 jest.config.js 文件，可以生成一个配置文件，此后的 jest 配置都在这个文件里进行。

**_ jest.config.js _**的配置和解释如下：

```javascript
const config = {
  // All imported modules in your tests should be mocked automatically
  automock: false,

  // 测试遭遇多少次的失败后，就停止测试
  bail: false, // 无论失败多少次，都不停止测试

  // 缓存目录
  // cacheDirectory: '',

  // Automatically clear mock calls, instances, contexts and results before every test
  clearMocks: true,

  // Indicates whether the coverage information should be collected while executing the test
  // collectCoverage: false,

  // 指定覆盖率报告的输出目录
  // coverageDirectory: undefined,

  // An array of regexp pattern strings used to skip coverage collection
  // coveragePathIgnorePatterns: [
  //   "\\\\node_modules\\\\"
  // ],

  // Indicates which provider should be used to instrument code for coverage
  coverageProvider: "v8",

  // A list of reporter names that Jest uses when writing coverage reports
  // coverageReporters: [
  //   "json",
  //   "text",
  //   "lcov",
  //   "clover"
  // ],

  // 设置覆盖率最低要求，不达标时测试失败
  // coverageThreshold: undefined,

  // A path to a custom dependency extractor
  // dependencyExtractor: undefined,

  // Make calling deprecated APIs throw helpful error messages
  // errorOnDeprecated: false,

  // The default configuration for fake timers
  // fakeTimers: {
  //   "enableGlobally": false
  // },

  // Force coverage collection from ignored files using an array of glob patterns
  // forceCoverageMatch: [],

  // A path to a module which exports an async function that is triggered once before all test suites
  // globalSetup: undefined,

  // A path to a module which exports an async function that is triggered once after all test suites
  // globalTeardown: undefined,

  // 定义测试环境中的全局变量
  // globals: {},

  // 控制测试的并行执行，优化性能
  maxWorkers: "50%", // 使用 50% 的 CPU 核心

  // 测试超时时间
  testTimeout: 6000,

  // 指定 Jest 在哪里查找模块
  // moduleDirectories: ["node_modules"],

  // An array of file extensions your modules use
  // moduleFileExtensions: [
  //   "js",
  //   "mjs",
  //   "cjs",
  //   "jsx",
  //   "ts",
  //   "tsx",
  //   "json",
  //   "node"
  // ],

  // A map from regular expressions to module names or to arrays of module names that allow to stub out resources with a single module
  // moduleNameMapper: {}

  // An array of regexp pattern strings, matched against all module paths before considered 'visible' to the module loader
  // modulePathIgnorePatterns: [],

  // Activates notifications for test results
  // notify: false,

  // An enum that specifies notification mode. Requires { notify: true }
  // notifyMode: "failure-change",

  // 指定预设的配置
  // preset: undefined,

  // 在一个配置文件中管理多个测试项目, 当有多个项目时候，分别为多个项目进行配置
  // projects: undefined,

  // 自定义测试结果的输出格式和方式
  reporters: ["default"],

  // Automatically reset mock state before every test
  // resetMocks: false,

  // Reset the module registry before running each individual test
  // resetModules: false,

  // A path to a custom resolver
  // resolver: undefined,

  // Automatically restore mock state and implementation before every test
  // restoreMocks: false,

  // The root directory that Jest should scan for tests and modules within
  // rootDir: undefined,

  // 根目录，指定jest从哪些目录开始查找测试文件
  roots: ["<rootDir>"],

  // Allows you to use a custom runner instead of Jest's default test runner
  // runner: "jest-runner",

  // 在测试环境建立前执行的脚本
  setupFiles: [],

  // 标记执行时间过长的测试
  slowTestThreshold: 5, // 超过5秒的测试，就是慢测试

  // 快照序列化器
  // snapshotSerializers: [],

  // 测试环境
  testEnvironment: "jsdom", // jsdom=浏览器DOM（有 window, document 等对象）node=node环境

  // Options that will be passed to the testEnvironment
  testEnvironmentOptions: {},

  //是否在测试结果中包含文件名和行号
  testLocationInResults: true,

  // 测试文件匹配模式, 定义哪些文件被视为测试文件
  testMatch: [
    "**/__tests__/**/*.[jt]s?(x)", // 查找 __tests__ 文件夹下的文件
    "**/?(*.)+(spec|test).[tj]s?(x)", // 查找 .spec.js、.test.js 等文件
  ],

  // 忽略测试路径，哪些文件目录下的文件可以不参与匹配
  testPathIgnorePatterns: ["/node_modules/", "/dist/", "/build/"],

  // The regexp pattern or array of patterns that Jest uses to detect test files
  // testRegex: [],

  // This option allows the use of a custom results processor
  // testResultsProcessor: undefined,

  // This option allows use of a custom test runner
  // testRunner: "jest-circus/runner",

  // 定义如何转换不同类型的文件
  transform: {},

  // An array of regexp pattern strings that are matched against all source file paths, matched files will skip transformation
  // transformIgnorePatterns: [
  //   "\\\\node_modules\\\\",
  //   "\\.pnp\\.[^\\\\]+$"
  // ],

  // An array of regexp pattern strings that are matched against all modules before the module loader will automatically return a mock for them
  // unmockedModulePathPatterns: undefined,

  // bail时是否能看到详细错误
  verbose: true,

  // An array of regexp patterns that are matched against all source file paths before re-running tests in watch mode
  // watchPathIgnorePatterns: [],

  // Whether to use watchman for file crawling
  watchman: true,

  // 覆盖率:指定哪些文件需要收集覆盖率信息
  collectCoverageFrom: [
    "packages/admin/src/**/*.{js,jsx,ts,tsx}",
    "packages/partner/src/**/*.{js,jsx,ts,tsx}",
    "packages/_base/components/**/*.{js,ts,jsx,tsx}",
  ],

  // 在测试环境建立后、测试运行前执行的脚本
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
};

module.exports = config;
```
