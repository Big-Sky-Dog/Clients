$(function(){
	mui('.mui-scroll-wrapper').scroll({
		deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
	});
	$('body').on('tap', 'a', function () {
		var flag = $(this).attr('needLogin');
		var This = $(this);
		if (flag == 1) {
			axios.get('/user/queryUserMessage')
				.then(function (data) {
					if (data.error) {
						location.href = 'login.html';
					} else {
						location.href = This.attr('href');
					}
				})
		} else {
			location.href = $(this).attr('href');
		}
	})
})
axios.defaults.baseURL = 'http://fullstack.net.cn:3000';
axios.defaults.withCredentials = true;
axios.interceptors.response.use(function (response) {
	return response.data;
}, function (error) {
	return Promise.reject(error);
})
$.fn.serializeToJson = function () {
	var formAry = this.serializeArray();
	var result = {};
	formAry.forEach(function (item) {
		result[item.name] = item.value;
	})
	return result;
}
function getUrlParams (name) {
	var search = location.search.slice(1);
	var ary1 = search.split('&');
	for (var i = 0; i < ary1.length; i++) {
		var ary2 = ary1[i].split('=');
		if (ary2[0] == name) {
			return ary2[1];
		}
	}
	return -1;
}