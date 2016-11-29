import gulp from 'gulp';
import config from './config';
const $ =  config.gulpLoadPlugins();

gulp.task("requirejs:dev", () => {
   gulp.src('app/Public/js/require/app.js')
/*    .pipe($.requirejsOptimize())
    // .pipe($.rename("main.js"))*/
    .pipe(gulp.dest( 'dist/Public/js/require' ) );
});


gulp.task("requirejs", () => {
  gulp.src(['app/js/**/**.js', '!app/js/lib/*.js'])
    .pipe($.babel({
      "presets": ["es2015"]
    }))
    .pipe(gulp.dest('js/'));

  const exec = child_process.exec;
  const free = exec('node r.js -o config.require.js');
  free.stdout.on('data', function(data) {
    console.log('标准输出：\n' + data);
  });
});
