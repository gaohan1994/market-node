import Koa from 'koa';
import { responseCode } from '../controller/config';
import invariant from 'invariant';
import AdminModel from '../model/admin.model';

class Validator {

  public checkAdmin = async (ctx: Koa.Context, next: Koa.Next) => {
    try {
      const { user_id } = ctx.session;
      invariant(!!user_id, '请先登录');

      const admin = await AdminModel.findOne({where: {user_id}});
      invariant(!!admin, '您还不是管理员');

      next();
    } catch (error) {
      ctx.response.body = {
        code: responseCode.error,
        msg: error.message
      };
    }
  }
}

export default new Validator();