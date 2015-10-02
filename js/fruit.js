var fruitObj = function(){
	this.alive = []; //bool
	this.x = [];//横坐标
	this.y = [];//纵坐标
	this.l = [];//大小
	this.speed = [];//速度
	this.fruitType = []; //果实类型
	this.orange = new Image();
	this.blue = new Image();
}
fruitObj.prototype.num = 30;//最大数量
//初始化
fruitObj.prototype.init = function(){
	for (var i = 0; i < this.num; i++) {
		this.alive[i] = false;
		this.x[i] = 0;
		this.y[i] = 0;
		this.l[i] = 0;
		this.speed[i] = Math.random() * 0.017 + 0.003; //[0.003,0.02)
		this.fruitType[i] = '';
	}
	this.orange.src = './img/fruit.png';
	this.blue.src = './img/blue.png'; 
}
//绘画
fruitObj.prototype.draw = function(){
	for (var i = 0; i < this.num; i++) {
		if (this.fruitType[i] == 'blue') {
			var pic = this.blue;
		}else{
			var pic = this.orange;
		}		
		if (this.alive[i]) {
			if (this.l[i]<=14) {
				this.l[i] += this.speed[i]*deltaTime;//长大
			}else{
				this.y[i] -= this.speed[i]*7*deltaTime;//上升
			}
			ctx2.drawImage(pic, this.x[i]-this.l[i]*0.5, this.y[i]-this.l[i]*0.5, this.l[i], this.l[i]);
			if (this.y[i]<-10) {
				this.alive[i] = false;//飞出屏幕后回收
			}
		}
	}
}
//生成果实
fruitObj.prototype.born = function(i){
	//生成在哪个珊瑚上
	var aneID = Math.floor(Math.random()*ane.num);
	this.x[i] = ane.x[aneID];
	this.y[i] = canHeight-ane.len[aneID];
	this.l[i] = 0;
	this.alive[i] = true;
	//随机种类
	var ran = Math.random();
	if (ran<0.2) {
		this.fruitType[i] = 'blue';
	}else{
		this.fruitType[i] = 'orange';
	}
}
//果实被吃掉
fruitObj.prototype.dead = function(i){
	this.alive[i] = false;
}
//果实数量检测
function fruitMonitor(){
	var num=0;
	//记录屏幕内果实数量
	for (var i = 0; i < fruit.num; i++) {
		if (fruit.alive[i]) {
			num++;
		}
	}
	//少于15个就生成果实
	if (num<15) {
		//send fruit;
		sendFruit();
		return;
	}
}
//生成果实
function sendFruit(){
	for (var i = 0; i < fruit.num; i++) {
		if (!fruit.alive[i]) {
			fruit.born(i);
			return;
		}
	}
}