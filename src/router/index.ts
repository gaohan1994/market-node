import Koa from 'koa';
import Router from 'koa-router';
import { ProductController, AdminController, UserController } from "../controller";

const router = new Router();

/**
 * @todo [商品模块]
 */
router.get('/product/list', ProductController.productList as any);
router.post('/product/add', ProductController.productAdd as any);

/**
 * @todo [管理员模块]
 */
router.post('/admin/add', AdminController.adminAdd as any);
router.get('/admin/list', AdminController.adminList as any);

/**
 * @todo [用户]
 */
router.post('/user/add', UserController.userAdd as any);
router.post('/user/detail', UserController.userDetail as any);

export default router;