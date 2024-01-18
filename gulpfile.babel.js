'use strict';

import gulp from "gulp";
import del from "del";
import runSequence from "run-sequence";
import browserSync from "browser-sync";
import gulpLoadPlugins from "gulp-load-plugins";
import babelify from "babelify";
import browserify from "browserify";
import source from "vinyl-source-stream";
import gutil from "gulp-util";

const $ = gulpLoadPlugins();
const reload = browserSync.reload;

const browserifyScript = (script) => {
    return browserify({
        entries: `./resources/assets/js/${script}`
    })
        .transform(babelify.configure({
            presets: [`es2015`]
        }))
        .bundle()
        .on(`error`, function (err) {
            gutil.log(gutil.colors.red.bold(`[browserify error]`));
            gutil.log(err.message);
            gutil.log(err);
            this.emit(`end`);
        })
        .pipe(source(script))
        .pipe(gulp.dest('./public/assets/js'));
};

gulp.task('styles', () => {
    const AUTOPREFIXER_BROWSERS = [
        'ie >= 10',
        'ie_mob >= 10',
        'ff >= 30',
        'chrome >= 34',
        'safari >= 7',
        'opera >= 23',
        'ios >= 7',
        'android >= 4.4',
        'bb >= 10'
    ];

    // For best performance, don't add Sass partials to `gulp.src`
    return gulp.src([
        './resources/scss/**/*.scss',
        './node_modules/foundation-sites/dist/css/foundation-flex.css',
    ])
        .pipe($.newer('.tmp/styles'))
        .pipe($.sourcemaps.init())
        .pipe($.sass({
            precision: 10,
            includePaths: [
                'node_modules/foundation-sites/scss',
                'node_modules/bootstrap-select/sass',
                'node_modules/bootstrap-daterangepicker',
                'node_modules/@fancyapps/fancybox/dist'
            ],
        }).on('error', $.sass.logError))
        .pipe($.autoprefixer(AUTOPREFIXER_BROWSERS))
        .pipe(gulp.dest('.tmp/styles'))
        // Concatenate and minify styles
        .pipe($.if('*.css', $.cssnano()))
        .pipe($.size({title: 'styles'}))
        .pipe($.sourcemaps.write('./'))
        .pipe(gulp.dest('./public/assets/css'))
        .pipe(gulp.dest('.tmp/styles'));
});

gulp.task('vendor-scripts', () => {
    return gulp.src([
        './node_modules/jquery/dist/jquery.min.js',
        './resources/assets/js/jquery-ui-drag.min.js',
        './resources/assets/js/daterangepicker.js',
        './node_modules/bootstrap/js/dropdown.js',
        './node_modules/bootstrap/js/tooltip.js',
        './node_modules/bootstrap-select/dist/js/bootstrap-select.js',
        './node_modules/@fancyapps/fancybox/dist/jquery.fancybox.min.js',
        './node_modules/bootstrap-daterangepicker/moment.min.js'
    ])
        .pipe(gulp.dest('./public/assets/js/vendor'));
});

gulp.task('vendors', () => {
    return gulp.src([
        './vendor/ktquez/laravel-tinymce/src/assets/js/**/*',
        './resources/assets/js/vendor/**/*'
    ])
        .pipe(gulp.dest('./public/assets/vendor'));
});

let scripts = [
    'main.js',
    'filter.js',
    'datepicker.js'
];

scripts.forEach((script) => {
    gulp.task(script, () => {
        return browserifyScript(script);
    });
});

gulp.task('scripts', scripts);

gulp.task('images', () => {
    gulp.src('./resources/assets/img/favicon.ico')
        .pipe(gulp.dest('./public'));

    return gulp.src('./resources/assets/img/**/*')
        .pipe($.cache($.imagemin({
            progressive: true,
            interlaced: true
        })))
        .pipe(gulp.dest('./public/assets/img'))
        .pipe($.size({title: 'images'}));
});

gulp.task('fonts', function () {
    return gulp.src('./resources/assets/fonts/**/*')
        .pipe(gulp.dest('./public/assets/fonts'));
});

// gulp.task('clean', () => del(['.tmp', './public/assets/*'], {dot: true}));

gulp.task('dev', () => {
    browserSync({
        notify: false,
        server: 'public',
        port: 3000,
    });

    gulp.watch(['./resources/scss/**/*'], ['styles', reload]);
});

gulp.task('default', [], (cb) => {
    runSequence(
        ['styles'],
        cb
    )
});
