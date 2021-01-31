const gulp = require('gulp'),
    browserSync = require('browser-sync');
    //connectSync = require('gulp-connect-php');

const sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    plumber = require('gulp-plumber'),
    notify = require('gulp-notify');

const webpack = require('webpack'),
    webpackStream = require('webpack-stream'),
    webpackConfig = require('./webpack.config');

gulp.task('browser-sync', function(done) {
  console.log('browser-sync init')
  browserSync({
    server: {
     baseDir: "./htdocs/"
     ,index  : "index.html"
   }
 })
  done()
})
/*
gulp.task('connectSync', function(done) {
  connectSync.server({
    port:8001,
    base:'htdocs'
  }, function (){
    browserSync({
      proxy: 'localhost:8001'
    });
  });
  done()
});
*/
//ブラウザリロード
gulp.task('bs-reload', function (done) {
  console.log('reload now');
  browserSync.reload()
  done()
})


gulp.task('sass', function(done) {
  console.log('sass');
  gulp.src('./src/sass/**/*.scss')
   .pipe(plumber({errorHandler: notify.onError('<%= error.message %>')}))
   .pipe(sourcemaps.init())
   .pipe(sass({outputStyle: 'expanded'}))
   .pipe(sourcemaps.write())
   .pipe(gulp.dest('./htdocs/cmn/css'))
   done();
});


gulp.task('webpack', function(done){
  console.log('webpack')
  gulp.src('./src/js/*/*.js', {
    since: gulp.lastRun('webpack')
  })
    .pipe(plumber({errorHandler: notify.onError('<%= error.message %>')}))
    .pipe(webpackStream(webpackConfig, webpack))
    .pipe(gulp.dest('./htdocs/cmn/js'))
  done();
})


//監視ファイル
gulp.task('watch', gulp.series( gulp.series('browser-sync'), function () {
    gulp.watch("./htdocs/*.html", gulp.series('bs-reload'))
    gulp.watch("./htdocs/*/*.html", gulp.series('bs-reload'))

    gulp.watch("./src/sass/*.scss", gulp.series('bs-reload', 'sass'))

    gulp.watch("./src/js/*.js", gulp.series('webpack', 'bs-reload'))
    gulp.watch("./src/js/*/*.js", gulp.series('webpack', 'bs-reload'))
}))

gulp.task('default', gulp.series( 'watch'))
