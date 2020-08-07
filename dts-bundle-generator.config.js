// @ts-check

/** @type import('dts-bundle-generator/config-schema').BundlerConfig */
const config = {
    compilationOptions: {
        preferredConfigPath: './tsconfig.json',
    },
    entries: [
        {
            filePath: './dist/index.d.ts',
            outFile: './dist/bundle.d.ts',
        },
    ],
};

module.exports = config;
