
/* eslint-disable */
import request from axios;
import api from './example2.proto.d';

export function GetExampleData(req: api.example2.IGetExampleDataReq): Promise<api.example2.IGetExampleDataRsp> {
  return request.get('/GetExampleData', { params: req });
};

export function PostExampleData(req: api.example2.IPostExampleDataReq): Promise<api.example2.IPostExampleDataRsp> {
  return request.post('/PostExampleData', req);
};
