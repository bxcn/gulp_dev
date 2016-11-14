import gulp from 'gulp';
import path from 'path';
import { stream as wiredep } from 'wiredep';
import config from './config';
const $ =  config.gulpLoadPlugins();
const app_dir = "app/Public/"


gulp.task('json:dev', () => {
  gulp.src(['app/**/*.json'])
    .pipe(gulp.dest('dist/'))
    ;
});
