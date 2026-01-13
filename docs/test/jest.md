<!--
 * @Author: 潘家杰 panjiajie@chexiao.co
 * @Date: 2026-01-06 17:43:22
 * @LastEditors: 潘家杰 panjiajie@chexiao.co
 * @LastEditTime: 2026-01-13 10:27:37
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
