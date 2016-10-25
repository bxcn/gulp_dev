import gulp from 'gulp';
import browserSync from 'browser-sync';
import config from './config';
const $ =  config.gulpLoadPlugins();

// 重新加载
const reload = browserSync.reload;
 
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
const dist_dir = test_dist_dir;
 

gulp.task('serve', ['sass', 'js', 'images'], () => {
  // http://www.browsersync.cn/docs/options/
  browserSync({
    notify:false,//不显示在浏览器中的任何通知。
    port:80,//端口
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
  gulp.watch(app_dir + '/js/**/*.js', ['js']);
  gulp.watch(app_dir + '/css/**/*.scss', ['sass']);
  gulp.watch(app_dir + '/images/**/*', ['images']);
  gulp.watch([
    app_dir + '/**/*.html',
    app_dir + '/images/**/*',
    app_dir + '/css/**/*',
    app_dir + '/js/**/*',
  ]).on('change', reload);
});

gulp.task('server',['serve'],() => {});