var gulp = require("gulp");
var server = require("gulp-live-server"); // Add gulp-live-server
var less = require("gulp-less");
var concat = require("gulp-concat");
var uglify = require("gulp-uglify");
var rename = require("gulp-rename");
var cleanCSS = require("gulp-clean-css");
var del = require("del");
var browserSync = require("browser-sync").create();
var pug = require("gulp-pug");
var sass = require("gulp-sass");
var sourcemaps = require("gulp-sourcemaps");
var autoprefixer = require("gulp-autoprefixer");
var minify = require("gulp-minify");
var imagemin = require("gulp-imagemin");
var cache = require("gulp-cache");
var cached = require("gulp-cached");
var runSequence = require("run-sequence");
var plumber = require("gulp-plumber");
var notify = require("gulp-notify");
var streamqueue = require("streamqueue");
const changed = require("gulp-changed");
var pugInheritance = require("gulp-pug-inheritance");
var gulpif = require("gulp-if");
var extender = require("gulp-html-extend");

// npm install gulp-pug gulp-sass gulp-sourcemaps gulp-autoprefixer gulp-minify gulp-imagemin gulp-cache gulp-plumber gulp-notify  --save-dev

// gulp.task('watch', function () {
//   gulp.watch('src/*.scss', gulp.series('sass'));
// });

// gulp.task('sass', function () {
//   return gulp.src('src/*.scss')
//     .pipe(sass())
//     .pipe(gulp.dest('dist/css'));
// });

var paths = {
  html: {
    src: ["app/html/*.html", "app/html/**/*.html"],
    dest: "dist/",
  },
  styles: {
    src: "app/scss/main.scss",
    srcFontawesome: [
      "app/fonts/fontawesome-pro/scss/fontawesome.scss",
      "app/fonts/fontawesome-pro/scss/fontawesome.scss",
      "app/fonts/fontawesome-pro/scss/light.scss",
      "app/fonts/fontawesome-pro/scss/regular.scss",
      "app/fonts/fontawesome-pro/scss/brands.scss",
    ],
    watch: "app/scss/**/*.scss",
    dest: "dist/css/",
  },
  scripts: {
    src: "app/js/[main-]*.js",
    srcAddon: ["app/js/*.js", "!app/js/[main-]*.js"],
    dest: "dist/js/",
  },
  images: {
    src: "app/imgs/**/*.+(png|jpg|jpeg|gif|svg|ico)",
    dest: "dist/imgs/",
  },
  assets: {
    srcFonts: "app/fonts/**/*",
    distFonts: "dist/fonts/",
    srcPlugins: "app/plugins/**/*",
    distPlugins: "dist/plugins/",
    srcIcons: "app/icons/**/*",
    distIcons: "dist/icons/",
  },
};

function clean() {
  return del(["dist/"]);
}

function html() {
  return (
    gulp
      .src(paths.html.src)
      .pipe(
        plumber({
          errorHandler: function (err) {
            notify.onError({
              title: "Gulp error in " + err.plugin,
              message: err.toString(),
            })(err);
          },
        })
      )
      .pipe(extender({ annotations: true, verbose: false }))
      .pipe(gulp.dest(paths.html.dest))
  );
}

function styles() {
  return (
    gulp
      .src(paths.styles.src)
      .pipe(sourcemaps.init())
      .pipe(
        plumber({
          errorHandler: function (err) {
            notify.onError({
              title: "Gulp error in " + err.plugin,
              message: err.toString(),
            })(err);
          },
        })
      )
      .pipe(sass({ outputStyle: "compressed" }))
      .pipe(autoprefixer())
      .pipe(concat("main.min.css"))
      .pipe(sourcemaps.write("."))
      .pipe(gulp.dest(paths.styles.dest))
      .pipe(notify("sass task done!"))
      .pipe(browserSync.stream())
  );
}

function fontawesome() {
  return (
    gulp
      .src(paths.styles.srcFontawesome)
      .pipe(sourcemaps.init())
      .pipe(
        plumber({
          errorHandler: function (err) {
            notify.onError({
              title: "Gulp error in " + err.plugin,
              message: err.toString(),
            })(err);
          },
        })
      )
      .pipe(sass({ outputStyle: "compressed" }))
      .pipe(autoprefixer())
      .pipe(concat("fontawesome.min.css"))
      .pipe(sourcemaps.write("."))
      .pipe(gulp.dest(paths.styles.dest))
      .pipe(notify("sass task done!"))
      .pipe(browserSync.stream())
  );
}

function scripts() {
  return streamqueue({ objectMode: true }, gulp.src(paths.scripts.src))
    .pipe(sourcemaps.init())
    .pipe(
      plumber({
        errorHandler: function (err) {
          notify.onError({
            title: "Gulp error in " + err.plugin,
            message: err.toString(),
          })(err);
        },
      })
    )
    .pipe(concat("app.js"))
    .pipe(
      minify({
        ext: {
          min: ".min.js",
        },
        noSource: true,
      })
    )

    .pipe(gulp.dest(paths.scripts.dest));
}

function cleanJs() {
  return del(["dist/js/**/*.js", "dist/js/**/*.min.js", "dist/js/**/*.map"]);
}

function copyFonts() {
  return gulp.src(paths.assets.srcFonts).pipe(gulp.dest(paths.assets.distFonts));
}

function copyIcons() {
  return gulp.src(paths.assets.srcIcons).pipe(gulp.dest(paths.assets.distIcons));
}

function copyPlugins() {
  return gulp.src(paths.assets.srcPlugins).pipe(gulp.dest(paths.assets.distPlugins));
}

function images() {
  return gulp
    .src(paths.images.src)
    .pipe(
      plumber({
        errorHandler: function (err) {
          notify.onError({
            title: "Gulp error in " + err.plugin,
            message: err.toString(),
          })(err);
        },
      })
    )
    .pipe(gulp.dest(paths.images.dest));
}

function browserSyncReload(done) {
  browserSync.reload();
  done();
}

function watchTask() {
  browserSync.init({
    server: "./dist",
  });

  gulp.watch(paths.html.src, gulp.series(html, browserSyncReload));
  gulp.watch(paths.styles.watch, styles);
  gulp.watch(paths.scripts.src, scripts);
  gulp.watch(paths.images.src, images);
  gulp.watch(paths.assets.srcFonts, copyFonts);
}

function startServer() {
  var liveServer = server.new(["server.js"]); // Adjust the path to your app.min.js file
  liveServer.start();
}

var build = gulp.series(
  clean,
  gulp.parallel(html, styles, fontawesome, scripts, images, copyFonts, copyIcons, copyPlugins),
  gulp.parallel(startServer, watchTask)
);

exports.clean = clean;
exports.html = html;
exports.styles = styles;
exports.fontawesome = fontawesome;
exports.scripts = scripts;
exports.images = images;
exports.copyFonts = copyFonts;
exports.copyIcons = copyIcons;
exports.copyPlugins = copyPlugins;
exports.browserSyncReload = browserSyncReload;
exports.watchTask = watchTask;
exports.startServer = startServer;
exports.build = build;
exports.default = build;
