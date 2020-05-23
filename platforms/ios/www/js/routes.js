var transition_opt = {
	transition: (window.navigator.userAgent.toLocaleLowerCase().indexOf("android")>-1)?"f7-parallax":""
}

var routes = [{
		path: '/',
		url: './index.html',
	},
	{
		path: '/today/',
		componentUrl: './pages/today.html',
	},
	{
		path: '/history/',
		componentUrl: './pages/history.html',
	},
	{
		path: '/topics/',
		componentUrl: './pages/topics.html',
		routes:[{
			path:'editTopic/',
			componentUrl:'./pages/editTopic.html',
			options: transition_opt
		},{
			path:'addTopic/',
			componentUrl:'./pages/addTopic.html',
			options: transition_opt
		}]
	},
	{
		path: '/clock/',
		componentUrl: './pages/clock.html',
		routes:[{
			path:'editClock/',
			componentUrl:'./pages/editClock.html',
			options: transition_opt
		}]
	},
	{
		path: '/settings/',
		componentUrl: './pages/settings.html',
		routes: [{
				path: 'setColor/',
				componentUrl: './pages/setColor.html',
				options: transition_opt
			},
			{
				path: 'feedback/',
				componentUrl: './pages/feedback.html',
				options: transition_opt
			},
			{
				path: 'setPassword/',
				componentUrl: './pages/setPassword.html',
				options: transition_opt,
				routes:[{
					path: 'editPassword/',
					componentUrl: './pages/editPassword.html',
					options: transition_opt
				}]
			},
		]
	},
	{
		path: '/chooseTopic/:topicId',
		componentUrl: './pages/chooseTopic.html',
	},
	{
		path: '(.*)',
		url: './pages/404.html',
	},
];
