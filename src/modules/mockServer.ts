import express, { Express } from 'express';
import fs from 'fs';

import { IOptions } from '../interfaces/IOptions';
import { getRequestMethod } from '../utils/getRequestMethod';

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
 * 拿到mock文件，生成mock server
 * @param {String} mockFilePath mock文件的路径
 * @param {Express} mockServer express server 对象
 * @param {IOptions} options 用户自定义配置
 */
export async function generateMockRoute(mockFilePath: string, mockServer: Express, options: IOptions) {
  const { baseUrl } = options;
  const mockFile = await fs.promises.readFile(mockFilePath, { encoding: 'utf-8' });
  const json = JSON.parse(mockFile);
  for (const apiName in json) {
    if (Object.hasOwnProperty.call(json, apiName)) {
      const requestMethod = getRequestMethod(apiName);
      mockServer[requestMethod](`${baseUrl}${apiName}`, (req, res) => {
        res.send(json[apiName]);
      });
      console.log(`mockServer generate mock route: ${baseUrl}${apiName} success`);
    }
  }
}
