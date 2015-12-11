import * as argv from 'yargs';
import * as fs from 'fs';
import * as slash from 'slash';

const resolve = require.resolve;

const CWD = process.cwd();
const pkg = JSON.parse(fs.readFileSync(`${CWD}/package.json`, 'utf8'));

// --------------
// Configuration.
const ENV: string = argv['env'] || process.env.profile || 'dev';
process.env.profile = ENV;

export const PORT: number = argv['port'] || 5555;
export const LIVE_RELOAD_PORT: number = argv['reload-port'] || 4002;
export const APP_BASE: string = argv['base'] || '/';
export const APP_VERSION: string = pkg.version;

const CLIENT_SRC_BASE = `client`;
const DIST_BASE = `dist`;
const CLIENT_DEST_BASE = `${DIST_BASE}`;

const NM = `${CWD}/node_modules`;
const BC = `${CWD}/bower_components`;

export const PATH = {
  cwd: CWD,
  jslint: [
    `${CLIENT_SRC_BASE}/**/*.ts`,
    `${CWD}/server/**/*.ts`,
    `tools/**/*.ts`,
    `!tools/typings/**`,
    `${CWD}/gulpfile.ts`
  ],
  src: {
    base: CLIENT_SRC_BASE,
    jslib: [
      // Order is quite important here for the HTML tag injection.
      slash(resolve('es6-shim/es6-shim.min.js')),
      slash(resolve('es6-shim/es6-shim.map')),
      slash(resolve('systemjs/dist/system.src.js')),
      `${CLIENT_SRC_BASE}/system.config.js`,
      slash(resolve('moment/moment.js')),
      slash(resolve(`angular/angular.js`)),
      `${BC}/angular-bootstrap/ui-bootstrap.js`,
      `${BC}/angular-bootstrap/ui-bootstrap-tpls.js`,
      slash(resolve(`angular-ui-router/build/angular-ui-router.js`)),
      slash(resolve('angular-sanitize/angular-sanitize.js')),    
      slash(resolve('angular-animate/angular-animate.js')),    
      slash(resolve('angular-touch/angular-touch.js')),    
      slash(resolve('angular-messages/angular-messages.js')),    
      slash(resolve('angular-toastr/dist/angular-toastr.js')),
      slash(resolve('angular-toastr/dist/angular-toastr.tpls.js'))
    ],
    jslib_copy_only: [
      slash(resolve('systemjs/dist/system-polyfills.js')),
      slash(resolve('systemjs/dist/system-polyfills.js.map'))
    ],
    csslib: [
      slash(resolve('bootstrap/dist/css/bootstrap.min.css')),
      slash(resolve('bootstrap/dist/css/bootstrap.css.map')),
      slash(resolve('angular-toastr/dist/angular-toastr.css'))
    ],
    font: [
      slash(resolve('bootstrap/dist/fonts/glyphicons-halflings-regular.eot')),
      slash(resolve('bootstrap/dist/fonts/glyphicons-halflings-regular.svg')),
      slash(resolve('bootstrap/dist/fonts/glyphicons-halflings-regular.ttf')),
      slash(resolve('bootstrap/dist/fonts/glyphicons-halflings-regular.woff')),
      slash(resolve('bootstrap/dist/fonts/glyphicons-halflings-regular.woff2'))
    ],
    index: `${CLIENT_SRC_BASE}/index.html`,
    tpl: [
      `${CLIENT_SRC_BASE}/components/**/*.html`,
    ],
    css: [
      `${CLIENT_SRC_BASE}/**/*.scss`,
    ],
    ts: [`${CLIENT_SRC_BASE}/**/*.ts`, `!${CLIENT_SRC_BASE}/**/*_spec.ts`]
  },
  dest: {
    app: {
      base: DIST_BASE,
      lib: `${DIST_BASE}/lib`,
      font: `${DIST_BASE}/fonts`,
      client: `${CLIENT_DEST_BASE}`
    },
    test: 'test',
    tmp: '.tmp'
  }
};
