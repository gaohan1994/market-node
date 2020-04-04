import { Model, DataTypes } from 'sequelize';
import sequelize, { UserModel } from './index';
import util from '../controller/config';

class ProductModel extends Model {
  public id!: number;
  public user_id!: number;
  public viewing_count!: number;
  public like_count!: number;
  public trans_type!: number;
  public type!: number;
  public phone!: string;
  public is_free_shipping!: number;
  public amount!: number;
  public exp_fee!: number;
  public status!: number;
  public description!: string;
  public title!: string;
  public create_time!: string;
  public update_time!: string;
  public pics!: string;
}

ProductModel.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: { type: DataTypes.INTEGER },
  like_count: { type: DataTypes.INTEGER },
  viewing_count: { type: DataTypes.INTEGER },
  trans_type: { type: DataTypes.INTEGER },
  type: { type: DataTypes.INTEGER },
  is_free_shipping: { type: DataTypes.INTEGER },
  amount: { type: DataTypes.INTEGER },
  exp_fee: { type: DataTypes.INTEGER },
  status: { type: DataTypes.INTEGER },
  description: { type: DataTypes.STRING },
  title: { type: DataTypes.STRING },
  create_time: { type: DataTypes.STRING },
  update_time: { type: DataTypes.STRING },
  pics: { type: DataTypes.STRING },
  phone: { type: DataTypes.STRING },
}, {
  sequelize,
  freezeTableName: true,
  modelName: 'market_item',
  hooks: {
    afterFind: async (product) => {
      /**
       * @todo [如果有图片则从image表中拿]
       */
      if (!!Array.isArray(product)) {
        for (const item of product) {
          if (!!item.pics) {
            const pics = await util.images(item.pics);
            item.pics = pics as any;
          } else {
            item.pics = [] as any;
          }
        }
      } else {
        if (!!product.pics) {
          const pics = await util.images(product.pics);
          product.pics = pics as any;
        } else {
          product.pics = [] as any;
        }
      }
    },
  }
});

ProductModel.belongsTo(UserModel, {
  as: 'userinfo',
  foreignKey: 'user_id',
  targetKey: 'user_id',
});

export default ProductModel;