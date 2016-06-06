// Modulos gulp
var gulp = require("gulp"),
    clean = require("gulp-clean"),
    autoprefixer = require("gulp-autoprefixer"),
    usemin = require("gulp-usemin"),
    cssmin = require("gulp-cssmin"),
    uglify = require("gulp-uglify"),
    imagemin = require("gulp-imagemin"),
    browserSync = require('browser-sync');


// Configuracoes de caminho
var caminhoOrigem = "src";
var caminhoDestino = "dist";


// Tarefa padrao
gulp.task('otimizar', ['copy'], function() {
	gulp.start('build-img', 'copy-libs',  'build-usemin');
});

// Cria e limpa diretorio raiz
gulp.task("copy", ["clean"], function(){
    var dirRaiz = gulp.src(" ")
                      .pipe(gulp.dest(caminhoDestino));

    // COLOCAR QUANDO TIVER FAVICON
    // var dirFavicon = gulp.src("src/favicon/*")
    //                      .pipe(gulp.dest(caminhoDestino + "/favicon"));

    return dirRaiz;
    // return dirRaiz, dirFavicon;
});

// Limpa o diretorio
gulp.task("clean", function(){
    return gulp.src(caminhoDestino)
               .pipe(clean());
});

// Otimiza imagens
gulp.task("build-img", function(){
    return gulp.src(caminhoOrigem + "/img/**/*")
               .pipe(imagemin())
               .pipe(gulp.dest(caminhoDestino + "/img"));
});

// Copia blibotecas
gulp.task("copy-libs", function(){
    var libFonts = gulp.src(caminhoOrigem + '/fonts/**/*')
                       .pipe(gulp.dest(caminhoDestino + '/fonts'));
   return libFonts;
});

// Minifica e concatena
gulp.task("build-usemin", function(){
    var build = gulp.src(caminhoOrigem + '/**/*.html')
                     .pipe(usemin({
                          js: [uglify],
                          css: [autoprefixer, cssmin]
                     }))
                    .pipe(gulp.dest(caminhoDestino));
    return build;
});

// Starta Servidor
gulp.task('server', function(){
    browserSync.init({
        server: {
            baseDir: caminhoOrigem
        }
    });

    gulp.watch(caminhoOrigem + '/**/*').on('change', browserSync.reload);
});
