import Koa from 'koa';

const koa = new Koa();

koa.use(async (ctx, next) => {
  
});

koa.listen(9001, () => {
  console.log('Market running in localhost:9001!');
});