const path = require('path');
const pbts = require('protobufjs-cli/pbts');

/**
 * 通过protobuf-cli生成d.ts文件
 * @param {String} pbjsFilePath 生成的js文件的路径
 * @returns {Promise}
 */
module.exports = function getPbtsFile(pbjsFilePath, options = {}) {
  const { folder = '' } = options;
  const pbtsFilePath = path.resolve(process.cwd(), folder, pbjsFilePath.replace('.js', '.d.ts'));
  return new Promise((resolve, reject) => {
    pbts.main(['-p', process.cwd(), '-o', pbtsFilePath, pbjsFilePath], err => {
      if (err) {
        reject(err);
      }
      resolve(pbtsFilePath);
    });
  });
}
