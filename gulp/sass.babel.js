import gulp from 'gulp';
import config from './config';
const $ =  config.gulpLoadPlugins();

var pkg = require('../package.json')

// JS\CSS注释
const banner = ['/**',
' * <%= pkg.name %> - <%= pkg.description %>',
// ' * @version v<%= pkg.version %>',
// ' * @link <%= pkg.homepage %>',
// ' * @license <%= pkg.license %>',
' *\/',
''].join(' ');

gulp.task('sass', () => {
  const timer = +(new Date());
  return gulp.src(['app/Public/sass/**/*.scss'])
    // 这二句要放到cached：在修改lib下的CSS时，不合并到base.css中，是以独立的文件生成的，原因就是cached缓存了
    // cached要放到第一位 
    .pipe($.cached("sass"))
    //语法报错时，整个运行流程还会继续走下去，不退出
    .pipe($.plumber())
    .pipe($.sass())
    .pipe($.replace(/(\.(jpg|png|gif)+)/g,"$1?v="+timer)) 
    .pipe($.csslint())
    .pipe($.autoprefixer({
      browsers: ['> 5%', 'last 4 versions']
    }))
    // 压缩重复 
    .pipe($.cleanCss({debug: false}, function(details) {
      //压缩前大小
      console.log(details.name + ' originalSize: ' + details.stats.originalSize);
      //压缩后大小
      console.log(details.name + ' minifiedSize: ' + details.stats.minifiedSize);
    }))
    .pipe(gulp.dest('../Public/css/'))
    .pipe(gulp.dest('dist/Public/css/'))
    ;
});


gulp.task('sass:dev', () => {
  const timer = +(new Date());
  return gulp.src(['app/Public/sass/**/*.scss'])
    //.pipe($.cached("sass:dev"))
    .pipe($.plumber())
    .pipe($.sass())
    .pipe($.autoprefixer({
      browsers: ['> 5%', 'last 4 versions']
    }))
    .pipe(gulp.dest('dist/Public/css/'))
    .pipe(gulp.dest('../Public/css/'))
    ;
});