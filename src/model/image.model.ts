import { Model, DataTypes } from 'sequelize';
import sequelize from './index';

class ImageModel extends Model {
  id: number;
  url: string;
}

ImageModel.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true
  },
  url: { type: DataTypes.STRING },
}, {
  sequelize,
  freezeTableName: true,
  modelName: 'market_image',
});

export default ImageModel;