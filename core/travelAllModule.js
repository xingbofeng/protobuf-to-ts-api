/**
 * 递归一个ts文件下所有模块
 * @param {ModuleDeclaration[]} modules 通过ts-morph生成模块声明
 * @param {Function} callback 递归一个ts文件所有模块下对于每个模块的回调函数
 * @param {String} parentName 递归到当前模块，所有父级namespace的名称，通过.符号分割
 */
module.exports = function travelAllModule(modules, callback, parentName = '') {
  for (const module of modules) {
    const children = module.getModules();
    const hasModule = children.length > 0;
    const fullName = `${parentName ? `${parentName}.` : ''}${module.getName()}`;
    callback(module, fullName);
    if (hasModule) {
      travelAllModule(children, callback, fullName);
    }
  }
}
