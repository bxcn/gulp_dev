import gulp from 'gulp';
import path from 'path';
import config from './config';
const $ = config.gulpLoadPlugins();

const pkg = require( '../package.json' )


// ES5转换
/*
  all:34s
  has lib:5s
  not lib:16.3s
*/
const notHasLib = ( file ) => {
  return !( path.parse( file.path ).dir.indexOf( '\\lib' ) > -1 );
}
gulp.task( 'js', () => {
  // 不匹配lib文件夹下所有文件
  return gulp.src( [ 'app/Public/js/lib/**/*.js' ] )
    .pipe( $.cached( "js" ) )
    .pipe( $.plumber() )
    .pipe( $.if( notHasLib, $.eslint() ) )
    .pipe( $.if( notHasLib, $.babel( {
      presets: [ 'es2015', 'react', "transform-es2015-modules-umd" ]
    } ) ) )
    .pipe( $.uglify( {
      //preserveComments:'license',
      //mangle:true,//类型：Boolean 默认：true 是否修改变量名
      mangle: { except: [ 'require', 'exports', 'module', '$' ] }, //排除混淆关键字
      compress: false, //类型：Boolean 默认：true 是否完全压缩
    } ) )
    .pipe( $.removeContent( {
      match: /^[\'\"](use strict)[\'\"]/
    } ) )
    .pipe( gulp.dest( 'dist/Public/js/' ) )
    .pipe( gulp.dest( '../Public/js/lib/' ) );
} );

gulp.task( 'js:dev', () => {
  // 不匹配lib文件夹下所有文件
  return gulp.src( [ 'app/Public/js/**/*.js' ] )
    //.pipe($.cached("js:dev"))
    .pipe( $.plumber() )
    .pipe( $.if( notHasLib, $.babel( {
      presets: [ 'es2015', 'react' ]
    } ) ) )
    .pipe( $.if( notHasLib, $.umd( {
      template: path.join( __dirname, '../umd/cmd.js' )
    } ) ) )
    .pipe( gulp.dest( 'dist/Public/js/' ) )
    .pipe( gulp.dest( '../Public/js/' ) );
} );

gulp.task( 'webpackJsLib', () => {
  return gulp.src( [ 'app/Public/js/lib/**/*.js' ] )
    .pipe( gulp.dest( 'build/Public/js/lib/' ) )
    .pipe( gulp.dest( 'dist/Public/js/lib/' ) );
} );
gulp.task( 'webpackJs', [ 'webpackJsLib' ], () => {
  return gulp.src( [ 'app/Public/js/**/*.js' ] )
    .pipe( $.webpack( require( '../webpack.config.js' ) ) )
    .pipe( gulp.dest( 'build/Public/js/' ) )
    .pipe( gulp.dest( 'dist/Public/js/' ) );
} );

