import fs from 'fs';
import { JSONSchemaFaker } from 'json-schema-faker';
import { JsonObject, JsonValue } from 'type-fest';

/**
 * 生成前端mockserver返回的 mock 数据的文件
 * @param {String} jsonSchemaFilePath 生成的JSON Schema 文件的路径
 */
export async function saveMockJSONFile(jsonSchemaFilePath: string) {
  const schemaFileStr = await fs.promises.readFile(jsonSchemaFilePath, { encoding: 'utf-8' });
  const schema = JSON.parse(schemaFileStr);

  JSONSchemaFaker.option({
    alwaysFakeOptionals: true,
    resolveJsonPath: true,
  });

  const json: Record<string, JsonValue> = {};
  
  for (const key in schema.definitions) {
    const rspNameMatchs = key.match(/I(\S*)Rsp$/);
    if (!rspNameMatchs) continue;

    const apiName = rspNameMatchs[1];
    const definitionSchema = schema.definitions[key];

    // 包含 definitions 让 $ref 能找到
    const fullSchema = {
      ...definitionSchema,
      definitions: schema.definitions,
    };

    const mock = JSONSchemaFaker.generate(fullSchema);
    json[apiName] = mock;
  }

  const fileContent = JSON.stringify(json, null, 2);
  const mockFilePath = jsonSchemaFilePath.replace('.json', '.mock.json');
  fs.writeFileSync(mockFilePath, fileContent, { encoding: 'utf-8' });
  return mockFilePath;
}
