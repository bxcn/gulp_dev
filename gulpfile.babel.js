import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import browserSync from 'browser-sync';
import del from 'del';
import path from "path";
import { stream as wiredep } from 'wiredep';
import childProcess from "child_process";
import reguireDir from "require-dir";
const $ =  gulpLoadPlugins();
reguireDir('./gulp/');

gulp.task('build:dev', () => {
  gulp.start(['sass:dev','js:dev','images:dev','html:dev']);
});

gulp.task('html',['sass','js','images'], () => {
  gulp.start('html-useref');
});

gulp.task('build',['html'], () => {
  gulp.start('add-version');
});

// less转换
gulp.task("less:dev", () => {
  gulp.src("app/Public/less/bootstrap.less")
  .pipe($.plumber())
  .pipe($.less())
  .pipe(gulp.dest("dist/Public/less"));
});

// 更新gulp的package的版本号 "version":"0.0.2"
gulp.task('bump',function(){
    gulp.src('./package.json')
    .pipe($.bump())
    .pipe(gulp.dest('./'));
});

/*
npm install -g npm-check npm模块升级工具
npm-check update

*/