const { src, dest, parallel, watch } = require('gulp');
const less = require('gulp-less');
const csso = require('gulp-csso');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');

const styles = [
  './assets/styles/admin-layout-1.less',
  './assets/styles/blank-layout.less',
  './assets/styles/ckeditor.less'
];

const scripts = ['./assets/scripts/perfume.js'];

const images = ['./static/images/*'];

const icons = ['./static/icons/*'];

function css() {
  return src(styles)
    .pipe(less())
    .pipe(csso({ comments: false }))
    .pipe(dest('./static/styles'));
}

function js() {
  return src(scripts)
    .pipe(uglify())
    .pipe(dest('./static/scripts'));
}

function img() {
  return src(images)
    .pipe(imagemin())
    .pipe(dest('./static/images'));
}

function icon() {
  return src(icons)
    .pipe(imagemin())
    .pipe(dest('./static/icons'));
}

exports.js = js;
exports.css = css;
exports.img = img;
exports.icon = icon;

exports.build = parallel(css, js, img, icon);

exports.default = function() {
  watch(styles, css);
  watch(scripts, js);
};
