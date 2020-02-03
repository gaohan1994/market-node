import Koa from 'koa';
import { responseCode } from '../config';

class FileController {
  public uploadImage = async (ctx: Koa.Context) => {
    try {
      /**
       * "fieldname": "image", 
       * "originalname": "music.jpeg", 
       * "encoding": "7bit", 
       * "mimetype": "image/jpeg", 
       * "destination": "public/static", 
       * "filename": "music-1580665681086.jpeg", 
       * "path": "public/static/music-1580665681086.jpeg", 
       * "size": 369218
       */
      const { file } = ctx.req as any;
      ctx.response.body = {
        code: responseCode.success,
        data: `https://weiyi.mynatapp.cc/${file.filename}`,
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