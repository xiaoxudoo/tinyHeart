var dustObj = function(){
	this.x = [];
	this.y = [];
	this.amp = [];
	this.No = [];
	this.dustPic = [];
	this.alpha;
}
dustObj.prototype.num = 30;
dustObj.prototype.init = function(){
	for (var i = 0; i < this.num; i++) {
		this.x[i] = Math.random()*canWidth;
		this.y[i] = Math.random()*canHeight;
		this.amp[i] = 20 + Math.random()*25;
		this.No[i] = Math.floor(Math.random()*7);
	};
	for (var i = 0; i < 7; i++) {
		this.dustPic[i] = new Image();
		this.dustPic[i].src = "./img/dust"+i+".png";
	}
	this.alpha = 0;
}
dustObj.prototype.draw = function(){
	this.alpha += deltaTime * 0.0008;
	var l = Math.sin(this.alpha);
	for (var i = 0; i < this.num; i++) {
		var no = this.No[i];
		if (isNaN(this.amp[i])) {
			console.log('1');
		}
		ctx1.drawImage(this.dustPic[no],this.x[i]+this.amp[i]*l,this.y[i])
	};
}
