import gulp from 'gulp';
import config from './config';
const $ =  config.gulpLoadPlugins();


gulp.task('zip', () => {
  var date = new Date();
  var y = date.getFullYear();
  var mon = date.getMonth()+1;
  var d = date.getDate();
  var h = date.getHours();
  var m = date.getMinutes();
  var s = date.getSeconds();
  return gulp.src('dist/**/*')
    .pipe($.zip('静态页面_'+ y +'年'+ mon +'月'+ d +'号'+ h +'时'+ m +'分'+ s +'秒.zip'))
    .pipe($.size({
      title:"静态压缩文件大小",
      pretty: true, // size: 1337 B(true) → 1.34 kB(false).
      showFiles: true,
      showTotal:false
    }))
    .pipe($.notify({
        onLast: true,
        message: () => `Total size ${s.prettySize}`
    }))
    .pipe(gulp.dest('zip'));
});