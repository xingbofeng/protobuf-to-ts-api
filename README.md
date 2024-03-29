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
package test;

enum Status {
  SUCCESS = 0;
  FAIL = 1;
  UNKNOWN = 2;
}

message GetExampleDataReq {
  int32 id = 1;
  string name = 2;
}

message GetExampleDataRsp {
  repeated Status status = 1;
  string msg = 2;
  string city = 3;
  int32 code = 4;
}

message PostExampleDataReq {
  int32 id = 1;
  string name = 2;
}

message PostExampleDataRsp {
  repeated Status status = 1;
  optional string msg = 2;
  int32 code = 3;
}

service API {
  rpc getExampleData (GetExampleDataReq) returns (GetExampleDataRsp);
  rpc postExampleData (PostExampleDataReq) returns (PostExampleDataRsp);
}
```

通过pb2TSApi转换工具，上述协议文件会生成d.ts文件、请求文件、schema文件、mock文件，请求ts文件举例如下：

```typescript
/* eslint-disable */
import request from axios;
import api from './test.d';

export function GetExampleData(req: api.test.IGetExampleDataReq): Promise<api.test.IGetExampleDataRsp> {
  return request.get('/GetExampleData', { params: req });
};

export function PostExampleData(req: api.test.IPostExampleDataReq): Promise<api.test.IPostExampleDataRsp> {
  return request.post('/PostExampleData', req);
};
```

mock.json文件如下：

```json
{
  "GetExampleData": {
    "city": "commodo esse enim magna nulla",
    "code": 60013672.10478094,
    "msg": "tempor cupidatat",
    "status": [
      1,
      2,
      2
    ]
  },
  "PostExampleData": {
    "code": 87936671.0172576,
    "msg": "adipisicing",
    "status": [
      1,
      0,
      2,
      2
    ]
  }
}
```

使用`postman`发送请求，可以正常使用mock功能：


### 参数

|  参数   | 说明  |
|  ----  | ----  |
| --requestModule/-r | 请求方法，默认为'axios'，用户可以替换为项目中自定义的请求方法，如'@/request' |
| --baseUrl/-b | 请求的baseUrl，默认为'/'，用户可以替换为项目中后台服务部署的路径，如'/api' |
| --folder/-f | 生成目录的路径，默认为'./api'，表示d.ts和ts文件存放位置，用户可以自定义存放到项目中的任意地方 |
| --root/-r | 转化proto文件的根路径，默认为命令执行路径，即`process.cwd()` |
| --optional/-o | 因为 protobuf 3.0 版本的协议默认将会转换所有字段为可选字段，设置-o为`false`之后，所有字段的可选值将会去除，因为遵循 protobuf 3.0 版本的协议，默认这个配置为`true` |
| --mock/-m | 是否生成mock文件和开启mock server，默认为`false`，即不开启 |
| --port/-p | 开启mock server 的端口号，默认为`3000` |

## TODO

* 除GET/POST请求外的额外请求支持
* mock数据支持更细粒度的配置
* 可视化界面的客户端，比如electorn