
import { Model, DataTypes } from 'sequelize';
import sequelize, { UserModel } from './index';

class MessageModel extends Model {
  id: number;
  seller_id: number;
  item_id: number;
  parent_id: number;
  reply_id: number;
  user_id: number;
  content: string;
  thumbs: number;
  bit_log: number;
  type: number;
  create_time: string;
  update_time: string;
}

MessageModel.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true
  },
  type: { type: DataTypes.INTEGER },
  seller_id: { type: DataTypes.INTEGER },
  item_id: { type: DataTypes.INTEGER },
  parent_id: { type: DataTypes.INTEGER },
  reply_id: { type: DataTypes.INTEGER },
  user_id: { type: DataTypes.INTEGER },
  thumbs: { type: DataTypes.INTEGER },
  bit_log: { type: DataTypes.INTEGER },
  content: { type: DataTypes.STRING },
  create_time: { type: DataTypes.STRING },
  update_time: { type: DataTypes.STRING },
}, {
  sequelize,
  freezeTableName: true,
  modelName: 'market_message'
});

MessageModel.belongsTo(UserModel, {
  as: 'userinfo',
  foreignKey: 'user_id',
  targetKey: 'user_id',
});

export default MessageModel;