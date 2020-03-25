import Koa from 'koa';
import { TypeModel } from '../../model';
import { responseCode } from '../config';
import invariant from 'invariant';
import dayJs from 'dayjs';

class TypeController {

  public typeList = async (ctx: Koa.Context) => {
    try {
      const { type = 0 } = ctx.request.query;
      const result = await TypeModel.findAll({where: {type}}); 
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
  
  public typeAdd = async (ctx: Koa.Context) => {
    try {
      const { 
        name,
        picture,
        type,
      } = ctx.request.body;
      invariant(!!name, '请输入商品分类名称');
      const typeExit = await TypeModel.findOne({where: {name}, raw: true});
      invariant(!typeExit, '该分类已存在');

      const newType = {
        name,
        picture,
        type,
      };
      const result = await TypeModel.create(newType);
      invariant(!!result, '新增商品分类失败');
      ctx.response.body = {
        code: responseCode.success,
        data: result,
        msg: '新增商品分类成功'
      };
    } catch (error) {
      ctx.response.body = {
        code: responseCode.error,
        msg: error.message
      };
    }
  }

  public typeUpdate = async (ctx: Koa.Context) => {
    try {
      const {
        id,
        name,
        picture = '',
      } = ctx.request.body;

      invariant(!!id, '请传入要修改的分类id');
      const type = await TypeModel.findOne({where: {id}, raw: true});
      invariant(!!type, '没有找到该商品分类');
      
      const newType = {
        id,
        name,
        picture,
      };
      await TypeModel.update(newType, {where: {id}, fields: ['name', 'picture']});
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

  public typeDelete = async (ctx: Koa.Context) => {
    try {
      const { id } = ctx.request.body;
      invariant(!!id, '请传入要删除的分类id');
      const result = await TypeModel.destroy({where: {id}});
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

  public typeDetail = async (ctx: Koa.Context) => {
    try {
      const { id } = ctx.request.query;
      invariant(!!id, '请传入要查询的分类id');
      const type = await TypeModel.findOne({where: {id}, raw: true});
      invariant(!!type, '没有找到该商品分类');
      ctx.response.body = {
        code: responseCode.success,
        data: type,
      };
    } catch (error) {
      ctx.response.body = {
        code: responseCode.error,
        msg: error.message
      };
    }
  }
}

export default new TypeController();