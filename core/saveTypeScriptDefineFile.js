const { Project } = require('ts-morph');
const travelAllModule = require('./travelAllModule');

/**
 * 去除protobuf-cli生成的d.ts文件中的冗余的class模块
 * @param {String} pbtsFilePath 生成的d.ts定义文件的路径
 */
module.exports = async function saveTypeScriptDefineFile(pbtsFilePath) {
  const project = new Project();
  project.addSourceFileAtPath(pbtsFilePath);
  const file = project.getSourceFileOrThrow(pbtsFilePath);
  const modules = file.getModules();
  // 去掉生成的import
  file.getImportDeclarations().forEach(i => i.remove());

  // 对于importString的处理
  file.getImportStringLiterals().forEach(i => i.getParent().getParent().remove());

  travelAllModule(modules, module => {
    // 去掉生成的class
    const classes = module.getClasses();
    classes.forEach(c => c.remove());

    // 去掉生成的rpc-type
    const typeAliases = module.getTypeAliases();
    typeAliases.forEach(t => t.remove());
  });
  project.saveSync();
}
