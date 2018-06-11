var gulp = require('gulp');
var sass = require('gulp-sass');
var gutil = require('gulp-util');
let autoprefixer = require('gulp-autoprefixer');
let rename = require('gulp-rename');
let cssnano = require('gulp-cssnano');
let sourcemaps = require('gulp-sourcemaps');
let concat = require('gulp-concat');
let gulpif = require('gulp-if');
let ts = require('gulp-typescript');
let eslint = gutil.env.production ? undefined : require('gulp-eslint');
let browserSync = gutil.env.production ?
  undefined : require('browser-sync').create();
let nodemon = gutil.env.production ? undefined : require('gulp-nodemon');

let vendorJS = [
  'node_modules/jquery-tags-input/dist/jquery.tagsinput.min.js'
];

let vendorCSS = [

];

let tsProject = ts.createProject('tsconfig.json');

gulp.task('typescript', function() {
  var tsResult = tsProject.src()
    .pipe(sourcemaps.init())
    .pipe(tsProject());

  return tsResult.js
    .pipe(sourcemaps.write('.', {sourceRoot: '../src'}))
    .pipe(gulp.dest('lib'));
});

// Static Server + watching scss/html files
gulp.task('browser-sync', ['nodemon'], function() {
  browserSync.init(null, {
    port: 80,
    proxy: {
      target: 'localhost:3000'
    }
  });

  gulp.watch('scss/**/*.scss', ['sass']);
  gulp.watch('views/**/*.pug').on('change', browserSync.reload);
});

gulp.task('nodemon', ['typescript', 'sass', 'vendor-css', 'vendor-js'],
  function(cb) {
    gulp.watch('src/**/*.ts', ['typescript']);

    return nodemon({
      exec: 'node --inspect=9229',
      script: 'lib/app.js',
      ext: 'js',
      env: {
        'NODE_ENV': 'development',
        'PORT': 3000
      },
      delay: 1
    })
      .once('start', function() {
        cb();
      });
  });

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
  let tasks = gulp.src('scss/careerjump.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer('last 4 version'))
    .pipe(cssnano())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulpif(!gutil.env.production, sourcemaps.write()))
    .pipe(gulp.dest('public/css'));

  if (browserSync) {
    tasks
      .pipe(browserSync.stream());
  }
  return tasks;
});

gulp.task('vendor-js', function() {
  gulp.src(vendorJS)
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest('public/js'));
});

gulp.task('vendor-css', function() {
  gulp.src(vendorCSS)
    .pipe(concat('vendor.css'))
    .pipe(cssnano())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('public/css'));

});

gulp.task('eslint', function() {
  return gulp.src('src/**/*.js')
    .pipe(eslint())
    .pipe(eslint.format());
});

gulp.task('default', ['browser-sync']);

gulp.task('prod', ['typescript', 'sass', 'vendor-js', 'vendor-css']);

gulp.task('test', ['eslint', 'typescript']);
