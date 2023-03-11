
/* eslint-disable */
import request from axios;
import api from './example.proto.d';

export function GetExampleData(req: api.example.IGetExampleDataReq): Promise<api.example.IGetExampleDataRsp> {
  return request.get('/GetExampleData', { params: req });
};

export function PostExampleData(req: api.example.IPostExampleDataReq): Promise<api.example.IPostExampleDataRsp> {
  return request.post('/PostExampleData', req);
};
