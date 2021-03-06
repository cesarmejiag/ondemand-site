const { src, dest, series, watch } = require('gulp')
    , autoprefixer = require('gulp-autoprefixer')
    , babel        = require('gulp-babel')
    , babelify     = require('babelify')
    , buffer       = require('vinyl-buffer')
    , browserify   = require('browserify')
    , concat       = require('gulp-concat')
    , cleanCss     = require('gulp-clean-css')
    , source       = require('vinyl-source-stream')
    , sourcemaps   = require('gulp-sourcemaps')
    , uglify       = require('gulp-uglify')


const srcPath = {
    css   : 'src/css',
    fonts : 'src/fonts',
    images: 'src/images',
    js    : 'src/js',
    root  : 'src'
}

const destPath = {
    css   : 'docs/assets/css',
    fonts : 'docs/assets/fonts',
    images: 'docs/assets/images',
    js    : 'docs/assets/js',
    root  : 'docs'
}


/**
 * Copy fonts to public folder.
 * @param {function} cb 
 */
function fonts(cb) {
    const files = `${srcPath.fonts}/*.{eot,woff,woff2,ttf,svg,otf}`

    return src(files)
        .pipe(dest(`${destPath.fonts}`))
}


/**
 * Copy images to public folder.
 * @param {function} cb 
 */
function images(cb) {
    const files = `${srcPath.images}/**.{gif,jpg,jpeg,png,svg,webp}`

    return src(files)
        .pipe(dest(`${destPath.images}`))
}


/**
 * Boundling, minimize js files and copy to public folder.
 */
function scripts() {
    const opts = {
        basedir: ".",
        debug: true,
        entries: [`${srcPath.js}/scripts.js`],
        cache: {},
        packageCache: {},
    };

    return browserify(opts)
        .transform(babelify.configure({ presets: ['@babel/preset-env'] }))
        .bundle()
        .pipe(source("scripts.min.js"))
        .pipe(buffer())
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(dest(`${destPath.js}`));
}


/**
 * Add autoprefixes to css styles, concat, minify css files and copy to public folder.
 * @param {function} cb
 */
function styles(cb) {
    const files = [
        `${srcPath.css}/styles.css`
    ]

    const autoprefixerInit = {
        cascade: false
    }

    const cleanCssInit = {
        compatibility: 'ie8'
    }

    return src(files)
        .pipe(sourcemaps.init())
        .pipe(concat('styles.min.css'))
        .pipe(autoprefixer(autoprefixerInit))
        .pipe(cleanCss(cleanCssInit))
        .pipe(sourcemaps.write())
        .pipe(dest(`${destPath.css}`))
}


/**
 * Copy all vendors to public folder.
 * @param {function} cb
 */
function vendors (cb) {
    const files = [
        `${srcPath.js}/vendor/**/*.*`
    ]

    return src(files)
        .pipe(dest(`${destPath.js}/vendor`))
}


/**
 * Handle watch event.
 * @param {function} cb 
 */
function watcher(cb) {
    const files = [
        `${srcPath.css}/**/*.css`,
        `${srcPath.fonts}/**/*.{otf,ttf,woff,svg}`,
        `${srcPath.images}/**/*.{jpg,jpeg,svg,png}`,
        `${srcPath.js}/**/*.js`
    ]

    return watch(files, series(fonts, images, scripts, styles))
}


exports.fonts   = fonts
exports.images  = images
exports.scripts = scripts
exports.styles  = styles
exports.vendors = vendors
exports.watcher = watcher

exports.build = series(fonts, images, scripts, styles, vendors)
