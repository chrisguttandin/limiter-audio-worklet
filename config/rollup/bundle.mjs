import { readFile, readFileSync, readlink, stat } from 'fs';
import babel from '@rollup/plugin-babel';
import { fileURLToPath } from 'url';
import { fs } from 'memfs';
import { join } from 'path';
import replace from '@rollup/plugin-replace';
import webpack from 'webpack';
// eslint-disable-next-line node/file-extensions-in-import
import webpackConfig from '../webpack/worklet-es5.mjs';

const workletFile = readFileSync('src/worklet/worklet.ts', 'utf8');
const result = /export\sconst\sworklet\s=\s`(?<workletString>.*)`;/g.exec(workletFile);

if (result === null) {
    throw new Error('The worklet file could not be parsed.');
}

const workletString = result.groups.workletString;

// eslint-disable-next-line import/no-default-export
export default new Promise((resolve, reject) => {
    const compiler = webpack(webpackConfig);

    compiler.inputFileSystem = {
        readFile(path, ...args) {
            if (path === fileURLToPath(new URL('../../src/worklet.js', import.meta.url))) {
                args.pop()(null, "import 'limiter-audio-worklet-processor';");

                return;
            }

            return readFile(path, ...args);
        },
        readlink(path, callback) {
            if (path === fileURLToPath(new URL('../../src/worklet.js', import.meta.url))) {
                return readlink(fileURLToPath(new URL(import.meta.url)), callback);
            }

            return readlink(path, callback);
        },
        stat(path, ...args) {
            if (path === fileURLToPath(new URL('../../src/worklet.js', import.meta.url))) {
                args.pop()(null, {
                    isFile() {
                        return true;
                    }
                });

                return;
            }

            return stat(path, ...args);
        }
    };
    compiler.outputFileSystem = { ...fs, join };
    compiler.run((err, stats) => {
        if (err !== null) {
            reject(err);
        } else if (stats.hasErrors() || stats.hasWarnings()) {
            reject(new Error(stats.toString({ errorDetails: true, warnings: true })));
        } else {
            const transpiledWorkletString = fs // eslint-disable-line node/no-sync
                .readFileSync('/worklet.js', 'utf8')
                .replace(/\\/g, '\\\\')
                .replace(/`/g, '\\`')
                .replace(/\${/g, '\\${');

            resolve({
                input: 'build/es2019/module.js',
                output: {
                    file: 'build/es5/bundle.js',
                    format: 'umd',
                    name: 'limiterAudioWorklet'
                },
                plugins: [
                    replace({
                        delimiters: ['`', '`'],
                        include: 'build/es2019/worklet/worklet.js',
                        values: {
                            // V8 does only accept substrings with a maximum length of 32767 characters. Otherwise it throws a SyntaxError.
                            [workletString.slice(0, 32767)]: `\`${transpiledWorkletString}\``,
                            [workletString.slice(32767)]: ''
                        }
                    }),
                    babel({
                        babelHelpers: 'runtime',
                        exclude: 'node_modules/**',
                        plugins: ['@babel/plugin-external-helpers', '@babel/plugin-transform-runtime'],
                        presets: [
                            [
                                '@babel/preset-env',
                                {
                                    modules: false
                                }
                            ]
                        ]
                    })
                ]
            });
        }
    });
});
