/*
 * @Author: Ghan 
 * @Date: 2020-01-25 21:51:50 
 * @Last Modified by: Ghan
 * @Last Modified time: 2020-01-26 01:44:24
 */
import Koa from 'koa';
import { MessageModel, ProductModel, UserModel } from '../../model';
import { responseCode, CommonInterface } from '../config';
import invariant from 'invariant';
import dayJs from 'dayjs';
import { Op, Sequelize } from 'sequelize';
// import { merge } from 'lodash';

/**
 * @todo [留言/评论模块]
 *
 * @author Ghan
 * @class MessageController
 */
class MessageController {

  public messageAdd = async (ctx: Koa.Context) => {
    try {
      const {
        item_id,
        parent_id,
        reply_id,
        user_id,
        content,
      } = ctx.request.body;

      /**
       * @todo [校验]
       */
      invariant(!!item_id, '请传入评论的商品id');
      invariant(!!user_id, '请传入评论者id');
      invariant(!!content, '请输入评论内容');

      const product = await ProductModel.findOne({where: {id: item_id}, raw: true});
      invariant(!!product, '没有找到要评论的商品');

      const user = await UserModel.findOne({where: {user_id}, raw: true});
      invariant(!!user, '没有找到评论者');

      const newMessage = {
        seller_id: product.user_id,
        item_id,
        parent_id,
        reply_id,
        user_id,
        content,
        create_time: dayJs().format('YYYY-MM-DD HH:mm:ss'),
        update_time: dayJs().format('YYYY-MM-DD HH:mm:ss'),
      };

      const result = await MessageModel.create(newMessage);
      ctx.response.body = {
        code: responseCode.success,
        data: result,
        msg: '评论成功'
      };
    } catch (error) {
      ctx.response.body = {
        code: responseCode.error,
        msg: error.message
      };
    }
  }

  public messageDelete = async (ctx: Koa.Context) => {
    try {
      const { id } = ctx.request.body;
      invariant(!!id, '请传入要删除的评论id');

      const message = await MessageModel.findOne({where: { id }, raw: true});
      invariant(!!message, '没有找到要删除的评论');

      const result = await MessageModel.destroy({
        where: {
          [Op.or]: [
            {id},
            {parent_id: id}
          ]
        }
      });
      invariant(result !== 0, '删除评论失败');
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

  public messageList = async (ctx: Koa.Context) => {
    try {
      const { item_id, offset = 0, limit = 20 }: { item_id: number } & CommonInterface.FetchField = ctx.request.query;
      invariant(!!item_id, '请传入要查询评论的商品id');

      const product = await ProductModel.findOne({where: { id: item_id }, raw: true});
      invariant(!!product, '没有找到要查询的商品');

      /**
       * @todo [按照分页找到所有一级评论，然后找到这些一级评论的所有子评论]
       */
      const { count, rows } = await MessageModel.findAndCountAll({
        where: { 
          item_id,
          parent_id: 0
        },
        order: [['create_time', 'DESC']],
        include: [{
          model: UserModel,
          as: 'userinfo',
          attributes: ['user_id', ['name', 'username'], 'avatar', 'sex']
        }],
        offset: Number(offset),
        limit: Number(limit),
      });

      const data = JSON.parse(JSON.stringify(rows));

      const promise = new Promise((resolve, reject) => {
        
        data.forEach(async (topMessage: any, index: number) => {
          const secondMessages = await MessageModel.findAll({
            where: {
              item_id,
              parent_id: topMessage.id,
            },
            order: [['create_time', 'DESC']],
            include: [{
              model: UserModel,
              as: 'userinfo',
              attributes: ['user_id', ['name', 'username'], 'avatar', 'sex']
            }],
          });
          const secondMessageJson = JSON.parse(JSON.stringify(secondMessages));
          if (!!secondMessages) {
            data[index].subMessage = secondMessageJson;
          }
          if (index === data.length - 1) {
            resolve(data);
          }
        });
      });

      const resolveData = await promise;
      ctx.response.body = {
        code: responseCode.success,
        data: {
          count,
          rows: resolveData
        },
      };
    } catch (error) {
      ctx.response.body = {
        code: responseCode.error,
        msg: error.message
      };
    }
  }
}

export default new MessageController();