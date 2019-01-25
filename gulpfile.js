const gulp = require('gulp');
const $ = require('gulp-load-plugins')();
const autoprefixer = require('autoprefixer');
const minimist = require('minimist');
const browserSync = require("browser-sync").create();

let envOptions = {
    string: 'env',
    default: {
        env: 'develop'
    }
};
let options = minimist(process.argv.slice(2), envOptions)

gulp.task('pug', function () {
    return gulp.src('./source/**/*.pug')
        .pipe($.plumber())
        .pipe($.pug({
            pretty: false,
        }))
        .pipe(gulp.dest('./public/'))
        .pipe(browserSync.stream())
});

gulp.task('sass', function () {
    let plugins = [
        autoprefixer({ browsers: ['last 1 version'] }),
    ];
    return gulp.src('./source/scss/**/*.scss')
        .pipe($.sourcemaps.init())
        .pipe($.sass().on('error', $.sass.logError))
        .pipe($.postcss(plugins))
        .pipe($.if(options.env == 'prod', $.cleanCss()))
        .pipe($.sourcemaps.write())
        .pipe(gulp.dest('./public/css'))
        .pipe(browserSync.stream())
});

gulp.task('babel', () =>
    gulp.src('./source/**/*.js')
        .pipe($.sourcemaps.init())
        .pipe($.babel({
            presets: ['@babel/env']
        }))
        .pipe($.concat('all.js'))
        .pipe($.if(options.env == 'prod', $.uglify({
            compress: {
                drop_console: true
            },
        })))
        .pipe($.sourcemaps.write('.'))
        .pipe(gulp.dest('./public/js'))
        .pipe(browserSync.stream())
);

gulp.task('images', () => 
    gulp.src('./source/img')
        .pipe($.if(options.env == 'prod', $.image()))
        .pipe(gulp.dest('./public/img'))
);

gulp.task('browser-sync', function(){
    browserSync.init({
        server: "./public"
    });
})

gulp.task('clean', function () {
    return gulp.src('./public', {read: false})
        .pipe(clean());
});

gulp.task('deploy', function () {
    return gulp.src('./public/**/*')
        .pipe($.ghPages());
});

gulp.task('watch', gulp.parallel('browser-sync', function () {
    gulp.watch('./source/**/*.pug', gulp.series('pug'));
    gulp.watch('./source/scss/*.scss', gulp.series('sass'));
    gulp.watch('./source/js/*.js', gulp.series('babel'));
}))

gulp.task('bulid', gulp.series('clean', 'pug', 'sass', 'babel', 'images', 'watch'))
gulp.task('default', gulp.series('pug', 'sass', 'babel', 'images', 'watch'))
