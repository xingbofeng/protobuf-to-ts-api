const fs = require('fs');
const JSF = require('json-schema-faker');

/**
 * 生成前端api请求 mock 文件
 * @param {String} jsonSchemaFilePath 生成的JSON Schema 文件的路径
 * @param {Object} options 用户传入的自定义配置选项
 */
module.exports = async function saveJSONSchemaFile(jsonSchemaFilePath, options) {
  const schemaFileStr = await fs.promises.readFile(jsonSchemaFilePath, { encoding: 'utf-8' });
  const schema = JSON.parse(schemaFileStr);
  Object.keys(schema.definitions).forEach(key => {
    try {
      const json = JSF.generate(schema.definitions);
      const fileContent = JSON.stringify(json, null, 2);
      fs.writeFileSync(jsonSchemaFilePath.replace('.json', '.mock.json'), fileContent, { encoding: 'utf-8' });
    } catch (err) {
      // json-schema-faker这个版本对于$ref会误报错，不影响文件生成
      // nothing
    }
  });
}
