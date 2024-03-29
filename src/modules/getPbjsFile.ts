import mkdirp from 'mkdirp';
import path from 'path';
import pbjs from 'protobufjs-cli/pbjs';

import { IOptions } from '../interfaces/IOptions';

/**
 * 通过protobuf-cli生成临时的js文件，用于再生成ts文件，生成ts文件后，删掉临时的js文件
 * @param {String} filePath proto文件的路径
 * @returns {Promise<string>} 生成临时的js文件的路径
 */
export async function getPbjsFile(filePath: string, options: IOptions): Promise<string> {
  const { folder = '' } = options;
  const fileName = filePath.replace('.proto', '.js');
  const pbjsFilePath = path.resolve(process.cwd(), folder, fileName);
  const p = path.dirname(pbjsFilePath);
  await mkdirp(p);
  return new Promise((resolve, reject) => {
    pbjs.main(['-p', options.root, '-t', 'static-module', '-w', 'commonjs', '-o', pbjsFilePath, path.resolve(process.cwd(), filePath)], err => {
      if (err) {
        reject(err);
      }
      resolve(pbjsFilePath);
    });
  });
}
