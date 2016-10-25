import gulp from 'gulp';
import config from './config';
const $ =  config.gulpLoadPlugins();

var pkg = require('../package.json')

// 测试地址
const test_app_dir = config.test_app_dir;
// 开发App地址
const dev_app_dir = config.dev_app_dir;

const app_dir = dev_app_dir;
// 测试地址
const test_dist_dir = config.test_dist_dir
// 开发Dist地址
const dev_dist_dir = config.dev_dist_dir;
// 中间转换
const dist_dir = dev_dist_dir;


// JS\CSS注释
const banner = ['/**',
' * <%= pkg.name %> - <%= pkg.description %>',
// ' * @version v<%= pkg.version %>',
// ' * @link <%= pkg.homepage %>',
// ' * @license <%= pkg.license %>',
' *\/',
''].join(' ');

gulp.task('base-sass', () => {
  const timer = +(new Date());
  return gulp.src(['app/Public/css/lib/base.scss'])
    .pipe($.cached("base-sass"))
    //语法报错时，整个运行流程还会继续走下去，不退出
    .pipe($.plumber())
    .pipe($.sass())
    .pipe($.replace(/(\.(jpg|png|gif)+)/g,"$1?v="+timer)) 
    .pipe($.csslint())
    .pipe($.autoprefixer({
      browsers: ['> 5%', 'last 4 versions']
    }))
    // 压缩重复 
    .pipe($.cleanCss())
    .pipe(gulp.dest(dist_dir + 'css/lib/'))
    ;
});

 

gulp.task('sass', () => {
  const timer = +(new Date());
  return gulp.src(['app/Public/css/**/*.scss'])
    // 这二句要放到cached：在修改lib下的CSS时，不合并到base.css中，是以独立的文件生成的，原因就是cached缓存了
    // cached要放到第一位 
    .pipe($.cached("sass"))
    //语法报错时，整个运行流程还会继续走下去，不退出
    .pipe($.plumber())
    .pipe($.sass())
    .pipe($.replace(/(\.(jpg|png|gif)+)/g,"$1?v="+timer)) 
    .pipe($.csslint())
    // 压缩成一行
    //.pipe($.cssnano())
    /*
    Source Maps能够提供将压缩文件恢复到源文件原始位置的映射代码的方式。
    这意味着你可以在优化压缩代码后轻松的进行调试。
    在Chrome和Firefox的开发工具既附带内置的Source Maps的支持。
    */
    //.pipe($.sourcemaps.init())

    // browsers options url:  https://github.com/ai/browserslist#queries
    .pipe($.autoprefixer({
      browsers: ['> 5%', 'last 4 versions']
    }))
    // 压缩重复 
    .pipe($.cleanCss({debug: false}, function(details) {
      // 压缩前大小
      //console.log(details.name + ' originalSize: ' + details.stats.originalSize);
      //压缩后大小
      //console.log(details.name + ' minifiedSize: ' + details.stats.minifiedSize);
    }))
    //.pipe($.header(banner, {pkg: pkg}))
    // 带参数：生成的sourcemaps代码放到指定的文件夹中，不带参数：在对应的文件最下面生成一串代码
    //.pipe($.sourcemaps.write('../maps'))
    //.pipe(gulp.dest(test_dist_dir + 'css/'))
    .pipe(gulp.dest(dist_dir + 'css/'))
    // 第一个参数是当前文件夹下生成一个source map 文件
    //.pipe(sourcemaps.write('.', {includeContent: false, sourceRoot: '../src'}))
    
    /* 加上这段代码执行慢
    .pipe($.notify({
        onLast: true,
        message: () => `CSS文件编译了 <%= file.relative %>`
    }))
    .pipe(reload({
      stream: true
    }))*/
    ;
});



gulp.task('sass:dev', () => {
  const timer = +(new Date());
  return gulp.src(['app/Public/css/**/*.scss'])
    .pipe($.cached("sass"))
    .pipe($.plumber())
    .pipe($.sass())
    .pipe($.autoprefixer({
      browsers: ['> 5%', 'last 4 versions']
    }))
    .pipe(gulp.dest(test_dist_dir + 'css/'))
    ;
});