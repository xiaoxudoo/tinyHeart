var babyObj = function(){
	this.x;
	this.y;
	this.angle;
	this.babyEye = new Image();
	this.babyBody = new Image();
	this.babyTail = new Image();

	this.babyTailTimer = 0;
	this.babyTailCount = 0;

	this.babyEyeTimer = 0;
	this.babyEyeCount = 0;
	this.babyEyeInterval = 1000;

	this.babyBodyTimer = 0;
	this.babyBodyCount = 0;
}
//初始化
babyObj.prototype.init = function(){
	this.x = canWidth*0.5 - 50;
	this.y = canHeight*0.5 + 50;
	this.angle = 0;
	this.babyEye.src = './img/babyEye0.png';
	this.babyBody.src = './img/babyFade0.png';
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
		ctx1.drawImage(babyTail[babyTailCount], -babyTail[babyTailCount].width*0.5+23, -babyTail[babyTailCount].height*0.5);

		var babyBodyCount = this.babyBodyCount;
		ctx1.drawImage(babyBoby[babyBodyCount], -babyBoby[babyBodyCount].width*0.5, -babyBoby[babyBodyCount].height*0.5);
		
		var babyEyeCount = this.babyEyeCount;
		ctx1.drawImage(babyEye[babyEyeCount], -babyEye[babyEyeCount].width*0.5, -babyEye[babyEyeCount].height*0.5);
	ctx1.restore();
}