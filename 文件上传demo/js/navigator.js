if (navigator.userAgent.toUpperCase().match('MSIE 5')) {
	alert('请升级ie浏览器（最低兼容ie9），推荐使用谷歌、火狐、360极速浏览器！');
	window.location.href = '404.html';
} else if (navigator.userAgent.toUpperCase().match('MSIE 6')) {
	alert('请升级ie浏览器（最低兼容ie9），推荐使用谷歌、火狐、360极速浏览器！');
	window.location.href = '404.html';
} else if (navigator.userAgent.toUpperCase().match('MSIE 7')) {
	alert('请升级ie浏览器（最低兼容ie9），推荐使用谷歌、火狐、360极速浏览器！');
	window.location.href = '404.html';
} else if (navigator.userAgent.toUpperCase().match('MSIE 8')) {
	alert('当前浏览器为ie8，已自动切回旧版！');
	window.location.href = window.localStorage.getItem('oldAdd') + '&old=loadold';
} else if (navigator.userAgent.toUpperCase().match('MSIE') && !localStorage.getItem('browser')) {
	alert('推荐使用谷歌、火狐、360极速浏览器！');
	localStorage.setItem('browser', true);
}
if ((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
    document.getElementById('self').style.width = '100%';
}