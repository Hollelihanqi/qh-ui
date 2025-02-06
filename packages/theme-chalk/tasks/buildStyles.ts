import gulp from 'gulp'
import gulpSass from 'gulp-sass'
import * as dartSass from 'sass'
import autoprefixer from 'gulp-autoprefixer'
import cleanCSS from 'gulp-clean-css'
import { compRoot } from '@yto-custom/build-utils'
import gulpPostcss from 'gulp-postcss'
import unoPlugin from '@unocss/postcss'
import unoConfig from '../uno.config'

const { src, dest } = gulp
const sass = gulpSass(dartSass)

const componentPath = `${compRoot}/*/src/*.scss`
const distFolder = './bscss'

export async function buildStyles() {
  return src(componentPath, { allowEmpty: true })
    .on('data', (file) => {
      // console.log('找到文件:', file.path)
    })
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(gulpPostcss([
      unoPlugin(unoConfig as any)
    ]))
    .pipe(autoprefixer({ cascade: false }))
    .pipe(cleanCSS())
    .pipe(dest(distFolder))
} 