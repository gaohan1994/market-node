import Router from 'koa-router';
import { 
  ProductController, 
  AdminController, 
  UserController, 
  TypeController, 
  MessageController, 
  FileController,
  CollectController,
  OrderController,
  QiniuController,
  TopicController,
  WeixinHelper,
} from "../controller";
import multer from 'koa-multer';

const storage = multer.diskStorage({
  destination: 'public/static',
  filename: (req, file, callback) => {
    const singfileArray = file.originalname.split('.');
    const fileExtension = singfileArray[singfileArray.length - 1];
    callback(null, singfileArray[0] + "." + fileExtension);
  }
});

const upload = multer({ storage });

const router = new Router();

/**
 * @todo [帖子模块]
 */
router.get('/topic/list', TopicController.topicList as any);
router.post('/topic/add', TopicController.topicAdd as any);

/**
 * @todo [商品模块]
 */
router.get('/product/list', ProductController.productList as any);
router.post('/product/add', ProductController.productAdd as any);
router.get('/product/random', ProductController.productListRandom as any);
router.post('/product/delete', ProductController.productDelete as any);
router.get('/product/detail', ProductController.productDetail as any);
router.get('/product/search', ProductController.productSearch as any);

/**
 * @todo [订单模块]
 */
router.post('/order/create', OrderController.orderCreate as any);
router.post('/order/cancel', OrderController.orderCancel as any);
router.get('/order/list', OrderController.orderList as any);
router.get('/order/detail', OrderController.orderDetail as any);

/**
 * @todo [商品收藏模块]
 */
router.post('/collect/add', CollectController.collectAdd as any);
router.post('/collect/delete', CollectController.collectDelete as any);
router.get('/collect/list', CollectController.collectList as any);
router.get('/collect/product', CollectController.collect as any);

/**
 * @todo [商品分类模块]
 */
router.get('/type/list', TypeController.typeList as any);
router.get('/type/detail', TypeController.typeDetail as any);
router.post('/type/add', TypeController.typeAdd as any);
router.post('/type/update', TypeController.typeUpdate as any);
router.post('/type/delete', TypeController.typeDelete as any);

/**
 * @todo [管理员模块]
 */
router.post('/admin/login', AdminController.adminLogin as any);
router.post('/admin/delete', AdminController.adminDelete as any);
router.post('/admin/update', AdminController.adminUpdate as any);
router.post('/admin/logout', AdminController.adminLogout as any);
router.post('/admin/add', AdminController.adminAdd as any);
router.post('/admin/detail', AdminController.adminDetail as any);
router.get('/admin/list', AdminController.adminList as any);

/**
 * @todo [用户]
 */
router.post('/user/login', UserController.userLogin as any);
router.get('/user/list', UserController.userList as any);
router.post('/user/add', UserController.userAdd as any);
router.post('/user/detail', UserController.userDetail as any);
router.post('/user/update', UserController.userUpdate as any);
router.post('/user/delete', UserController.userDelete as any);

/**
 * @todo [评论模块]
 */
router.get('/message/list', MessageController.messageList as any);
router.post('/message/add', MessageController.messageAdd as any);
router.post('/message/delete', MessageController.messageDelete as any);

/**
 * @todo [图片上传系统]
 */
router.post('/upload/image', upload.single('image'), FileController.uploadImage as any);
router.post('/upload/qiniu/image', upload.single('image'), QiniuController.qiniuUploadFile as any);
router.post('/upload/images', upload.array('images', 12), FileController.uploadImages as any);

/**
 * @todo [微信相关]
 */
router.post('/weixin/decrypt', WeixinHelper.decryptData as any);

export default router;