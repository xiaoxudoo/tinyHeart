var momObj = function(){
	this.x;
	this.y;
	this.angle;
	this.momTail = [];
	this.momEye = [];
	this.momBodyOra = [];
	this.momBodyBlue = [];

	this.momTailTimer = 0;
	this.momTailCount = 0;

	this.momEyeTimer = 0;
	this.momEyeCount = 0;
	this.momEyeInterval = 1000;

	this.momBodyCount=0;
}
//初始化
momObj.prototype.init = function(){
	this.x = canWidth * 0.5;
	this.y = canHeight * 0.5;
	this.angle = 0;
	for (var i = 0; i < 8; i++) {
		this.momTail[i] = new Image();
		this.momTail[i].src = "./img/bigTail"+i+".png";
	}
	for (var i = 0; i < 2; i++) {
		this.momEye[i] = new Image();
		this.momEye[i].src = "./img/bigEye"+i+".png";
	}
	for (var i = 0; i < 8; i++) {
		this.momBodyOra[i] = new Image();
		this.momBodyBlue[i] = new Image();
		this.momBodyOra[i].src = "./img/bigSwim"+i+".png";
		this.momBodyBlue[i].src = "./img/bigSwimBlue"+i+".png";
	}
}
//绘画
momObj.prototype.draw = function(){
	//与鼠标线性距离
	this.x = lerpDistance(mx, this.x, 0.96);
	this.y = lerpDistance(my, this.y, 0.96);
	//与鼠标的角度
	var deltaY = my - this.y;
	var deltaX = mx - this.x;
	var beta = Math.atan2(deltaY,deltaX) + Math.PI;//-PI,PI;

	this.momTailTimer += deltaTime;
	if(this.momTailTimer > 50){
		this.momTailCount = (this.momTailCount+1)%8; 
		this.momTailTimer %= 50;
	}

	this.momEyeTimer = this.momEyeTimer+deltaTime;
	if(this.momEyeTimer > this.momEyeInterval){
		this.momEyeCount = (this.momEyeCount+1)%2; 
		this.momEyeTimer %= this.momEyeInterval;
		if (this.momEyeCount == 0) {
			this.momEyeInterval = Math.random()*3500+ 2000;
		}else{
			this.momEyeInterval = 200;
		}
	}
	//与鼠标线性角度
	this.angle = lerpAngle(beta, this.angle, 0.6);
	//绘制
	ctx1.clearRect(0, 0, canWidth, canHeight);
	ctx1.save();
		ctx1.translate(this.x, this.y);
		ctx1.rotate(this.angle);
		var momTailCount = this.momTailCount;
		ctx1.drawImage(this.momTail[momTailCount], -this.momTail[momTailCount].width*0.5+30 , -this.momTail[momTailCount].height*0.5);
		var momBodyCount = this.momBodyCount;
		if (data.double == 1) {
			ctx1.drawImage(this.momBodyOra[momBodyCount], -this.momBodyOra[momBodyCount].width*0.5, -this.momBodyOra[momBodyCount].height*0.5);			
		}else{
			ctx1.drawImage(this.momBodyBlue[momBodyCount], -this.momBodyBlue[momBodyCount].width*0.5, -this.momBodyBlue[momBodyCount].height*0.5);
		}

		var momEyeCount = this.momEyeCount;
		ctx1.drawImage(this.momEye[momEyeCount], -this.momEye[momEyeCount].width*0.5, -this.momEye[momEyeCount].height*0.5);
	ctx1.restore();
};