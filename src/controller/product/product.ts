import Koa from 'koa';
import { ProductModel } from '../../model';
import { responseCode } from '../config';
import invariant from 'invariant';

class ProductController {
  
  public productList = async (ctx: Koa.Context) => {
    try {
      const result = await ProductModel.findAll(); 
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

  public productAdd = async (ctx: Koa.Context) => {
    try {
      const { body } = ctx.request;
      // id
      // seller
      // viewing_count
      // title
      // description
      // trans_type
      // type
      // is_free_shipping
      // amount
      // exp_fee
      // status
      // pic
      // pics
      // unique_id
      // create_time
      // update_time
      console.log('body: ', body);
    } catch (error) {
      ctx.response.body = {
        code: responseCode.error,
        msg: error.message
      };
    }
  }
}

export default new ProductController();