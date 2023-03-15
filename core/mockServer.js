const fs = require('fs');

/**
 * 初始化 mock server
 * @param {Object} options 用户自定义配置
 * @returns {Object} mockServer 通过express实例化的mock server app
 */
function initServer(options) {
  const express = require('express');
  const mockServer = express();
  const { port = '3000' } = options;
  mockServer.listen(Number.parseInt(port), () => {
    console.log(`mock server listening on port ${port}`);
  });
  return mockServer;
}

/**
 * 拿到mock文件，生成mock server
 * @param {String} mockFilePath mock文件的路径
 * @param {Object} options 用户自定义配置
 */
async function generateMockRoute(mockFilePath, mockServer, options) {
  const { baseUrl } = options;
  const mockFile = await fs.promises.readFile(mockFilePath, { encoding: 'utf-8' });
  const json = JSON.parse(mockFile);
  for (const apiName in json) {
    if (Object.hasOwnProperty.call(json, apiName)) {
      const requestMethod = /post/.test(apiName.toLowerCase()) ? 'post' : 'get';
      mockServer[requestMethod](`${baseUrl}${apiName}`, (req, res) => {
        res.send(json[apiName]);
      });
      console.log(`mockServer generate mock route: ${baseUrl}${apiName} success`);
    }
  }
}

module.exports = {
  initServer,
  generateMockRoute,
};
