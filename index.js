const path = require('path');
const glob = require('glob');
const minimist = require('minimist');
const chalk = require('chalk');

const transferTSFile = require('./core/transferTSFile');

const getUsage = () =>
  `Usage: ${chalk.bold.green('pb2TSApi')} [options] ${chalk.bold.red('[file1.proto file2.proto ...]')} or ${chalk.bold.red('[./**/*.proto]')}`;

const getHelp = () =>
  `Help:
${chalk.bold.green('--requestModule -r')}: the request module of you want to set, default is ${chalk.bold.red(`'axios'`)}, you can set to your custom request method, for example ${chalk.bold.red(`'@/request'`)};
${chalk.bold.green('--baseUrl -b')}: the base url of you want to set, default is ${chalk.bold.red(`'/'`)}, you can set to your api path, for example ${chalk.bold.red(`'/api'`)};
${chalk.bold.green('--folder -f')}: the folder of you want to save the output files, default is ${chalk.bold.red(`'./api'`)};
`;

module.exports = async function main() {
  try {
    const argv = minimist(process.argv.slice(2), {
      alias: {
        requestModule: 'r',
        baseUrl: 'b',
        folder: 'f',
        help: 'h',
      },
      string: ['requestModule', 'baseUrl'],
      default: {
        requestModule: 'axios',
        baseUrl: '/',
        folder: './api',
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
    await Promise.all(protoFiles.map(filePath => transferTSFile(filePath, options)));
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
  process.exit(0);
}
