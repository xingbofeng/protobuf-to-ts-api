import fs from 'fs';
import path from 'path';
import { buildGenerator, getProgramFromFiles } from 'typescript-json-schema';

/**
 * 生成前端api请求JSON Schema 文件
 * @param {String} pbtsFilePath 生成的d.ts定义文件的路径
 * @returns {String} jsonSchemaFilePath 生成的json schema 文件路径
 */
export async function saveJSONSchemaFile(pbtsFilePath: string) {
  const settings = {
    required: true,
  };
  const compilerOptions = {
    strictNullChecks: true,
  };

  const program = getProgramFromFiles([path.resolve(pbtsFilePath)], compilerOptions, process.cwd());
  const generator = buildGenerator(program, settings);
  const symbols = (generator?.getUserSymbols() || []).filter(symbol => /I(\S*)Rsp$/.test(symbol));
  const schema = generator?.getSchemaForSymbols(symbols);
  const jsonSchemaFilePath = pbtsFilePath.replace('.d.ts', '.json');
  await fs.promises.writeFile(jsonSchemaFilePath, JSON.stringify(schema, null, 2), { encoding: 'utf-8' });
  return jsonSchemaFilePath;
}
