const gulp = require("gulp");
const eslint = require("gulp-eslint");
const gulpIf = require("gulp-if");
const mocha = require("gulp-mocha");
const istanbul = require('gulp-istanbul');
const print = require('gulp-print').default;

const isFixed = file =>
  // Has ESLint fixed the file contents?
  file.eslint != null && file.eslint.fixed;


gulp.task("lint", () =>
// ESLint ignores files with "node_modules" paths.
// So, it"s best to have gulp ignore the directory as well.
// Also, Be sure to return the stream from the task;
// Otherwise, the task may end before the stream has finished.
  gulp.src(["**/*.js", "!node_modules/**"])
  // eslint() attaches the lint output to the "eslint" property
  // of the file object so it can be used by other modules.
    .pipe(eslint())
  // eslint.format() outputs the lint results to the console.
  // Alternatively use eslint.formatEach() (see Docs).
    .pipe(eslint.format())
    .pipe(gulpIf(isFixed, gulp.dest("./")))
  // To have the process exit with an error code (1) on
  // lint error, return the stream and pipe to failAfterError last.
    .pipe(eslint.failAfterError()));

gulp.task("default", ["lint"], () => {
  // This will only run if the lint task is successful...
});

gulp.task("lint-fix", () =>
// ESLint ignores files with "node_modules" paths.
// So, it"s best to have gulp ignore the directory as well.
// Also, Be sure to return the stream from the task;
// Otherwise, the task may end before the stream has finished.
  gulp.src(["**/*.js", "!node_modules/**"])
  // eslint() attaches the lint output to the "eslint" property
  // of the file object so it can be used by other modules.
    .pipe(eslint({ fix: true }))
  // eslint.format() outputs the lint results to the console.
  // Alternatively use eslint.formatEach() (see Docs).
    .pipe(eslint.format())
    .pipe(gulpIf(isFixed, gulp.dest("./")))
  // To have the process exit with an error code (1) on
  // lint error, return the stream and pipe to failAfterError last.
    .pipe(eslint.failAfterError()));

// gulp.task('pre-test', function () {
//   return gulp.src(['**/*.js', "!node_modules/**", '!gulpfile.js'])
//     // Covering files
//     .pipe(istanbul())
//     // Force `require` to return covered files
//     .pipe(istanbul.hookRequire());
// });

// gulp.task('test', ['pre-test'], function () {
//   return gulp.src(['./test/*.js'])
//   .pipe(mocha({reporter:"spec"}))
//   .pipe(print())
//     // Creating the reports after tests ran
//     .pipe(istanbul.writeReports())
//     // Enforce a coverage of at least 90%
//     .pipe(istanbul.enforceThresholds({ thresholds: { global: 90 } }));
// });


gulp.task('test', function () {
  return gulp.src(['**/*.js', "!node_modules/**", '!gulpfile.js'])
    // Right there
    .pipe(istanbul({includeUntested: true}))
    .on('finish', function () {
      gulp.src(['./test/*.js'])
        .pipe(mocha({reporter: 'spec'}))
        .pipe(print())
        .pipe(istanbul.writeReports({
          dir: './assets/unit-test-coverage',
          reporters: [ 'lcov', 'text', 'text-summary'],
          reportOpts: { dir: './assets/unit-test-coverage'}
        }));
    });
});
