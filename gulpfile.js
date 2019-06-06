"use strict";

// var gulp = require("gulp");
// var plumber = require("gulp-plumber");
// var sourcemap = require("gulp-sourcemaps");
// var sass = require("gulp-sass");
// var postcss = require("gulp-postcss");
// var autoprefixer = require("autoprefixer");
// var server = require("browser-sync").create();

// gulp.task("css", function () {
//   return gulp.src("source/sass/style.scss")
//     .pipe(plumber())
//     .pipe(sourcemap.init())
//     .pipe(sass())
//     .pipe(postcss([
//       autoprefixer()
//     ]))
//     .pipe(sourcemap.write("."))
//     .pipe(gulp.dest("source/css"))
//     .pipe(server.stream());
// });

// gulp.task("server", function () {
//   server.init({
//     server: "source/",
//     notify: false,
//     open: true,
//     cors: true,
//     ui: false
//   });

//   gulp.watch("source/sass/**/*.{scss,sass}", gulp.series("css"));
//   gulp.watch("source/*.html").on("change", server.reload);
//   gulp.watch("source/*.css").on("change", server.reload);
// });

// gulp.task("start", gulp.series("css", "server"));

"use strict";

var gulp = require("gulp");
var plumber = require("gulp-plumber");
var sourcemap = require("gulp-sourcemaps");
var sass = require("gulp-sass");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var server = require("browser-sync").create();
var csso = require("gulp-csso");
var rename = require("gulp-rename");
var webp = require("gulp-webp");
var imagemin = require("gulp-imagemin");
var posthtml = require("gulp-posthtml");
var include = require("posthtml-include");
var del = require("del");
var htmlmin = require("gulp-htmlmin");

gulp.task("clean", function () {
  return del("build");
});

gulp.task("images", function () {
  return gulp.src("source/img/**/*.{png,jpg,svg}")
    .pipe(imagemin([
      imagemin.optipng({ optimizationLevel: 3 }),
      imagemin.jpegtran({ progressive: true })
    ]))
    .pipe(gulp.dest("build/img"));
});

gulp.task("webp", function () {
  return gulp.src("source/img/**/*.{png,jpg}")
    .pipe(webp({ quality: 90 }))
    .pipe(gulp.dest("build/img"));
});

gulp.task("html", function () {
  return gulp.src("source/*.html")
    .pipe(posthtml([
      include()
    ]
    ))
    .pipe(htmlmin({
      collapseWhitespace: true,
      collapseInlineTagWhitespace: true,
      removeComments: true,
      removeEmptyAttributes: true,
    }))
    .pipe(gulp.dest("build"));
});

gulp.task("js", function () {
  return gulp.src("source/js/script.js")    
    .pipe(gulp.dest("build/js"))
});

gulp.task("copy", function () {
  return gulp.src([
    "source/fonts/**/*.{woff,woff2,eot,ttf,svg}",
    "source/img/**",
    "source/js/**",
    "source/*.ico",
    "source/slick/**",
    "source/Procfile",
  ], {
      base: "source"
    })
    .pipe(gulp.dest("build"));
});

gulp.task("refresh", function () {
  server.reload();
  done();
});

gulp.task("css", function () {
  return gulp.src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(csso())
    .pipe(rename("style.min.css"))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("build/css"))
    .pipe(server.stream());
});

gulp.task("server", function () {
  server.init({
    server: "build/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("source/sass/**/*.{scss,sass}", gulp.series("css")); 
  gulp.watch("source/*.html", gulp.series("html", "refresh"));
  gulp.watch('source/js/*.js', gulp.series('js', 'refresh'));
});

gulp.task("build", gulp.series(
  "clean",
  "copy",
  "css",
  "images",
  "webp",  
  "html"
));

gulp.task("start", gulp.series("build", "server"));

