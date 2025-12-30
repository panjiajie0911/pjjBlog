<!--
 * @Author: 潘家杰 panjiajie@chexiao.co
 * @Date: 2025-12-15 16:21:30
 * @LastEditors: 潘家杰 panjiajie@chexiao.co
 * @LastEditTime: 2025-12-30 18:35:47
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

- worker\*rlimit_nofile：所有 worker 进程能打开的最大文件描述符的数量。nginx 会给\*\*\_worker process**\*规定最多能做多少事情，包括\***网络连接数\*\*\*，\_\*\*读文件\*\*\*等等,每一件事情都是一个文件描述符。

nginx 因为是一个高并发的服务器，所以需要限制**_worker process_**能做的事情，能避免因为事情太多导致并发太多处理不过来。

### event 模块

event 模块是拿来规定**_事件驱动_**的工作方式的，nginx 的**_事件驱动_**的模式规定了它只响应有需求的请求，所以需要规定当请求过来的时候，**_worker process_**该用什么样的方式去处理这个请求。

- worker\*connections: 单个**_worker process_**最大并发链接数，即一个\*\*_worker process_\*\*能同时处理的链接的数。
- accept\*mutex: 对多个**_worker process_**接收连接进行序列化，防止多个进程对连接的争抢。意思是一个请求来的时候，多个**_worker process_**可能存在争抢。开启这个配置后， 那么 \*\*\*worker process\*\*\* 就会按照顺序来接收这个请求。
- multi_accept: 是否允许同时接收多个网络连接
- use: 指定事件模型，epoll | select | poll。epoll 模型是**_高并发_**的核心。当有**_事件驱动_**时候，**_worker process_**立即去响应它。select | poll 模式是每隔一段时间去访问**_worker process_**，效率低下。

### stream 模块

**_stream 模块_**用来处理原始的流数据，它处理所有**_非 http 请求_**。它在**_TCP/UDP 协议层_**（即网络的第 4 层），只认“IP + 端口”，不解析请求头，请求内容。主要配置如下：

- access_log: 权限日志配置
- error_log: 错误日志配置
- upstream + 服务器名称 {

  后端服务器组的配置，所有和 TCP/UDP 转发相关的配置都在这里。多个服务器以组合的形式出现在这里。

  - server + 服务器地址 + 端口：默认权重为 1。
  - server+ 服务器地址 + 端口 + weight:手动设置权重。
  - server+ 服务器地址 + 端口 + backup:备用节点。
  - least_conn :负载均衡策略选择\*\*\_按需分配请求\_\*\*。
    负载均衡是指多个请求配到服务器的模式，有下面几个模式
    - 轮询模式（默认）：按顺序循环分配。
    - least_conn：假如说有 n 台服务器，请求会把更多的请求优先分配给当前活跃连接最少的。
    - ip_hash：客户端 IP 哈希，固定客户端对应后端服务器。
    - weighted 轮询：只轮询**_指定权重_**的服务器。

}

### http 模块

**_ http 模块_**处理 HTTP/HTTPS 协议请求的核心模块。
{

- log_format：自定义访问日志的格式和内容 main '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
  '"$http_user_agent" "$http_x_forwarded_for"';
- access_log：访问日志的地址
- error_log: 错误日志的指定路径和日志级别
- keepalive_timeout:http 链接超市时间'
- gzip: 是否启用压缩。on 表示开启，off 表示关闭。
- gzip_types: 指定需要压缩的文件类型。文件类型可以是： text/html text/css application/json application/javascript 等等。
- client_max_body_size：C 端传输过来的文件的最大大小，默认是 1m
- tcp_nopush：一次性发送数据，减少网络传输次数。

  同时，http 模块也可以配置**_stream 模块_**，内容和上述一致。

  }

### server 模块

**_ server 模块_**可以在 http 模块和 stream 模块都配置，用于设置服务相关的配置。一个**_ server 模块_**代表的就是一个虚拟机。
{

- listen: 指定 Nginx 监听的端口（可指定 IP）；比如 192.168.1.1:80;或者 80（所有 ip 的 80 端口）
- server_name：绑定的任意个数的域名。
- root: 指定当前虚拟主机的静态网站根目录。
- index: 指定首页文件，当访问这个 server_name 的时候，自动查找该文件。
- ssl_certificate： 如果是 https 协议，则指定 ssl 证书的路径。
- ssl_certificate_key: 与上同理，则指定 SSL 私钥文件路径。
- error_page：网页错误时候的 html 文件
- location ：{
    <!-- http 的核心，它标识：当 location.pathname 匹配到设置的 location 的时候，则采用这个配置 -->

  - =符号是**_精确匹配_**，仅匹配完全一致的 URL 路径，比如=/index.html
  - ^~符号是**_前缀匹配_**，匹配以指定路径开头的 URL，且不进行正则匹配
  - ~符号是**_正则匹配_**，匹配以指定路径开头的 URL，进行正则匹配
  - /符号是**_普通前缀匹配_**，匹配以指定路径开头的 URL
    }
    }
