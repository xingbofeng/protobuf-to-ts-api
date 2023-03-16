import { ImportDeclaration, Project } from 'ts-morph';

import { IOptions } from '../interfaces/IOptions';
import { travelAllModule } from './travelAllModule';

/**
 * 去除protobuf-cli生成的d.ts文件中的冗余的class模块
 * @param {String} pbtsFilePath 生成的d.ts定义文件的路径
 * @param {Object} options 用户传入的自定义配置选项
 */
export async function saveTypeScriptDefineFile(pbtsFilePath: string, options: IOptions) {
  const project = new Project();
  project.addSourceFileAtPath(pbtsFilePath);
  const file = project.getSourceFileOrThrow(pbtsFilePath);
  const modules = file.getModules();
  // 去掉生成的import
  file.getImportDeclarations().forEach(i => i.remove());

  // 对于importString的处理
  file.getImportStringLiterals().forEach(i => {
    const p = i.getParent()?.getParent() as ImportDeclaration;
    p.remove();
  });

  travelAllModule(modules, module => {
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
