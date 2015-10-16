//全局变量
//--------------------------------------------------------------------------
var can1;//画布1
var ctx1;
var can2;//画布2，负责背景，珊瑚，果实
var ctx2;
var canWidth;//画布的长和宽
var canHeight;
var lastTime=Date.now();//记录时间
var deltaTime=0;//记录一帧的时间
var bgPic = new Image();//背景图
var ane;//珊瑚
var fruit;//果实
var mom;//大鱼
var baby;//小鱼
var mx;//鼠标x，y坐标
var my;
var data;
var wave;
var halo;
var dust;

var babyTail = [];
var babyEye = [];
var babyBoby = [];

var momTail = [];
var momEye = [];
var momBodyOra = [];
var momBodyBlue = [];

var dustPic = [];


//窗口加载完后开始游戏函数
//--------------------------------------------------------------------------
window.onload = game;
function game(){
	init();//初始化
	lasTime = Date.now();//记录时间
	deltaTime = 0;
	gameloop();
}

//初始化
//--------------------------------------------------------------------------
function init(){
	//获得canvas context 宽高
	can1 = document.getElementById('canvas1');//fishes，dust，UI，circle
	ctx1 = can1.getContext('2d');
	can2 = document.getElementById('canvas2');//background，ane，fruits
	ctx2 = can2.getContext('2d');
	canWidth = can1.width;
	canHeight = can1.height;
	can1.addEventListener('mousemove', onMouseMove, false);	
	//设置背景
	bgPic.src = './img/background.jpg';
	//定义珊瑚对象
	ane = new aneObj();
	ane.init();
	//定义果实对象
	fruit = new fruitObj();
	fruit.init();
	//定义大鱼对象
	mom = new momObj();
	mom.init();
	//定义小鱼鱼对象
	baby = new babyObj();
	baby.init();
	//初始鼠标坐标
	mx = canWidth*0.5;
	my = canHeight*0.5;

	data = new dataObj();
	wave = new waveObj();
	wave.init();
	halo = new haloObj();
	halo .init();
	dust = new dustObj();
	dust.init();

	for (var i = 0; i < 8; i++) {
		babyTail[i] = new Image();
		babyTail[i].src = "./img/babyTail"+i+".png";
	}
	for (var i = 0; i < 2; i++) {
		babyEye[i] = new Image();
		babyEye[i].src = "./img/babyEye"+i+".png";
	}
	for (var i = 0; i < 20; i++) {
		babyBoby[i] = new Image();
		babyBoby[i].src = "./img/babyFade"+i+".png";
	}
	for (var i = 0; i < 8; i++) {
		momTail[i] = new Image();
		momTail[i].src = "./img/bigTail"+i+".png";
	}
	for (var i = 0; i < 2; i++) {
		momEye[i] = new Image();
		momEye[i].src = "./img/bigEye"+i+".png";
	}
	for (var i = 0; i < 8; i++) {
		momBodyOra[i] = new Image();
		momBodyBlue[i] = new Image();
		momBodyOra[i].src = "./img/bigSwim"+i+".png";
		momBodyBlue[i].src = "./img/bigSwimBlue"+i+".png";
	}
	for (var i = 0; i < 7; i++) {
		dustPic[i] = new Image();
		dustPic[i].src = "./img/dust"+i+".png";
	}
	ctx1.font = "20px Verdana";
	ctx1.textAlign = "center";
}

//循环执行
//--------------------------------------------------------------------------
function gameloop(){
	//自动每帧执行一次
	window.requestAnimFrame(gameloop);
	//获取帧间隔时间，若过大于50ms就取50ms
	var now = Date.now();
	deltaTime = now - lastTime;
	lastTime = now;
	if (deltaTime>50) {
		deltaTime = 50;
	};
	//绘画背景
	drawBackground();
	//绘画珊瑚
	ane.draw();
	//检测果实，保证果实在一定数量
	fruitMonitor();
	//绘画果实
	fruit.draw();
	//绘画大鱼
	mom.draw();
	//绘画小鱼
	baby.draw();
	//大鱼和果实的碰撞检测
	momFruitsCollision();
	momBabyCollision();

	data.draw();
	wave.draw();
	halo.draw();
	dust.draw();
}
//获取鼠标坐标
function onMouseMove(e){
	if (!data.gameOver) {
		if (e.offSetX || e.layerX) {
			mx = e.offSetX == undefined ? e.layerX : e.offSetX;
			my = e.offSetY == undefined ? e.layerY : e.offSetY;
		}
	}
}