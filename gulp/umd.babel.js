import gulp from 'gulp';
import browserSync from 'browser-sync';
import config from './config';
import path from 'path';
const $ =  config.gulpLoadPlugins();

// 开发插件时适合
gulp.task("umd", () => {
  gulp.src(['src/**/*.js'])
    .pipe($.babel({
      "presets": ["es2015"]
    }))
    .pipe($.concat('formUI.js'))
    .pipe($.umd({
      dependencies: function(file) {
        return [{
          name:"",
          amd:""
        }];
      },
      exports: function(file) {
        return '_exports';
      },
      namespace: function(file) {
        return '';
      },
      template: path.join(__dirname, 'umd/template.js')
    }))
    .pipe(gulp.dest(''));
});
