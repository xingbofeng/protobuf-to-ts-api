const fs = require('fs');
const pbjs = require('protobufjs-cli/pbjs');
const pbts = require('protobufjs-cli/pbts');
const { Project } = require('ts-morph');

const tsDefineFilename = 'api.d.ts';
const apiFilename = 'api.ts';
const inputFilename = './example/example.proto';
const requestPath = 'axios';
const baseUrl = '/';

function getPbjsFile() {
  const pbjsFilename = `${new Date().getTime()}_compiled.js`;
  return new Promise((resolve, reject) => {
    pbjs.main(['-t', 'static-module', '-w', 'commonjs', '-o', pbjsFilename, inputFilename], function (err) {
      if (err) {
        reject(err);
      }
      resolve(pbjsFilename);
    });
  });
}

function getPbtsFile(pbjsFilename) {
  return new Promise((resolve, reject) => {
    pbts.main(['-o', tsDefineFilename, pbjsFilename], function (err, pbtsOutput) {
      if (err) {
        reject(err);
      }
      resolve();
    });
  });
}

function travelAllModule(modules, callback, parentName = '') {
  for (const module of modules) {
    const children = module.getModules();
    const hasModule = children.length > 0;
    callback(module, `${parentName ? '.' : ''}${module.getName()}`);
    if (hasModule) {
      travelAllModule(children, callback, `${parentName}.${module.getName()}`);
    }
  }
}

async function saveTypeScriptDefineFile() {
  const project = new Project();
  project.addSourceFileAtPath(tsDefineFilename);
  const file = project.getSourceFileOrThrow(tsDefineFilename);
  const modules = file.getModules();
  // 去掉生成的import
  file.getImportDeclarations().forEach(i => i.remove());
  // 对于importString的处理
  file.getImportStringLiterals().forEach(i => i.getParent().getParent().remove());
  travelAllModule(modules, module => {
    const classes = module.getClasses();
    // 去掉生成的class
    classes.forEach(c => c.remove());
  });
  project.saveSync();
}

async function saveApiFile() {
  let apiline = `
import request from ${requestPath};
import api from './${tsDefineFilename}';
`;
  const project = new Project();
  project.addSourceFileAtPath(tsDefineFilename);
  const file = project.getSourceFileOrThrow(tsDefineFilename);
  const modules = file.getModules();
  travelAllModule(modules, (module, parentName) => {
    const interfaces = module.getInterfaces();
    interfaces.length && interfaces.forEach(interface => {
      const reqName = interface.getName();
      const arr = reqName.match(/^I(\S*)Req$/);
      if (arr && arr.length) {
        const apiName = arr[1];
        // 找到返回值的interface
        const rsp = interfaces.find(item => item.getName() === `I${apiName}Rsp`);
        if (rsp) {
          const requestMethod = /post/.test(apiName) ? 'post' : 'get';
          const rspName = `I${apiName}Rsp`;
          apiline += `
export function ${apiName}(req: api.${parentName}.${reqName}): Promise<api.${parentName}.${rspName}> {
  return request.${requestMethod}('${baseUrl}${apiName}', ${requestMethod === 'post' ? 'req' : '{ params: req }'});
};
`;
        }
      }
    });
  });

  await fs.promises.writeFile(apiFilename, apiline);
}

async function main() {
  try {
    const pbjsFilename = await getPbjsFile();
    await getPbtsFile(pbjsFilename);
    await fs.promises.unlink(pbjsFilename);
    await saveTypeScriptDefineFile();
    await saveApiFile();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  process.exit(0);
}

main();
