import Koa from "koa";
import { responseCode } from "../config";
import {
  LikeModel,
  UserModel,
  ProductModel,
  TopicModel,
  MessageModel
} from "../../model";
import invariant from "invariant";
import dayJs from "dayjs";

/**
 * @todo [点赞模块]
 * @Author: Ghan
 * @Date: 2020-01-30 10:56:09
 * @Last Modified by: Ghan
 * @Last Modified time: 2020-04-20 13:50:11
 */

class LikeController {
  public itemLike = async (params: any) => {
    const like = await LikeModel.findOne({ where: params, raw: true });
    if (!!like) {
      return like;
    }
    return {};
  };

  public execItemLike = async (type: number, item_id: any, status: string) => {
    console.log("status:", status);
    console.log("type:", type);
    console.log("item_id:", item_id);

    let promise;

    if (type === 0) {
      // 商品
      const product = await ProductModel.findOne({ where: { id: item_id } });
      console.log("product: ", product);
      promise = ProductModel.update(
        {
          like_count:
            status === "add" ? product.like_count + 1 : product.like_count - 1
        },
        {
          where: {
            id: item_id
          }
        }
      );
      return promise;
    } else if (type === 1) {
      // 帖子
      const topic = await TopicModel.findOne({ where: { id: item_id } });
      promise = TopicModel.update(
        {
          like_count:
            status === "add" ? topic.like_count + 1 : topic.like_count - 1
        },
        {
          where: {
            id: item_id
          }
        }
      );
      return promise;
    }

    // 留言
    const message = await MessageModel.findOne({ where: { id: item_id } });
    promise = MessageModel.update(
      {
        like_count:
          status === "add" ? message.like_count + 1 : message.like_count - 1
      },
      {
        where: {
          id: item_id
        }
      }
    );

    return promise;
  };

  public like = async (ctx: Koa.Context) => {
    try {
      const { user_id, item_id, type = 0 } = ctx.request.body;
      invariant(!!user_id, "请传入用户id");
      invariant(!!item_id, "请传入商品id");

      const user = await UserModel.findOne({ where: { user_id }, raw: true });
      invariant(!!user, "没有找到该用户");
      const like = await LikeModel.findOne({
        where: {
          user_id,
          item_id,
          type
        },
        raw: true
      });
      await this.execItemLike(type, item_id, !like ? "add" : "reduce");
      if (!!like) {
        // 已经点赞 则取消点赞
        await LikeModel.destroy({ where: { id: like.id } });
        ctx.response.body = {
          code: responseCode.success,
          data: {},
          msg: "取消点赞"
        };
        return;
      }

      const result = await LikeModel.create({
        user_id,
        item_id,
        type,
        create_time: dayJs().format("YYYY-MM-DD HH:mm:ss"),
        update_time: dayJs().format("YYYY-MM-DD HH:mm:ss")
      });
      invariant(!!result, "点赞失败");
      ctx.response.body = {
        code: responseCode.success,
        data: result,
        msg: "点赞成功"
      };
    } catch (error) {
      ctx.response.body = {
        code: responseCode.error,
        msg: error.message
      };
    }
  };
}

export default new LikeController();
