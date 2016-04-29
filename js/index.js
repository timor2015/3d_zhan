(function(){

var imgLength = 51;
var imgStr = '';
for (var i = 1; i < imgLength+1; i++) {
	imgStr += '<img data-src="./images/'+ i +'.png" src="###" style="display:none" />';
}
$('#car')[0].innerHTML += imgStr;
//$('#car ').attr('src', 'url(./images/1.png) cover 100% 100%');

for (var i = 2; i < 7; i++) {
	addImg(i);
}

for (var i = 0; i < 5; i++) {
	addImg( imgLength - i );
}




var touchOff = false;
$('#car').on('touchstart', function(e){
	clearInterval(look.timer);
	touchOff = true;
	pastPos = e.originalEvent.touches[0].pageX || e.originalEvent.changedTouches[0].pageX;
});
$('#car').on('touchend', function(){
	touchOff = false;
	if (timerOff) {
		timerOff = false;
		clearInterval(look.timer);
		setTimeout(function(){
			look.timer = setInterval(function(){
				changeImg(dir);
			}, 100);
			timerOff = true;
		}, 2000);
	}
});

$('#car').on('mousedown', function(e){
	clearInterval(look.timer);
	touchOff = true;
	pastPos = e.originalEvent.x || e.originalEvent.layerX || 0;
});
$('#car').on('mouseup', function(){
	touchOff = false;
	if (timerOff) {
		timerOff = false;
		clearInterval(look.timer);
		setTimeout(function(){
			look.timer = setInterval(function(){
				changeImg(dir);
			}, 100);
			timerOff = true;
		}, 2000);
	}
});



var nowPos = 0;
var pastPos = 0;
var iSwiperSpacing = 18;
var nowNum = 1;

$('#car').on('touchmove', function(e){
	e.preventDefault();
	nowPos = e.originalEvent.touches[0].pageX || e.originalEvent.changedTouches[0].pageX;
	if ( nowPos - pastPos >= iSwiperSpacing) {
		dir = 'left';
		pastPos = nowPos;
		changeImg(dir);
	}else if( nowPos - pastPos <= iSwiperSpacing*(-1)){
		dir = 'right';
		pastPos = nowPos;
		changeImg(dir);
	}	
});

$('#car').on('mousemove', function(e){
	e.preventDefault();
	if (touchOff) {
		nowPos = e.originalEvent.x || e.originalEvent.layerX || 0;
		if ( nowPos - pastPos >= iSwiperSpacing) {
			dir = 'left';
			pastPos = nowPos;
			changeImg(dir);
		}else if( nowPos - pastPos <= iSwiperSpacing*(-1)){
			dir = 'right';
			pastPos = nowPos;
			changeImg(dir);
		}	
	}	
});


var delayImg = 5;
function changeImg( dir ){
	var nextNum = 0;
	var nextAddImg = 0;
	if (dir == 'right') {
		nextNum = nowNum == 1 ? imgLength : nowNum - 1;
		nextAddImg = nowNum <= delayImg ? imgLength + nowNum - delayImg : nowNum - delayImg;
	}else{
		nextNum = nowNum == imgLength ? 1 : nowNum + 1;
		nextAddImg = nowNum >= imgLength - delayImg ? nowNum - imgLength + 1 + delayImg : nowNum + 1 + delayImg;
	}
	$('#car p img').attr('src', './images/'+ nextNum +'.png');
	nowNum = nextNum;
	addImg(nextAddImg);
}


function addImg($nth){
	var that = $('#car>img:nth-child('+$nth+')');
	that.attr('src', that.attr('data-src'));
	that.removeAttr("data-src");
}



var look = {
	timer : null,
}
var timerOff = true;
var dir = 'right';
look.timer = setInterval(function(){
	changeImg(dir);
}, 300);



})();