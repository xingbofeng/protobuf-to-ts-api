import fs from 'fs';
import path from 'path';
import { Project } from 'ts-morph';

import { IOptions } from '../interfaces/IOptions';
import { RequestMethods } from '../interfaces/RequestMethods';
import { getRequestMethod } from '../utils/getRequestMethod';
import { travelAllModule } from './travelAllModule';

const getLinePerfix = (requestModule: string, tsDefineFilename: string) =>
  `/* eslint-disable */
import request from ${requestModule};
import api from './${tsDefineFilename.replace('.ts', '')}';
`;

const getLine = (apiName: string, reqName: string, rspName: string, requestMethod: RequestMethods, baseUrl: string) => `
export function ${apiName}(req: api.${reqName}): Promise<api.${rspName}> {
  return request.${requestMethod}('${baseUrl}${apiName}', ${requestMethod === 'post' ? 'req' : '{ params: req }'});
};
`;

/**
 * 生成前端api请求文件
 * @param {String} pbtsFilePath 生成的d.ts定义文件的路径
 * @param {Object} options 用户传入的自定义配置选项
 */
export async function saveApiFile(pbtsFilePath: string, options: IOptions) {
  const {
    requestModule,
    baseUrl,
  } = options;
  // 获取当前d.ts文件的目录名称和文件名称
  const tsDefineDirname = path.dirname(pbtsFilePath);
  const tsDefineFilename = path.basename(pbtsFilePath);
  let apiline = '';
  apiline += getLinePerfix(
    requestModule,
    tsDefineFilename,
  );
  const project = new Project();
  project.addSourceFileAtPath(pbtsFilePath);
  const file = project.getSourceFileOrThrow(pbtsFilePath);
  const modules = file.getModules();
  travelAllModule(modules, (module, parentName) => {
    const interfaces = module.getInterfaces();
    interfaces.length && interfaces.forEach(i => {
      const reqName = i.getName();
      // 找到请求的interface名称
      const reqNameMatchs = reqName.match(/^I(\S*)Req$/);
      if (reqNameMatchs && reqNameMatchs.length) {
        const apiName = reqNameMatchs[1];
        // 找到返回值的interface
        const rspName = `I${apiName}Rsp`;
        const rsp = interfaces.find(item => item.getName() === rspName);
        if (!rsp) {
          return;
        }
        apiline += getLine(
          apiName,
          `${parentName}.${reqName}`,
          `${parentName}.${rspName}`,
          getRequestMethod(apiName),
          baseUrl,
        );
      }
    });
  });

  await fs.promises.writeFile(path.resolve(tsDefineDirname, tsDefineFilename.replace('.d.ts', '.ts')), apiline);
}
