# 使用一个基础的 Node.js 镜像作为构建环境
FROM node:20-alpine as build-stage

# 设置工作目录
WORKDIR /app

# 将项目文件复制到容器中
COPY package*.json ./
RUN yarn install

# 复制整个项目并构建
COPY . .
RUN yarn build

# 使用 Nginx 镜像作为 Web 服务器
FROM nginx:stable-alpine as production-stage

# 将构建好的前端静态文件复制到 Nginx 的默认网站目录
COPY --from=build-stage /app/dist /usr/share/nginx/html

# 防止刷新页面后，返回404
COPY ./nginx.conf /etc/nginx/nginx.conf

# 暴露 Nginx 默认的 HTTP 端口
EXPOSE 80

# 启动 Nginx 服务器
CMD ["nginx", "-g", "daemon off;"]