// Modulos gulp
var gulp = require('gulp'),
    gulpclean = require('gulp-clean');
    gulpif = require('gulp-if'),
    sprity = require('sprity');

// Tarefa padrao
gulp.task('otimizar', ['copy'], function() {
	gulp.start('build-img', 'copy-libs',  'build-usemin');
});

gulp.task('sprite', ['criar'], function(){
    return sprity.src({
                        src: 'src/img/**/*.{png,jpg}',
                        style: 'src/css/estilo.css',
                        cssPath: '../img/',
                        prefix: 'buceta',
                    })
                    .pipe(gulpif('*.png', gulp.dest('./dist/img/'), gulp.dest('./dist/css/')));
});

gulp.task('criar', ['clean'],function(){
    return gulp.src(' ')
               .pipe(gulp.dest('dist'));
});

gulp.task('clean',function(){
    return gulp.src('dist')
                .pipe(gulpclean());
});
