import { RequestMethods } from '../interfaces/RequestMethods';

export function getRequestMethod(apiName: string): RequestMethods {
  return /post/.test(apiName.toLowerCase()) ? RequestMethods.post : RequestMethods.get;
}
