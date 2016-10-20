// generated on 2016-06-03 using generator-gulp-webapp 1.1.1
import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import browserSync from 'browser-sync';
import del from 'del';
import {
  stream as wiredep
} from 'wiredep';

const $ = gulpLoadPlugins();
const reload = browserSync.reload;

gulp.task('sasslib', () => {
  return gulp.src('app/sass/lib/*.scss')
    .pipe($.plumber())
    .pipe($.sass())
    .pipe($.csslint())
    // 压缩重复 
    .pipe($.cleanCss({debug: true}, function(details) {
      // 压缩前大小
      console.log(details.name + ' originalSize: ' + details.stats.originalSize);
      //压缩后大小
      console.log(details.name + ' minifiedSize: ' + details.stats.minifiedSize);
        }))
    .pipe($.sourcemaps.init())
    .pipe($.autoprefixer({
      browsers: ['> 5%', 'last 4 versions']
    }))
    // 先合并文件然后再输出到指定的目录下
    .pipe($.concat("app.css"))
    .pipe(gulp.dest('dist/css/'))
    .pipe($.sourcemaps.write('../maps'))
    ;
});
 

gulp.task('sass', ['sasslib'], () => {
  return gulp.src(['app/sass/**/*.scss','!app/sass/lib/*.scss'])
    //语法报错时，整个运行流程还会继续走下去，不退出
    .pipe($.plumber())
    .pipe($.sass())
    .pipe($.cached("sass"))
    .pipe($.csslint())
    // 压缩成一行
    //.pipe($.cssnano())
    // 压缩重复 
    .pipe($.cleanCss({debug: true}, function(details) {
      // 压缩前大小
      console.log(details.name + ' originalSize: ' + details.stats.originalSize);
      //压缩后大小
      console.log(details.name + ' minifiedSize: ' + details.stats.minifiedSize);
        }))
    /*
    Source Maps能够提供将压缩文件恢复到源文件原始位置的映射代码的方式。
    这意味着你可以在优化压缩代码后轻松的进行调试。
    在Chrome和Firefox的开发工具既附带内置的Source Maps的支持。
    */
    .pipe($.sourcemaps.init())
    // browsers options url:  https://github.com/ai/browserslist#queries
    .pipe($.autoprefixer({
      browsers: ['> 5%', 'last 4 versions']
    }))
    .pipe(gulp.dest('dist/css/'))
    .pipe($.concat("app.css"))
    // 带参数：生成的sourcemaps代码放到指定的文件夹中，不带参数：在对应的文件最下面生成一串代码
    .pipe($.sourcemaps.write('../maps'))
    // 第一个参数是当前文件夹下生成一个source map 文件
    //.pipe(sourcemaps.write('.', {includeContent: false, sourceRoot: '../src'}))
    
    /* 加上这段代码执行慢
    .pipe($.notify({
        onLast: true,
        message: () => `CSS文件编译了 <%= file.relative %>`
    }))*/
    .pipe(reload({
      stream: true
    }));
});


gulp.task('jscs', () => {
  return gulp.src(['app/js/**/*.js'])
    .pipe($.cached("jscs"))
    .pipe($.plumber())
    .pipe($.jscs({fix: true}))
    .pipe($.jscs.reporter())
    .pipe(jscs.reporter('fail'))
    .pipe(gulp.dest("dist/js/"));
});

gulp.task('jslib', () => {
  return gulp.src(['app/js/lib/**/*.js'])
    .pipe($.cached("jslib"))
    .pipe($.plumber())
    .pipe($.uglify())
    .pipe($.concat('app.js'))
    .pipe(gulp.dest("dist/js/"))
    /*.pipe(reload({
      stream: true
    }))*/;
});


gulp.task('cssrev', () => {
  return gulp.src('app/sass/lib/*.scss')
    .pipe($.sass())
    .pipe($.concat("app.css"))
    .pipe($.rev())
    .pipe($.revFormat({
      prefix: '.',
      suffix: '.cache',
      lastExt: false
    }))
    .pipe($.rev.manifest({
        //path:"rev-manifest.json",//default rev-manifest.json file
        //base:"dist",
       // merge: true // merge with the existing manifest (if one exists) 
        }))
    .pipe(gulp.dest('dist/css/'))
    ;
});

gulp.task('jsrev',['cssrev'], () => {
  return gulp.src(['app/js/**/*.js'])
    .pipe($.rev())
    .pipe($.revFormat({
      prefix: '.',
      suffix: '.cache',
      lastExt: false
    }))
    .pipe($.rev.manifest({
        //path:"rev-manifest.json",//default rev-manifest.json file
        //base:"dist",
        //merge: true // merge with the existing manifest (if one exists) 
        }))
    .pipe(gulp.dest("dist/js/"));
});

/*
gulp-rev-collector插件就是从manifests中获取静态资源版本数据, 该数据由不同的流产生, 并且替换html中的链接.
安装命令：npm install --save gulp-rev-collector
<script src="lib/zepto.min.js?v=50a4556b00"></script>
默认gulp-rev不支持生成以上的形式的文件，通过replaceJsIfMap方法可以生成
版本号是hash值
*/
gulp.task('rev', function() {
    var manifest = gulp.src(["./dist/css/rev-manifest.json","./dist/js/rev-manifest.json"]);
    function replaceJsIfMap(filename) {
        if (filename.indexOf('.cache') > -1) {
          const _version = filename.match(/\.[\w]*\.cache/)[0].replace(/(\.|cache)*/g,"");
          const _filename = filename.replace(/\.[\w]*\.cache/,"");
          filename = _filename + "?rev=" + _version;
          return filename;
        }
        return filename;
    }
    gulp.src(['app/index.html'])   
        .pipe($.revReplace({
        manifest: manifest,
        // modifyUnreved: replaceJsIfMap,
        modifyReved: replaceJsIfMap
    }))  
    .pipe(gulp.dest('dist'));
});

gulp.task('jsmin',['jslib'], () => {
  // 不匹配lib文件夹下所有文件
  return gulp.src(['app/js/**/*.js','!app/js/lib/**/*js'])
    .pipe($.cached("jshint"))
    .pipe($.eslint())
    .pipe($.jshint())
    // .pipe($.jshint.reporter())
    .pipe($.sourcemaps.init())
    .pipe($.babel())
    .pipe($.sourcemaps.write())
    .pipe($.uglify({
      preserveComments: 'all' //保留所有注释
    }))
    .pipe(gulp.dest('dist/js/'))
    /*.pipe(reload({
      stream: true
    }))*/;
});

gulp.task('es5',['jslib'], () => {
  // 不匹配lib文件夹下所有文件
  return gulp.src(['app/js/**/*.js','!app/js/lib/**/*js'])
    .pipe($.plumber())
    .pipe($.eslint())
    .pipe($.sourcemaps.init())
    .pipe($.babel())
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest('dist/js/'))
    /*.pipe(reload({
      stream: true
    }))*/;
});

gulp.task('images', () => {
  return gulp.src('app/images/**/*')
    .pipe($.cached("image"))
    .pipe($.plumber())
    .pipe($.if($.if.isFile, $.imagemin({
        progressive: true,
        interlaced: true,
        // don't remove IDs from SVGs, they are often used
        // as hooks for embedding and styling
        svgoPlugins: [{
          cleanupIDs: false
        }]
      })))
    .pipe(gulp.dest('dist/images/'))
    /*.pipe(reload({
      stream: true
    }))*/;
});

// 清除缓存
gulp.task('cleanCash', function (done) {  
   // $.cached.caches = {};
   delete $.cached.caches['jshint'];
});

gulp.task('clean', del.bind(null, ['dist']));

function lint(files, options) {
  return () => {
    return gulp.src(files)
      .pipe(reload({
        stream: true,
        once: true
      }))
      .pipe($.eslint(options))
      .pipe($.eslint.format())
      .pipe($.if(!browserSync.active, $.eslint.failAfterError()));
  };
}
const testLintOptions = {
  env: {
    mocha: true
  }
};

gulp.task('lint', lint('app/js/**/*.js'));
gulp.task('lint:test', lint('test/spec/**/*.js', testLintOptions));

// bower解决了前端库依赖管理的痛点，而wiredep解决了bower前端库引入进html的问题。
// bower安装是要安装到 bower install -save jquery
gulp.task('wiredep', () => {
  gulp.src('app/**/*.html')
    .pipe(wiredep({
      optional: 'configuration',
      goes: 'here'
    }))
    .pipe(gulp.dest('app'));
});

gulp.task('html', () => {
  return gulp.src('app/**/*.html')
    .pipe($.useref())
    .pipe(gulp.dest('dist/'))
    /*.pipe(reload({
      stream: true
    }))*/;
});

gulp.task('fonts', () => {
  return gulp.src('app/sass/lib/font/**/*')
    .pipe(gulp.dest('dist/css/lib/font'));
});

gulp.task('extras', () => {
  return gulp.src([
    'app/*.*',
    '!app/*.html'
  ], {
    dot: true
  }).pipe(gulp.dest('dist'));
});

gulp.task('serve', ['sass', 'es5', 'images' ], () => {
  // http://www.browsersync.cn/docs/options/
  browserSync({
    notify:false,//不显示在浏览器中的任何通知。
    port:80,//端口
    host:'localhost',
    reloadDebounce: 2000,
    reloadOnRestart: true,
    browser:["chrome"/*, "firefox"*/], // 在chrome、firefix下打开该站点
    server: {
      baseDir:['app'],// 应用程序目录
      index:'index.html',// 在应用程序目录中指定打开特定的文件
      routes: {
        '/bower_components' : 'bower_components',
        '/dist' : 'dist'
      }
    }
  })
  // 每当修改以下文件夹下的文件时就会刷新浏览器;
  gulp.watch('app/js/**/*.js', ['es5']);
  gulp.watch('app/sass/**/*.scss', ['sass']);
  gulp.watch('app/images/**/*', ['images']);
  gulp.watch([
    'app/**/*.html',
    'app/images/**/*',
    'app/sass/**/*',
    'app/js/**/*',
  ]).on('change', reload);

});

gulp.task('divwatch',['sass'], () => {
   gulp.watch('app/js/**/*.js', ['es5']);
  gulp.watch('app/sass/**/*.scss', ['sass']);
  gulp.watch('app/images/**/*', ['images']);
});

gulp.task('serve:dist', () => {
  browserSync({
    notify: false,
    port: 9000,
    server: {
      baseDir: ['dist']
    }
  });
});
gulp.task('serve:test', ['js'], () => {
  browserSync({
    notify: false,
    port: 9000,
    ui: false,
    server: {
      baseDir: 'test',
      routes: {
        '/js': '.tmp/js',
        '/bower_components': 'bower_components'
      }
    }
  });
  gulp.watch('app/js/**/*.js', ['js']);
  gulp.watch('test/spec/**/*.js').on('change', reload);
  gulp.watch('test/spec/**/*.js', ['lint:test']);
});



gulp.task('build', ['sass', 'js', 'images', 'fonts','html'], () => {});

gulp.task('default', ['clean'], () => {
  gulp.start('build');
});

gulp.task('zip', [ 'build'], () => {
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

// 更新gulp的package的版本号 "version":"0.0.2"
gulp.task('bump',function(){
    gulp.src('./package.json')
    .pipe($.bump())
    .pipe(gulp.dest('./'));
});

/*
npm install -g npm-check npm模块升级工具
npm-check update

*/