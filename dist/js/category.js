$(function () {
  getFirstCategory()
    .then(renderCategoryFirst)
    //为什么要渲染
    .then(getSecondCategory)
    .then(renderSecondCategory)
    .catch(function (error) {
      mui.toast(error);
    })
  $('#categoryFirstBox').on('click', 'a', function () {
    var id = $(this).attr('data-id');
    $(this).addClass('active').siblings().removeClass('active');
    getSecondCategory(id)
      .then(renderSecondCategory)
      .catch(function (error) {
        mui.toast(error);
      })
  })
})
function getFirstCategory () {
  return axios.get('/category/queryTopCategory');
}
function renderCategoryFirst (data) {
  return new Promise(function(resolve, reject) {
    var html =  template('categoryFirst', data);
    $('#categoryFirstBox').html(html);
    if (data.rows.length > 0 ) {
      var id = data.rows[0].id;
      resolve(id);
    }
  })
  
}
function getSecondCategory (id) {
  return axios.get('/category/querySecondCategory', {
    params: {
      id: id
    }
  })
}
function renderSecondCategory (data) {
  return new Promise (function (resolve, reject) {
    var html = template('categorySecond', {
      list: data,
      api: axios.defaults.baseURL
    });
    $('#categorySecondBox').html(html);
    if (data.rows.length == 0) {
      reject('"1" > "2"')
    } else {
      resolve();
    }
  })
  
}