
import { Sequelize } from 'sequelize';

const config = {
  database: 'market', // 使用哪个数据库
  username: 'root', // 用户名
  password: 'root', // 口令
  host: 'localhost', // 主机名
  port: 3306 // 端口号，MySQL默认3306
};

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: 'mysql',
  define: {
    timestamps: false
  }
});

export { sequelize };
export default sequelize;

export { default as ProductModel } from './product.model';
export { default as AdminModel } from './admin.model';
export { default as UserModel } from './user.medel';