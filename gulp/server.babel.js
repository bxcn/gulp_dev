import gulp from 'gulp';
import browserSync from 'browser-sync';
import config from './config';
const $ =  config.gulpLoadPlugins();

// 重新加载
const reload = browserSync.reload;
 
 

gulp.task('serve', ['sass:dev', 'js:dev', 'images:dev', 'less:dev'], () => {
  // http://www.browsersync.cn/docs/options/
  browserSync({
    notify:false,//不显示在浏览器中的任何通知。
    port:800,//端口
    host:'10.100.1.157',
    browser:["chrome"/*, "firefox"*/], // 在chrome、firefix下打开该站点
    server: {
      baseDir:['app/'],// 应用程序目录
      index:'index.html',// 在应用程序目录中指定打开特定的文件
      routes: {
        '/bower_components' : 'bower_components',
        '/dist' : 'dist'
      }
    }
  })
  // 每当修改以下文件夹下的文件时就会刷新浏览器;
  //gulp.watch('app/html/**/*.html', ['html']);
  gulp.watch('app/Public/js/**/*.js', ['js:dev']);
  gulp.watch('app/Public/css/**/*.scss', ['sass:dev']);
  gulp.watch('app/Public/less/**/*.less', ['less:dev']);
  gulp.watch('app/Public/image/**/*', ['images:dev']);
  gulp.watch('app/**/*', ['html:dev']);
  //gulp.watch(['.eslintrc','gulp/**/*.js','gulpfile.babel.js'], ['server']);

  gulp.watch([
    'app/Public/**/*.html',
    'app/Public/images/**/*',
    'app/Public/css/**/*',
    'app/Public/less/bootstrap.less',
    'app/Public/js/**/*',
  ]).on('change', reload);
});

gulp.task('server',['serve'],() => {});