(function ($) {
	$.fn.extend({
		tm3d : function(options){
			
			// 可选的参数			
			var opts_default = {
				'ele' : $(this),
				'imgLength' : 48,
				'autoplay' : true,
				'imgPath' : './images/',
				'imgtype' : 'png',
				'auto' : {
					imgtime : 300,
					dir : 'right',
					delaytime : 3000,
				}
			}

			// 选入的参数或默认的
			var opts = $.extend(opts_default, options);

			var tmPara = {
				'imgStr' : '',
				'loadImgNum' : 5,
				'touchOff' : false,
				'timer' : null,
				'nowPos' : 0,
				'pastPos' : 0,
				'dir' : 'left',
				'iSwiperSpacing' : 18,
				'nowNum' : 1,
				'timerOff' : true,
			}

			tmPara.dir = opts.auto.dir;

			// 页面载入时的初始化操作
			for (var i = 1; i < opts.imgLength+1; i++) {
				tmPara.imgStr += '<img data-src="'+ opts.imgPath + i +'.'+ opts.imgtype + '" src="###" style="display:none" />';
			}
			// 把img标签放到目标的下面
			opts.ele[0].innerHTML += tmPara.imgStr;

			// 先载入的图片数量
			for (var i = 2; i < tmPara.loadImgNum+2; i++) {
				addImg(i);
			}
			for (var i = 0; i < tmPara.loadImgNum; i++) {
				addImg( opts.imgLength - i );
			}

			// 添加touch和鼠标事件
			opts.ele.on('touchstart', function(e){
				clearInterval(tmPara.timer);
				tmPara.touchOff = true;
				tmPara.pastPos = e.originalEvent.touches[0].pageX || e.originalEvent.changedTouches[0].pageX;
			});
			opts.ele.on('touchend', function(){
				tmPara.touchOff = false;
				if (opts.autoplay) {
					if (tmPara.timerOff) {
						tmPara.timerOff = false;
						clearInterval(tmPara.timer);
						setTimeout(function(){
							tmPara.timer = setInterval(function(){
								changeImg(tmPara.dir);
							}, opts.auto.imgtime);
							tmPara.timerOff = true;
						}, opts.auto.delaytime);
					}
				}
			});

			opts.ele.on('mousedown', function(e){
				clearInterval(tmPara.timer);
				tmPara.touchOff = true;
				tmPara.pastPos = e.originalEvent.x || e.originalEvent.layerX || 0;
			});

			opts.ele.on('mouseup', function(){
				tmPara.touchOff = false;
				if (opts.autoplay) {
					if (tmPara.timerOff) {
						tmPara.timerOff = false;
						clearInterval(tmPara.timer);
						setTimeout(function(){
							tmPara.timer = setInterval(function(){
								changeImg(tmPara.dir);
							}, opts.auto.imgtime);
							tmPara.timerOff = true;
						}, opts.auto.delaytime);
					}
				}
			});

			opts.ele.on('touchmove', function(e){
				e.preventDefault();
				tmPara.nowPos = e.originalEvent.touches[0].pageX || e.originalEvent.changedTouches[0].pageX;
				if ( tmPara.nowPos - tmPara.pastPos >= tmPara.iSwiperSpacing) {
					tmPara.dir = 'left';
					tmPara.pastPos = tmPara.nowPos;
					changeImg(tmPara.dir);
				}else if( tmPara.nowPos - tmPara.pastPos <= tmPara.iSwiperSpacing*(-1)){
					tmPara.dir = 'right';
					tmPara.pastPos = tmPara.nowPos;
					changeImg(tmPara.dir);
				}	
			});

			opts.ele.on('mousemove', function(e){
				e.preventDefault();
				if (tmPara.touchOff) {
					tmPara.nowPos = e.originalEvent.x || e.originalEvent.layerX || 0;
					if ( tmPara.nowPos - tmPara.pastPos >= tmPara.iSwiperSpacing) {
						tmPara.dir = 'left';
						tmPara.pastPos = tmPara.nowPos;
						changeImg(tmPara.dir);
					}else if( tmPara.nowPos - tmPara.pastPos <= tmPara.iSwiperSpacing*(-1)){
						tmPara.dir = 'right';
						tmPara.pastPos = tmPara.nowPos;
						changeImg(tmPara.dir);
					}	
				}	
			});


			// 切换图片的动作
			function changeImg( dir ){
				var nextNum = 0;
				var nextAddImg = 0;
				if (tmPara.dir == 'right') {
					nextNum = tmPara.nowNum == 1 ? opts.imgLength : tmPara.nowNum - 1;
					nextAddImg = tmPara.nowNum <= tmPara.loadImgNum ? opts.imgLength + tmPara.nowNum - tmPara.loadImgNum : tmPara.nowNum - tmPara.loadImgNum;
				}else{
					nextNum = tmPara.nowNum == opts.imgLength ? 1 : tmPara.nowNum + 1;
					nextAddImg = tmPara.nowNum >= opts.imgLength - tmPara.loadImgNum ? tmPara.nowNum - opts.imgLength + 1 + tmPara.loadImgNum : tmPara.nowNum + 1 + tmPara.loadImgNum;
				}
				opts.ele.find('p img').attr('src', opts.imgPath + nextNum +'.'+opts.imgtype);
				tmPara.nowNum = nextNum;
				addImg(nextAddImg);
			}

			function addImg($nth){
				var that = opts.ele.find("img").eq($nth);
				that.attr('src', that.attr('data-src'));
				that.removeAttr("data-src");
			}

			if (opts.autoplay) {
				tmPara.timer = setInterval(function(){
					changeImg(tmPara.dir);
				}, opts.auto.imgtime);
			}
			
			opts.ele.find('p').attr('style', 'width: inherit;height: inherit;');
			opts.ele.find('p img').attr('style', 'width: inherit;height: inherit;outline: none;');
		}
	})

	
    
})(jQuery);