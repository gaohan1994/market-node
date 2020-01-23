import crypto from 'crypto';

class Util {

  public md5 = (value: string) => {
    const md5Value = crypto.createHash('md5').update(value).digest('base64');
    console.log('md5Value: ', md5Value);
    return md5Value;
  }
}

export default new Util();