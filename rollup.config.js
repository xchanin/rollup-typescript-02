/**
 * Package.json file
 */
import pkg from './package.json';

/**
 * transpile newer JS code for older JS browsers
 */
 import babel from 'rollup-plugin-babel';

/**
 * Merges the enumerable properties of two or more objects deeply
 */
import merge from 'deepmerge';

/**
 * Copy files and folders, with glob support
 */
import copy from 'rollup-plugin-copy';

/**
 * Bundle style files
 */
// import postcss from 'rollup-plugin-postcss';

import scss from "rollup-plugin-scss";

/**
 * Plugin inherits all compiler options and file lists from your tsconfig.json file
 */
import typescript from 'rollup-plugin-typescript2';

/**
 * Use createSpaConfig for bundling a Single Page App
 */
import { createSpaConfig } from '@open-wc/building-rollup';

/**
 * Load third party modules from node_modules
 */
 import resolve from 'rollup-plugin-node-resolve';

 /**
  * Transpile CommonJS to newer JS
  */
 import commonjs from 'rollup-plugin-node-resolve';

 const extensions = [
  '.js', '.jsx', '.ts', '.tsx',
];

/**
 * Use createBasicConfig to do regular JS to JS bundling
 */
// import { createBasicConfig } from '@open-wc/building-rollup';

const baseConfig = createSpaConfig({
  // use the outputdir option to modify where files are output
  // outputDir: 'dist',

  // if you need to support older browsers, such as IE11, set the legacyBuild
  // option to generate an additional build just for this browser
  // legacyBuild: true,

  // development mode creates a non-minified build for debugging or development
  developmentMode: process.env.ROLLUP_WATCH === 'true',

  // set to true to inject the service worker registration into your index.html
  injectServiceWorker: false,
});

export default merge(baseConfig, {
  /**
   * if you use createSpaConfig, you can use your index.html as entrypoint,
   * any <script type="module"> inside will be bundled by rollup
   */
   input: pkg.entryfile,

   /**
    * alternatively, you can use your JS as entrypoint for rollup and
    * optionally set a HTML template manually
    */
   // input: './app.js',

  plugins: [
    /**
     * Compile TypeScript / JavaScript files
     */
    babel({
      babelrc: true,
      extensions, 
      include: ['src/**/*'],
      exclude: 'node_modules/**' // don't transpile someone else's code
    }),

    /**
     * Allow bundling cjs modules. Rollup doesn't understand cjs
     */
    commonjs(),

    /**
     * Allow node_modules resolution
     */
    resolve({ extensions }),

    typescript( {
      transform(code, id) {
        return code.replace(/\/\*\* @class \*\//g, "\/*@__PURE__*\/");
      }
    }),
    /**
     * Copy assets to the dist folder, in this case just the images
     * 
     * Set flatten to false to preserve folder structure
     */
    copy({
      targets: 
      [
        { src: './assets/images/**/*', dest: './dist' },
        { src: './assets/styles/css/**/*', dest: './dist' }
      ],
      flatten: false,
    }),

    /**
     * Output .scss to .css in the dist folder
     * .scss file should sit in the entry file
     */
    scss({
      
      /**
       * Minify css output
       */
      outputStyle: pkg.sasscompressed,

      /**
       * File types to include - this is an example, as these are
       * the default values
       */
      include: ["/**/*.css", "/**/*.scss", "/**/*.sass"],

      
      /**
       * Filename to write all styles to
       */
      output: pkg.sassoutput,
      
      /**
       * Determine if node process should be terminated on error (default: false)
       */
      failOnError: true,

      /**
       * Enables/disables generation of source map (default: false)
       */
      sourceMap: true,

      /**
       * Sass compiler to use
       * - sass and node-sass packages are picked up autmatically
       */
      sass: require('node-sass'),

      /**
       * Run postcss processor before output
       * @returns 
       */
      processor: () => postcss([autoprefixer({ overrideBrowserslist: 'Edge 18' })]),
   
      /**
       * Process resulting .css
       * @param {*} css 
       * @param {*} map 
       * @returns 
       */
      processor: (css, map) => ({
        css: css.replace('/*date*/', '/* ' + new Date().toJSON() + ' */'),
        map
      }),

      /**
       * Log filename and size of generated CSS files (default: true)
       */
      verbose: true,

      /**
       * Watch files/folder for changes - triggers a rebuild
       */
      // watch: './src/assets/styles/main-styles.scss'
    }),
  ],
  // I'm not sure this output is neccessary, just doing this to test 
  // tree shaking typescript.
  // this actually breaks the build
  // output: {
  //   dir: "./asdfsdfs",
  //   format: 'es'
  // }
});
