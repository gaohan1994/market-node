/**
 * @todo 帖子模块
 * @Author: Ghan 
 * @Date: 2020-03-04 11:18:04 
 * @Last Modified by: Ghan
 * @Last Modified time: 2020-03-04 16:19:15
 */

import Koa from 'koa';
import { Op } from 'sequelize';
import { UserModel, TopicModel } from '../../model';
import { responseCode, CommonInterface } from '../config';
import invariant from 'invariant';
import dayJs from 'dayjs';

class TopicController {

  public topicList = async (ctx: Koa.Context) => {
    try {
      const { offset = 0, limit = 20, order } = ctx.request.query as CommonInterface.FetchField;
      const result = await TopicModel.findAndCountAll({
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
   * @todo 查询帖子
   */
  public topicSearch = async (ctx: Koa.Context) => {
    try {
      const { word } = ctx.request.query;
      invariant(!!word, '请输入要查询的帖子');
      const result = await TopicModel.findAll({
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

  /**
   * @todo 发表帖子
   */
  public topicAdd = async (ctx: Koa.Context) => {
    try {
      const { 
        user_id,
        title,
        description,
        content,
        type,
        status,
        pics,
      } = ctx.request.body;

      /**
       * @todo [第一步验证商品信息是否齐全]
       */
      invariant(!!user_id, '请先验证身份信息');
      invariant(!!title, '商品标题不能为空');
      invariant(!!content, '请输入帖子内容');

      /**
       * @todo [第二步从数据库中查询用户信息是否存在]
       * @todo [如果有type则从数据库中查询type是否存在]
       */
      const user = await UserModel.findOne({where: user_id, raw: true});
      invariant(!!user, '该用户不存在');

      // if (type !== undefined) {
      //   const productType = await TypeModel.findOne({where: {id: type}});
      //   invariant(!!productType, '商品分类不存在');
      // }

      const newTopic = {
        user_id: user.user_id,
        viewing_count: Math.ceil(Math.random() * 1000),
        like_count: Math.ceil(Math.random() * 10),
        collect_count: Math.ceil(Math.random() * 10),
        title,
        description,
        type,
        status,
        pics,
        content,
        create_time: dayJs().format('YYYY-MM-DD HH:mm:ss'),
      };
      const result = await TopicModel.create(newTopic);
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
  public topicDelete = async (ctx: Koa.Context) => {
    try {
      const { id } = ctx.request.body;
      invariant(!!id, '请选择要删除的帖子id');

      const result: TopicModel = await TopicModel.findOne({where: {id}});
      invariant(!!result, '没有找到要删除的帖子');

      await TopicModel.update({
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
}

export default new TopicController();