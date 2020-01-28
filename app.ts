import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import cors from 'koa-cors';
import session from 'koa-session';
import koaStatic from 'koa-static';
import router from './src/router';

const app = new Koa();

app.keys = ['MARKET-NODE-SERCET'];

/**
 * @todu [异常捕获处理中间件]
 */
const errorHandler = async (ctx: Koa.Context, next: Koa.Next) => {
  try {
    await next();
  } catch (error) {
    console.log('error handle: ', error);
    ctx.response.body = {
      code: 'error',
      msg: error.message
    };
  }
};

app.use(errorHandler);

const sessionConfig = {
  key: 'market-node', /** (string) cookie key (default is koa:sess) */
  /** (number || 'session') maxAge in ms (default is 1 days) */
  /** 'session' will result in a cookie that expires when session/browser is closed */
  /** Warning: If a session cookie is stolen, this cookie will never expire */
  maxAge: 86400000,
  autoCommit: true, /** (boolean) automatically commit headers (default true) */
  overwrite: true, /** (boolean) can overwrite or not (default true) */
  httpOnly: true, /** (boolean) httpOnly or not (default true) */
  signed: true, /** (boolean) signed or not (default true) */
  rolling: false, /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */
  renew: false, /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/
};
app.use(session(sessionConfig, app));

/**
 * @todo [解析请求报文的body]
 */
app.use(bodyParser());
/**
 * @todo [加入跨域处理]
 */
app.use(cors({
  credentials: true
}));

app.use(koaStatic(__dirname + '/public/static'));

/**
 * @todo [打印日志]
 */
app.use(async (ctx, next) => {
  console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
  await next();
});
/**
 * @todo [初始化路由]
 */
app.use(router.routes());

app.listen(4001, () => {
  console.log('Market running in localhost:4001!');
});