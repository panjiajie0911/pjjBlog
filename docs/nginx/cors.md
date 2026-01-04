# nginx 如何理解和解决跨域 CORS

## 跨域

跨域的核心是 CORS 策略，在响应中添加浏览器认可的 CORS 头信息，浏览器就能允许跨域请求。

nginx 作为反向代理服务器，把浏览器的请求先代理到 nginx 服务器, 然后 nginx 服务器把这个请求转发到目标服务器，这样就能解决跨域。

整个过程是这样的：

客户端发布请求 -> 到 nginx 服务器 -> nginx 服务器匹配路由 -> 匹配到路由了，nginx 服务器修改请求头 -> 转发到目标服务器。

那么在 nginx 中，我们就需要准备好**_server 模块_**和**_location 模块_**，等待 http 请求过来即可。

## 配置

```bash
server {
    location / {
        root html;
        index index.html index.htm;
        add_header 'Access-Control-Allow-Origin' '\*';  # 允许 cros 跨域访问
    }

    //自定义本地路径
    location /apis {
        rewrite  ^.+apis/?(.*)$ /$1 break; # 重写请求路径
        include  uwsgi_params;
        proxy_pass   http://www.binghe.com;
    }

}
```
