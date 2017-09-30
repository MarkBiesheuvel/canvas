const gulp = require('gulp')
const babel = require('gulp-babel')
const livereload = require('gulp-livereload')
const rollup = require('gulp-rollup')
const sourcemaps = require('gulp-sourcemaps')
const uglify = require('gulp-uglify')
const pump = require('pump')

gulp.task('watch', () => {
  livereload.listen()
  gulp.watch('projects/busy-intersections/**/*.js', ['build'])
})

gulp.task('build', (callback) => {
  pump([
    gulp.src([
      'projects/busy-intersections/**/*.js',
      'library/**/*.js'
    ]),
    sourcemaps.init(),
    rollup({input: 'projects/busy-intersections/script.js', format: 'es'}),
    babel({presets: ['es2015']}),
    uglify({toplevel: true}),
    sourcemaps.write('.'),
    gulp.dest('dist'),
    livereload()
  ], callback)
})
