/* eslint-disable */
import request from axios;
import api from './test.d';

export function GetExampleData(req: api.test.IGetExampleDataReq): Promise<api.test.IGetExampleDataRsp> {
  return request.get('/GetExampleData', { params: req });
};

export function PostExampleData(req: api.test.IPostExampleDataReq): Promise<api.test.IPostExampleDataRsp> {
  return request.post('/PostExampleData', req);
};
