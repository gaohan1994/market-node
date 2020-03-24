import { Model, DataTypes } from 'sequelize';
import sequelize, { ProductModel } from './index';

class CollectModel extends Model {
  id: number;
  user_id: number;
  item_id: number;
  status: number;
  type: number;
  create_time: string;
  update_time: string;
}

CollectModel.init({
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
  modelName: 'market_collect',
});

CollectModel.belongsTo(ProductModel, {
  as: 'product',
  foreignKey: 'item_id',
  targetKey: 'id'
});

export default CollectModel;