const gulp = require('gulp')
const babel = require('gulp-babel')
const inline = require('gulp-inline')
const htmlmin = require('gulp-htmlmin')
const livereload = require('gulp-livereload')
const rename = require('gulp-rename')
const rollup = require('gulp-rollup')
const uglify = require('gulp-uglify')
const pump = require('pump')

const projects = [
  'busy-intersections'
]

gulp.task('watch', () => {
  livereload.listen()
  gulp.watch(`projects/index.html`, [`build-html`])
  projects.forEach((project) => {
    gulp.watch(`projects/${project}/**/*.js`, [`build-${project}`])
  })
})

projects.forEach((project) => {
  gulp.task(`build-${project}`, (callback) => {
    pump([
      gulp.src(`projects/${project}/index.html`),
      inline({
        base: `projects/${project}`,
        js: [
          () => rollup({
            input: `projects/${project}/script.js`,
            allowRealFiles: true,
            format: 'es'
          }),
          () => babel({
            presets: ['es2015']
          }),
          () => uglify()
        ]
      }),
      htmlmin({
        collapseWhitespace: true,
        removeAttributeQuotes: true,
        removeOptionalTags: true,
        removeRedundantAttributes: true,
        sortAttributes: true,
        sortClassName: true
      }),
      rename({
        basename: project
      }),
      gulp.dest('dist'),
      livereload()
    ], callback)
  })
})

gulp.task('build-html', (callback) => {
  pump([
    gulp.src('projects/index.html'),
    htmlmin({
      collapseWhitespace: true,
      removeAttributeQuotes: true,
      removeOptionalTags: true,
      removeRedundantAttributes: true,
      sortAttributes: true,
      sortClassName: true
    }),
    gulp.dest('dist')
  ], callback)
})

const subtasks = projects.map(project => `build-${project}`)
subtasks.push('build-html')

gulp.task('build', subtasks)
