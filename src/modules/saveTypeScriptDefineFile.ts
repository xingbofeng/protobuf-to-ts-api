import { ImportDeclaration, Project } from 'ts-morph';

import { IOptions } from '../interfaces/IOptions';
import { travelAllModule } from './travelAllModule';

/**
 * 去除protobuf-cli生成的d.ts文件中的冗余class和type alias，保留interface定义
 * @param {String} pbtsFilePath 生成的d.ts定义文件的路径
 * @param {Object} options 用户传入的自定义配置选项
 */
export async function saveTypeScriptDefineFile(pbtsFilePath: string, options: IOptions) {
  const project = new Project();
  project.addSourceFileAtPath(pbtsFilePath);
  const file = project.getSourceFileOrThrow(pbtsFilePath);
  const modules = file.getModules();
  // 去掉生成的import（保留 Long 导入，因为 google.protobuf 类型引用了 Long）
  file.getImportDeclarations().forEach(i => {
    const moduleSpecifier = i.getModuleSpecifierValue();
    if (moduleSpecifier !== 'long' && moduleSpecifier !== 'protobufjs') {
      i.remove();
    }
  });

  // 对于importString的处理（仅移除 ImportDeclaration 类型的父节点，保留 ImportEqualsDeclaration 如 import Long = require("long")）
  file.getImportStringLiterals().forEach(i => {
    const grandParent = i.getParent()?.getParent();
    if (grandParent && grandParent.getKindName() === 'ImportDeclaration') {
      (grandParent as ImportDeclaration).remove();
    }
  });

  await travelAllModule(modules, module => {
    // 去掉生成的class
    const classes = module.getClasses();
    classes.forEach(c => c.remove());

    // 去掉生成的rpc-type
    const typeAliases = module.getTypeAliases();
    typeAliases.forEach(t => t.remove());

    if (!options.optional) {
      module.getInterfaces().forEach(item => {
        const structure = item.getStructure();
        structure.properties?.forEach(property => {
          property.hasQuestionToken = false;
          if (typeof property.type === 'string') {
            property.type = property.type.replace(/^\((\S*)\|null\)$/, '$1');
          }
        });
        item.set(structure);
      });
    }
  });
  project.saveSync();
}
