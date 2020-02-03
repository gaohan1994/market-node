import Koa from 'koa';
import { Op } from 'sequelize';
import { ProductModel, UserModel, TypeModel, CollectModel } from '../../model';
import { responseCode, CommonInterface } from '../config';
import invariant from 'invariant';
import dayJs from 'dayjs';

class ProductController {

  public productSearch = async (ctx: Koa.Context) => {
    try {
      const { word } = ctx.request.query;
      invariant(!!word, '请输入要查询的商品名称');
      const result = await ProductModel.findAll({
        where: {
          [Op.or]: [
            { 
              title: {
                [Op.like]: `%${word}%`
              }
            },
            {
              description: {
                [Op.like]: `%${word}%`
              }
            }
          ]
        },
        include: [{
          model: UserModel,
          as: 'userinfo',
          attributes: ['user_id', ['name', 'username'], 'avatar', 'sex']
        }],
      });
      ctx.response.body = {
        code: responseCode.success,
        data: result
      };
    } catch (error) {
      ctx.response.body = {
        code: responseCode.error,
        msg: error.message
      };
    }
  }
  
  public productList = async (ctx: Koa.Context) => {
    try {
      const { offset = 0, limit = 20, order } = ctx.request.query as CommonInterface.FetchField;
      const result = await ProductModel.findAndCountAll({
        offset: Number(offset),
        limit: Number(limit),
        order: [['create_time', 'DESC']],
        where: {
          status: 1
        },
        include: [{
          model: UserModel,
          as: 'userinfo',
          attributes: ['user_id', ['name', 'username'], 'avatar', 'sex']
        }],
      }); 
      ctx.response.body = {
        code: responseCode.success,
        data: result
      };
    } catch (error) {
      ctx.response.body = {
        code: responseCode.error,
        msg: error.message
      };
    }
  }

  /**
   * @todo [获取推荐商品]
   *
   * @memberof ProductController
   */
  public productListRandom = async (ctx: Koa.Context) => {
    try {
      const result = await ProductModel.findAll({
        order: [['viewing_count', 'DESC']],
        where: {
          status: 1,
        },
        offset: 0,
        limit: 20,
        raw: true
      });
      ctx.response.body = {
        code: responseCode.success,
        data: result
      };
    } catch (error) {
      ctx.response.body = {
        code: responseCode.error,
        msg: error.message
      };
    }
  }

  public productAdd = async (ctx: Koa.Context) => {
    try {
      const { 
        user_id,
        viewing_count,
        title,
        description,
        trans_type,
        type,
        is_free_shipping,
        amount,
        exp_fee,
        status,
        pics = [],
      } = ctx.request.body;

      /**
       * @todo [第一步验证商品信息是否齐全]
       */
      invariant(!!user_id, '请先验证身份信息');
      invariant(!!title, '商品标题不能为空');
      invariant(typeof trans_type === 'number', '商品交易方式不能为空');
      invariant(!!amount, '请设置商品价格');

      /**
       * @todo [第二步从数据库中查询用户信息是否存在]
       * @todo [如果有type则从数据库中查询type是否存在]
       */
      const user = await UserModel.findOne({where: user_id, raw: true});
      invariant(!!user, '该用户不存在');

      if (type !== undefined) {
        const productType = await TypeModel.findOne({where: {id: type}});
        invariant(!!productType, '商品分类不存在');
      }

      const newProduct = {
        user_id: user.user_id,
        viewing_count: Math.ceil(Math.random() * 1000),
        title,
        description,
        trans_type,
        type,
        is_free_shipping,
        amount,
        exp_fee,
        status,
        pics,
        create_time: dayJs().format('YYYY-MM-DD HH:mm:ss'),
      };
      const result = await ProductModel.create(newProduct);
      invariant(!!result, '发布商品失败');
      
      ctx.response.body = {
        code: responseCode.success,
        data: result,
        msg: '发布成功'
      };
    } catch (error) {
      ctx.response.body = {
        code: responseCode.error,
        msg: error.message
      };
    }
  }

  /**
   * @todo [删除商品信息]
   *
   * @memberof ProductController
   */
  public productDelete = async (ctx: Koa.Context) => {
    try {
      const { id } = ctx.request.body;
      invariant(!!id, '请选择要删除的商品id');

      const result: ProductModel = await ProductModel.findOne({where: {id}});
      invariant(!!result, '没有找到要删除的商品');

      await ProductModel.update({
        status: 0,
      }, {
        where: { id }
      });
      ctx.response.body = {
        code: responseCode.success,
        msg: '删除成功'
      };
    } catch (error) {
      ctx.response.body = {
        code: responseCode.error,
        msg: error.message
      };
    }
  }

  /**
   * @todo [更改商品信息]
   *
   * @memberof ProductController
   */
  public productUpdate = async (ctx: Koa.Context) => {
    try {
      /**
       * @todo [验证表单信息]
       */
      const { id, viewing_count, title, description, trans_type, type, is_free_shipping, amount, exp_fee, status, pics } = ctx.request.body;
      invariant(!!id, '请选择要更新的商品');
      invariant(!!title, '商品标题不能为空');
      invariant(typeof trans_type === 'number', '商品交易方式不能为空');
      invariant(typeof amount === 'number', '请设置商品价格');

      /**
       * @todo [商品是否修改分类]
       */
      
    } catch (error) {
      ctx.response.body = {
        code: responseCode.error,
        msg: error.message
      };
    }
  }

  /**
   * @todo [商品详情]
   *
   * @memberof ProductController
   */
  public productDetail = async (ctx: Koa.Context) => {
    try {
      const { id } = ctx.request.query;
      invariant(!!id, '请传入要查询的商品id');

      const product = await ProductModel.findOne({
        where: {id}, 
        include: [{
          model: UserModel,
          as: 'userinfo',
          attributes: ['user_id', ['name', 'username'], 'avatar', 'sex']
        }],
        raw: false
      });
      invariant(!!product, '没有找到该商品详情');
      ProductModel.update({viewing_count: product.viewing_count + 1}, {where: {id}});

      ctx.response.body = {
        code: responseCode.success,
        data: product
      };
    } catch (error) {
      ctx.response.body = {
        code: responseCode.error,
        msg: error.message
      };
    }
  }
}

export default new ProductController();