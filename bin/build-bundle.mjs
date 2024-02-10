#!/usr/bin/env node

import fs from 'node:fs/promises'
import path from 'node:path'
import chalk from 'chalk'

import esbuild from 'esbuild'
import babel from 'esbuild-plugin-babel'

const BigDeal_ROOT = new URL('../', import.meta.url)
const PACKAGES_ROOT = new URL('./packages/', BigDeal_ROOT)

function buildBundle (srcFile, bundleFile, { minify = true, standalone = '', plugins, target, format } = {}) {
  return esbuild.build({
    bundle: true,
    sourcemap: true,
    entryPoints: [srcFile],
    outfile: bundleFile,
    platform: 'browser',
    minify,
    keepNames: true,
    plugins,
    target,
    format,
  }).then(() => {
    if (minify) {
      console.info(chalk.green(`✓ Built Minified Bundle [${standalone}]:`), chalk.magenta(bundleFile))
    } else {
      console.info(chalk.green(`✓ Built Bundle [${standalone}]:`), chalk.magenta(bundleFile))
    }
  })
}

await fs.mkdir(new URL('./BigDeal/dist', PACKAGES_ROOT), { recursive: true })
await fs.mkdir(new URL('./@BigDeal/locales/dist', PACKAGES_ROOT), { recursive: true })

const methods = [
  buildBundle(
    './packages/BigDeal/index.mjs',
    './packages/BigDeal/dist/BigDeal.min.mjs',
    { standalone: 'BigDeal (ESM)', format: 'esm' },
  ),
  buildBundle(
    './packages/BigDeal/bundle.mjs',
    './packages/BigDeal/dist/BigDeal.min.js',
    { standalone: 'BigDeal', format: 'iife' },
  ),
  buildBundle(
    './packages/BigDeal/bundle-legacy.mjs',
    './packages/BigDeal/dist/BigDeal.legacy.min.js',
    {
      standalone: 'BigDeal (with polyfills)',
      target: 'es5',
      plugins:[babel({
        config:{
          compact: false,
          highlightCode: false,
          inputSourceMap: true,

          browserslistEnv: 'legacy',
          presets: [['@babel/preset-env',  {
            loose: false,
            targets: { ie:11 },
            useBuiltIns: 'entry',
            corejs: { version: '3.24', proposals: true },
          }]],
        },
      })],
    },
  ),
]

// Build mini versions of all the locales
const localModules = await fs.opendir(new URL('./@BigDeal/locales/src/', PACKAGES_ROOT))
for await (const dirent of localModules) {
  if (!dirent.isDirectory() && dirent.name.endsWith('.js')) {
    const localeName = path.basename(dirent.name, '.js')
    methods.push(
      buildBundle(
        `./packages/@BigDeal/locales/src/${localeName}.js`,
        `./packages/@BigDeal/locales/dist/${localeName}.min.js`,
        { minify: true },
      ),
    )
  }
}

// Add BUNDLE-README.MD
methods.push(
  fs.copyFile(
    new URL('./BUNDLE-README.md', BigDeal_ROOT),
    new URL('./BigDeal/dist/README.md', PACKAGES_ROOT),
  ),
)

await Promise.all(methods).then(() => {
  console.info(chalk.yellow('✓ JS bundles 🎉'))
}, (err) => {
  console.error(chalk.red('✗ Error:'), chalk.red(err.message))
})
