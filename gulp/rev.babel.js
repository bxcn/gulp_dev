import gulp from 'gulp';
import config from './config';
const $ =  config.gulpLoadPlugins();
// 开发App地址
const app_dir = config.dev_app_dir;

// 生成版本号清单
gulp.task('rev', () => {
  return gulp.src(['dist/Public/**/*'])
    // 判断是不是sass文件
    .pipe($.rev())
    .pipe($.revFormat({
      prefix: '.',
      suffix: '.cache',
      lastExt: false
    }))
    .pipe($.rev.manifest({
      //base属性和 dest的参数只能设置一个
      //path:"rev-manifest.json",//default rev-manifest.json file
      //base:"app",
      //merge: true // merge with the existing manifest (if one exists) 
    }))
    .pipe(gulp.dest("app/"));
});

/*
给文件增加版本号
gulp-rev-replace支持这种样式<script src="lib/zepto.min.js?v=50a4556b00"></script>
*/
gulp.task('add-version',['rev'], function() {
    var manifest = gulp.src(["./app/rev-manifest.json"]);
    function modifyUnreved(filename) {
      return filename;
    }
    function modifyReved(filename) {
      // app.4b22acfb81.cache.css
      if (filename.indexOf('.cache') > -1) {
        const _version = filename.match(/\.[\w]*\.cache/)[0].replace(/(\.|cache)*/g,"");
        const _filename = filename.replace(/\.[\w]*\.cache/,"");
        filename = _filename + "?v=" + _version;
        return filename;
      }
      return filename;
    }
    gulp.src([app_dir + '/**/**.html']) 
      // 删除原来的版本 
      .pipe($.replace(/(\.[a-z]+)\?v=[^\'\"\&]*/g,"$1")) 
      .pipe($.revReplace({
      manifest: manifest,
      modifyUnreved: modifyUnreved,
      modifyReved: modifyReved
    }))  
    .pipe(gulp.dest(app_dir));
});