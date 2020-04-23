/**
 * @todo 捐献模块
 * @Author: Ghan
 * @Date: 2020-03-04 11:18:04
 * @Last Modified by: Ghan
 * @Last Modified time: 2020-03-25 15:07:11
 */

import Koa from "koa";
import { UserModel, DonateModel } from "../../model";
import util, { responseCode } from "../config";
import invariant from "invariant";
import dayJs from "dayjs";

class DonateController {
  public donateReceive = async (ctx: Koa.Context) => {
    try {
      const { id } = ctx.request.body;
      invariant(!!id, "请传入要接收的id");

      const donate = await DonateModel.findOne({
        where: { id },
        raw: false
      });
      invariant(!!donate, "没有找到详情");
      console.log("====================================");
      console.log("donate", donate);
      console.log("====================================");
      /**
       * @todo 找到之后接收
       */
      await DonateModel.update({ status: 2 }, { where: { id } });

      ctx.response.body = {
        code: responseCode.success,
        data: "接收成功"
      };
    } catch (error) {
      ctx.response.body = {
        code: responseCode.error,
        msg: error.message
      };
    }
  };

  public donateDetail = async (ctx: Koa.Context) => {
    try {
      const { id } = ctx.request.query;
      invariant(!!id, "请传入要查询的id");

      const donate = await DonateModel.findOne({
        where: { id },
        include: [
          {
            model: UserModel,
            as: "userinfo"
          }
        ],
        raw: false
      });
      invariant(!!donate, "没有找到详情");

      ctx.response.body = {
        code: responseCode.success,
        data: donate
      };
    } catch (error) {
      ctx.response.body = {
        code: responseCode.error,
        msg: error.message
      };
    }
  };

  public donateList = async (ctx: Koa.Context) => {
    try {
      const { offset = 0, limit = 20, user_id, status = 1 } = ctx.request.query;
      const result = await DonateModel.findAndCountAll({
        // offset: Number(offset),
        // limit: Number(limit),
        order: [["create_time", "DESC"]],
        where: {
          status,
          ...(!!user_id ? { user_id } : {})
        },
        include: [
          {
            model: UserModel,
            as: "userinfo"
          }
        ]
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
  };

  public donateAdd = async (ctx: Koa.Context) => {
    try {
      const { user_id, title, description, pics, phone } = ctx.request.body;

      /**
       * @todo [第一步验证捐献商品信息是否齐全]
       */
      invariant(!!user_id, "请先验证身份信息");
      invariant(!!title, "帖子标题不能为空");
      invariant(!!description, "请输入帖子内容");
      invariant(!!phone, "请输入联系方式");

      const user = await UserModel.findOne({ where: user_id, raw: true });
      invariant(!!user, "该用户不存在");

      const images = !!pics ? await util.saveImage(pics) : "";
      const newDonate = {
        user_id: user.user_id,
        title,
        description,
        status: 1,
        pics: images,
        phone,
        create_time: dayJs().format("YYYY-MM-DD HH:mm:ss")
      };
      const result = await DonateModel.create(newDonate);
      invariant(!!result, "发布捐献物品失败");

      ctx.response.body = {
        code: responseCode.success,
        data: result,
        msg: "发布成功"
      };
    } catch (error) {
      ctx.response.body = {
        code: responseCode.error,
        msg: error.message
      };
    }
  };
}

export default new DonateController();
