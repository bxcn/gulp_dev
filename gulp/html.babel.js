import gulp from 'gulp';
import path from 'path';
import { stream as wiredep } from 'wiredep';
import config from './config';
const $ =  config.gulpLoadPlugins();
const app_dir = "app/Public/"


gulp.task('html', () => {
  gulp.src(['app/html/include/**/*.*','!app/html/include/header.html'])
    .pipe(gulp.dest('../Application/Home/View/include/'))
    ;
});

gulp.task('html:dev',() => {
  gulp.src(['app/**/*.html'])
    .pipe($.ejs())
    .pipe(gulp.dest('dist/'))
    ;

  gulp.src(['app/html/include/**/*.*','!app/html/include/header.html'])
    .pipe(gulp.dest('../Application/Home/View/include/'))
    ;
    
});