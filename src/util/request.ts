import fetch from 'node-fetch';

class Request {
  baseOptions(params: any, method: string = "GET"): Promise<any> {
    let { url, data } = params;
    let contentType = "application/json";
    contentType = params.contentType || contentType;
    const option: any = {
      data: data,
      method: method,
      header: {
        'content-type': contentType
      }
    };
    return fetch(url, option);
  }

  get (url: string, data: string = "") {
    let option = { url, data };
    return this.baseOptions(option);
  }

  post (url: string, data: any, contentType?: string) {
    let params = { url, data: typeof data === 'string' ? data : JSON.stringify(data), contentType };
    return this.baseOptions(params, "POST");
  }

  put (url: string, data: string = "") {
    let option = { url, data };
    return this.baseOptions(option, "PUT");
  }

  delete (url: string, data: string = "") {
    let option = { url, data };
    return this.baseOptions(option, "DELETE");
  }
}

export default new Request();