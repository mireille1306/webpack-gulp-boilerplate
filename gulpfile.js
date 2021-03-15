
var gulp = require("gulp"),
sass = require("gulp-sass"),
postcss = require("gulp-postcss"),
autoprefixer = require("autoprefixer"),
cssnano = require("cssnano"),
sourcemaps = require("gulp-sourcemaps"),
browserSync = require("browser-sync").create(),
fileinclude = require('gulp-file-include');

var paths = {
    styles: {
        src: "src/scss/**/*.{scss,css}",
        dest: "dist/css"
    },
    html: {
        src: 'src/html/**/*.html',
        dest: 'dist/'
    },
    components: {
        src: 'src/components/**/*.html',
        dest: 'dist/components'
    },
    js: {
        src: 'src/js/index.js',
        watch: 'src/js/**/*.js',
    },
    assets: {
        src: 'src/assets/**/*.{png,gif,jpg,css,ttf,woff,woff2,svg}',
        dest: 'dist/assets'
    }
};

function style() {
return gulp
    .src(paths.styles.src)
    .pipe(sourcemaps.init())
    .pipe(sass())
    .on("error", sass.logError)
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(browserSync.stream());
}

function html() {
    return gulp
    .src(paths.html.src)
    .pipe(fileinclude({
        prefix: '@@',
        basepath: '@file'
      }))
    .pipe(gulp.dest(paths.html.dest))
}

function assets() {
    return gulp
    .src(paths.assets.src)
    .pipe(gulp.dest(paths.assets.dest))
}

// A simple task to reload the page
function reload() {
browserSync.reload();
}

function watch() {
browserSync.init({
    server: {
        baseDir: "dist"
    }
});

gulp.watch(paths.styles.src, style);
gulp.watch([paths.html.src, paths.components.src], html);
gulp.watch(paths.assets.src, assets);
gulp.watch([paths.html.src,paths.styles.src, paths.components.src, paths.js.watch, paths.assets.src]).on('change', browserSync.reload);
}

exports.watch = watch
exports.style = style;
exports.html = html;
exports.assets = assets;

var build = gulp.series([style, html, assets], watch);
gulp.task('default', build);