const gulp = require('gulp')
const babel = require('gulp-babel')
const livereload = require('gulp-livereload')
const rollup = require('gulp-rollup')
const sourcemaps = require('gulp-sourcemaps')
const uglify = require('gulp-uglify')
const pump = require('pump')

gulp.task('watch', () => {
  livereload.listen()
  gulp.watch('src/**/*.js', ['build'])
})

gulp.task('build', (callback) => {
  pump([
    gulp.src('src/**/*.js'),
    sourcemaps.init(),
    rollup({input: 'src/script.js', format: 'es'}),
    babel({presets: ['es2015']}),
    uglify({toplevel: true}),
    sourcemaps.write('.'),
    gulp.dest('dist'),
    livereload()
  ], callback)
})
