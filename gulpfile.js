var gulp = require('gulp');
var sass = require('gulp-sass');
var gutil = require('gulp-util');
let autoprefixer = require('gulp-autoprefixer');
let rename = require('gulp-rename');
let cssnano = require('gulp-cssnano');
let sourcemaps = require('gulp-sourcemaps');
let gulpif = require('gulp-if');
let eslint = gutil.env.production ? undefined : require('gulp-eslint');
let browserSync = gutil.env.production ?
  undefined : require('browser-sync').create();
let nodemon = gutil.env.production ? undefined : require('gulp-nodemon');

// Static Server + watching scss/html files
gulp.task('browser-sync', ['nodemon'], function() {
  browserSync.init(null, {
    port: 8000,
    proxy: {
      target: 'localhost:3000'
    }
  });

  gulp.watch('scss/**/*.scss', ['sass']);
  gulp.watch('views/**/*.pug').on('change', browserSync.reload);
});

gulp.task('nodemon', ['sass'], function(cb) {
  return nodemon({
    exec: 'node --inspect=9229',
    script: 'src/server.js',
    ext: 'js html',
    env: {
      'NODE_ENV': 'development',
      'PORT': 3000
    }
  })
    .once('start', function() {
      cb();
    })
    .on('restart', function() {
      gulp.start('sass');
    });
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
  let tasks = gulp.src('scss/careerjump.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer('last 4 version'))
    .pipe(gulp.dest('src/assets/public/css'))
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

gulp.task('eslint', function() {
  return gulp.src('src/**/*.js')
    .pipe(eslint())
    .pipe(eslint.format());
});

gulp.task('default', ['browser-sync']);

gulp.task('prod', ['sass']);

gulp.task('test', ['eslint']);
