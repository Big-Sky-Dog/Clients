$(function () {
  requestAddr()
    .then(renderAddr)
    .catch(errorHandle)
  $('#addrBox').on('tap', '.delBtn', function () {
    var id = $(this).attr('addr-id');
    window.elem = $(this).parents('li');
    mui.confirm('您确定删除么', function (data) {
      if (data.index == 0) {

      } else {
        removeAddrRequest(id)
          .then(renderDelAddr)
          .catch(function (error) {
            mui.toast('删除失败');
          })
      }
    })
  })
})
function requestAddr () {
  return axios.get('/address/queryAddress');
}
function renderAddr (data) {
  return new Promise(function (resolve, reject) {
    if (data.length > 0) {
      var html = template('addrTpl', {
        list: data
      });
      $('#addrBox').html(html);
      resolve(data);
    } else {
      reject('请添加收货地址')
    }
  })
}
function errorHandle (error) {
  mui.toast(error)
}
function removeAddrRequest (id) {
  return axios.post('address/deleteAddress', {id: id});
}
function renderDelAddr (data) {
  return new Promise (function (resolve, reject) {
    if (data.success) {
      mui.toast('删除成功');
      window.elem.remove();
    } else {
      reject(data.message);
    }
  })
}