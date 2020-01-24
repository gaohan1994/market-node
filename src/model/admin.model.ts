import { Model, DataTypes } from 'sequelize';
import sequelize from './index';

class AdminModel extends Model {
  user_id!: number;
  login_name!: string;
  user_name!: string;
  email!: string;
  phone!: string;
  sex!: string;
  avatar!: string;
  password!: string;
  status!: string;
  create_by!: string;
  create_time!: string;
  update_by!: string;
  update_time!: string;
  remark!: string;
}

AdminModel.init({
  user_id: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true
  },
  login_name: { type: DataTypes.STRING },
  user_name: { type: DataTypes.STRING },
  email: { type: DataTypes.STRING },
  phone: { type: DataTypes.STRING },
  sex: { type: DataTypes.STRING },
  avatar: { type: DataTypes.STRING },
  password: { type: DataTypes.STRING },
  status: { type: DataTypes.STRING },
  create_by: { type: DataTypes.STRING },
  create_time: { type: DataTypes.STRING },
  update_by: { type: DataTypes.STRING },
  update_time: { type: DataTypes.STRING },
  remark: { type: DataTypes.STRING },
}, {
  sequelize,
  freezeTableName: true,
  modelName: 'sys_user',
  defaultScope: {
    attributes: {
      exclude: ['password']
    }
  }
});

export default AdminModel;