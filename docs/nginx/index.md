# 关于 nginx

## 正向代理和反向代理

| 正向代理                   | 反向代理                       |
| -------------------------- | ------------------------------ |
| 客户端能感知，知道代理存在 | 客户端不能感知，不知道代理存在 |
| 隐藏真实客户端             | 隐藏真实服务端                 |

正向代理：客户端不直接访问服务器， 通过代理服务器访，服务器不知道客户端的 IP,只知道代理服务器的 IP。此时，客户端和代理服务器是“一体”。

反向代理：客户端直接访问代理服务器，不直接访问服务器，由代理服务器去分发请求。此时，代理服务器和服务器是“一体”。

![alt text](./image.png)

nginx 就是反向代理的这个代理服务器。

## 目录结构

```bash
├──client_body_temp                 #POST 大文件暂存目录
├──conf                             #Nginx 所有配置文件的目录
│    ├──fastcgi.conf                 #fastcgi 相关参数的配置文件
│   ├── fastcgi.conf.default         # fastcgi.conf 的原始备份文件
│   ├── fastcgi_params               # fastcgi 的参数文件
│   ├── fastcgi_params.default      
│   ├── koi-utf
│   ├── koi-win
│   ├── mime.types                   #  媒体类型
│   ├── mime.types.default
│   ├── nginx.conf                   #这是 Nginx 默认的主配置文件，日常使用和修改的文件
│   ├── nginx.conf.default
│   ├── scgi_params                 # scgi 相关参数文件
│   ├── scgi_params.default  
│   ├── uwsgi_params                 # uwsgi 相关参数文件
│   ├── uwsgi_params.default
│   └── win-utf
├── fastcgi_temp                     # fastcgi 临时数据目录
├── html                             # Nginx 默认站点目录
│   ├── 50x.html                     #  错误页面优雅替代显示文件，例如出现 502 错误时会调用此页面
│   └── index.html                   #  默认的首页文件
├── logs                             # Nginx 日志目录
│   ├── access.log                   #  访问日志文件
│   ├── error.log                   #  错误日志文件
│   └── nginx.pid                   # pid 文件，Nginx 进程启动后，会把所有进程的 ID 号写到此文件
├── proxy_temp                       #  临时目录
├──sbin                             #Nginx 可执行文件目录
│   └──nginx                       #Nginx 二进制可执行程序
├──scgi_temp                       #临时目录
└──uwsgi_temp                      #临时目录
```

## 核心文件 nginx.conf

nginx 的核心功能在 conf 文件夹中的 **nginx.conf** 文件中。

**nginx.conf** 本质上是一个一个的模块，一个{}用来表示一个模块，模块中再设置具体的指令。它的结构如下：

```bash
全局模块 #nginx的用户名，日志的存放路径
events模块 #事件模块
http模块 #配置和http相关的模块，比如超时连接时间，代理等等，内含server模块
  server模块 #配置虚拟主机，内含location模块
    location模块 #配置url路由规则

```

比如下面这样的基础配置

```vbscript
全局模块
event 模块
http 模块
    server模块  // server模块可以是多个
        location块 //  location块可以是多个
        location块
        ....
    server模块
        location块
        location块
        ...
    ....
```

基础的参数配置详解，请参见 **nginx.conf**文件。
