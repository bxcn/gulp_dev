{
  "name": "gulp_dev", //项目名称
  "version": "v1.0.0", ////项目版本（必须)
  "description": "gulp project", //项目描述 
  "homepage": "", //项目主页
  "author": { //项目作者信息
    "name": "bxcn",
    "email": "html5think@gmail.com"
  },
  "keywords": "gulp dev", // 方便别人在npm search中搜索到它
  "bugs": {//你项目的提交问题的url和（或）邮件地址。这对遇到问题的屌丝很有帮助
    "url": "https://github.com/bxcn/gulp_dev.git",
    "email": "bxcn@hostname.com"
  },
  "repository" : { 
    "type" : "git",
    "url" : "http://github.com/bxcn/gulp_dev.git"
  },
  "private": true,//如果你设置"private": true，npm就不会发布它
  "engines": {//你可以指定工作的node的版本：
    "node": ">=0.12.0",
    "npm" : "~1.0.20" //指定哪一个npm版本能更好地初始化你的程序
  },
  "devDependencies": {
    "gulp": "^3.9.0",
    "gulp-load-plugins": "^0.10.0",
    // 把ES6转换成ES5这个转换的是把自定义a.js文件的ES6代码转换成Es5代码，下面还有一个是运行运行Task时把gulpfile.babel.js转换成ES5
    "gulp-babel": "^6.1.1",
    // babel-core babel-presets-es2015 把ES6转换成ES5的转码工具
    "babel-core": "^6.17.0",
    "babel-preset-es2015": "^6.16.0",

    //Babel提供babel-cli工具，用于命令行转码,需要安装命令:npm install -g babel-cli
    // 调用 babel app/js/es6.js -o a.js
    "babel-cli": "^6.16.0",
    // 格式化js
    "gulp-eslint": "^0.13.2",
    /*
    建立网站时，保持多个浏览器和设备同步
    */
    "browser-sync": "^2.2.1",
    /*
    Source Maps能够提供将压缩文件恢复到源文件原始位置的映射代码的方式。
    这意味着你可以在优化压缩代码后轻松的进行调试。
    在Chrome和Firefox的开发工具既附带内置的Source Maps的支持。
    */
    "gulp-sourcemaps": "^1.5.0",
    /* 在文件的头部和尾部增加注释信息
    var pkg = require('./package.json')
    gulp.task('header', () => {
      var banner = ['/**',
      ' * <%= pkg.name %> - <%= pkg.description %>',
      ' * @version v<%= pkg.version %>',
      ' * @link <%= pkg.homepage %>',
      ' * @license <%= pkg.license %>',
      ' *\/',
      ''].join('\n')

      return gulp.src('app/js/**\/*.js')
      .pipe($.header(banner, {pkg: pkg}))
      .pipe($.footer(banner, {pkg: pkg}))
      .pipe(gulp.dest('dist/js'))
      ;
    });
    */
    "gulp-footer": "^1.0.5",
    "gulp-header": "^1.8.8",
    
    "del": "^1.1.1",
    //
    "gulp-autoprefixer": "^3.0.1",
    // 检查css
    "gulp-csslint": "^1.0.0",
    // 压缩并把重复的一部分代码合并
    "gulp-clean-css": "^2.0.13",
    //"gulp-cssmin": "^0.1.7",
    // 简单的压缩合并 Minify CSS with cssnano
    //"gulp-cssnano": "^2.0.0",

    // Js代码压缩并编译成计算机能识别的代码
    "gulp-uglify": "^1.1.0",

    // JS代码检查
    "gulp-jshint": "^2.0.1",

    // 文件压缩zip    
    "gulp-zip": "^3.2.0",
    // gulpfile.babel.js 中控制语句
    "gulp-if": "^1.2.5",

    // 图片压缩
    "gulp-imagemin": "^2.2.1",

    //缓存 只针对有变化的文件(css、images、js、html等)进行Task执行
    "gulp-cached": "^1.1.0",

    // sass转换css
    "gulp-sass": "^2.3.2",
    // html代码压缩
    "gulp-htmlmin": "^1.3.0",

    // 在电脑的状态栏里提示消息
    "gulp-notify": "^2.2.0",

    // 合并多个文件
    "gulp-concat": "^2.6.0",
    // 在 watch时，如果程序报错了可能就退出任务了，有了plumber，可以阻止gulp插件在发生错误时导致进程退出报错；
    "gulp-plumber": "^1.0.1",
    // 获取文件的大小
    "gulp-size": "^1.2.1",
    // 把HTML文件中的build标签内的文件合并成指定的文件combined.js
    /*
      <!-- build:js scripts/combined.js -->

      </--endbuild -->
    */
    "gulp-useref": "^3.0.0",
    // 复制文件
    "gulp-copy2": "^0.2.0",
    // 把gulpfile.babel.js分成多个子文件，加载管理
    "require-dir": "^0.3.1",
    //生成文件版本号清单 修改文件后才生成新的hash值 set hash key
    "gulp-rev": "^7.1.2",
    // 格式化文件版本号 
    "gulp-rev-format": "^1.0.4",
    // 把项目文件里的文件名替换成版本号清单里的文件名
    "gulp-rev-replace": "^0.4.3",

    "wiredep": "^2.2.2"
  },
  // ES 定义编码规范 也可以新那一个文件.eslintrc
  "eslintConfig": {
    "env": {
      "es6": true,
      "node": true,
      "browser": true
    },
    "rules": {
      "quotes": [2,"single"]
    }
  },
  // 把命令行的代码简写 通过 npm run build 方式转码
  "scripts": {
    "build":"babel app -d lib"
  }
}