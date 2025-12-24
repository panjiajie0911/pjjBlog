/*
 * @Author: 潘家杰 panjiajie@chexiao.co
 * @Date: 2025-12-10 10:46:32
 * @LastEditors: 潘家杰 panjiajie@chexiao.co
 * @LastEditTime: 2025-12-17 15:48:51
 * @FilePath: \pjjBlog\.vitepress\config.mts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "pjjBlog",
  description: "share knowledge here",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [{ text: "Home", link: "/" }],

    sidebar: [
      { text: "测试", link: "/markdown-example" },
      {
        text: "typescript",
        items: [
          { text: "类型变量", link: "/docs/typescript/T" },
          { text: "高级类型", link: "/docs/typescript/type" },
        ],
      },
      { text: "vue", items: [] },
      {
        text: "nginx",
        items: [
          { text: "nginx", link: "/docs/nginx/index" },
          { text: "nginx配置", link: "/docs/nginx/config" },
        ],
      },
      { text: "javaScript", items: [] },
      { text: "浏览器原理", items: [] },
      { text: "css", items: [] },
      { text: "vite/webpack", items: [] },
      { text: "CI/CD 与部署", items: [] },
      { text: "性能优化", items: [] },
      { text: "node.js", items: [] },
      { text: "前沿技术", items: [] },
    ],

    // socialLinks: [{ icon: "github" }],
  },
});
