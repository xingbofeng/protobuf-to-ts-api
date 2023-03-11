# pb-to-ts-api

前后台联调过程中，前端同学拿到协议后，还需要对protobuf协议转化为ts代码，并还需要手动书写大量的http请求代码，然而代码大部分都是相同的，完全可以通过自动生成的方式来完成，[pb-to-ts-api](https://github.com/xingbofeng/protobuf-to-ts-api)就较好地解决了这个问题，[pb-to-ts-api](https://github.com/xingbofeng/protobuf-to-ts-api)基于protobufjs-cli，将cli处理后的代码做简单转换，并提供将标准protobuf文件转化为d.ts文件和生成自定义api请求方法文件的方法。后续还将提供mock方法来改善我们前后台的联调体验。

## 开始

```bash
npm install -g pb-to-ts-api
pb2TSApi ./*/**.proto
```

## 使用方法
创建你自定义的protobuf文件，按照指定的规则定义协议的请求字段和返回字段

```proto
syntax = "proto3";
package example;

enum Status {
  SUCCESS = 0;
  FAIL = 1;
  UNKNOWN = 2;
}

// get请求的协议，请求载荷字段应命名需为GetxxxxReq，返回体字段需命名为GetxxxxRsp
message GetExampleDataReq {
  int32 id_get = 1;
  string name_get = 2;
}

// get请求的协议，请求载荷字段应命名需为GetxxxxReq，返回体字段需命名为GetxxxxRsp
message GetExampleDataRsp {
  repeated Status status_get = 1;
  optional string msg_get = 2;
  int32 code_get = 3;
}

// post请求的协议，请求载荷字段应命名需为PostxxxxReq，返回体字段需命名为PostxxxxRsp
message PostExampleDataReq {
  int32 id_post = 1;
  string name_post = 2;
}

// post请求的协议，请求载荷字段应命名需为PostxxxxReq，返回体字段需命名为PostxxxxRsp
message PostExampleDataRsp {
  repeated Status status_post = 1;
  optional string msg_post = 2;
  int32 code_post = 3;
}

service API {
  rpc getExampleData (GetExampleDataReq) returns (GetExampleDataRsp);
  rpc postExampleData (PostExampleDataReq) returns (PostExampleDataRsp);
}
```

通过pb2TSApi转换工具，上述协议文件会生成d.ts文件和请求文件，请求ts文件举例如下：

```typescript
/* eslint-disable */
import request from axios;
import api from './example.proto.d';

export function GetExampleData(req: api.example.IGetExampleDataReq): Promise<api.example.IGetExampleDataRsp> {
  return request.get('/GetExampleData', { params: req });
};

export function PostExampleData(req: api.example.IPostExampleDataReq): Promise<api.example.IPostExampleDataRsp> {
  return request.post('/PostExampleData', req);
};
```

### 参数

|  参数   | 说明  |
|  ----  | ----  |
| --requestModule/-r  | 请求方法，默认为'axios'，用户可以替换为项目中自定义的请求方法，如'@/request' |
| --baseUrl/-b  | 请求的baseUrl，默认为'/'，用户可以替换为项目中后台服务部署的路径，如'/api' |
| --folder/-f  | 生成目录的路径，默认为'./api'，表示d.ts和ts文件存放位置，用户可以自定义存放到项目中的任意地方 |
