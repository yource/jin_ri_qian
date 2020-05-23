var $ = Dom7;

// 日期格式化
Date.prototype.format = function(fmt) {
	var o = {
		"M+": this.getMonth() + 1,
		"d+": this.getDate(),
		"h+": this.getHours(),
		"m+": this.getMinutes(),
		"s+": this.getSeconds(),
		"q+": Math.floor((this.getMonth() + 3) / 3),
		"S": this.getMilliseconds()
	};
	if (/(y+)/.test(fmt)) {
		fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	}
	for (var k in o) {
		if (new RegExp("(" + k + ")").test(fmt)) {
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
		}
	}
	return fmt;
}

// 密码锁 初始化
var needPassword = window.localStorage.getItem("needPassword");
if (!needPassword) {
	needPassword = "false";
	window.localStorage.setItem("needPassword", needPassword);
}
var password = window.localStorage.getItem("password");
if (!password) {
	password = false;
}

// 颜色主题 初始化
var theme = window.localStorage.getItem("theme");
if (!theme) {
	theme = "theme color-theme-red";
	window.localStorage.setItem("theme", theme);
}
$("body").addClass(theme);

// 主题集 初始化
var topics = window.localStorage.getItem("topics");
if (topics) {
	topics = JSON.parse(topics);
} else {
	topics = defaultTopics;
	window.localStorage.setItem("topics", JSON.stringify(topics));
}

// 历史日签以及今日状态
/**
	topicHistoryList: {
		"2020-05-18": {
			name: "微笑",
			img: "assets/topicImages/zaoshui.png",
			description: "保持良好心态，微笑面对生活",
			done: false,
			note: "今天做的很好，开心，要继续保持～～～",
			startTime: "2020-05-18 18:20:00",
			endTime: "2020-05-18 18:20:00"
		}
	}
 */
var clocks = window.localStorage.getItem("clocks");
if (clocks) {
	clocks = JSON.parse(clocks);
} else {
	clocks = [];
}

var curTopic={};
var curClock={};
var app = new Framework7({
	root: '#app',
	id: 'com.jinriqian.yource',
	name: 'jinriqian',
	view: {
		iosDynamicNavbar: false,
		mdSwipeBack: true
	},
	sheet: {
		closeByBackdropClick: true,
		backdrop: true
	},
	dialog: {
		buttonOk: "确定",
		buttonCancel: "取消"
	},
	data: function() {
		return {
			theme: theme,
			topics: topics,
			clocks: clocks,
			needPassword: needPassword == "true",
			password: password
		};
	},
	methods: {
		helloWorld: function() {
			app.dialog.alert('Hello World!');
		},
	},
	routes: routes,
	input: {
		scrollIntoViewOnFocus: Framework7.device.cordova && !Framework7.device.electron,
		scrollIntoViewCentered: Framework7.device.cordova && !Framework7.device.electron,
	},
	statusbar: {
		iosOverlaysWebView: true,
		androidOverlaysWebView: false,
		iosTextColor: "white"
	},
	on: {
		routeChange(route){
			// 控制tab显示
			if (route.path == "/" || route.path == "/clock/" || route.path == "/topics/" || route.path == "/settings/") {
				$("#mainbar").removeClass("hideBar");
				app.toolbar.show("#mainbar");
			} else {
				$("#mainbar").addClass("hideBar");
				app.toolbar.hide("#mainbar");
			}
		},
		init: function() {
			var f7 = this;
			if (f7.device.cordova) {
				cordovaApp.init(f7);
			} else {
				window.navigator.notification = {
					alert: function(content, cb, title) {
						alert(content, cb || undefined, title || "提示")
					},
					confirm: function(message, cb, title) {
						confirm(message, cb || undefined, title || "提示")
					}
				}
			};
			this.showTip = function(content, type, time) {
				var icon;
				var defaulttime = 2000;
				switch(type){
					case "success":
						icon = '<i class="f7-icons">checkmark_alt</i>';
						defaulttime = 1200;
						break;
					case "error":
						icon = '<i class="f7-icons">xmark_circle</i>';
						break;
					default:
						icon = undefined;
				}

				app.toast.show({
					position: "center",
					closeTimeout: time || defaulttime,
					icon: icon,
					text: content
				});
			};
			this.showTopTip = function(content, style, time) {
				app.toast.show({
					position: "top",
					closeTimeout: time || 2000,
					text: content,
					cssClass: style || "default"
				});
			};
			$("#passwordCover .button").click(function() {
				if ($("#passwordCover input").val() == app.data.password) {
					app.passwordCover.close();
				} else {
					app.showTopTip("密码错误");
				}
			});
		},
	},
});
