const gulp = require('gulp')
const babel = require('gulp-babel')
const livereload = require('gulp-livereload')
const rollup = require('gulp-rollup')
const uglify = require('gulp-uglify')
const pump = require('pump')

gulp.task('watch', () => {
  livereload.listen()
  gulp.watch('src/*.js', ['build'])
})

gulp.task('build', (callback) => {
  pump([
    gulp.src('src/*.js'),
    rollup({entry: 'src/script.js', format: 'es'}),
    babel({presets: ['es2015'] }),
    uglify({toplevel: true}),
    gulp.dest('dist'),
    livereload()
  ], callback)
})
