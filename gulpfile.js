var gulp = require('gulp'),
  $ = require('gulp-load-plugins')(),
  bowerFiles = require('main-bower-files'),
  concat = require('gulp-concat-sourcemap'),
  deploy = require('gulp-gh-pages'),
  del = require('del'),
  runSequence = require('run-sequence');

var paths = {
  assets: ['src/assets/**/*', '!src/assets/sass{,/**}'],
  vendor: 'lib/vendor',
  definitions: 'src/definitions',
  vendorDefinitions: 'lib/definitions',
  sass: 'src/assets/sass/main.sass',
  index: 'src/index.html',
  ts: 'src/**/*.ts',
  build: 'build',
  dist: 'dist'
};

gulp.task('tsd', function (cb) {
    gulp.src([
      paths.vendor + '/phaser-official/typescript/p2.d.ts',
      paths.vendor + '/phaser-official/typescript/*.comments.d.ts',
    ])
    .pipe(gulp.dest(paths.definitions));

    return $.tsd({
        command: 'reinstall',
        latest: true,
        config: './tsd.json'
    }, cb);
});

gulp.task('clean', function (cb) {
  return del([paths.build, paths.dist], cb);
});

gulp.task('copy', function () {
  return gulp.src(paths.assets)
    .pipe(gulp.dest(paths.dist + '/assets'));
});

var tsProject = $.typescript.createProject({
  declarationFiles: true,
  noExternalResolve: true,
  sortOutput: true,
  sourceRoot: '../src'
});

gulp.task('typescript', ['tsd'], function () {
  var tsResult = gulp.src(paths.ts)
    .pipe($.sourcemaps.init())
    .pipe($.typescript(tsProject));

  return tsResult.js
    .pipe(concat('main.js'))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest(paths.build));
});

gulp.task('sass', function () {
  return gulp.src(paths.sass)
    .pipe($.sass())
    .pipe(gulp.dest(paths.build));
});

gulp.task('processhtml', function () {
  return gulp.src(paths.index)
    .pipe($.processhtml())
    .pipe(gulp.dest(paths.dist));
});

gulp.task('inject', function () {
  return gulp.src(paths.index)
    .pipe($.inject(gulp.src(bowerFiles()), {name: 'bower', relative: true}))
    .pipe(gulp.dest('src'));
});

gulp.task('watch', function () {
  gulp.watch(paths.ts, ['typescript']);
  gulp.watch(paths.sass, ['sass']);
  gulp.watch(paths.index);
});

gulp.task('serve', function() {
  gulp.src('./')
    .pipe($.serverLivereload({
      livereload: true,
      defaultFile: 'src/index.html',
      open: true
    }));
});

gulp.task('minifyJs', ['typescript'], function () {
  var all = bowerFiles().concat(paths.build + '/main.js');
  return gulp.src(all)
    .pipe($.uglifyjs('all.min.js', {outSourceMap: false, mangle: true}))
    .pipe(gulp.dest(paths.dist));
});

gulp.task('minifyCss', ['sass'], function () {
  return gulp.src(paths.build + '/main.css')
    .pipe($.minifyCss())
    .pipe(gulp.dest(paths.dist))
});

gulp.task('deploy', function () {
  return gulp.src('dist/**/*')
    .pipe(deploy());
});

gulp.task('default', function () {
  runSequence('clean', ['inject', 'typescript', 'sass', 'watch'], 'serve');
});

gulp.task('build', function () {
  return runSequence('clean', ['copy', 'minifyJs', 'minifyCss', 'processhtml']);
});
