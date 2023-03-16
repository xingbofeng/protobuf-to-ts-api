import path from 'path';
import pbts from 'protobufjs-cli/pbts';

import { IOptions } from '../interfaces/IOptions';

/**
 * 通过protobuf-cli生成d.ts文件
 * @param {String} pbjsFilePath 生成的js文件的路径
 * @returns {Promise<string>} 生成临时的js文件的路径
 */
export function getPbtsFile(pbjsFilePath: string, options: IOptions): Promise<string> {
  const { folder = '' } = options;
  const pbtsFilePath = path.resolve(process.cwd(), folder, pbjsFilePath.replace('.js', '.d.ts'));
  return new Promise((resolve, reject) => {
    pbts.main(['-p', options.root, '-o', pbtsFilePath, pbjsFilePath], err => {
      if (err) {
        reject(err);
      }
      resolve(pbtsFilePath);
    });
  });
}
