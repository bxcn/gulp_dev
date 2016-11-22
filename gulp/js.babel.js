import gulp from 'gulp';
import path from 'path';
import config from './config';
const $ =  config.gulpLoadPlugins();

const pkg = require('../package.json')
const app_dir = "app/Public/"
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
const notHasLib = (file) => {
 return !(path.parse(file.path).dir.indexOf('\\lib') > -1);
}
gulp.task('js',() => {
  // 不匹配lib文件夹下所有文件
  return gulp.src(['app/Public/js/lib/**/*.js'])
    .pipe($.cached("js"))
    .pipe($.plumber())
    .pipe($.if(notHasLib,$.eslint()))
    //.pipe($.if(notHasLib,$.babel()))
    //.pipe($.header(banner, {pkg: pkg}))
    .pipe($.uglify({
      //preserveComments:'license',
      //mangle:true,//类型：Boolean 默认：true 是否修改变量名
      mangle: {except: ['require' ,'exports' ,'module' ,'$']},//排除混淆关键字
      compress: false,//类型：Boolean 默认：true 是否完全压缩
    }))
    .pipe($.removeContent({
      match:/^[\'\"](use strict)[\'\"]/
    }))
    .pipe(gulp.dest('dist/Public/js/'))
    .pipe(gulp.dest('../Public/js/lib/'))
    ;
});

gulp.task('js:dev', () => {
  // 不匹配lib文件夹下所有文件
  return gulp.src(['app/Public/js/**/*.js'])
    //.pipe($.cached("js:dev"))
    .pipe($.plumber())
    .pipe($.if(notHasLib,$.babel({
       presets: ['react','es2015']
    })))
    .pipe(gulp.dest('dist/Public/js/'))
    .pipe(gulp.dest('../Public/js/'))
    ;
});
