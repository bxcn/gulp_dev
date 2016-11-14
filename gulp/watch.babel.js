import gulp from 'gulp';

/* 
  监听文件
  开始在执行当前任务之前先执行 sass  js  images任务
  后来发现这些任务执行时间很长，如果任务的文件在不断增加，那么占用的时间会越来越大;
  所以在文件改变时才去执行对应的任务，第一次可能会占用一些时间，比一开始就执行一些可能不需要的任务，可以缓解第一次加载的时间，
*/
gulp.task('watch:dev',['sass:dev','js:dev','images:dev','html:dev'], () => {
  //gulp.watch('app/html/**/*.html', ['html']);
  gulp.watch('app/Public/js/**/*.js', ['js:dev']);
  gulp.watch('app/Public/sass/**/*.scss', ['sass:dev']);
  gulp.watch('app/Public/images/**/*', ['images:dev']);
  gulp.watch('app/html/**/*', ['html:dev']);
});
