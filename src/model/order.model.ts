
import { Model, DataTypes } from 'sequelize';
import sequelize from './index';

class OrderModel extends Model {
  id: number;
  user_id: number;
  pay_amount: number;
  exp_fee: number;
  product_id: number;
  package_id: number;
  amount: number;
  product_picture: string;
  product_name: string;
  flag: number;
  status: number;
  pay_status: number;
  seller_id: number;
  is_delete: number;
  logistics_no: string;
  order_no: string;
  random_key: string;
  trans_time: string;
  reject_reason: string;
  refund_no: string;
  notify_url: string;
  create_time: string;
  update_time: string;
}

OrderModel.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: { type: DataTypes.INTEGER },
  pay_amount: { type: DataTypes.INTEGER },
  exp_fee: { type: DataTypes.INTEGER },
  flag: { type: DataTypes.INTEGER },
  status: { type: DataTypes.INTEGER },
  pay_status: { type: DataTypes.INTEGER },
  seller_id: { type: DataTypes.INTEGER },
  is_delete: { type: DataTypes.INTEGER },
  logistics_no: { type: DataTypes.STRING },
  order_no: { type: DataTypes.STRING },
  random_key: { type: DataTypes.STRING },
  trans_time: { type: DataTypes.STRING },
  reject_reason: { type: DataTypes.STRING },
  refund_no: { type: DataTypes.STRING },
  notify_url: { type: DataTypes.STRING },
  product_id: { type: DataTypes.INTEGER },
  product_picture: { type: new DataTypes.ARRAY(DataTypes.STRING) },
  package_id: { type: DataTypes.INTEGER },
  amount: { type: DataTypes.INTEGER },
  product_name: { type: DataTypes.STRING }, 
  create_time: { type: DataTypes.STRING },
  update_time: { type: DataTypes.STRING },
}, {
  sequelize,
  freezeTableName: true,
  modelName: 'market_order'
});

export default OrderModel;