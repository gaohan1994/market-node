import { Model, DataTypes } from 'sequelize';
import sequelize, { UserModel } from './index';

class ProductModel extends Model {
  public id!: number;
  public user_id!: number;
  public viewing_count!: number;
  public like_count!: number;
  public collect_count!: number;
  public type!: number;
  public status!: number;
  public description!: string;
  public title!: string;
  public create_time!: string;
  public update_time!: string;
  public pics!: string;
  public content!: string;
}

ProductModel.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: { type: DataTypes.INTEGER },
  viewing_count: { type: DataTypes.INTEGER },
  like_count: { type: DataTypes.INTEGER },
  collect_count: { type: DataTypes.INTEGER },
  type: { type: DataTypes.INTEGER },
  status: { type: DataTypes.INTEGER },
  description: { type: DataTypes.STRING },
  content: { type: DataTypes.STRING },
  title: { type: DataTypes.STRING },
  create_time: { type: DataTypes.STRING },
  update_time: { type: DataTypes.STRING },
  pics: { type: DataTypes.STRING }
}, {
  sequelize,
  freezeTableName: true,
  modelName: 'market_topic',
});

ProductModel.belongsTo(UserModel, {
  as: 'userinfo',
  foreignKey: 'user_id',
  targetKey: 'user_id',
});

export default ProductModel;