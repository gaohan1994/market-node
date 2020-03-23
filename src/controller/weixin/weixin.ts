import crypto from 'crypto';
import request from '../../util/request';
import Koa from 'koa';
import { responseCode } from '../config';
import invariant from 'invariant';

const WeixinOptions = {
  appId: 'wxffdce2c7e4869d88',
  appSecret: 'b306330e539f85fcbd0be7954283ef27',
};

class WeixinHelper {
  private appId: string;

  constructor (options: any) {
    this.appId = options.appId;
  }

  public setSessionKey = async (code: string): Promise<any> => {
    const promise = new Promise((resolve) => {
      request
        .get('https://api.weixin.qq.com/sns/jscode2session' +
        `?appid=${WeixinOptions.appId}&secret=${WeixinOptions.appSecret}&js_code=${code}&grant_type=authorization_code`)
        .then((res) => res.json())
        .then((res) => {
          resolve(res);
        });
    });
    const result: any = await promise;
    return result;
  }

  /**
   * @todo 解密数据
   */
  public decryptData = async (ctx: Koa.Context) => {
    try {
      // base64 decode
      const { encryptedData, iv, code } = ctx.request.body;
      const encryptedDataBuffer = new Buffer(encryptedData, 'base64');
      const ivBuffer = new Buffer(iv, 'base64');
      // 解密
      const sessionResult = await this.setSessionKey(code);
      const sessionKey = new Buffer(sessionResult.session_key, 'base64');
      const decipher = crypto.createDecipheriv('aes-128-cbc', sessionKey, ivBuffer);
      // 设置自动 padding 为 true，删除填充补位
      decipher.setAutoPadding(true);
      let decoded: any = decipher.update(encryptedDataBuffer, 'binary', 'utf8');
      decoded += decipher.final('utf8');
      
      decoded = JSON.parse(decoded);
      console.log('decoded ', decoded);
      invariant(decoded.watermark.appid === this.appId, 'Illegal Buffer');
      
      ctx.response.body = {
        code: responseCode.success,
        data: decoded
      };
    } catch (error) {
      ctx.response.body = {
        code: responseCode.error,
        msg: error.message
      };
    }
  }
}

export default new WeixinHelper(WeixinOptions);