/**
 * @todo 捐献模块
 * @Author: Ghan
 * @Date: 2020-03-04 11:18:04
 * @Last Modified by: Ghan
 * @Last Modified time: 2020-03-25 15:07:11
 */

import Koa from "koa";
import { UserModel, DonateModel } from "../../model";
import util, { responseCode, CommonInterface } from "../config";
import invariant from "invariant";
import dayJs from "dayjs";

class DonateController {
  public donateList = async (ctx: Koa.Context) => {
    try {
      const { offset = 0, limit = 20, user_id } = ctx.request
        .query as CommonInterface.FetchField;
      const result = await DonateModel.findAndCountAll({
        offset: Number(offset),
        limit: Number(limit),
        order: [["create_time", "DESC"]],
        where: {
          ...(!!user_id ? { user_id } : {})
        }
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
