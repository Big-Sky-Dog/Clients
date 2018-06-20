$(function () {
  $('#searchBtn').on('tap', function () {
    var keyword = $.trim($('#search').val());
    if (keyword) {
      location.href = 'search-list.html?keyword=' + keyword;
    } else {
      mui.toast('请输入搜索关键字')
    }
  })
})