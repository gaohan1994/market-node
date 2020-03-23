import Koa from 'koa';
import { responseCode } from '../config';
import { CollectModel, UserModel, ProductModel } from '../../model';
import invariant from 'invariant';
import dayJs from 'dayjs';

/**
 * @todo [收藏模块]
 * @Author: Ghan 
 * @Date: 2020-01-30 10:56:09 
 * @Last Modified by: Ghan
 * @Last Modified time: 2020-01-31 23:27:13
 */

class CollectController {

  public collect = async (ctx: Koa.Context) => {
    try {
      const { user_id, product_id } = ctx.request.query;
      invariant(!!user_id, '请传入用户id');
      invariant(!!product_id, '请传入商品id');

      const collect = await CollectModel.findOne({
        where: {
          user_id,
          item_id: product_id,
        },
        attributes: ['id', 'user_id', 'item_id'],
        raw: true
      });
      console.log('collect: ', collect);
      const data = !!collect ? {
        ...collect,
        collect: !!(collect && collect.id)
      } : {
        user_id,
        item_id: product_id,
        collect: !!(collect && collect.id)
      };
      console.log('data: ', data);
      ctx.response.body = {
        code: responseCode.success,
        data
      };
    } catch (error) {
      ctx.response.body = {
        code: responseCode.error,
        msg: error.message
      };
    }
  }

  public collectList = async (ctx: Koa.Context) => {
    try {
      const { offset = 0, limit = 20, user_id } = ctx.request.query;
      invariant(!!user_id, '请传入用户id');
      const result = await CollectModel.findAndCountAll({
        where: {
          status: 1,
          user_id,
        },
        include: [{
          model: ProductModel,
          as: 'product',
          include: [{
            model: UserModel,
            as: 'userinfo',
            attributes: {
              exclude: [],
            }
          }],
        }],
        attributes: ['id', 'status', 'user_id'],
        limit: Number(limit),
        offset: Number(offset),
        raw: false,
      });
      ctx.response.body = {
        code: responseCode.success,
        data: result,
      };
    } catch (error) {
      ctx.response.body = {
        code: responseCode.error,
        msg: error.message
      };
    }
  }

  public collectAdd = async (ctx: Koa.Context) => {
    try {
      const { user_id, item_id } = ctx.request.body;
      invariant(!!user_id, '请传入用户id');
      invariant(!!item_id, '请传入商品id');

      const user = await UserModel.findOne({where: { user_id }, raw: true});
      invariant(!!user, '没有找到该用户');
      const product = await ProductModel.findOne({where: { id: item_id }, raw: true });
      invariant(!!product, '没有找到要收藏的商品');
      const collect = await CollectModel.findOne({
        where: {
          user_id,
          item_id
        },
        raw: true
      });
      invariant(!collect, '您已收藏该商品');

      const result = await CollectModel.create({
        user_id,
        item_id,
        create_time: dayJs().format('YYYY-MM-DD HH:mm:ss'),
        update_time: dayJs().format('YYYY-MM-DD HH:mm:ss'),
      });
      invariant(!!result, '收藏失败');
      ctx.response.body = {
        code: responseCode.success,
        data: result,
        msg: '收藏成功'
      };
    } catch (error) {
      ctx.response.body = {
        code: responseCode.error,
        msg: error.message
      };
    }
  }

  public collectDelete = async (ctx: Koa.Context) => {
    try {
      const { id } = ctx.request.body;
      invariant(!!id, '请传入收藏id');

      const collect = await CollectModel.findOne({where: {id}, raw: true});
      invariant(!!collect, '没有找到该收藏品');

      const result = await CollectModel.destroy({where: {id}});
      ctx.response.body = {
        code: responseCode.success,
        data: result,
        msg: '取消收藏',
      };
    } catch (error) {
      ctx.response.body = {
        code: responseCode.error,
        msg: error.message
      };
    }
  }
}

export default new CollectController();