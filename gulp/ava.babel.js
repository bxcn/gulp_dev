const gulp = require('gulp');
const mocha = require('gulp-mocha');

gulp.task('mocha', () =>
  gulp.src('mocha/**/*.test.js')
  // gulp-mocha needs filepaths so you can't have any plugins before it 
  .pipe(mocha())
);
