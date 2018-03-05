var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');
var nodemon     = require('gulp-nodemon');

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
  return gulp.src('scss/careerjump.scss')
    .pipe(sass())
    .pipe(gulp.dest('public/css'))
    .pipe(browserSync.stream())
    .on('end', function() {
      browserSync.reload();
    });
});

gulp.task('default', ['browser-sync']);
