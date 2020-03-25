
import { Model, DataTypes } from 'sequelize';
import sequelize from './index';

class TypeModel extends Model {
  id!: number;
  name!: string;
  type!: number;
  picture!: string;
  create_time!: string;
  update_time!: string;
}

TypeModel.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true
  },
  type: { type: DataTypes.INTEGER },
  name: { type: DataTypes.STRING },
  create_time: { type: DataTypes.STRING },
  update_time: { type: DataTypes.STRING },
  picture: { type: DataTypes.STRING },
}, {
  sequelize,
  freezeTableName: true,
  modelName: 'market_type'
});

export default TypeModel;