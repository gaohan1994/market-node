import Koa from 'koa';
import { UserModel } from '../../model';
import { responseCode, CommonInterface } from '../config';
import invariant from 'invariant';
import util from '../../util/util';
import dayJs from 'dayjs';

class UserController {

  public userLogin = async (ctx: Koa.Context) => {
    try {
      const { 
        username,
        password,
      } = ctx.request.body;
      invariant(!!username, '用户名错误');
      invariant(!!password, '密码错误');

      const user = await UserModel.findOne({
        where: { phone: username }, 
        raw: true,
        attributes: {
          include: ['password']
        }
      });
      invariant(!!user, '用户名错误');
      invariant(user.password === util.md5(password), '密码错误');
      ctx.response.body = {
        code: responseCode.success,
        data: user,
        msg: '登录成功'
      };
    } catch (error) {
      ctx.response.body = {
        code: responseCode.error,
        msg: error.message
      };
    }
  }

  public userList = async (ctx: Koa.Context) => {
    try {
      const { offset = 0, limit = 20 } = ctx.request.query as CommonInterface.FetchField;
      const result = await UserModel.findAndCountAll({
        offset: Number(offset),
        limit: Number(limit),
        raw: true
      });
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

  public userAdd = async (ctx: Koa.Context) => {
    try {
      const {
        phone,
        birthday,
        intro,
        school,
        openId,
        avatarUrl,
        city,
        country,
        nickName,
        language,
        province,
        gender,
      } = ctx.request.body;
      
      console.log('phone: ', phone);
      console.log('birthday: ', birthday);
      console.log('intro: ', intro);
      console.log('school: ', school);
      console.log('openId: ', openId);
      console.log('avatarUrl: ', avatarUrl);
      console.log('city: ', city);
      console.log('country: ', country);
      console.log('nickName: ', nickName);
      console.log('language: ', language);
      console.log('province: ', province);
      console.log('gender: ', gender);

      const user = await UserModel.findOne({ where: { openId }, raw: true });
      console.log('user: ', user);
      if (!!user) {
        ctx.response.body = {
          code: responseCode.success,
          data: user,
          msg: '登录成功!'
        };
        return;
      }
      
      const newUser = {
        phone,
        birthday,
        intro,
        school,
        openId,
        avatarUrl,
        city,
        country,
        nickName,
        language,
        province,
        gender,
        create_time: dayJs().format('YYYY-MM-DD HH:mm:ss')
      };
      console.log('newUser: ', newUser);
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

  public userUpdate = async (ctx: Koa.Context) => { 
    try {
      const { 
        user_id,
        name,
        avatar,
        phone,
        sex,
        password,
        birthday,
        intro,
        school,
      } = ctx.request.body;

      invariant(!!user_id, '请传入要修改的用户id');
      const user = await UserModel.findOne({where: { user_id }});
      invariant(!!user, '没有找到要修改的用户');
      const newUser = {
        name,
        avatar,
        phone,
        sex,
        password,
        birthday,
        intro,
        school,
      };
      await UserModel.update(newUser, {where: {user_id}});
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

  public userDelete = async (ctx: Koa.Context) => { 
    try {
      const { user_id } = ctx.request.body;
      invariant(!!user_id, '请传入要删除的用户id');
      const user = await UserModel.findOne({where: {user_id}});
      invariant(!!user, '没有找到要删除的用户');

      await UserModel.destroy({where: {user_id}});
      ctx.response.body = {
        code: responseCode.error,
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

export default new UserController();