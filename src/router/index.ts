import Koa from 'koa';
import Router from 'koa-router';
import { ProductController, AdminController } from "../controller";

const router = new Router();
router.get('/', (ctx: Koa.Context) => {
  ctx.response.body = 'hello';
});
router.get('/product/list', ProductController.productList);
router.post('/product/add', ProductController.productAdd);

router.post('/admin/add', AdminController.adminAdd);
router.get('/admin/list', AdminController.adminList);

export default router;