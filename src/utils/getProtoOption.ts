/**
 * 通用方法：从 protobufjs 描述对象中获取指定自定义 option
 * @param descriptor message/field/service/method descriptor
 * @param name option 名字（无需加括号，例如 "api_obj"）
 * @returns 任意类型的 option 值，若不存在则返回 undefined
 */
export function getProtoOption(descriptor: any, name: string) {
  if (!descriptor || !descriptor.options) return undefined;
  // protobufjs 规范：自定义 option 必须为 "(name)" 或 "(name).tag" 格式
  const key = name.startsWith("(") ? name : `(${name})`;
  return descriptor.options[key];
}
