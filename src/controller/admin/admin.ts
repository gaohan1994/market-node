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
      const result = await AdminModel.findAndCountAll({raw: true, attributes: {exclude: ['password']}});
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

  public adminDelete = async (ctx: Koa.Context) => {
    try {
      const { admin_id } = ctx.request.body;
      invariant(!!admin_id, '请选择要禁用的管理员');

      const admin = AdminModel.findOne({where: {user_id: admin_id}, raw: true});
      invariant(!!admin, '没有找到要禁用的管理员');

      await AdminModel.update({
        ...admin,
        status: 1,
      }, {
        where: {
          user_id: admin_id
        }
      });
      ctx.response.body = {
        code: responseCode.success,
        msg: '禁用成功'
      };
    } catch (error) {
      ctx.response.body = {
        code: responseCode.error,
        msg: error.message
      };
    }
  }

  public adminUpdate = async (ctx: Koa.Context) => {
    try {
      const { 
        admin_id,
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
      invariant(!!admin_id, '请传入要修改的管理员id');

      const admin = await AdminModel.findOne({where: {user_id: admin_id}, raw: true});
      invariant(!!admin, '没有找到要修改的管理员');

      await AdminModel.update({
        login_name,
        user_name,
        phone,
        password,
        email,
        sex,
        avatar,
        status,
        remark,
      }, {
        where: {
          user_id: admin_id
        }
      });
      ctx.response.body = {
        code: responseCode.success,
        msg: '修改成功'
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
      const { admin_id } = ctx.session;
      invariant(!!admin_id, '请先登录');

      const admin = await AdminModel.findOne({where: { user_id: admin_id }, raw: true});
      invariant(!!admin, '没有找到该管理员');
      ctx.response.body = {
        code: responseCode.success,
        data: admin
      };
    } catch (error) {
      ctx.response.body = {
        code: responseCode.error,
        msg: error.message
      };
    }
  }

  public adminLogin = async (ctx: Koa.Context) => {
    try {
      const { username, password } = ctx.request.body;
      invariant(!!username, '请输入手机号');
      invariant(!!password, '请输入密码');

      const admin = await AdminModel.findOne({
        where: {login_name: username}, 
        raw: true,
        attributes: {
          include: ['password']
        }
      });
      invariant(!!admin, '管理员账号错误');
      const md5Password = util.md5(password);
      invariant(md5Password === admin.password, '密码错误');

      ctx.session.admin_id = admin.user_id;
      ctx.response.body = {
        code: responseCode.success,
        msg: '登录成功'
      };
    } catch (error) {
      ctx.response.body = {
        code: responseCode.error,
        msg: error.message
      };
    }
  }

  public adminLogout = async (ctx: Koa.Context) => {
    try {
      delete ctx.session.admin_id;
      ctx.response.body = {
        code: responseCode.success,
        msg: '退出登录'
      };
    } catch (error) {
      ctx.response.body = {
        code: responseCode.error,
        msg: error.message
      };
    }
  }
}

export default new AdminController();