
import request from axios;
import api from './api.d.ts';

export function getExampleData(req: api.example.IgetExampleDataReq): Promise<api.example.IgetExampleDataRsp> {
  return request.get('/getExampleData', { params: req });
};

export function postExampleData(req: api.example.IpostExampleDataReq): Promise<api.example.IpostExampleDataRsp> {
  return request.post('/postExampleData', req);
};
