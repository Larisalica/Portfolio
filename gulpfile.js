const gulp = require('gulp');
const pug = require('gulp-pug');
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');
const del = require('del');
const browserSync =require('browser-sync').create();
const paths = {
    root: './build',
    templates: {
        pages: 'src/templates/pages/*.pug',
        src: 'src/templates/**/*.pug',
        dest: 'build/assets/'
    },
    styles:{
        src: 'src/styles/**/*.scss',
        dest: 'build/assets/styles/'
    }
} 

// слежка
function watch() {
    gulp.watch(paths.styles.src,styles);
    gulp.watch(paths.templates.src,templates);
}
// слежка за браузером
function server(){
    browserSync.init({
        server:paths.root
    });
    browserSync.watch(paths.root +'/**/*.*',browserSync.reload);
}
// del
function clean(){
    return del(paths.root);
}
// pug
function templates(){
    return gulp.src(paths.templates.pages)
    .pipe(pug({pretty:true}))
    .pipe(gulp.dest(paths.root));
}

// scss
function styles(){
    return gulp.src('./src/styles/app.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle:"compressed"}))
    .pipe(sourcemaps.write())
    .pipe(rename({suffix:'.min'}))
    .pipe(gulp.dest(paths.styles.dest));
}

exports.templates = templates;
exports.styles = styles;
exports.clean = clean;

gulp.task('default',gulp.series(
    clean,
    gulp.parallel(styles, templates),
    gulp.parallel(watch,server)
));