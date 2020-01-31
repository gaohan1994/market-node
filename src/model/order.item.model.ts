
import { Model, DataTypes } from 'sequelize';
import sequelize, { OrderModel } from './index';

class OrderItemModel extends Model {
  id: number;
  order_no: string;
  user_id: number;
  product_id: number;
  product_name: string;
  product_picture: any[];
  package_id: number;
  amount: number;
  create_time: string;
  update_time: string;
}

OrderItemModel.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true
  },
  package_id: { type: DataTypes.INTEGER },
  user_id: { type: DataTypes.INTEGER },
  product_id: { type: DataTypes.INTEGER },
  amount: { type: DataTypes.INTEGER },
  order_no: { type: DataTypes.STRING },
  product_name: { type: DataTypes.STRING },
  product_picture: { type: DataTypes.STRING },
  create_time: { type: DataTypes.STRING },
  update_time: { type: DataTypes.STRING },
}, {
  sequelize,
  freezeTableName: true,
  modelName: 'market_order_item'
});

OrderItemModel.belongsTo(OrderModel, {
  as: 'order_item',
  foreignKey: 'order_no',
  targetKey: 'order_no',
});

export default OrderItemModel;