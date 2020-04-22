# Sequelize 导入数据库表 到本地项目
## sequelize-auto
##### 安装
- sequelize-auto 会以命令行的形式自动生成 SequelizeJS 的模型 Model。
- 需要安装 sequelize-auto 模块
```
npm install -g sequelize-auto or sudo npm install -g sequelize-auto (MAC)
```
- 但使用sequelize-auto前，还需要全局安装一个你所使用的数据库驱动。
  - 如果是 MySQL/MariaDB， 需要安装 mysql
  ```
    npm install -g mysql
  ```

##### 使用参数
```
sequelize-auto -h  -d  -u  -x [password] -p [port]  --dialect [dialect] -c [/path/to/config] -o [/path/to/models] -t [tableName]
```
- 上面的参数中只有 -h 和 -d 是必须的，其他参数都是可选的，每次参数意思说明如下：
  - h, --host - 数据库的IP/主机名 [必选]
  - d, --database - 数据库名 [必选]
  - u, --user - 数据库的用户名。默认将根据数据库类型的默认用户生成数据库名
  - x, --pass - 数据库的密码。默认为空
  - p, --port - 数据库连接端口。默认为所使用数据库类型的默认端口号
  - c, --config - JSON文件，用于Sequelize构造函数的'options'选项对象。
  - o, --output - 模型输出目录。默认会在当前目录下生成'./models'目录
  - e, --dialect - 所使用的数据库类型(驱动类型)。默认为mysql
  - a, --additional - 一个包含模型定义参数的JSON文件。
  - t, --tables - 指定所要导出的表，逗号分隔。默认为全部

##### 例如：
```
sequelize-auto -h xxx -d users -u user -x password -p 3306
```
- 这样我就把 users 库里的表全部导入到我本地的 ./models 里面
