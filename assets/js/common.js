var qs = function (el) {
	if (document.querySelectorAll(el).length > 0) {
		if (document.querySelectorAll(el).length == 1) {
			return document.querySelector(el)
		} else {
			return document.querySelectorAll(el)
		}
	}
}

var addEvent = function (el, e, f) {
	for (var i = 0; i < el.length; i++) {
		el[i].addEventListener(e, f)
	}
};

var getBoundingClientRect = function (el) {
	var rect = el.getBoundingClientRect();
	if (typeof rect.width === 'undefined') {
		// IE에서의 rect는 읽기 전용으로 쓸 수 없다.
		return {
			top: rect.top,
			bottom: rect.bottom,
			left: rect.left,
			right: rect.right,
			width: rect.right - rect.left,
			height: rect.bottom - rect.top
		};
	}

	return rect;
};


//퍼센트바
if (qs('.scroll-gauge-area')) {
	// qs('header').style.paddingTop = 10 + "px";
}
window.addEventListener("scroll", function () {
	var barShowState = false;
	var $barArea = qs('.scroll-gauge-area')
	var $bar = qs('.scroll-gauge-bar')
	var scrollPosition = window.scrollY || document.documentElement.scrollTop;
	var getRect = getBoundingClientRect(qs('html'))
	var innerHeight = getRect.height;
	var currentPercent = scrollPosition / (innerHeight - window.innerHeight) * 100;
	$bar.style.width = currentPercent + "%"
})

//gnb호버시 이동
var gnbItems = qs('.gnb-item');
var lineBottom = qs('.line-bottom');
var gnbItemsOn = qs('.gnb .on');
console.log(gnbItemsOn)
//초기화
var targetX = getBoundingClientRect(gnbItemsOn).x;
var targetHalfWidth = getBoundingClientRect(gnbItemsOn).width / 2;
if (window.innerHeight < window.screenY) {
	lineBottom.style.left = (targetX + targetHalfWidth) + "px";
} else {
	lineBottom.style.left = (targetX + targetHalfWidth) + "px";
}
//각 이벤트
addEvent(gnbItems, 'mouseenter', function (e) {
	var targetX = getBoundingClientRect(e.target).x;
	var targetHalfWidth = getBoundingClientRect(e.target).width / 2;
	if (window.innerHeight < window.screenY) {
		lineBottom.style.left = (targetX + targetHalfWidth) + "px";
	} else {
		lineBottom.style.left = (targetX + targetHalfWidth) + "px";
	}
})

//스티키 스크롤

var sticky = qs(".sticki-scroll");
var $scrollPercentGauge = qs('.scroll-percent-gauge')
var $scrollPercent = qs('.scroll-percent')
var $stickiTextBlock = qs('.sticki-text-block');
var $stickiScrollImages = qs('.sticki-scroll .image-area .img')
$stickiScrollImages[0].classList.add('on')
console.log($stickiScrollImages)
window.addEventListener('scroll', function () {
	var scrollPercentGaugeRect = getBoundingClientRect($scrollPercentGauge);
	console.log(scrollPercentGaugeRect)
	if (scrollPercentGaugeRect.top > 0) {
		console.log('실행')
		var absBottom = Math.abs(scrollPercentGaugeRect.bottom);
		var bottomRatio = 0.4;
		var currentValue = scrollPercentGaugeRect.bottom * bottomRatio;
		console.log(currentValue)
		var percent = currentValue / scrollPercentGaugeRect.height * 100;
		console.log(currentValue / scrollPercentGaugeRect.height * 100)
		$scrollPercent.style.height = percent + "%"
		pictureChange()
	}

	function pictureChange() {
		if (percent) {
			var a = 100 / $stickiTextBlock.length;
			console.log(percent)
			if (Math.floor(percent / a) > 1) {
				for (var i = 0; i < $stickiTextBlock.length; i++) {
					$stickiScrollImages[i].classList.remove('on');
				}
				// $stickiScrollImages[Math.round(a) > stickiScrollImages.length ? stickiScrollImages.length - 1 : Math.round(a)].classList.add('on')
			}
		}
	}
})