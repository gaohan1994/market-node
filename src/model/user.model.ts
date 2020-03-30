import { Model, DataTypes } from 'sequelize';
import sequelize from './index';

class UserModel extends Model {
  public user_id!: number;
  public name!: string;
  public birthday!: string;
  public openId!: string;
  public avatarUrl!: string;
  public city!: string;
  public country!: string;
  public nickName!: string;
  public language!: string;
  public province!: string;
  public gender!: number;
  public intro!: string;
  public school!: string;
  public create_time!: string;
  public update_time!: string;
}

UserModel.init({
  user_id: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true
  },
  openId: { type: DataTypes.STRING, field: 'openId' },
  avatarUrl: { type: DataTypes.STRING },
  city: { type: DataTypes.STRING },
  country: { type: DataTypes.STRING },
  nickName: { type: DataTypes.STRING },
  language: { type: DataTypes.STRING },
  province: { type: DataTypes.STRING },
  gender: { type: DataTypes.INTEGER },
  name: { type: DataTypes.STRING },
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