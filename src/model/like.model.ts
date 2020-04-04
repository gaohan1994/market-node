import { Model, DataTypes } from 'sequelize';
import sequelize, { ProductModel, TopicModel } from './index';

class LikeModel extends Model {
  id: number;
  user_id: number;
  item_id: number;
  status: number;
  type: number;
  create_time: string;
  update_time: string;
}

LikeModel.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true
  },
  type: { type: DataTypes.INTEGER },
  user_id: { type: DataTypes.INTEGER },
  item_id: { type: DataTypes.INTEGER },
  status: { type: DataTypes.INTEGER },
  create_time: { type: DataTypes.STRING },
  update_time: { type: DataTypes.STRING },
}, {
  sequelize,
  freezeTableName: true,
  modelName: 'market_like',
});

LikeModel.belongsTo(ProductModel, {
  as: 'product',
  foreignKey: 'item_id',
  targetKey: 'id'
});

LikeModel.belongsTo(TopicModel, {
  as: 'topic',
  foreignKey: 'item_id',
  targetKey: 'id'
});

export default LikeModel;