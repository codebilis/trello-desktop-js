var gulp = require('gulp');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var notify = require('gulp-notify');
var autoprefixer = require('gulp-autoprefixer');
var jade = require('gulp-jade');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');

var target = {
  views_src: './app/public/views/**/*.jade',
  views_dist: './dist/',

  stylesheets_src: './app/public/stylesheets/**/*.scss',
  stylesheets_dist: './dist/stylesheets',

  scripts_src: './app/public/scripts/system/core.js',
  scripts_src2: './app/public/scripts/main.js',
  scripts_dist: './dist/scripts/',

  trello_src: './app/public/scripts/trello/trello.js',

  build: './dist/*'
}

gulp.task('views', function() {
  return gulp.src(target.views_src)
    .pipe(plumber())
    .pipe(jade())
    .pipe(gulp.dest(target.views_dist))
    .pipe(notify('aehOo Views!'))
});

gulp.task('stylesheets', function() {
  return gulp.src(target.stylesheets_src)
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: 'compressed'
    }).on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: [
          'last 2 version'
        , 'safari 5'
        , 'ie 8'
        , 'ie 9'
        , 'opera 12.1'
        , 'ios 6'
        , 'android 4'
      ],
      cascade: false
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(target.stylesheets_dist))
    .pipe(notify('aehOo Stylesheets!'))
});

gulp.task('scripts', function() {
  return gulp.src(target.scripts_src)
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(concat('core.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(target.scripts_dist))
    .pipe(notify('aehOo Scripts!'))
});

gulp.task('scripts2', function() {
  return gulp.src(target.scripts_src2)
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(target.scripts_dist))
    .pipe(notify('aehOo Scripts!'))
});

gulp.task('trello', function() {
  return gulp.src(target.trello_src)
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(concat('trello.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(target.scripts_dist))
    .pipe(notify('aehOo Trello!'))
});


gulp.task('default', ['views', 'stylesheets', 'scripts', 'scripts2', 'trello'], function() {
  gulp.watch(target.views_src, ['views']);
  gulp.watch(target.stylesheets_src, ['stylesheets']);
  gulp.watch(target.scripts_src, ['scripts']);
  gulp.watch(target.scripts2_src, ['scripts2']);
});