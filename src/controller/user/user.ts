import Koa from 'koa';
import { UserModel } from '../../model';
import { responseCode } from '../config';
import invariant from 'invariant';
import util from '../../util/util';
import dayJs from 'dayjs';

class UserController {

  public userAdd = async (ctx: Koa.Context) => {
    try {
      const { 
        name,
        avatar,
        phone,
        sex,
        password,
        birthday,
        intro,
        school,
      } = ctx.request.body;
      
      invariant(!!phone, '姓名不能为空');
      invariant(!!password, '密码不能为空');
      
      const user = await UserModel.findOne({ where: { phone }, raw: true });
      invariant(!user, '该用户已存在!');
      
      const newUser = {
        name,
        avatar,
        phone,
        sex,
        password: util.md5(password),
        birthday,
        intro,
        school,
        create_time: dayJs().format('YYYY-MM-DD HH:mm:ss')
      };

      const result = await UserModel.create(newUser);

      invariant(!!result.user_id, '创建失败');
      ctx.response.body = {
        code: responseCode.success,
        data: result,
        msg: '注册成功!'
      };
    } catch (error) {
      ctx.response.body = {
        code: responseCode.error,
        msg: error.message
      };
    }
  }

  public userDetail = async (ctx: Koa.Context) => { 
    try { 
      const { user_id } = ctx.request.body;
      invariant(!!user_id, '请传入用户ID');

      const user = await UserModel.findOne({where: {user_id}, raw: true});
      ctx.response.body = {
        code: responseCode.success,
        data: user
      };
    } catch (error) {
      ctx.response.body = {
        code: responseCode.error,
        msg: error.message
      };
    }
  }
}

export default new UserController();