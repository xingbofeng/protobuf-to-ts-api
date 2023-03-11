const path = require('path');
const fs = require('fs');
const { Project } = require('ts-morph');
const travelAllModule = require('./travelAllModule');

const getLinePerfix = ({ requestModule, tsDefineFilename }) => `
/* eslint-disable */
import request from ${requestModule};
import api from './${tsDefineFilename.replace('.ts', '')}';
`;

const getLine = ({ apiName, reqName, rspName, requestMethod, baseUrl }) => `
export function ${apiName}(req: api.${reqName}): Promise<api.${rspName}> {
  return request.${requestMethod}('${baseUrl}${apiName}', ${requestMethod === 'post' ? 'req' : '{ params: req }'});
};
`;

module.exports = async function saveApiFile(pbtsFilePath, options) {
  const {
    requestModule,
    baseUrl,
  } = options;
  // 获取当前d.ts文件的目录名称和文件名称
  const tsDefineDirname = path.dirname(pbtsFilePath);
  const tsDefineFilename = path.basename(pbtsFilePath);
  let apiline = ``;
  apiline += getLinePerfix({
    requestModule,
    tsDefineFilename,
  });
  const project = new Project();
  project.addSourceFileAtPath(pbtsFilePath);
  const file = project.getSourceFileOrThrow(pbtsFilePath);
  const modules = file.getModules();
  travelAllModule(modules, (module, parentName) => {
    const interfaces = module.getInterfaces();
    interfaces.length && interfaces.forEach(interface => {
      const reqName = interface.getName();
      // 找到请求的interface名称
      const reqNameMatchs = reqName.match(/^I(\S*)Req$/);
      if (reqNameMatchs && reqNameMatchs.length) {
        const apiName = reqNameMatchs[1];
        // 找到返回值的interface
        const rsp = interfaces.find(item => item.getName() === `I${apiName}Rsp`);
        if (!rsp) {
          return;
        }
        const rspName = `I${apiName}Rsp`;
        apiline += getLine({
          apiName,
          reqName: `${parentName}.${reqName}`,
          rspName: `${parentName}.${rspName}`,
          requestMethod: /post/.test(apiName.toLowerCase()) ? 'post' : 'get',
          baseUrl,
        });
      }
    });
  });

  await fs.promises.writeFile(path.resolve(tsDefineDirname, tsDefineFilename.replace('.d.ts', '.ts')), apiline);
}
