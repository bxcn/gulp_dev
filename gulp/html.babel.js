import gulp from 'gulp';
import path from 'path';
import { stream as wiredep } from 'wiredep';
import config from './config';
const $ =  config.gulpLoadPlugins();

// bower解决了前端库依赖管理的痛点，而wiredep解决了bower前端库引入进html的问题。
// bower安装是要安装到 bower install -save jquery
gulp.task('wiredep', () => {
  return gulp.src('app/html/include/**/*.html')
    .pipe(wiredep({
      optional: 'configuration',
      goes: 'here'
    }))
    .pipe(gulp.dest('app/html/include/'));
});

gulp.task('html:build', () => {
  return gulp.src(['dist/common.html', 'dist/javascript.html'])
    .pipe($.useref())
    .pipe(gulp.dest('../Application/Home/View/include/'))
    ;
});

gulp.task('html-useref', ['html:build'] ,() => {
   const paths = [
   { src:'../Application/Home/View/include/Public/**/*.*', dest: '../Public/' },
  ];
  return $.copy2(paths);
});

gulp.task('html:dev',() => {
  const paths = [
   { src:'app/html/include/**/*.*', dest: '../Application/Home/View/include/' },
   { src:'app/html/include/**/*.*', dest: 'dist/' }
  ];

  return $.copy2(paths);
});