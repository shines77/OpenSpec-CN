#!/usr/bin/env node

import { execFileSync } from 'child_process';
import { existsSync, rmSync, mkdirSync, cpSync } from 'fs';
import { createRequire } from 'module';
import { fileURLToPath } from 'url';
import path from 'path';

const require = createRequire(import.meta.url);

const runTsc = (args = []) => {
  const tscPath = require.resolve('typescript/bin/tsc');
  execFileSync(process.execPath, [tscPath, ...args], { stdio: 'inherit' });
};

console.log('🔨 Building OpenSpec...\n');

// Clean dist directory
if (existsSync('dist')) {
  console.log('Cleaning dist directory...');
  rmSync('dist', { recursive: true, force: true });
}

// Run TypeScript compiler (use local version explicitly)
console.log('Compiling TypeScript...');
try {
  runTsc(['--version']);
  runTsc();

  // Copy locales directory to dist
  console.log('Copying locales...');
  const srcLocales = 'src/locales';
  const distLocales = 'dist/locales';
  if (existsSync(srcLocales)) {
    mkdirSync(distLocales, { recursive: true });
    cpSync(srcLocales, distLocales, { recursive: true });
    console.log('✓ Locales copied to dist/locales');
  }

  console.log('\n✅ Build completed successfully!');
} catch (error) {
  console.error('\n❌ Build failed!');
  process.exit(1);
}
