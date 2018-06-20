$(function () {
  getUserInfo ()
    .then(renderUserInfo);
  $('#logOutBtn').on('tap', function () {
    logOut()
      .then(renderLogout)
  })
})
function getUserInfo () {
  return axios.get('/user/queryUserMessage');
}
function renderUserInfo (data) {
  return new Promise(function (resolve, reject) {
    var html = template('userTpl', data);
    $('#userBox').html(html);
    resolve(data);
  })
}
function logOut() {
  return axios.get('/user/logout');
}
function renderLogOut (data) {
  return new Promise(function (resolve, reject) {
    if (data, success) {
      mui.toast('退出成功，即将跳转网站首页');
      setTimeout(function () {
        location.href = 'index.html';
      }, 1000)
      resolve();
    } else {
      reject('退出失败');
    }
  })
}