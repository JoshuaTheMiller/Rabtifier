const gulp = require('gulp');
const npmDist = require('gulp-npm-dist');
const clean = require('gulp-clean');
const gulpSequence = require('gulp-sequence')

const configuration = {
    paths: {
        src: {
            html: './Source/*.html',
            css: [
                './Source/*.css',
            ],
            manifest: './Source/manifest.json',
            image: './Source/*.png'
        },
        modules: './node_modules',
        dist: './out'
    }
};

gulp.task('clean', function () {
   return gulp.src(configuration.paths.dist, {read: false})
       .pipe(clean());
});

gulp.task('copy:html', function () {
    gulp.src(configuration.paths.src.html)
        .pipe(gulp.dest(configuration.paths.dist));
});

gulp.task('copy:css', function () {
    gulp.src(configuration.paths.src.css)
        .pipe(gulp.dest(configuration.paths.dist));
});

gulp.task('copy:manifest', function () {
    gulp.src(configuration.paths.src.manifest)
        .pipe(gulp.dest(configuration.paths.dist));
});

gulp.task('copy:image', function () {
    gulp.src(configuration.paths.src.image)
        .pipe(gulp.dest(configuration.paths.dist));
});

gulp.task('copy:libs', function () {
    gulp.src(npmDist(), { base: configuration.paths.modules })
        .pipe(gulp.dest(configuration.paths.dist));
});

function defaultTask(done) {
    // place code for your default task here
    done();
}

gulp.task('default', defaultTask);

gulp.task('rebuild', gulpSequence('clean', ['copy:html', 'copy:css', 'copy:libs', 'copy:manifest', 'copy:image']));