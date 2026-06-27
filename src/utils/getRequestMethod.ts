import { RequestMethods } from '../interfaces/RequestMethods';

/**
 * 根据api方法名称，获取请求方法，默认为post
 * @param {String} apiName api方法名称
 * @returns {RequestMethods} 请求方法
 */
export function getRequestMethod(apiName: string): RequestMethods {
  return RequestMethods.post;
}
