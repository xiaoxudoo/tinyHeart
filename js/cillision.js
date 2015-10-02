//判断大鱼和果实的距离
function momFruitsCollision(){
	for (var i = 0; i < fruit.num; i++) {
		if (fruit.alive[i]) {
			//大鱼和果实的距离
			var l = calLength2(fruit.x[i], fruit.y[i], mom.x, mom.y);
			
			if(l<900&&fruit.l[i]>14){
				fruit.dead(i);
			}
		};
	};
}