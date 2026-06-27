import fs from "fs";
import path from "path";

import protobuf from "protobufjs";

import { IOptions } from "../interfaces/IOptions";
import { RequestMethods } from "../interfaces/RequestMethods";
import { getProtoOption } from "../utils/getProtoOption";

const joinUrlPath = (baseUrl: string, path: string): string => {
  if (!baseUrl || baseUrl === '/') return path.startsWith('/') ? path : `/${path}`;
  const base = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
  const suffix = path.startsWith('/') ? path : `/${path}`;
  return base + suffix;
};

const getLinePerfix = (requestModule: string, tsDefineFilename: string) =>
  `/* eslint-disable */
import request from "${requestModule}";
import api from './${tsDefineFilename.replace(".ts", "")}';
`;

const getLine = (serviceName: string, apiMethods: ApiMethod[]) => {
  let content = `\nexport class ${serviceName}Service {`;

  for (const apiMethod of apiMethods) {
    let requestType = `I${apiMethod.requestType}`;
    let responseType = `I${apiMethod.responseType}`;
    if (apiMethod.namespace) {
      requestType = `${apiMethod.namespace}.${requestType}`;
      responseType = `${apiMethod.namespace}.${responseType}`;
    }
    content += `\n\n  ${apiMethod.comment ? `/** ${apiMethod.comment} */` : "/** no comment **/"}`;
    content += `\n  static async ${apiMethod.methodName}(req: api.${requestType}): Promise<api.${responseType}> {`;
    content += `\n    return await request.${apiMethod.httpMethod}('${apiMethod.urlPath}', ${apiMethod.httpMethod === "get" ? "{ params: req }" : "req"});`;
    content += `\n  }`;
  }

  content += `\n}\n`;
  return content;
};

/**
 * 生成前端api请求文件
 * @param {String} pbtsFilePath 生成的d.ts定义文件的路径
 * @param {Object} options 用户传入的自定义配置选项
 */
export async function saveApiFile(
  protoFilePath: string,
  pbtsFilePath: string,
  options: IOptions
): Promise<ApiMethod[]> {
  const { requestModule, baseUrl } = options;
  const tsDefineDirname = path.dirname(pbtsFilePath);
  const tsDefineFilename = path.basename(pbtsFilePath);
  let apiline = "";
  apiline += getLinePerfix(requestModule, tsDefineFilename);

  const apiMethods = await parseProtoApiMethods(protoFilePath, options);

  const mapServiceToMethods = new Map<string, ApiMethod[]>();
  for (const apiMethod of apiMethods) {
    let serviceName = apiMethod.serviceName || "";
    if (apiMethod.namespace) {
      if (apiMethod.namespace.toLowerCase() != serviceName.toLowerCase()) {
        serviceName =
          apiMethod.namespace +
          serviceName.slice(0, 1).toUpperCase() +
          serviceName.slice(1);
      }
    }
    if (!mapServiceToMethods.has(serviceName)) {
      mapServiceToMethods.set(serviceName, []);
    }
    mapServiceToMethods.get(serviceName)!.push(apiMethod);
  }

  for (const [serviceName, methods] of mapServiceToMethods) {
    apiline += getLine(serviceName, methods);
  }

  await fs.promises.writeFile(
    path.resolve(tsDefineDirname, tsDefineFilename.replace(".d.ts", "_api.ts")),
    apiline
  );
  return apiMethods;
}

export class ApiMethod {
  serviceName: string | undefined;
  methodName: string | undefined;
  requestType: string | undefined;
  responseType: string | undefined;
  httpMethod: string | undefined;
  urlPath: string | undefined;
  namespace: string | undefined;
  comment: string | undefined;
}

/**
 * 解析proto文件中的所有service method
 */
async function parseProtoApiMethods(
  protoFilePath: string,
  options: IOptions
): Promise<ApiMethod[]> {
  const protoSource = fs.readFileSync(protoFilePath, "utf8");

  const parsed = protobuf.parse(protoSource, {
    keepCase: true,
    preferTrailingComment: true,
    alternateCommentMode: true,
  });

  const root = parsed.root;
  root.resolveAll();

  const apiMethods: ApiMethod[] = [];
  const traverse = function (
    nested: protobuf.NamespaceBase,
    namespacePath: string
  ) {
    for (const nestedObj of Object.values(nested.nested || {})) {
      if (nestedObj instanceof protobuf.Service) {
        for (const [methodName, method] of Object.entries(nestedObj.methods)) {
          const apiMethod = new ApiMethod();
          apiMethod.serviceName = nestedObj.name;
          apiMethod.methodName = methodName;
          apiMethod.requestType = method.requestType;
          apiMethod.responseType = method.responseType;
          apiMethod.namespace = namespacePath || undefined;
          apiMethod.comment = method.comment || "";

          if (
            options.protoOptionTagHttpMethod ||
            options.protoOptionTagHttpPath
          ) {
            if (method.options) {
              let protoOptionMethod = getProtoOption(
                method,
                options.protoOptionTagHttpMethod
              );
              let protoOptionPath = getProtoOption(
                method,
                options.protoOptionTagHttpPath
              );

              if (!protoOptionMethod) {
                protoOptionMethod = RequestMethods.post;
              }
              if (!protoOptionPath) {
                protoOptionPath = `/${nestedObj.name}/${methodName}`;
                if (namespacePath) {
                  protoOptionPath = `/${namespacePath}/${nestedObj.name}/${methodName}`;
                }
              }
              apiMethod.httpMethod = protoOptionMethod.toLowerCase();
              apiMethod.urlPath = joinUrlPath(options.baseUrl, protoOptionPath);
            } else {
              // 没有 options 时 fallback 到 post
              apiMethod.httpMethod = RequestMethods.post;
              let urlPath = `/${nestedObj.name}/${methodName}`;
              if (namespacePath) {
                urlPath = `/${namespacePath}/${nestedObj.name}/${methodName}`;
              }
              apiMethod.urlPath = joinUrlPath(options.baseUrl, urlPath);
            }
          } else {
            apiMethod.httpMethod = RequestMethods.post;
            let urlPath = `/${nestedObj.name}/${methodName}`;
            if (namespacePath) {
              urlPath = `/${namespacePath}/${nestedObj.name}/${methodName}`;
            }
            apiMethod.urlPath = joinUrlPath(options.baseUrl, urlPath);
          }

          apiMethods.push(apiMethod);
        }
      }

      if (nestedObj instanceof protobuf.Namespace) {
        const childNamespace = namespacePath
          ? `${namespacePath}.${nestedObj.name}`
          : nestedObj.name;
        traverse(nestedObj, childNamespace);
      }
    }
  };

  traverse(root, "");
  return apiMethods;
}
