$(function () {

	// 获取验证码按钮被点击的时候
	$('#getCodeBtn').on('tap', function () {
		// 获取修改密码验证码
		getCheckCode()
			// 输出验证码
			.then(printCode)
	});

	// 确认修改密码按钮被点击的时候
	$('#confirmModify').on('tap', function () {

		validateForm ()
			.then(sendModifyRequest)
			.then(renderModify)
			.catch(errorHandle)

	});

});

// 获取修改密码验证码
function getCheckCode () {
	return axios.get('/user/vCodeForUpdatePassword');
}

// 输出验证码
function printCode (data) {
	console.log(data);
}

// 验证表单信息
function validateForm () {

	return new Promise(function (resolve, reject) {

		// 获取表单信息
		var result = $('#modifyForm').serializeToJson();

		// 验证用户是否输入了原密码
		if (!$.trim(result.oldPassword)) {
			reject('请输入原密码');
		}

		// 验证两次密码输入的是否一致
		if (result.newPassword != result.confirmNewPass) {
			reject('密码两次输入的不一样');
		}

		// 将数据传递到下一个then中
		resolve(result);

	});

}

// 发送修改密码请求
function sendModifyRequest (result) {
	return axios.post('/user/updatePassword', result);
}

// 处理请求的结果
function renderModify (data) {
	return new Promise (function (resolve, reject) {
		if (data.success) {
			mui.toast('密码修改成功, 2秒后跳转到登录页面');
			setTimeout(function () {
				location.href = 'login.html';
			}, 2000)
			resolve(data);
		}else {
			reject(data.message);
		}
	});
}

// 错误处理
function errorHandle (error) {
	mui.toast(error);
}