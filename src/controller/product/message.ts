/*
 * @Author: Ghan
 * @Date: 2020-01-25 21:51:50
 * @Last Modified by: Ghan
 * @Last Modified time: 2020-04-20 17:15:03
 */
import Koa from "koa";
import {
  MessageModel,
  ProductModel,
  UserModel,
  TopicModel,
  LikeModel
} from "../../model";
import { responseCode, CommonInterface } from "../config";
import invariant from "invariant";
import dayJs from "dayjs";
import { Op, Sequelize } from "sequelize";
import { merge } from "lodash";

/**
 * @todo [留言/评论模块]
 *
 * @author Ghan
 * @class MessageController
 */
class MessageController {
  /**
   * @todo [加入评论点赞功能]
   */
  public messageLike = async (ctx: Koa.Context) => {
    try {
      const { item_id, id, user_id } = ctx.request.body;
    } catch (error) {
      ctx.response.body = {
        code: responseCode.error,
        msg: error.message
      };
    }
  };

  public messageAdd = async (ctx: Koa.Context) => {
    try {
      const {
        item_id,
        parent_id,
        reply_id,
        user_id,
        content,
        type = 0
      } = ctx.request.body;

      /**
       * @todo [校验]
       */
      invariant(!!item_id, "请传入评论的商品id");
      invariant(!!user_id, "请传入评论者id");
      invariant(!!content, "请输入评论内容");

      let item;

      if (type === 0) {
        item = await ProductModel.findOne({
          where: { id: item_id },
          raw: true
        });
        invariant(!!item, "没有找到要评论的商品");
      } else {
        item = await TopicModel.findOne({ where: { id: item_id }, raw: true });
        invariant(!!item, "没有找到要评论的帖子");
      }

      const user = await UserModel.findOne({ where: { user_id }, raw: true });
      invariant(!!user, "没有找到评论者");

      const newMessage = {
        seller_id: item.user_id,
        item_id,
        parent_id,
        reply_id,
        user_id,
        content,
        type,
        create_time: dayJs().format("YYYY-MM-DD HH:mm:ss"),
        update_time: dayJs().format("YYYY-MM-DD HH:mm:ss")
      };

      const result = await MessageModel.create(newMessage);
      ctx.response.body = {
        code: responseCode.success,
        data: result,
        msg: "评论成功"
      };
    } catch (error) {
      ctx.response.body = {
        code: responseCode.error,
        msg: error.message
      };
    }
  };

  public messageDelete = async (ctx: Koa.Context) => {
    try {
      const { id } = ctx.request.body;
      invariant(!!id, "请传入要删除的评论id");

      const message = await MessageModel.findOne({ where: { id }, raw: true });
      invariant(!!message, "没有找到要删除的评论");

      const result = await MessageModel.destroy({
        where: {
          [Op.or]: [{ id }, { parent_id: id }]
        }
      });
      invariant(result !== 0, "删除评论失败");
      ctx.response.body = {
        code: responseCode.success,
        msg: "删除成功"
      };
    } catch (error) {
      ctx.response.body = {
        code: responseCode.error,
        msg: error.message
      };
    }
  };

  public messageUserList = async (ctx: Koa.Context) => {
    try {
      const {
        type,
        user_id,
        offset = 0,
        limit = 20
      }: {
        user_id: number;
        type: number;
      } & CommonInterface.FetchField = ctx.request.query;
      /**
       * @todo [按照分页找到所有一级评论，然后找到这些一级评论的所有子评论]
       */
      const { count, rows } = await MessageModel.findAndCountAll({
        where: {
          seller_id: user_id,
          ...(!!type ? { type } : {})
        },
        order: [["create_time", "DESC"]],
        include: [
          {
            model: UserModel,
            as: "userinfo"
          }
        ],
        offset: Number(offset),
        limit: Number(limit)
      });
      if (count > 0 && !!rows) {
        const data = JSON.parse(JSON.stringify(rows));
        const promise = new Promise((resolve, reject) => {
          data.forEach(async (topMessage: any, index: number) => {
            const replyUserinfo = await UserModel.findOne({
              where: { user_id: topMessage.user_id },
              raw: true
            });
            if (!!replyUserinfo) {
              data[index].replyUserinfo = replyUserinfo;
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
          }
        };
        return;
      } else {
        ctx.response.body = {
          code: responseCode.success,
          data: {
            count,
            rows
          }
        };
      }
    } catch (error) {
      ctx.response.body = {
        code: responseCode.error,
        msg: error.message
      };
    }
  };

  public getMessageItems = async params => {
    const { item_id, user_id, parent_id, type } = params;
    const messageItems = await MessageModel.findAll({
      where: {
        item_id,
        parent_id: parent_id,
        type
      },
      order: [["create_time", "DESC"]],
      include: [
        {
          model: UserModel,
          as: "userinfo"
        }
      ]
    });
    const secondMessageJson = JSON.parse(JSON.stringify(messageItems));
    const promise = new Promise(resolve => {
      if (secondMessageJson.length === 0) {
        resolve(secondMessageJson);
      }
      secondMessageJson.forEach(async (secondMessage, index) => {
        const like = await LikeModel.findOne({
          where: {
            item_id: secondMessage.id,
            user_id
          }
        });
        secondMessageJson[index].like = like;
        if (index === secondMessageJson.length - 1) {
          resolve(secondMessageJson);
        }
      });
    });
    return promise;
  };

  public messageList = async (ctx: Koa.Context) => {
    try {
      const {
        item_id,
        user_id,
        type = 0,
        offset = 0,
        limit = 20,
        order = "create_time"
      }: {
        item_id: number;
        type: number;
      } & CommonInterface.FetchField = ctx.request.query;
      invariant(!!item_id, "请传入要查询评论的商品id");
      /**
       * @todo [按照分页找到所有一级评论，然后找到这些一级评论的所有子评论]
       */
      const { count, rows } = await MessageModel.findAndCountAll({
        where: {
          item_id,
          parent_id: 0,
          type
        },
        order: [[order, "DESC"]],
        include: [
          {
            model: UserModel,
            as: "userinfo"
          }
        ],
        offset: Number(offset),
        limit: Number(limit)
      });

      if (count > 0 && !!rows) {
        const data = JSON.parse(JSON.stringify(rows));

        const promises = [];
        data.forEach(async (topMessage: any, index: number) => {
          /**
           * @todo [顶层评论是否点赞]
           */
          const promise = new Promise(async resolve => {
            const topLike = await LikeModel.findOne({
              where: { item_id: topMessage.id, user_id: user_id },
              raw: true
            });
            data[index].like = topLike;

            const secondMessageItems = await this.getMessageItems({
              item_id,
              parent_id: topMessage.id,
              user_id,
              type
            });
            data[index] = merge(
              {},
              {
                ...data[index],
                subMessage: secondMessageItems
              }
            );
            const currentItem = {
              ...data[index],
              like: topLike,
              subMessage: secondMessageItems
            };
            resolve(currentItem);
          });
          promises.push(promise);
        });

        return Promise.all(promises)
          .then(resolveData => {
            ctx.response.body = {
              code: responseCode.success,
              data: {
                count,
                rows: resolveData
              }
            };
          })
          .catch(error => {
            ctx.response.body = {
              code: responseCode.error,
              msg: error.message
            };
          });
      } else {
        ctx.response.body = {
          code: responseCode.success,
          data: {
            count,
            rows
          }
        };
      }
    } catch (error) {
      ctx.response.body = {
        code: responseCode.error,
        msg: error.message
      };
    }
  };
}

export default new MessageController();
