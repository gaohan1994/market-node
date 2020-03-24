import Koa from 'koa';
import { Op } from 'sequelize';
import { ImageModel } from '../model';
import invariant from 'invariant';
import dayJs from 'dayjs';

export const responseCode = {
  success: 'success',
  error: 'error',
};

export declare namespace CommonInterface {
  interface FetchField {
    offset: number;
    limit?: number;
    order?: string;
  }
}

class UtilController {

  public saveImage = async (images: string[]): Promise<string> => {
    try {
      invariant(!!images && images.length > 0, '请传入图片id');
      
      let promises: any[] = [];
      
      images.map((url) => {
        const promise = new Promise((resolve) => {
          ImageModel.create({url}, {raw: true}).then((image) => {
            resolve(image);
          });
        });
        promises.push(promise);
      });

      return Promise.all(promises).then((response) => {
        const ids = response.map((res) => {
          return res.id;
        });
        return ids.join(',');
      });
    } catch (error) {
      console.log('error: ', error.message);
      return '';
    }
  }

  public images = async (idStr: string): Promise<string[]> => {
    try {
      invariant(!!idStr, '请传入图片id');
      const ids = idStr.split(',');
      let promises: any[] = [];
      
      ids.map((id) => {
        const promise = new Promise((resolve) => {
          ImageModel.findOne({where: {id}, raw: true}).then((image) => {
            resolve(image);  
          });
        });
        promises.push(promise);
      });

      return Promise.all(promises).then((response) => {
        const pics = response.map((res) => {
          return res.url;
        });
        return pics;
      });
    } catch (error) {
      return [];
    }
  }
}

export default new UtilController;