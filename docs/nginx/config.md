<!--
 * @Author: 潘家杰 panjiajie@chexiao.co
 * @Date: 2025-12-15 16:21:30
 * @LastEditors: 潘家杰 panjiajie@chexiao.co
 * @LastEditTime: 2025-12-25 10:57:35
 * @FilePath: \pjjBlog\docs\nginx\source.md
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->

# 配置

## 详细讲解 nginx.conf 文件

### 最顶层

nginx.conf 本身就是最顶层，被称为**_全局模块_**，是一个通用配置，旗下分为另外几个模块

- events 模块
- http 模块
- stream 模块

根据环境的不同，在**_nginx.conf_**的同级下，可以设置 env 文件夹，区分不同的环境的配置

```bash
├── env
│   ├── dev.conf
│   ├── test.conf
│   └── prod.conf
```

通过 include 语法引入不同环境的配置文件

```nginx
include env/dev.conf;
```

### 全局模块

**_全局模块_**的核心配置是这样的：

- worker_processes：表示工作进程数，一般是和 CPU 核心数的数量相同的。
  nginx 是“单 work 进程 + 多线程 event 驱动”的模式，所以一个 worker 进程只占用一个 CPU。
  如果 CPU === worker 进程数，那么会有以下好处：

- CPU 利用率 100% 。
- 没有进程切换的开销，n 个进程同时处理，处理速度是 1 个 worker 的 N 倍。

- error_log :指定错误日志的存放路径
  日志分级别，默认是 error 级别，级别决定了“什么内容可以写入日志”。可以是 debug | info | notice | warn | error | crit

- pid: 指定进程 pid 的存放文件的路径, 每一个 nginx 的 master process（主进程）都有一个唯一的 id,即 pid,这里指定的是这个 pid 的文件的存放的位置。

- worker_rlimit_nofile：所有 worker 进程能打开的最大文件描述符的数量。nginx 会给\*\*\_worker process**\*规定最多能做多少事情，包括\***网络连接数\*\*\*，\_\*\*读文件\*\*\*等等,每一件事情都是一个文件描述符。

限制\*\*\*worker process\*\*\*能做的事情，能避免因为事情太多导致并发太多处理不过来
