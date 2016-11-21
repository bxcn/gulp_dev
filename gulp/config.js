import path from "path";

 module.exports = (function() {
   return {
     gulpLoadPlugins: require('gulp-load-plugins'),
     ifSass: (file) => {
       // 判断文件后缀是.scss
       const ext = path.extname(file.path);
       return ext == ".scss" ? true : false;
     },
     ifLibDir: (file) => {
       // 判断文件包含lib目录
       const index = path.parse(file.path).dir.indexOf('\\lib');
       //console.log(index > -1)
       //console.log(file.path)
       return index > -1;
     },
     ifNotLibDir: (file) => {
       // 判断文件包含lib目录
       const index = path.parse(file.path).dir.indexOf('\\lib');
       console.log(index);
       //console.log(index > -1)
       //console.log(file.path)
       return !(index > -1);
     }
   }
 })();