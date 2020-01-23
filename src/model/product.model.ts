import { Model, DataTypes } from 'sequelize';
import sequelize from './index';

class ProductModel extends Model {
  public id!: number;
  public seller!: number;
  public viewing_count!: number;
  public trans_type!: number;
  public type!: number;
  public is_free_shipping!: number;
  public amount!: number;
  public exp_fee!: number;
  public status!: number;
  public description!: string;
  public title!: string;
  public pic!: string;
  public unique_id!: string;
  public create_time!: string;
  public update_time!: string;
  public pics!: string[];
}

ProductModel.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true
  },
  seller: { type: DataTypes.INTEGER },
  viewing_count: { type: DataTypes.INTEGER },
  trans_type: { type: DataTypes.INTEGER },
  type: { type: DataTypes.INTEGER },
  is_free_shipping: { type: DataTypes.INTEGER },
  amount: { type: DataTypes.INTEGER },
  exp_fee: { type: DataTypes.INTEGER },
  status: { type: DataTypes.INTEGER },
  description: { type: DataTypes.STRING },
  title: { type: DataTypes.STRING },
  pic: { type: DataTypes.STRING },
  unique_id: { type: DataTypes.STRING },
  create_time: { type: DataTypes.STRING },
  update_time: { type: DataTypes.STRING },
  pics: { type: new DataTypes.ARRAY(DataTypes.STRING) }
}, {
  sequelize,
  freezeTableName: true,
  modelName: 'market_item',
});

export default ProductModel;