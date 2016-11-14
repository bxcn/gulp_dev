import gulp from 'gulp';
import config from './config';
const $ =  config.gulpLoadPlugins();
const app_dir = "app/Public/"
// 转换图片
gulp.task('images', () => {
  return gulp.src('app/Public/images/**/*')
    .pipe($.cached("images"))
    .pipe($.plumber())
    .pipe($.imagemin({
        progressive: true,
        interlaced: true,
        // don't remove IDs from SVGs, they are often used
        // as hooks for embedding and styling
        svgoPlugins: [{
          cleanupIDs: false
        }]
      }))
    //.pipe(gulp.dest(dist_dir + 'image/'))
    .pipe(gulp.dest('../Public/images/'))
    .pipe(gulp.dest('dist/Public/images/'))
    ;
});

gulp.task('images:dev', function () {
    return gulp.src('app/Public/images/**/*')
    .pipe($.cached("images:dev"))
    .pipe($.plumber())
    .pipe(gulp.dest('dist/Public/images/'))
    .pipe(gulp.dest('../Public/images/'))
    ;
});
