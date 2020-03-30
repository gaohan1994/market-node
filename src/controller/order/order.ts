import Koa from 'koa';
import invariant from 'invariant';
import { responseCode } from '../config';
import { UserModel, OrderModel, ProductModel } from '../../model';
import dayJs from 'dayjs';

class OrderController {

  public getOrderNo = (): string => {
    const orderNo = `${Math.round(Number(new Date()) / 100)}`;
    return orderNo;
  }

  public orderConfirm = async (ctx: Koa.Context) => {
    try {
      const { user_id, order_no } = ctx.request.body;
      invariant(!!user_id, '请传入用户id');
      invariant(!!order_no, '请传入订单编号');
      
      const user = await UserModel.findOne({where: {user_id}, raw: true});
      invariant(!!user, '非法用户');

      const order = await OrderModel.findOne({where: {order_no}, raw: true});
      invariant(!!order, '非法订单');

      /**
       * @todo [先校验数据真实性，在把订单取消同时商品回复正常状态]
       */
      await OrderModel.update({
        status: 1,
      }, {
        where: { order_no }
      });
      
      await ProductModel.update({
        status: 4,
      }, {
        where: { id: order.product_id }
      });
      ctx.response.body = {
        code: responseCode.success,
        msg: '订单已完成'
      };
    } catch (error) {
      ctx.response.body = {
        code: responseCode.error,
        msg: error.message
      };
    }
  }

  /**
   * @todo [下单]
   */
  public orderCreate = async (ctx: Koa.Context) => {
    try {
      const { 
        user_id, 
        exp_fee = 0,
        random_key,
        product_id,
        phone,
      } = ctx.request.body;

      /**
       * @todo [先校验数据是否全部上传]
       */
      invariant(!!user_id, '请先登录');
      invariant(!!phone, '请传入联系方式');
      invariant(!!random_key, '请传入随机字符串');
      invariant(!!product_id, '请选择要购买的商品');
      /**
       * @todo [根据userid找到对应用户]
       * @todo [根据productid找到对应商品]
       */
      const user = await UserModel.findOne({where: { user_id }, raw: true});
      invariant(!!user, '请先登录');

      const product = await ProductModel.findOne({where: { id: product_id, status: 1 }, raw: true });
      invariant(!!product, '商品已下架');
      // invariant(user_id !== product.user_id, '不能够买自己发布的商品');
      /**
       * @todo [下单]
       * @todo [这里没有用事务]
       */
      const newOrder = {
        order_no: this.getOrderNo(),
        random_key,
        user_id,
        exp_fee,
        pay_amount: Number(exp_fee) + Number(product.amount),
        
        seller_id: product.user_id,
        user_phone: phone,
        product_id,
        /**
         * @todo 选用第一张照片作为订单封面
         */
        product_picture: product.pics && product.pics[0],
        amount: product.amount,
        product_name: product.title,
        create_time: dayJs().format('YYYY-MM-DD HH:mm:ss'),
        update_time: dayJs().format('YYYY-MM-DD HH:mm:ss'),
      };
      console.log('newOrder: ', newOrder);
      const result = await OrderModel.create(newOrder);
      invariant(!!result, '下单失败');
      
      const productStatus = await ProductModel.update(
        {status: 4}, 
        {where: {id: product_id}
      });
      console.log('productStatus: ', productStatus);
      ctx.response.body = {
        code: responseCode.success,
        msg: '下单成功',
        data: result
      };
    } catch (error) {
      ctx.response.body = {
        code: responseCode.error,
        msg: error.message
      };
    }
  }

  public orderDetail = async (ctx: Koa.Context) => {
    try {
      const { order_no } = ctx.request.query;
      invariant(!!order_no, '请传入订单编号');
      const order = await OrderModel.findOne({
        where: {order_no}, 
        include: [{
          model: UserModel,
          as: 'userinfo',
        }],
        raw: false
      });
      invariant(!!order, '没有找到该订单');

      const seller = await UserModel.findOne({where: {user_id: order.seller_id}, raw: true});
      invariant(!!seller, '没有找到卖家信息');

      const product = await ProductModel.findOne({where: {id: order.product_id}});
      invariant(!!product, '没有找到订单对应商品');

      const data = {
        ...JSON.parse(JSON.stringify(order)),
        sellerinfo: seller,
        productinfo: product
      };
      ctx.response.body = {
        code: responseCode.success,
        data: data,
      };
    } catch (error) {
      ctx.response.body = {
        code: responseCode.error,
        msg: error.message
      };
    }
  }

  /**
   * @todo [查询订单列表]
   */
  public orderList = async (ctx: Koa.Context) => {
    try {
      const { offset = 0, limit = 20, user_id } = ctx.request.query;
      invariant(!!user_id, '请传入用户id');
      const user = await UserModel.findOne({where: { user_id }, raw: true});
      invariant(!!user, '非法用户');

      const result = await OrderModel.findAndCountAll({
        where: { user_id },
        offset: Number(offset),
        limit: Number(limit),
        include: [{
          model: ProductModel,
          as: 'productinfo',
        }],
        order: [['create_time', 'DESC']],
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

  public orderCancel = async (ctx: Koa.Context) => {
    try {
      const { user_id, order_no } = ctx.request.body;
      invariant(!!user_id, '请传入用户id');
      invariant(!!order_no, '请传入订单编号');
      
      const user = await UserModel.findOne({where: {user_id}, raw: true});
      invariant(!!user, '非法用户');

      const order = await OrderModel.findOne({where: {order_no}, raw: true});
      invariant(!!order, '非法订单');

      /**
       * @todo [先校验数据真实性，在把订单取消同时商品回复正常状态]
       */
      await OrderModel.update({
        status: 3,
      }, {
        where: { order_no }
      });
      
      await ProductModel.update({
        status: 1,
      }, {
        where: { id: order.product_id }
      });
      ctx.response.body = {
        code: responseCode.success,
        msg: '订单已取消'
      };
    } catch (error) {
      ctx.response.body = {
        code: responseCode.error,
        msg: error.message
      };
    }
  }
}

export default new OrderController();