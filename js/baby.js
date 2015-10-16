var babyObj = function(){
	this.x;
	this.y;
	this.angle;

	this.babyTail = [];
	this.babyTailTimer = 0;
	this.babyTailCount = 0;

	this.babyEye = [];
	this.babyEyeTimer = 0;
	this.babyEyeCount = 0;
	this.babyEyeInterval = 1000;

	this.babyBoby = [];
	this.babyBodyTimer = 0;
	this.babyBodyCount = 0;

}
//初始化
babyObj.prototype.init = function(){
	this.x = canWidth*0.5 - 50;
	this.y = canHeight*0.5 + 50;
	this.angle = 0;
	for (var i = 0; i < 8; i++) {
		this.babyTail[i] = new Image();
		this.babyTail[i].src = "./img/babyTail"+i+".png";
	}
	for (var i = 0; i < 2; i++) {
		this.babyEye[i] = new Image();
		this.babyEye[i].src = "./img/babyEye"+i+".png";
	}
	for (var i = 0; i < 20; i++) {
		this.babyBoby[i] = new Image();
		this.babyBoby[i].src = "./img/babyFade"+i+".png";
	}
}
//绘画
babyObj.prototype.draw = function(){
	//与大鱼线性距离
	this.x = lerpDistance(mom.x, this.x, 0.96);
	this.y = lerpDistance(mom.y, this.y, 0.96);
	//与大鱼的角度
	var deltaY = mom.y - this.y;
	var deltaX = mom.x - this.x;
	var beta = Math.atan2(deltaY,deltaX) + Math.PI;//-PI,PI;
	//与大鱼线性角度
	this.angle = lerpAngle(beta, this.angle, 0.6);
	//baby tail count
	this.babyTailTimer += deltaTime;
	if(this.babyTailTimer > 50){
		this.babyTailCount =0; //(this.babyTailCount+1)%8; 
		this.babyTailTimer %= 50;
	}
	//baby eye
	this.babyEyeTimer = this.babyEyeTimer+deltaTime;
	if(this.babyEyeTimer > this.babyEyeInterval){
		this.babyEyeCount = (this.babyEyeCount+1)%2; 
		this.babyEyeTimer %= this.babyEyeInterval;
		if (this.babyEyeCount == 0) {
			this.babyEyeInterval = Math.random()*1500+ 2000;
		}else{
			this.babyEyeInterval = 200;
		}
	}
	//baby body
	this.babyBodyTimer = this.babyBodyTimer+deltaTime;
	if(this.babyBodyTimer > 300){
		this.babyBodyCount = this.babyBodyCount+1; 
		this.babyBodyTimer %= 300;
		if (this.babyBodyCount > 19) {
			this.babyBodyCount = 19;
			data.gameOver = true;
		}
	}
	//绘画
	ctx1.save();
		ctx1.translate(this.x,this.y);
		ctx1.rotate(this.angle);

		var babyTailCount = this.babyTailCount;
		ctx1.drawImage(this.babyTail[babyTailCount], -this.babyTail[babyTailCount].width*0.5+23, -this.babyTail[babyTailCount].height*0.5);

		var babyBodyCount = this.babyBodyCount;
		ctx1.drawImage(this.babyBoby[babyBodyCount], -this.babyBoby[babyBodyCount].width*0.5, -this.babyBoby[babyBodyCount].height*0.5);
		
		var babyEyeCount = this.babyEyeCount;
		ctx1.drawImage(this.babyEye[babyEyeCount], -this.babyEye[babyEyeCount].width*0.5, -this.babyEye[babyEyeCount].height*0.5);
	ctx1.restore();
}