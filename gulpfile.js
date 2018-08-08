// Load modules
let gulp = require('gulp');
let rename = require('gulp-rename');
let uglify = require('gulp-uglify');
let sass = require('gulp-sass');
let plumber = require('gulp-plumber');
let concat = require('gulp-concat');
let minifycss = require('gulp-clean-css');
let autoprefixer = require('gulp-autoprefixer');
let babel = require('gulp-babel');
let webp = require('gulp-webp');
let include = require('gulp-tag-include-html');
let svgsprite = require('gulp-svg-sprite');

// Format source URL
const dev = '__dev/';
const dist = '';

// JavaScript compiler
gulp.task('javascript', () => {
  // Core scripts (core.min.js)
  gulp.src([`${dev}js/__setup.js`, `${dev}js/core/*.js`])
    .pipe(plumber())
    .pipe(concat('core.js'))
    .pipe(gulp.dest(`${dist}js/`))
    .pipe(rename('core.es5.js'))
    .pipe(babel({
      presets: ['env']
    }))
    .pipe(gulp.dest(`${dist}js/`))
    .pipe(rename('core.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(`${dist}js/`));

  // Inline scripts
  gulp.src(`${dev}inlinejs/*.js`)
    .pipe(plumber())
    .pipe(babel({
      presets: ['env']
    }))
    .pipe(uglify())
    .pipe(gulp.dest(`${dist}js/`));
});


// CSS compiler
gulp.task('scss', () => {
  gulp.src(`${dev}scss/style.scss`)
    .pipe(plumber((e) => scss_error(e)))
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(rename('style.uncompressed.css'))
    .pipe(gulp.dest(`${dist}css/`))
    .pipe(rename('style.css'))
    .pipe(minifycss())
    .pipe(gulp.dest(`${dist}css/`));

  gulp.src([
      `${dev}scss/noscript.scss`,
      `${dev}scss/offline.scss`,
      `${dev}scss/print.scss`
    ])
    .pipe(plumber((e) => scss_error(e)))
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(minifycss())
    .pipe(gulp.dest(`${dist}css/`))
});

gulp.task('images', () => {
  gulp.src([`${dev}images/**/*.png`, `${dev}images/**/*.jpg`, `!${dev}images/sprites/**/*`])
    .pipe(webp())
    .pipe(gulp.dest(`${dist}images/`));

  gulp.src([`${dev}images/**/*`, `!${dev}images/sprites/**/*`])
    .pipe(plumber())
    .pipe(gulp.dest(`${dist}images/`))

  // Create SVG sprites
  gulp.src([`${dev}images/sprites/**/*`])
    .pipe(plumber())
    .pipe(svgsprite({
      mode: {
        symbol: {
          render: {
            css: false,
            scss: false
          },
          dest: '',
          prefix: '.sprite-%s',
          sprite: 'icons.svg',
          example: false
        }
      }
    }))
    .pipe(gulp.dest(`${dist}images/`));
});

gulp.task('html', function() {
  gulp.src(`${dev}html/index.html`)
    .pipe(plumber())
    .pipe(include())
    .pipe(gulp.dest(`${dist}`));
});

// Autmate tasks
gulp.task('default', ['scss', 'javascript', 'images', 'html'], () => {
  gulp.watch([`${dev}scss/**/*.scss`], ['scss']);
  gulp.watch([`${dev}js/**/*.js`, `${dev}inlinejs/**/*.js`], ['javascript']);
  gulp.watch([`${dev}images/**/*`], ['images']);
  gulp.watch([`${dev}html/**/*`], ['html']);
});


// Custom compiling layouts
console.log(`\x1b[33m --------------------------------------------`);
console.log(`  PybChat v1.0`);
console.log(` --------------------------------------------\x1b[0m`);

// Customised SCSS error messages
function scss_error(e) {
  console.log(`\x1b[41m WARNING \x1b[0m`);
  console.log(` Error: ${e.messageOriginal} (line ${e.line} column ${e.column})`);
  console.log(` \x1b[33m${e.relativePath}\x1b[0m`);
}
