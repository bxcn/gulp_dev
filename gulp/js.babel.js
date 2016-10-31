import gulp from 'gulp';
import config from './config';
const $ =  config.gulpLoadPlugins();

const pkg = require('../package.json')

// 测试地址
const test_app_dir = config.test_app_dir;
// 开发App地址
const dev_app_dir = config.dev_app_dir;

const app_dir = test_app_dir;
// 测试地址
const test_dist_dir = config.test_dist_dir
// 开发Dist地址
const dev_dist_dir = config.dev_dist_dir;
// 中间转换
const dist_dir = dev_dist_dir;

// JS\CSS注释
const banner = ['/**',
' * <%= pkg.name %> - <%= pkg.description %>',
// ' * @version v<%= pkg.version %>',
// ' * @link <%= pkg.homepage %>',
// ' * @license <%= pkg.license %>',
' *\/',
''].join(' ');

// ES5转换 
/*
  all:34s
  has lib:5s
  not lib:16.3s
*/
gulp.task('base-js', () => {
  // 不匹配lib文件夹下所有文件
  return gulp.src([app_dir + '/js/lib/*.js'])
    // 合并多个文件要放到cached前面
    .pipe($.plumber())
    //.pipe($.eslint())
    //.pipe($.sourcemaps.init())
    //.pipe($.if(config.ifLibDir, $.eslint(), $.babel()))
    //.pipe($.babel())
    // .pipe($.header(banner, {pkg: pkg}))
    .pipe($.uglify({
      preserveComments:'all'
    }))
    .pipe($.concat("lib/base.js"))
    //.pipe($.sourcemaps.write())
    .pipe(gulp.dest(test_dist_dir + 'js/'))
    ;
});
gulp.task('js', () => {
  // 不匹配lib文件夹下所有文件
  return gulp.src(['app/Public/js/**/*.js', '!app/Public/js/lib/*.js'])
    // 合并多个文件要放到cached前面
    //.pipe($.if(config.ifLibDir, $.concat("lib/base.js")))
    .pipe($.cached("js"))
    .pipe($.plumber())
    .pipe($.eslint())
    //.pipe($.sourcemaps.init())
    //.pipe($.if(config.ifLibDir, $.eslint(), $.babel()))
    .pipe($.babel())
    .pipe($.header(banner, {pkg: pkg}))
    .pipe($.uglify({
      preserveComments:'all'
    }))
    //.pipe($.sourcemaps.write())
    //.pipe(gulp.dest(dist_dir + 'js/'))
    .pipe(gulp.dest(dist_dir + 'js/'))
    ;
});

gulp.task('js:dev', () => {
  // 不匹配lib文件夹下所有文件
  return gulp.src(['app/Public/js/**/*.js'])
    .pipe($.cached("js"))
    .pipe($.plumber())
    //.pipe($.eslint())
    // 输出到控制台
    //.pipe($.eslint.format())
    //.pipe($.eslint.failAfterError())
    //.pipe($.babel())
    //{fix:true}让它尝试自动修复你的文件
    // http://jscs.info/overview#-reporter-r
    //.pipe($.jscs({fix:true}))
    //.pipe($.jscs.reporter())
    .pipe(gulp.dest(test_dist_dir + 'js/'))
    //.pipe(gulp.dest(dist_dir + 'js/'))
    ;
});