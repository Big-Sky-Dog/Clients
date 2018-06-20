/*
	1.创建项目根目录 mkdir gulp-demo
	2.生成项目描述文件 npm init -y
	3.下载gulp库文件 npm install gulp --save-dev
	4.在项目的根目录下建立gulpfile.js
	5.编写gulp任务
		1.引包
		2.编写任务
	6.下载gulp-cli命令行工具 npm install gulp-cli -g
	7.执行gulp任务 gulp 任务名称
*/

var gulp = require('gulp');
// css压缩
var csso = require('gulp-csso');
// 自动加css前缀
var autoprefixer = require('gulp-autoprefixer');
// js压缩
var uglify = require('gulp-uglify');
// html压缩
var htmlmin = require('gulp-htmlmin');
// 图片压缩
var imagemin = require('gulp-imagemin');
// 文件包含
var fileinclude = require('gulp-file-include');

// css构建任务
gulp.task('css', function () {

	gulp.src('./src/css/*.css')
		// 压缩CSS
		.pipe(csso())
		// 加浏览器前缀
		.pipe(autoprefixer())
		// gulp.dest() 将文件输出到指定的目录中
		.pipe(gulp.dest('./dist/css'));
});

// js构建任务
gulp.task('js', function () {
	gulp.src('./src/js/*.js')
		// .pipe(uglify())
		.pipe(gulp.dest('./dist/js'));
});

// 公共资源拷贝
gulp.task('assets', function () {
	gulp.src('./src/assets/**/*')
		.pipe(gulp.dest('./dist/assets'));
});

// 图片构建任务
gulp.task('images', function () {
	gulp.src('./src/images/*')
		.pipe(imagemin())
		.pipe(gulp.dest('./dist/images'))
})

// 构建HTML
// @@include('要包含的文件路径')
gulp.task('html', function () {
	gulp.src('./src/views/*.html')
		.pipe(fileinclude())
		.pipe(htmlmin({
			collapseWhitespace: true,
			minifyJS: true,
			minifyCSS: true,
			removeComments: true
		}))
		.pipe(gulp.dest('./dist'))
});

// 构建任务
gulp.task('build', ['css', 'js', 'html', 'assets', 'images']);

// 监控文件变化 自动构建任务
gulp.task('dev', ['build'], function () {
    gulp.watch('./src/views/**/*.html', ['html']);
    gulp.watch('./src/css/*.css', ['css']);
    gulp.watch('./src/js/*.js', ['js']);
});