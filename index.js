const glob = require('glob');
const minimist = require('minimist');
const chalk = require('chalk');

const transferTSFile = require('./core/transferTSFile');
const { initServer } = require('./core/mockServer');

const getUsage = () =>
  `Usage: ${chalk.bold.green('pb2TSApi')} [options] ${chalk.bold.red('[file1.proto file2.proto ...]')} or ${chalk.bold.red('[./**/*.proto]')}`;

const getHelp = () =>
  `Help:
${chalk.bold.green('--requestModule -r')}: the request module of you want to set, default is ${chalk.bold.red(`'axios'`)}, you can set to your custom request method, for example ${chalk.bold.red(`'@/request'`)};
${chalk.bold.green('--baseUrl -b')}: the base url of you want to set, default is ${chalk.bold.red(`'/'`)}, you can set to your api path, for example ${chalk.bold.red(`'/api'`)};
${chalk.bold.green('--folder -f')}: the folder of you want to save the output files, default is ${chalk.bold.red(`'./api'`)};
${chalk.bold.green('--root -r')}: the root path set to protobufjs, default is ${chalk.bold.red('the path of this command run')};
${chalk.bold.green('--optional -o')}: is transfrom d.ts optional to false, because of protobuf 3.0 set all filed is optional, default is ${chalk.bold.red('true')};
${chalk.bold.green('--mock -m')}: is open mock server, default is ${chalk.bold.red('false')};
${chalk.bold.green('--port -p')}: mock server port, default is ${chalk.bold.red('3000')};
`;

module.exports = async function main() {
  try {
    const argv = minimist(process.argv.slice(2), {
      alias: {
        requestModule: 'r',
        baseUrl: 'b',
        folder: 'f',
        root: 'r',
        optional: 'o',
        mock: 'm',
        port: 'p',
        help: 'h',
      },
      string: ['requestModule', 'baseUrl', 'folder', 'root', 'port'],
      boolean: ['optional', 'mock'],
      default: {
        requestModule: 'axios',
        baseUrl: '/',
        folder: './api',
        root: process.cwd(),
        optional: true,
        mock: false,
        mockPort: '3000',
        help: '',
      },
    });
    if (argv.help) {
      process.stderr.write(getHelp());
      process.exit(1);
    }
    const { _: files, ...options } = argv;
    if (!files.length) {
      process.stderr.write(getUsage());
      process.exit(1);
    }
    const protoFiles = await glob(files, { ignore: 'node_modules/**', windowsPathsNoEscape: true });
    if (!protoFiles.length) {
      process.stderr.write(chalk.bold.red(`there is not files for the flowing paths: \n ${files.join('\n')}`));
      process.exit(1);
    }
    let mockServer;
    if (options.mock) {
      mockServer = initServer(options);
    }
    await Promise.all(protoFiles.map(filePath => transferTSFile(filePath, mockServer, options)));
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}
