import express, { Express } from 'express';
import fs from 'fs';

import { IOptions } from '../interfaces/IOptions';
import { ApiMethod } from './saveApiFile';

/**
 * 初始化 mock server
 * @param {IOptions} options 用户自定义配置
 * @returns {Express} mockServer 通过express实例化的mock server app
 */
export function initServer(options: IOptions) {
  const mockServer = express();
  const { port = '3000' } = options;
  mockServer.listen(+port, () => {
    console.log(`mock server listening on port ${port}`);
  });
  return mockServer;
}

/**
 * 拿到mock文件和api方法列表，生成mock server 路由
 * @param {ApiMethod[]} apiMethods api方法列表
 * @param {String} mockFilePath mock文件的路径
 * @param {Express} mockServer express server 对象
 * @param {IOptions} options 用户自定义配置
 */
export async function generateMockRoute(apiMethods: ApiMethod[], mockFilePath: string, mockServer: Express, options: IOptions) {
  const { baseUrl } = options;
  const mockFile = await fs.promises.readFile(mockFilePath, { encoding: 'utf-8' });
  const json = JSON.parse(mockFile);
  if (apiMethods) {
      for (const apiMethod of apiMethods) {
        if (apiMethod.methodName) {
          let serviceName = apiMethod.serviceName ? apiMethod.serviceName.slice(0, 1).toUpperCase() + apiMethod.serviceName.slice(1) : '';
          let requestType = `I${apiMethod.requestType}`;
          let responseType = `I${apiMethod.responseType}`;
          if (apiMethod.namespace) {
            if (apiMethod.namespace.toLowerCase() != serviceName.toLowerCase()) {
              serviceName = `${apiMethod.namespace}${serviceName}`;
            }
            requestType = `${apiMethod.namespace}.${requestType}`;
            responseType = `${apiMethod.namespace}.${responseType}`;
          }
          const httpMethod = apiMethod.httpMethod || 'post';
          const methodName = apiMethod.methodName || ''
          const urlPath = apiMethod.urlPath || ''
          switch (httpMethod.toLowerCase()) {
            case 'get':
              mockServer.get(urlPath, (req, res) => res.send(json[methodName]));
              break;
            case 'post':
              mockServer.post(urlPath, (req, res) => res.send(json[methodName]));
              break;
            case 'put':
              mockServer.put(urlPath, (req, res) => res.send(json[methodName]));
              break;
            case 'delete':
              mockServer.delete(urlPath, (req, res) => res.send(json[methodName]));
              break;
            case 'patch':
              mockServer.patch(urlPath, (req, res) => res.send(json[methodName]));
              break;
            case 'head':
              mockServer.head(urlPath, (req, res) => res.send(json[methodName]));
              break;
            case 'options':
              mockServer.options(urlPath, (req, res) => res.send(json[methodName]));
              break;
            default:
              throw new Error(`Unsupported http method: ${httpMethod}`);
          }
          console.log(`mockServer generate mock route: ${urlPath} success`);   
        }
      }
    }
}
