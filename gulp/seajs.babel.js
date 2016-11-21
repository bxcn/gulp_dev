import gulp from 'gulp';
import config from './config';
const $ =  config.gulpLoadPlugins();

/*gulp.task("seajs:dev", () => {
   gulp.src('app/Public/js/app.js')
    .pipe( $.seajs("app"))
    .pipe( gulp.dest('dist/Public/js/seajs/' ) );
});
*/

gulp.task("seajs", () => {
  return gulp.src(['app/Public/js/app.js'])
    .pipe($.cached("js:dev"))
    .pipe($.plumber())
    .pipe( $.seajs("app"))
    .pipe($.babel({
       presets: ['es2015']
    }))
    .pipe($.uglify({
      preserveComments:'license',
      //mangle:true,//类型：Boolean 默认：true 是否修改变量名
      mangle: {except: ['require' ,'exports' ,'module' ,'$']},//排除混淆关键字
      compress: false,//类型：Boolean 默认：true 是否完全压缩
    }))
    .pipe($.removeContent({
      match:/^[\'\"](use strict)[\'\"]/
    }))
    .pipe(gulp.dest('dist/Public/js/'))
    .pipe(gulp.dest('../Public/js/'))
    ;
});

gulp.task("seajs:dev", () => {
 /* return gulp.src(['app/Public/js/app.js'])
    .pipe($.cached("js:dev"))
    .pipe($.plumber())
    .pipe( $.seajs("app"))
    .pipe($.babel({
       presets: ['es2015']
    }))
    .pipe(gulp.dest('dist/Public/js/'))
    .pipe(gulp.dest('../Public/js/'))
    ;*/
});
