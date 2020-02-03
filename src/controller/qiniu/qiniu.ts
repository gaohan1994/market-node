import Koa from 'koa';
import qiniu from 'qiniu';
import { responseCode } from '../config';

const ACCESS_KEY = 'kkemd2ecCP6jG3kf1ILiKletiF-dPTXVmqaW9v9t';
const SECRET_KEY = 'qQisO2OXANA8M8lvGpVj-TnNQc37XrV0U6iC0By_';

qiniu.conf.ACCESS_KEY = 'kkemd2ecCP6jG3kf1ILiKletiF-dPTXVmqaW9v9t';
qiniu.conf.SECRET_KEY = 'qQisO2OXANA8M8lvGpVj-TnNQc37XrV0U6iC0By_';

class QiniuController {
  /**
   * @param {mac} 
   */
  private mac: any;
  /**
   * @param {qiniuOptions} 生成uptoken的参数
   */
  private qiniuOptions: qiniu.rs.PutPolicyOptions;
  /**
   * @param {putExtra} 七牛上传工具吧
   */
  private putExtra: any;
  /**
   * @param {config}
   */
  private config: qiniu.conf.Config;
  /**
   * @param {formUploader} 上传助手
   */
  private formUploader: qiniu.form_up.FormUploader;
  
  constructor () {
    this.mac = new qiniu.auth.digest.Mac(ACCESS_KEY, SECRET_KEY);
    this.qiniuOptions = {
      scope: 'hy-net',
    };
    this.putExtra = new qiniu.form_up.PutExtra();
    this.config = new qiniu.conf.Config();
    this.formUploader = new qiniu.form_up.FormUploader(this.config);
  }

  public qiniuUploadFile = async (ctx: Koa.Context) => {
    try {
      const { file } = ctx.req as any;
      console.log('file: ', file);

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

      /**
       * @todo [拿到multer上传到本地的文件，在数据库中生成一条数据]
       * @todo [拿到本地文件]
       * @todo [整理七牛参数]
       * @todo [上传至七牛]
       * @todo [暂时先不写七牛吧先这么用着]
       */
      const uptoken = this.getQiniuUptoken('market');
      console.log('uptoken: ', uptoken);

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

  public getQiniuUptoken = (bucket?: string): string => {
    const putPolicy = new qiniu.rs.PutPolicy({
      scope: !!bucket ? `${this.qiniuOptions.scope}:${bucket}` : this.qiniuOptions.scope
    });
    const uptoken = putPolicy.uploadToken(this.mac);
    return uptoken;
  }

  /**
   * @todo [将本地文件上传到七牛]
   *
   * @memberof QiniuController
   */
  public uploadFile = (
    uptoken: string,
    key: string,
    localFile: string,
  ): Promise<any> => {
    return new Promise((resolve) => {
      this.formUploader.putFile(
        uptoken,
        key,
        localFile,
        this.putExtra,
        function (error: any, responseBody: any, responseInfo: any) {
          console.log('responseBody: ', responseBody);
          console.log('responseInfo: ', responseInfo);
          if (error) {
            console.log('error: ', error);
            resolve({success: false, error});
          } else {
            resolve({success: true, data: responseBody });
          }
        }
      );
    });
  }
}

export default new QiniuController();