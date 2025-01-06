import gulp from 'gulp';
import gulpSass from 'gulp-sass'
import * as dartSass from 'sass'
import autoprefixer from 'gulp-autoprefixer'
import cleanCSS from 'gulp-clean-css'
import { compRoot } from '@yto-custom/build-utils'
import gulpPostcss from 'gulp-postcss'
import unoPlugin from '@unocss/postcss'
import unoConfig from './uno.config';

const { src, dest, series } = gulp;
const sass = gulpSass(dartSass)

const componentPath = `${compRoot}/*/src/*.scss`
const distFolder = './dist'

async function buildStyles() {
  return src(componentPath, { allowEmpty: true })
    .on('data', (file) => {
      console.log('找到文件:', file.path)
    })
    // 先进行 SCSS 编译
    .pipe(sass.sync().on('error', sass.logError))
    // 使用 UnoCSS PostCSS 插件处理 @apply
    .pipe(gulpPostcss([
      unoPlugin(unoConfig)
    ]))
    .pipe(autoprefixer({ cascade: false }))
    .pipe(cleanCSS())
    .pipe(dest(distFolder))
}

buildStyles().then(() => {
  console.log('构建完成！')
}).catch((err) => {
  console.error('构建出错：', err)
})

export default series(buildStyles)