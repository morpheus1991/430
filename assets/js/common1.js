var qs = function (el) {
  if (document.querySelectorAll(el).length > 0) {
    if (document.querySelectorAll(el).length == 1) {
      return document.querySelector(el);
    } else {
      return document.querySelectorAll(el);
    }
  }
};

var addEvent = function (el, e, f) {
  for (var i = 0; i < el.length; i++) {
    el[i].addEventListener(e, f);
  }
};

var getBoundingClientRect = function (el) {
  var rect = el.getBoundingClientRect();
  if (typeof rect.width === "undefined") {
    // IE에서의 rect는 읽기 전용으로 쓸 수 없다.
    return {
      top: rect.top,
      bottom: rect.bottom,
      left: rect.left,
      right: rect.right,
      width: rect.right - rect.left,
      height: rect.bottom - rect.top,
    };
  }

  return rect;
};

//퍼센트바
if (qs(".scroll-gauge-area")) {
  // qs('header').style.paddingTop = 10 + "px";
}
window.addEventListener("scroll", function () {
  var barShowState = false;
  var $barArea = qs(".scroll-gauge-area");
  var $bar = qs(".scroll-gauge-bar");
  var scrollPosition = window.scrollY || document.documentElement.scrollTop;
  var getRect = getBoundingClientRect(qs("html"));
  var innerHeight = getRect.height;
  var currentPercent =
    (scrollPosition / (innerHeight - window.innerHeight)) * 100;
  $bar.style.width = currentPercent + "%";
});

//

//gnb호버시 이동
var gnbItems = qs(".gnb-item");
var lineBottom = qs(".line-bottom");
var gnbItemsOn = qs(".gnb .on");
console.log(gnbItemsOn);
//초기화
var targetX = getBoundingClientRect(gnbItemsOn).x;
var targetHalfWidth = getBoundingClientRect(gnbItemsOn).width / 2;
if (window.innerHeight < window.screenY) {
  lineBottom.style.left = targetX + targetHalfWidth + "px";
} else {
  lineBottom.style.left = targetX + targetHalfWidth + "px";
}
//각 이벤트
addEvent(gnbItems, "mouseenter", function (e) {
  var targetX = getBoundingClientRect(e.target).x;
  var targetHalfWidth = getBoundingClientRect(e.target).width / 2;
  if (window.innerHeight < window.screenY) {
    lineBottom.style.left = targetX + targetHalfWidth + "px";
  } else {
    lineBottom.style.left = targetX + targetHalfWidth + "px";
  }
});

//스티키 스크롤

var sticky = qs(".sticki-scroll");
var $scrollPercentGauge = qs(".scroll-percent-gauge");
var $scrollPercent = qs(".scroll-percent");
var $stickiTextBlock = qs(".sticki-text-block");
var $stickiScrollImages = qs(".sticki-scroll .image-area .img");
var $stickiTextBlock = qs(".sticki-text-block");
$stickiScrollImages[0].classList.add("on");
console.log($stickiScrollImages);
window.addEventListener("scroll", function () {
  var scrollPercentGaugeRect = getBoundingClientRect($scrollPercentGauge);
  var viewStartPoint = window.pageYOffset + scrollPercentGaugeRect.top;
  var windowScrollY = window.scrollY + window.innerHeight;
  var valueRatio = 0.8;
  console.log(windowScrollY);
  console.log(viewStartPoint);

  if (windowScrollY > viewStartPoint) {
    console.log("dd");
    var percentValue =
      ((windowScrollY - viewStartPoint) / viewStartPoint) * 100;
    if (percentValue > 0.98) {
      valueRatio = 1;
    }
    console.log(percentValue);
    $scrollPercent.style.height = percentValue * valueRatio + "%";
  }
  console.log(scrollPercentGaugeRect);
});
