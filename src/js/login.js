$(function () {
  $('#loginBtn').on('tap', function () {
    var result = $('#loginForm').serializeToJson();
    validateForm(result)
      .then(loginAjax)
      .then(renderLogin)
      .catch(errorHandle)
  })
})
function validateForm (result) {
  return new Promise(function (resolve, reject) {
    if (!$.trim(result.username)) {
      reject('请填写用户名');
    }
    if (!$.trim(result.password) || result.password.length < 6) {
      reject('请输入密码');
    }
    resolve(result);
  })
}
function loginAjax (result) {
  return axios.post('/user/login', result);
}
function renderLogin (data) {
  return new Promise (function (resolve, reject) {
    if (data.success) {
      mui.toast('登陆成功，即将跳转个人中心页面');
      setTimeout(function () {
        location.href = 'user.html';
      }, 1000)
    } else {
      reject(data.message)
    }
  })
}
function errorHandle (error) {
  mui.toast(error);
}