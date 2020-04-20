import { Sequelize } from "sequelize";

const env = process.env.NODE_ENV;

const config =
  env === "development"
    ? {
        database: "market", // 使用哪个数据库
        username: "root", // 用户名
        password: "root", // 口令
        host: "localhost", // 主机名
        port: 3306 // 端口号，MySQL默认3306
      }
    : {
        /**
         * @todo 生产环境
         */
        database: "market_prod", // 使用哪个数据库
        username: "root", // 用户名
        password: "root", // 口令
        host: "localhost", // 主机名
        port: 3306 // 端口号，MySQL默认3306
      };

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: "mysql",
    define: {
      timestamps: false
    }
  }
);

export { sequelize };
export default sequelize;

export { default as UserModel } from "./user.model";
export { default as ImageModel } from "./image.model";
export { default as ProductModel } from "./product.model";
export { default as AdminModel } from "./admin.model";
export { default as TypeModel } from "./type.model";
export { default as CollectModel } from "./colllect.model";
export { default as OrderModel } from "./order.model";
export { default as OrderItemModel } from "./order.item.model";
export { default as TopicModel } from "./topic.model";
export { default as LikeModel } from "./like.model";
export { default as MessageModel } from "./message.model";
export { default as DonateModel } from "./donate.model";
