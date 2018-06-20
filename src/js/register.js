$(function () {
  $('#getRegisterCheckCode').on('tap', function () {
    validateMobile()
      .then(getCode)
      .then(printCode)
  })
  $('#registerBtn').on('tap', function () {
    validateForm ()
			.then(sendRegisterRequset)
			.then(renderRegister)
			.catch(errorHandle)
  })
})
function validateMobile () {
  return new Promise(function (resolve, reject) {
    var reg = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
    var result = $('#registerForm').serializeToJson();
    if (!reg.test(result.mobile)) {
      reject ('请输入正确的手机号');
    }
    resolve();
  })
}
function getCode () {
  return axios.get('/user/vCode');
}
function printCode (data) {
  console.log(data);
}
function validateForm () {
  return new Promise(function (resolve, reject) {
    var result = $('#registerForm').serializeToJson();
    var reg = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
    if (!reg.test(result.mobile)) {
      reject('请输入正确的手机号');
    }
    if (!$.trim(result.username)) {
      reject('请输入用户名');
    }
    if ($.trim(result.password).length < 6) {
      reject('密码格式有误');
    }
    if (result.password != result.confirmPass) {
      reject('两次密码不一致');
    }
    if (result.vCode.length != 6) {
      reject('请输入6位验证码');
    }
    resolve(result);
  })
}
function sendRegisterRequset (result) {
  return axios.post('/user/register', result)
}
function renderRegister (data) {
  return new Promise (function (resolve, reject) {
    if (data.success) {
      mui.toast('注册成功, 即将转到登录页面');
      setTimeout(function () {
				location.href = 'login.html';
			}, 1000);
			resolve();
    } else {
      reject(data.message);
    }
  })
}
function errorHandle (error) {
	mui.toast(error);
}