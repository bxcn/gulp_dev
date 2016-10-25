import gulp from 'gulp';
import config from './config';
const $ =  config.gulpLoadPlugins();

// 测试地址
const test_app_dir = config.test_app_dir;
// 开发App地址
const dev_app_dir = config.dev_app_dir;


// 测试地址
const test_dist_dir = config.test_dist_dir
// 开发Dist地址
const dev_dist_dir = config.dev_dist_dir;

// 中间转换
const app_dir = test_app_dir;
const dist_dir = dev_dist_dir;

// 转换图片
gulp.task('images', () => {
  return gulp.src('app/Public/image/**/*')
    .pipe($.cached("image"))
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
    .pipe(gulp.dest(dist_dir + 'image/'))
    ;
});

gulp.task('images:dev', function () {
    var paths = [
        {src: 'app/Public/image/**/*.*', dest: dist_dir + 'image/'},
        {src: 'app/Public/image/**/*.*', dest: test_dist_dir + 'images/'}
    ];
    return $.copy2(paths);
});
