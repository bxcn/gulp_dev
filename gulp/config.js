import path from "path";

 module.exports = (function() {
   return {
     // 测试地址
     test_app_dir: "app/Public/",
     // 开发App地址
     dev_app_dir: "app/html/",
     // 测试地址
     test_dist_dir: "dist/Public/",
     // 开发Dist地址
     dev_dist_dir: "dist/html/Public/",
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
     }
   }
 })();