import gulp from "gulp";
import gulpSass from "gulp-sass";
import dartSass from "sass";
import postcss from "gulp-postcss";
import autoprefixer from "autoprefixer";
import cleanCSS from "gulp-clean-css";
import rename from "gulp-rename";
import { deleteAsync } from "del";

const { src, dest, watch, series } = gulp;
const sass = gulpSass(dartSass);

export function clean() {
  return deleteAsync([
    "src/css/bootstrap-overrides.css",
    "src/css/bootstrap-overrides.min.css",
  ]);
}

export function compileSass() {
  return src("src/scss/bootstrap-overrides.scss")
    .pipe(
      sass({
        includePaths: ["node_modules"],
        quietDeps: true,
        silenceDeprecations: ["import", "color-functions"],
      }).on("error", sass.logError),
    )
    .pipe(postcss([autoprefixer()]))
    .pipe(dest("src/css"))
    .pipe(cleanCSS())
    .pipe(rename({ suffix: ".min" }))
    .pipe(dest("src/css"));
}

export function watchSass() {
  watch(["src/scss/**/*.scss"], compileSass);
}

export const build = series(clean, compileSass);
export default series(clean, compileSass, watchSass);
