import { Model, DataTypes } from 'sequelize';
import sequelize from './index';

class UserModel extends Model {
  public id!: number;
  public name!: string;
  public avatar!: string;
  public sex!: number;
  public birthday!: string;
  public intro!: string;
  public school!: string;
  public create_time!: string;
  public update_time!: string;
}

UserModel.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true
  },
  name: { type: DataTypes.STRING },
  avatar: { type: DataTypes.STRING },
  sex: { type: DataTypes.INTEGER },
  birthday: { type: DataTypes.STRING },
  intro: { type: DataTypes.STRING },
  school: { type: DataTypes.STRING },
  create_time: { type: DataTypes.STRING },
  update_time: { type: DataTypes.STRING },
}, {
  sequelize,
  freezeTableName: true,
  modelName: 'user_inf',
});

export default UserModel;