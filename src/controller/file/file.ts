import Koa from 'koa';
import { responseCode } from '../config';

class FileController {
  public uploadImage = async (ctx: Koa.Context) => {
    try {
      const { file } = ctx.req as any;
      ctx.response.body = {
        code: responseCode.success,
        data: file,
        msg: '上传成功'
      };
    } catch (error) {
      ctx.response.body = {
        code: responseCode.error,
        msg: error.message
      };
    }
  }

  public uploadImages = async (ctx: Koa.Context) => {
    try {
      const { files } = ctx.req as any;
      ctx.response.body = {
        code: responseCode.success,
        data: files,
        msg: '上传成功'
      }; 
    } catch (error) {
      ctx.response.body = {
        code: responseCode.error,
        msg: error.message
      };
    }
  }
}

export default new FileController();