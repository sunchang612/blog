## 安装指定的版本
```
$ npm install -g @tarojs/cli@2.2.11
```
### OR 使用 yarn 安装 CLI
```
$ yarn global add @tarojs/cli@2.2.11
```
### 然后升级项目依赖
```
taro update project 2.2.11 
```
## 删除 taro 
```
cd /usr/local/lib/node_modules
sudo rm -rf \@tarojs/

cd /usr/local/bin
rm -f taro
```

## 创建项目
```
$ taro init myApp
```
### 如果遇到
- (node:77614) UnhandledPromiseRejectionWarning: Error: EACCES: permission denied, mkdir '/usr/local/lib/node_modules/@tarojs/cli/templates/taro-temp'
(Use `node --trace-warnings ...` to show where the warning was created)
- 没有权限 需要加权限
#### 解决方式
1. 执行 npm root -g 拿到路径信息
```
npm root -g
```
2. sudo chown -R $电脑用户名 $上一步得到的路径
例如：
```
sudo chown -R achang /usr/local/lib/node_modules
```
