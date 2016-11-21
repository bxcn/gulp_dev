import gulp from 'gulp';
import path from 'path';
import { stream as wiredep } from 'wiredep';
import config from './config';
const $ =  config.gulpLoadPlugins();

gulp.task('build',['html','sass','js','images','html','seajs','My97DatePicker'], () => {
  gulp.start('add-version');
});


gulp.task('build:dev', () => {
  gulp.start(['sass:dev','js:dev','images:dev','html:dev', 'seajs:dev' ,'My97DatePicker']);
});