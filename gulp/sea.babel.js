import gulp from 'gulp';
import config from './config';
const $ =  config.gulpLoadPlugins();

gulp.task("seajs:dev", () => {
   gulp.src('app/Public/js/seajs/app.js')
    .pipe( $.seajs("seaMain"))
    .pipe( gulp.dest( 'dist/Public/js/seajs/' ) );
});

