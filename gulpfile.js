var gulp        = require('gulp'),
    less        = require('gulp-less'),
    path        = require('path'),
    prefixer    = require('gulp-autoprefixer'),
    watch       = require('gulp-watch'),
    browserSync = require('browser-sync'),
    reload      = browserSync.reload;


gulp.task('move', function () {
    gulp.src('./src/*.html', {base: './src'})
        .pipe(gulp.dest('./build'))
        .pipe(reload({stream: true}));
});


gulp.task('style', function () {
    return gulp.src('./src/less/**/*.less')
        .pipe(less({
            paths: [path.join(__dirname, 'less', 'includes')]
        }))
        .pipe(prefixer())
        .pipe(gulp.dest('./build/css'))
        .pipe(reload({stream: true}));
});


gulp.task('watch', function () {
    watch(['src/less/**/*.less'], function () {
        gulp.start('style');
    });

    watch(['src/index.html'], function () {
        gulp.start('move');
    });
});


// Server
var config = {
    server: {
        baseDir: "./build"
    },
    ghostMode: {
        clicks: false,
        forms: false,
        scroll: false
    },
    tunnel: false,
    ui: false,
    host: 'localhost',
    logPrefix: "Simple Project Template"
};
gulp.task('server', function () {
    browserSync(config);
});


// Default task
gulp.task('default', ['move', 'style', 'server', 'watch']);
