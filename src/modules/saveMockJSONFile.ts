import fs from 'fs';
import { JSONSchemaFaker } from 'json-schema-faker';
import { JsonObject, JsonValue } from 'type-fest';

/**
 * 生成前端api请求 mock 文件
 * @param {String} jsonSchemaFilePath 生成的JSON Schema 文件的路径
 */
export async function saveMockJSONFile(jsonSchemaFilePath: string) {
  const schemaFileStr = await fs.promises.readFile(jsonSchemaFilePath, { encoding: 'utf-8' });
  const schema = JSON.parse(schemaFileStr.replace(/(?<=#\/)definitions\//g, ''));
  const jsfResult = await JSONSchemaFaker.resolve(schema.definitions) as JsonObject;
  const json: Record<string, JsonValue> = {};
  for (const key in jsfResult) {
    if (Object.hasOwnProperty.call(jsfResult, key)) {
      const rspNameMatchs = key.match(/I(\S*)Rsp$/);
      if (rspNameMatchs && rspNameMatchs.length) {
        const apiName = rspNameMatchs[1];
        json[apiName] = jsfResult[key];
      }
    }
  }
  const fileContent = JSON.stringify(json, null, 2);
  const mockFilePath = jsonSchemaFilePath.replace('.json', '.mock.json');
  fs.writeFileSync(mockFilePath, fileContent, { encoding: 'utf-8' });
  return mockFilePath;
}
