import gulp from 'gulp';
import config from './config';
const $ =  config.gulpLoadPlugins();

gulp.task("requirejs:dev", () => {
   gulp.src('app/Public/js/require/app.js')
    .pipe($.requirejsOptimize())
    // .pipe($.rename("main.js"))
    .pipe(gulp.dest( 'dist/Public/js/require' ) );
});