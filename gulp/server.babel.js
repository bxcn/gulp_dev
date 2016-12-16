import gulp from 'gulp';
import browserSync from 'browser-sync';
import config from './config';
const $ =  config.gulpLoadPlugins();

gulp.task("My97DatePicker", ()=> {
  return gulp.src('app/Public/My97DatePicker/**/*.*')
  .pipe(gulp.dest('dist/Public/My97DatePicker/'))
  .pipe(gulp.dest('../Public/My97DatePicker/'));
})

// 重新加载
const reload = browserSync.reload;
const app_dir = "app/Public/"
gulp.task('serve', ['sass:dev', 'js:dev', 'images:dev', 'html:dev', 'json:dev','seajs:dev', 'My97DatePicker'], () => {
  // http://www.browsersync.cn/docs/options/
  browserSync({
    notify:false,//不显示在浏览器中的任何通知。
    port:810,//端口
    host:'10.100.1.157',
    browser:["chrome"/*, "firefox"*/], // 在chrome、firefix下打开该站点
    server: {
      baseDir:['dist/'],// 应用程序目录
      index:'html/index.html',// 在应用程序目录中指定打开特定的文件
      routes: {
        '/bower_components' : 'bower_components'
      }
    }
  })
  // 每当修改以下文件夹下的文件时就会刷新浏览器;
  gulp.watch('app/Public/js/**/*.js', ['js:dev']);
  gulp.watch('app/Public/sass/**/*.scss', ['sass:dev']);
  gulp.watch('app/Public/images/**/*', ['images:dev']);
  gulp.watch('app/**/*.html', ['html:dev']);

  gulp.watch([
    'app/**/*.*'
  ]).on('change', reload);
});

gulp.task('server',['serve'],() => {});


gulp.task('serve:es6', ['sass:dev', 'js:dev', 'images:dev', 'html:dev', 'json:dev','seajs:dev', 'My97DatePicker'], () => {
  // http://www.browsersync.cn/docs/options/
  browserSync({
    notify:false,//不显示在浏览器中的任何通知。
    port:8110,//端口
    host:'10.100.1.157',
    browser:["chrome"/*, "firefox"*/], // 在chrome、firefix下打开该站点
    server: {
      baseDir:['dist/'],// 应用程序目录
      index:'es6toseajs.html',// 在应用程序目录中指定打开特定的文件
      routes: {
        '/bower_components' : 'bower_components'
      }
    }
  })
  // 每当修改以下文件夹下的文件时就会刷新浏览器;
  gulp.watch('app/Public/js/**/*.js', ['js:dev']);
  gulp.watch('app/Public/sass/**/*.scss', ['sass:dev']);
  gulp.watch('app/Public/images/**/*', ['images:dev']);
  gulp.watch('app/**/*.html', ['html:dev']);

  gulp.watch([
    'app/**/*.*'
  ]).on('change', reload);
});
