// type: work工作  study学习 sport运动  food饮食 mood心情 art艺术 other其他

var topicImagesNO = [0,1,2,3,4,5,5.1,6,7,8,8.1,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,43.1,43.2,44,46,47,48];
var topicImages = topicImagesNO.map(item=>{
	return "assets/topicImages/"+item+".png"
})

var defaultTopics=[
	{
		topicId:1,
		name:"读书",
		img: "assets/topicImages/11.png",
		description:"看一小时书"
	},
	{
		topicId:2,
		name:"运动",
		img: "assets/topicImages/21.png",
		description:"完成60个俯卧撑"
	},
	{
		topicId:3,
		name:"跑步",
		img: "assets/topicImages/27.png",
		description:"夜跑3公里"
	},
	{
		topicId:4,
		name:"戒烟",
		img: "assets/topicImages/47.png",
		description:"一天不抽烟"
	},
	{
		topicId:5,
		name:"聚餐",
		img: "assets/topicImages/40.png",
		description:"约朋友吃个火锅"
	},
]
