import Koa from 'koa';
import { ProductModel, UserModel, TypeModel } from '../../model';
import { responseCode } from '../config';
import invariant from 'invariant';
import dayJs from 'dayjs';

class ProductController {
  
  public productList = async (ctx: Koa.Context) => {
    try {
      const result = await ProductModel.findAll(); 
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
        pics,
      } = ctx.request.body;

      /**
       * @todo [第一步验证商品信息是否齐全]
       */
      invariant(!!user_id, '请先验证身份信息');
      invariant(!!title, '商品标题不能为空');
      invariant(typeof trans_type === 'number', '商品交易方式不能为空');
      invariant(typeof amount === 'number', '请设置商品价格');

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
}

export default new ProductController();