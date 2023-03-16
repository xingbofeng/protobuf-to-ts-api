#!/usr/bin/env node
(()=>{"use strict";var e={607:function(e,t,o){var r=this&&this.__awaiter||function(e,t,o,r){return new(o||(o=Promise))((function(n,i){function s(e){try{u(r.next(e))}catch(e){i(e)}}function l(e){try{u(r.throw(e))}catch(e){i(e)}}function u(e){var t;e.done?n(e.value):(t=e.value,t instanceof o?t:new o((function(e){e(t)}))).then(s,l)}u((r=r.apply(e,t||[])).next())}))},n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.main=void 0;const i=n(o(22)),s=n(o(230)),l=n(o(566)),u=o(33),a=o(18),c=()=>`Usage: ${i.default.bold.green("pb2TSApi")} [options] ${i.default.bold.red("[file1.proto file2.proto ...]")} or ${i.default.bold.red("[./**/*.proto]")}`,d=()=>`Help:\n${i.default.bold.green("--requestModule -r")}: the request module of you want to set, default is ${i.default.bold.red("'axios'")}, you can set to your custom request method, for example ${i.default.bold.red("'@/request'")};\n${i.default.bold.green("--baseUrl -b")}: the base url of you want to set, default is ${i.default.bold.red("'/'")}, you can set to your api path, for example ${i.default.bold.red("'/api'")};\n${i.default.bold.green("--folder -f")}: the folder of you want to save the output files, default is ${i.default.bold.red("'./api'")};\n${i.default.bold.green("--root -r")}: the root path set to protobufjs, default is ${i.default.bold.red("the path of this command run")};\n${i.default.bold.green("--optional -o")}: is transfrom d.ts optional to false, because of protobuf 3.0 set all filed is optional, default is ${i.default.bold.red("true")};\n${i.default.bold.green("--mock -m")}: is open mock server, default is ${i.default.bold.red("false")};\n${i.default.bold.green("--port -p")}: mock server port, default is ${i.default.bold.red("3000")};\n`;function f(){return r(this,void 0,void 0,(function*(){try{const e=(0,l.default)(process.argv.slice(2),{alias:{requestModule:"r",baseUrl:"b",folder:"f",root:"r",optional:"o",mock:"m",port:"p",help:"h"},string:["requestModule","baseUrl","folder","root","port"],boolean:["optional","mock"],default:{requestModule:"axios",baseUrl:"/",folder:"./api",root:process.cwd(),optional:!0,mock:!1,port:"3000",help:""}});e.help&&(process.stderr.write(d()),process.exit(1));const{_:t}=e,o={requestModule:e.requestModule,baseUrl:e.baseUrl,folder:e.folder,root:e.root,optional:e.optional,mock:e.mock,port:e.port,help:e.help};t.length||(process.stderr.write(c()),process.exit(1));const r=yield(0,s.default)(t,{ignore:"node_modules/**",windowsPathsNoEscape:!0});let n;r.length||(process.stderr.write(i.default.bold.red(`there is not files for the flowing paths: \n ${t.join("\n")}`)),process.exit(1)),o.mock&&(n=(0,u.initServer)(o)),yield Promise.all(r.map((e=>(0,a.transferTSFile)(e,n,o))))}catch(e){console.error(e),process.exit(1)}}))}t.main=f,f()},735:(e,t)=>{var o;Object.defineProperty(t,"__esModule",{value:!0}),t.RequestMethods=void 0,(o=t.RequestMethods||(t.RequestMethods={})).post="post",o.get="get"},671:function(e,t,o){var r=this&&this.__awaiter||function(e,t,o,r){return new(o||(o=Promise))((function(n,i){function s(e){try{u(r.next(e))}catch(e){i(e)}}function l(e){try{u(r.throw(e))}catch(e){i(e)}}function u(e){var t;e.done?n(e.value):(t=e.value,t instanceof o?t:new o((function(e){e(t)}))).then(s,l)}u((r=r.apply(e,t||[])).next())}))},n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.getPbjsFile=void 0;const i=n(o(443)),s=n(o(17)),l=n(o(440));t.getPbjsFile=function(e,t){return r(this,void 0,void 0,(function*(){const{folder:o=""}=t,r=e.replace(".proto",".js"),n=s.default.resolve(process.cwd(),o,r),u=s.default.dirname(n);return yield(0,i.default)(u),new Promise(((o,r)=>{l.default.main(["-p",t.root,"-t","static-module","-w","commonjs","-o",n,s.default.resolve(process.cwd(),e)],(e=>{e&&r(e),o(n)}))}))}))}},433:function(e,t,o){var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.getPbtsFile=void 0;const n=r(o(17)),i=r(o(821));t.getPbtsFile=function(e,t){const{folder:o=""}=t,r=n.default.resolve(process.cwd(),o,e.replace(".js",".d.ts"));return new Promise(((o,n)=>{i.default.main(["-p",t.root,"-o",r,e],(e=>{e&&n(e),o(r)}))}))}},33:function(e,t,o){var r=this&&this.__awaiter||function(e,t,o,r){return new(o||(o=Promise))((function(n,i){function s(e){try{u(r.next(e))}catch(e){i(e)}}function l(e){try{u(r.throw(e))}catch(e){i(e)}}function u(e){var t;e.done?n(e.value):(t=e.value,t instanceof o?t:new o((function(e){e(t)}))).then(s,l)}u((r=r.apply(e,t||[])).next())}))},n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.generateMockRoute=t.initServer=void 0;const i=n(o(860)),s=n(o(147)),l=o(382);t.initServer=function(e){const t=(0,i.default)(),{port:o="3000"}=e;return t.listen(+o,(()=>{console.log(`mock server listening on port ${o}`)})),t},t.generateMockRoute=function(e,t,o){return r(this,void 0,void 0,(function*(){const{baseUrl:r}=o,n=yield s.default.promises.readFile(e,{encoding:"utf-8"}),i=JSON.parse(n);for(const e in i)if(Object.hasOwnProperty.call(i,e)){const o=(0,l.getRequestMethod)(e);t[o](`${r}${e}`,((t,o)=>{o.send(i[e])})),console.log(`mockServer generate mock route: ${r}${e} success`)}}))}},121:function(e,t,o){var r=this&&this.__awaiter||function(e,t,o,r){return new(o||(o=Promise))((function(n,i){function s(e){try{u(r.next(e))}catch(e){i(e)}}function l(e){try{u(r.throw(e))}catch(e){i(e)}}function u(e){var t;e.done?n(e.value):(t=e.value,t instanceof o?t:new o((function(e){e(t)}))).then(s,l)}u((r=r.apply(e,t||[])).next())}))},n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.saveApiFile=void 0;const i=n(o(147)),s=n(o(17)),l=o(137),u=o(382),a=o(463);t.saveApiFile=function(e,t){return r(this,void 0,void 0,(function*(){const{requestModule:o,baseUrl:r}=t,n=s.default.dirname(e),c=s.default.basename(e);let d="";d+=((e,t)=>`/* eslint-disable */\nimport request from ${e};\nimport api from './${t.replace(".ts","")}';\n`)(o,c);const f=new l.Project;f.addSourceFileAtPath(e);const p=f.getSourceFileOrThrow(e).getModules();(0,a.travelAllModule)(p,((e,t)=>{const o=e.getInterfaces();o.length&&o.forEach((e=>{const n=e.getName(),i=n.match(/^I(\S*)Req$/);if(i&&i.length){const e=i[1],s=`I${e}Rsp`;if(!o.find((e=>e.getName()===s)))return;d+=((e,t,o,r,n)=>`\nexport function ${e}(req: api.${t}): Promise<api.${o}> {\n  return request.${r}('${n}${e}', ${"post"===r?"req":"{ params: req }"});\n};\n`)(e,`${t}.${n}`,`${t}.${s}`,(0,u.getRequestMethod)(e),r)}}))})),yield i.default.promises.writeFile(s.default.resolve(n,c.replace(".d.ts",".ts")),d)}))}},787:function(e,t,o){var r=this&&this.__awaiter||function(e,t,o,r){return new(o||(o=Promise))((function(n,i){function s(e){try{u(r.next(e))}catch(e){i(e)}}function l(e){try{u(r.throw(e))}catch(e){i(e)}}function u(e){var t;e.done?n(e.value):(t=e.value,t instanceof o?t:new o((function(e){e(t)}))).then(s,l)}u((r=r.apply(e,t||[])).next())}))},n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.saveJSONSchemaFile=void 0;const i=n(o(147)),s=n(o(17)),l=o(432);t.saveJSONSchemaFile=function(e){return r(this,void 0,void 0,(function*(){const t=(0,l.getProgramFromFiles)([s.default.resolve(e)],{strictNullChecks:!0},process.cwd()),o=(0,l.buildGenerator)(t,{required:!0}),r=((null==o?void 0:o.getUserSymbols())||[]).filter((e=>/I(\S*)Rsp$/.test(e))),n=null==o?void 0:o.getSchemaForSymbols(r),u=e.replace(".d.ts",".json");return yield i.default.promises.writeFile(u,JSON.stringify(n,null,2),{encoding:"utf-8"}),u}))}},133:function(e,t,o){var r=this&&this.__awaiter||function(e,t,o,r){return new(o||(o=Promise))((function(n,i){function s(e){try{u(r.next(e))}catch(e){i(e)}}function l(e){try{u(r.throw(e))}catch(e){i(e)}}function u(e){var t;e.done?n(e.value):(t=e.value,t instanceof o?t:new o((function(e){e(t)}))).then(s,l)}u((r=r.apply(e,t||[])).next())}))},n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.saveMockJSONFile=void 0;const i=n(o(147)),s=o(557);t.saveMockJSONFile=function(e){return r(this,void 0,void 0,(function*(){const t=yield i.default.promises.readFile(e,{encoding:"utf-8"}),o=JSON.parse(t.replace(/(?<=#\/)definitions\//g,"")),r=yield s.JSONSchemaFaker.resolve(o.definitions),n={};for(const e in r)if(Object.hasOwnProperty.call(r,e)){const t=e.match(/I(\S*)Rsp$/);t&&t.length&&(n[t[1]]=r[e])}const l=JSON.stringify(n,null,2),u=e.replace(".json",".mock.json");return i.default.writeFileSync(u,l,{encoding:"utf-8"}),u}))}},600:function(e,t,o){var r=this&&this.__awaiter||function(e,t,o,r){return new(o||(o=Promise))((function(n,i){function s(e){try{u(r.next(e))}catch(e){i(e)}}function l(e){try{u(r.throw(e))}catch(e){i(e)}}function u(e){var t;e.done?n(e.value):(t=e.value,t instanceof o?t:new o((function(e){e(t)}))).then(s,l)}u((r=r.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0}),t.saveTypeScriptDefineFile=void 0;const n=o(137),i=o(463);t.saveTypeScriptDefineFile=function(e,t){return r(this,void 0,void 0,(function*(){const o=new n.Project;o.addSourceFileAtPath(e);const r=o.getSourceFileOrThrow(e),s=r.getModules();r.getImportDeclarations().forEach((e=>e.remove())),r.getImportStringLiterals().forEach((e=>{var t;(null===(t=e.getParent())||void 0===t?void 0:t.getParent()).remove()})),(0,i.travelAllModule)(s,(e=>{e.getClasses().forEach((e=>e.remove())),e.getTypeAliases().forEach((e=>e.remove())),t.optional||e.getInterfaces().forEach((e=>{var t;const o=e.getStructure();null===(t=o.properties)||void 0===t||t.forEach((e=>{e.hasQuestionToken=!1,"string"==typeof e.type&&(e.type=e.type.replace(/^\((\S*)\|null\)$/,"$1"))})),e.set(o)}))})),o.saveSync()}))}},18:function(e,t,o){var r=this&&this.__awaiter||function(e,t,o,r){return new(o||(o=Promise))((function(n,i){function s(e){try{u(r.next(e))}catch(e){i(e)}}function l(e){try{u(r.throw(e))}catch(e){i(e)}}function u(e){var t;e.done?n(e.value):(t=e.value,t instanceof o?t:new o((function(e){e(t)}))).then(s,l)}u((r=r.apply(e,t||[])).next())}))},n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.transferTSFile=void 0;const i=n(o(147)),s=n(o(17)),l=o(671),u=o(433),a=o(33),c=o(121),d=o(787),f=o(133),p=o(600);t.transferTSFile=function(e,t,o){return r(this,void 0,void 0,(function*(){const r=yield(0,l.getPbjsFile)(e,o),n=yield(0,u.getPbtsFile)(r,o);yield i.default.promises.unlink(r),yield(0,p.saveTypeScriptDefineFile)(n,o),yield(0,c.saveApiFile)(n,o);const h=yield(0,d.saveJSONSchemaFile)(n),v=yield(0,f.saveMockJSONFile)(h);console.log(`success generate ${e} to ${s.default.resolve(o.folder,e)}.d.ts and ${s.default.resolve(o.folder,e)}.ts`),o.mock&&t&&(console.log("begin open mock server"),yield(0,a.generateMockRoute)(v,t,o))}))}},463:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.travelAllModule=void 0,t.travelAllModule=function e(t,o,r=""){for(const n of t){const t=n.getModules(),i=t.length>0,s=`${r?`${r}.`:""}${n.getName()}`;o(n,s),i&&e(t,o,s)}}},382:(e,t,o)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.getRequestMethod=void 0;const r=o(735);t.getRequestMethod=function(e){return/post/.test(e.toLowerCase())?r.RequestMethods.post:r.RequestMethods.get}},22:e=>{e.exports=require("chalk")},860:e=>{e.exports=require("express")},230:e=>{e.exports=require("glob")},557:e=>{e.exports=require("json-schema-faker")},566:e=>{e.exports=require("minimist")},443:e=>{e.exports=require("mkdirp")},440:e=>{e.exports=require("protobufjs-cli/pbjs")},821:e=>{e.exports=require("protobufjs-cli/pbts")},137:e=>{e.exports=require("ts-morph")},432:e=>{e.exports=require("typescript-json-schema")},147:e=>{e.exports=require("fs")},17:e=>{e.exports=require("path")}},t={};!function o(r){var n=t[r];if(void 0!==n)return n.exports;var i=t[r]={exports:{}};return e[r].call(i.exports,i,i.exports,o),i.exports}(607)})();
//# sourceMappingURL=cli.js.map