import Koa from 'koa';
import { AdminModel } from '../../model';
import { responseCode } from '../config';
import invariant from 'invariant';
import util from '../../util/util';
import dayJs from 'dayjs';

class AdminController {

  public adminAdd = async (ctx: Koa.Context) => {
    try {
      const { 
        login_name,
        user_name,
        phone,
        password,
        email,
        sex,
        avatar,
        status,
        remark,
      } = ctx.request.body;
  
      invariant(!!login_name, 'login_name不能为空');
      invariant(!!phone, 'phone不能为空');
      invariant(!!password, 'password不能为空');
      
      const admin = await AdminModel.findOne({ where: { login_name }, raw: true });
      invariant(!admin, '管理员已存在!');
      
      const newAdmin = {
        login_name,
        user_name: user_name || login_name,
        phone,
        password: util.md5(password),
        email,
        sex,
        avatar,
        status,
        remark,
        create_time: dayJs().format('YYYY-MM-DD HH:mm:ss'),
      };

      const result = await AdminModel.create(newAdmin);
      invariant(!!result.user_id, '创建失败');
      ctx.response.body = {
        code: responseCode.success,
        data: result,
        msg: '管理员注册成功!'
      };
    } catch (error) {
      ctx.response.body = {
        code: responseCode.error,
        msg: error.message
      };
    }
  }

  public adminList = async (ctx: Koa.Context) => {
    try {
      const result = await AdminModel.findAll({raw: true, attributes: {exclude: ['password']}});
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

  public adminDetail = async (ctx: Koa.Context) => {
    try {
      console.log('session: ', ctx.session);
    } catch (error) {
      ctx.response.body = {
        code: responseCode.error,
        msg: error.message
      };
    }
  }
}

export default new AdminController();