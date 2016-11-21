import gulp from 'gulp';
import path from 'path';
import { stream as wiredep } from 'wiredep';
import config from './config';
const $ =  config.gulpLoadPlugins();
const app_dir = "app/Public/"

const version = (() => {
  const date = new Date();
  const y = date.getFullYear();
  const mon = date.getMonth()+1;
  const d = date.getDate();
  const h = date.getHours();
  const m = date.getMinutes();
  const s = date.getSeconds();
  return ('' + y+mon+d+h+m+s);
})();

gulp.task('html', () => {
  gulp.src(['app/html/include/**/*.*','!app/html/include/header.html'])
    .pipe($.replace('$1?v=version','$1?v='+version))
    .pipe(gulp.dest('../Application/Home/View/include/'))
    ;
});

gulp.task('html:dev',() => {
  gulp.src(['app/**/*.html'])
    .pipe($.ejs())
    .pipe($.replace('$1?v=version','$1?v='+version))
    .pipe(gulp.dest('dist/'))
    ;

  gulp.src(['app/html/include/**/*.*','!app/html/include/header.html'])
    .pipe($.replace('$1?v=version','$1?v='+version))
    .pipe(gulp.dest('../Application/Home/View/include/'))
    ;
    
});