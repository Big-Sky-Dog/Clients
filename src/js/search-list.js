var keyword = getUrlParams('keyword');//获取地址栏信息
var page = 1;
var pageSize = 4;
$(function () {
  mui.init({
    pullRefresh: {
      container: '#refresh',
      up: {
        height: 50,
        auto: true,
        contentrefresh: '正在加载...',
        contentnomore: '没有更多数据了',
        callback: getData
      }
    }
  })
})
function getData () {
  var This = this;
  axios.get('/product/queryProduct', {
    params: {
      proName: keyword,
      page: page,
      pageSize: pageSize
    }
  }).then(function (data) {
    var html = HTMLTemplateElement('productTpl', {
      list: data,
      api: axios.defaults.baseURL
    });
    $('#productBox').append(html);
    page++;
    if (page * pageSize > data.count) {
      This.endPullupToRefresh(true);
    } else {
      This.endPullupToRefresh(false);
    }
  })
}