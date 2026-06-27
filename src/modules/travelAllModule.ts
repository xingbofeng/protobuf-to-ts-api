import { ModuleDeclaration } from 'ts-morph';
/**
 * 递归一个ts文件下所有模块
 * @param {ModuleDeclaration[]} modules 通过ts-morph生成模块声明
 * @param {Function} callback 递归一个ts文件所有模块下对于每个模块的回调函数
 * @param {String} parentName 递归到当前模块，所有父级namespace的名称，通过.符号分割
 */
export async function travelAllModule(modules: ModuleDeclaration[], callback: (module: ModuleDeclaration, fullName: string) => void, parentName = '') {
  for (const module of modules) {
    const children = module.getModules();
    const hasModule = children.length > 0;
    const fullName = `${parentName ? `${parentName}.` : ''}${module.getName()}`;
    await callback(module, fullName);
    if (hasModule) {
      await travelAllModule(children, callback, fullName);
    }
  }
}

/**
 * 遍历ts文件下底层模块
 * @param {ModuleDeclaration[]} modules 通过ts-morph生成模块声明
 * @param {Function} callback 递归一个ts文件所有模块下对于每个模块的回调函数
 * @param {String} parentName 递归到当前模块，所有父级namespace的名称，通过.符号分割
 */
export async function travelTopModule(modules: ModuleDeclaration[], callback: (module: ModuleDeclaration, fullName: string) => void, parentName = '') {
  for (const module of modules) {
    const fullName = `${parentName ? `${parentName}.` : ''}${module.getName()}`;
    await callback(module, fullName);
  }
}