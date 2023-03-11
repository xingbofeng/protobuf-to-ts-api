
const fs = require('fs');
const path = require('path');

const getPbtsFile = require('./getPbtsFile');
const getPbjsFile = require('./getPbjsFile');
const saveTypeScriptDefineFile = require('./saveTypeScriptDefineFile');
const saveApiFile = require('./saveApiFile');
const saveJSONSchemaFile = require('./saveJSONSchemaFile');
const saveMockJSONFile = require('./saveMockJSONFile');

/**
 * 转换protobuf定义文件为ts定义文件和api请求文件
 * @param {String} filePath protobuf定义文件的路径
 * @param {Object} options 用户自定义配置
 */
module.exports = async function transferTSFile(filePath, options) {
  const pbjsFilePath = await getPbjsFile(filePath, options);
  const pbtsFilePath = await getPbtsFile(pbjsFilePath, options);
  await fs.promises.unlink(pbjsFilePath);
  await saveTypeScriptDefineFile(pbtsFilePath);
  await saveApiFile(pbtsFilePath, options);
  const jsonSchemaFilePath = await saveJSONSchemaFile(pbtsFilePath, options);
  await saveMockJSONFile(jsonSchemaFilePath, options);
  console.log(`success generate ${filePath} to ${path.resolve(options.folder, filePath)}.d.ts and ${path.resolve(options.folder, filePath)}.ts`);
}
