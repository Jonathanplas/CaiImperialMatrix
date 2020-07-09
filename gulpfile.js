/* gulp plugins: these are packages found on npm that provide various utilities
 * to extend the capabilities of your build step */
var gulp = require('gulp'),
    concat = require('gulp-concat'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify'),
    ngAnnotate = require('gulp-ng-annotate'),
    cleanCSS = require('gulp-clean-css'),
    del = require('del'),
    stripDebug = require('gulp-strip-debug'),
    replace = require('gulp-replace'),
    templateCache = require('gulp-angular-templatecache'),
    plumber = require('gulp-plumber'),
    connect = require('gulp-connect'),
    gulpif = require('gulp-if'),
    wrap = require('gulp-wrap'),
    yargs = require('yargs'),
    path = require('path'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass');

/* These definitions are unique to your file structure */
var argv = yargs.argv,
    root = 'src',
    dist = 'dist',
    styles = root + '/css/*.css',
    scripts = 'src/app/**/*.js', //confirm
    developmentServerURL = '',
    productionServerURL = '',
    templates = ['src/app/**/*.html'],
    modules = ['@uirouter/angularjs/release/angular-ui-router.js',
    'parse/dist/parse.min.js',
    'angular-parse/angular-parse.js',
    '@fintechstudios/angularjs-mdc/dist/angularjs-mdc.min.js',
    'angular-material-expansion-panel/dist/md-expansion-panel.js',
    'vue/dist/vue.js', 'ngVue/build/index.js',
    '@uirouter/visualizer/bundles/visualizer.min.js']; // these are 3rd party libraries in the node_modules folder NOT *.module.js files

/* utility function to generate Unix DateTime Stamp */
function getDate() {
    var now = Date.now();
    return now;
}
/* clean step: this is always the first step in the build. It removes the
 * distribution folder and its contents so that a new one can be created with the changes */
gulp.task('clean', () => {
    return del(dist);
});

/* bundle-css step: This step, is my own design. Single-Page-Applications (SPAs)
 * were invented before google chrome had advanced caching abilities. I eventually
 * began running into a problem where even though I would make changes to my code,
 * and my development version would reflect the change, the changes would never
 * propagate to the production environment. This was a huge issue because I would
 * fix a bug, but users would still be served the old, cached version of the web app,
 * and the fix would never show up. This step performs "cache-busting" by changing
 * the name of the css file to "main-" + CurrentUnixDateTimeStamp (ex: 1524953270) + ".min.css"
 * to prevent this. Then this automatically injects the new filename into a
 * <script id="bundlecss"> tag in the index.html */

gulp.task('styles', () => {

    var filename = 'main-' + getDate() + '.min.css';

    gulp
        .src(styles)
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .pipe(cleanCSS({
            // processImport: false,
            compatibility: 'ie8'
        }))
        .pipe(concat(filename))
        .pipe(gulp.dest(dist + '/css'));

    return gulp.src('src/index.html', {
            base: './'
        })
        .pipe(replace(/<link id=\"bundlecss\"[\s\S]*?>[\s\S]*?/gi, '<link id="bundlecss" rel="stylesheet" href="css/' + filename + '">')) //so find the script tag with an id of bundle, and replace its src.
        .pipe(gulp.dest('./')); //Write the file back to the same spot.
});

/* build templateCache step: This concatenates and minifies all of the .html
 * templates for all of your components and puts the html markup into one javascript
 * file that comes pre-loaded. This means that every time AngularJS loads a new
 * component it doesn't need an http request for the .html file */
gulp.task('templates', () => {
    return gulp
        .src(templates)
        .pipe(templateCache({
            root: 'app',
            standalone: true,
            transformUrl: function (url) {
                return url.replace(path.dirname(url), '.');
            }
        }))
        .pipe(gulp.dest('./'));
});

/* You must build the app specific javascript in a certain order to prevent calls to modules
 * that haven't been defined yet. */
gulp.task('modules', gulp.series('templates', () => {
    return gulp.src(modules.map(item => 'node_modules/' + item))
        .pipe(concat('vendor.js'))
        .pipe(gulpif(argv.deploy, uglify()))
        .pipe(plumber())
        .pipe(gulp.dest(dist + '/js/'));
}));
gulp.task('modules', gulp.series('templates', () => {
    var filename = 'vendor-' + getDate() + '.min.js';

    gulp
        .src(modules.map(item => 'node_modules/' + item))
        .pipe(gulpif(argv.deploy, stripDebug()))
        .pipe(plumber())
        .pipe(gulpif(!argv._.length, sourcemaps.init({
            loadMaps: true
        })))
        .pipe(concat(filename))
        .pipe(gulpif(argv.deploy, uglify()))
        .pipe(gulpif(!argv._.length, sourcemaps.write()))
        .pipe(gulp.dest(dist + '/js'));


    /* must define base so I can overwrite the src file below. Per http://stackoverflow.com/questions/22418799/can-gulp-overwrite-all-src-files
     * so find the script tag with an id of bundle, and replace its src. */
    return gulp
        .src(root + '/index.html', {
            base: './'
        })
        .pipe(replace(/<script id=\"bundle2\"[\s\S]*?>[\s\S]*?<\/script>/gi, '<script id="bundle2" src="js/' + filename + '"></script>'))
        .pipe(gulp.dest('.')); //Write the file back to the same spot.

}));

/* build app specific javascript step: this step uses the same design pattern as
 * the build-css step and provides "cache-busting".
 * uses <script id="bundle"> as insert point in index.html */
gulp.task('scripts', gulp.series('modules', () => {

    /* wrap(): wraps all functions in IIFE module encapsulation to prevent namespace errors
     * ngAnnotate(): handles dependancy injection for you */
    var filename = 'main-' + getDate() + '.min.js';
    gulp
        .src(['src/app/**/*.module.js', scripts, './templates.js'])
        .pipe(gulpif(argv.deploy, stripDebug()))
        .pipe(plumber())
        .pipe(gulpif(!argv._.length, sourcemaps.init({
            loadMaps: true
        })))
        .pipe(wrap('(function(angular){\n\'use strict\';\n<%= contents %>})(window.angular);'))
        .pipe(concat(filename))
        .pipe(ngAnnotate()) // this adds
        .pipe(gulpif(argv.deploy, uglify()))
        .pipe(gulpif(!argv._.length, sourcemaps.write()))
        .pipe(gulp.dest(dist + '/js'));

    /* must define base so I can overwrite the src file below. Per http://stackoverflow.com/questions/22418799/can-gulp-overwrite-all-src-files
     * so find the script tag with an id of bundle, and replace its src. */
    return gulp
        .src(root + '/index.html', {
            base: './'
        })
        .pipe(replace(/<script id=\"bundle\"[\s\S]*?>[\s\S]*?<\/script>/gi, '<script id="bundle" src="js/' + filename + '"></script>'))
        .pipe(gulp.dest('.')); //Write the file back to the same spot.
}));

// copy html files
gulp.task('copy-html', () => {
    return gulp
        .src('src/*.html')
        .pipe(gulp.dest(dist));
});

// copy images
gulp.task('copy-json', () => {
    return gulp
        .src('src/data/**/*')
        .pipe(gulp.dest(dist + '/data'));
});

// copy json
gulp.task('copy-img', () => {
    return gulp
        .src('src/img/**/*')
        .pipe(gulp.dest(dist + '/img'));
});

// copy fonts
gulp.task('copy-fonts', () => {
    return gulp
        .src(['src/fonts/*', '!app/fonts/*.css'])
        .pipe(gulp.dest(dist + '/fonts'));
});

// generate localhost server for docs
gulp.task('connect-app', () => {
    connect.server({
        root: dist,
        livereload: false,
        fallback: 'dist/index.html',
        host: '0.0.0.0',
        port: 8885
    });
});

// gulp.task('watch', function() {
//     gulp.watch([styles, scripts, templates], function(event){
//         runSequence('clean', 'scripts', 'styles', 'copy-html', 'copy-img', 'copy-fonts');
//     });
// });

gulp.task('default', gulp.series('clean', 'scripts', 'styles', 'copy-html', 'copy-img', 'copy-fonts', 'copy-json', 'connect-app', (done) => {
    done();
}));

gulp.task('production', gulp.series('clean', 'scripts', 'styles', 'copy-html', 'copy-img', 'copy-fonts', (done) => {
    done();
}));
