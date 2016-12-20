"use strict";
var fs = require( 'fs' );
var path = require( 'path' );
var ExtractTextPlugin = require( "extract-text-webpack-plugin" );
let cssExtractor = new ExtractTextPlugin( '[name].css' );

var rootPath = __dirname;
//var entryPath = '/app/Home/js/'
var entryPath = '/app/Public/js/'
var entryFiles = fs.readdirSync( path.join( rootPath, entryPath ) );
var entryObj = {};


entryFiles.forEach( function ( file ) {
  if ( file.indexOf( '.' ) > 0 ) {
    var fileName = file.split( '-' )[ 0 ];
    entryObj[ fileName ] = '.' + entryPath + file;
    console.log( '.' + entryPath + file );
  }
} );

module.exports = {
  entry: entryObj,
  output: {
    filename: "[name]"
  },
  // 新添加的module属性
  module: {
    loaders: [ {
      test: /\.js|jsx$/,
      loaders: [ 'babel?presets[]=es2015,presets[]=react,presets[]=stage-0' ]
    }, {
      test: /\.css$/,
      loader: cssExtractor.extract( [ 'css!sass' ] )
    }, {
      test: /\.(jpg|png)$/,
      loader: "url?limit=555"
    }, {
      test: /\.(scss|css)$/,
      loader: "style!css!sass"
    } ]
  },
  plugins: [ cssExtractor ]

}
