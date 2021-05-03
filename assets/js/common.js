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

var findUpEl = function (startEl, selector) {
  var currentEl = startEl;
  console.log(currentEl);
  while (!currentEl.classList.contains(selector)) {
    currentEl = currentEl.parentElement;
  }
  return currentEl;
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

//2뎁스영역 열기 모듈
(function () {
  var gnbMenuDepth1 = qs(".gnb-area .menu-depth-1");
  for (let i = 0; i < gnbMenuDepth1.length; i++) {
    gnbMenuDepth1[i].addEventListener("click", function (e) {
      if (e.target.tagName == "A") {
        for (var i = 0; i < gnbMenuDepth1.length; i++) {
          gnbMenuDepth1[i].classList.remove("on");
        }
        findUpEl(e.target, "menu-depth-1").classList.add("on");
      }
    });
  }
})();

//2뎁스영역 닫기 모듈
(function () {
  var depth2CloseBtn = qs(".btn-gnb-depth2-area-close");
  var findAndRemove = function (t) {
    if (t.classList.contains("btn-gnb-depth2-area-close")) {
      findUpEl(t, "menu-depth-1").classList.remove("on");
    }
  };
  if (depth2CloseBtn.length) {
    for (let i = 0; i < depth2CloseBtn.length; i++) {
      depth2CloseBtn[i].addEventListener("click", function (e) {
        findAndRemove(e.target);
      });
    }
  } else {
    depth2CloseBtn.addEventListener("click", function (e) {
      findAndRemove(e.target);
    });
  }
})();

//모바일 2뎁스,3뎁스 영역 열기 모듈
(function () {
  var gnbMenuDepth1 = qs(".m-gnb-area .menu-depth-1");
  var gnbMenuDepth2 = qs(".m-gnb-area .menu-depth-2");
  for (let i = 0; i < gnbMenuDepth1.length; i++) {
    gnbMenuDepth1[i].addEventListener("click", function (e) {
      if (e.target.classList.contains("menu-depth-1-a")) {
        for (var i = 0; i < gnbMenuDepth1.length; i++) {
          gnbMenuDepth1[i].classList.remove("on");
        }
        findUpEl(e.target, "menu-depth-1").classList.add("on");
      }
      if (e.target.classList.contains("menu-depth-2-a")) {
        if (findUpEl(e.target, "menu-depth-2").classList.contains("on")) {
          findUpEl(e.target, "menu-depth-2").classList.remove("on");
          return;
        }
        for (var i = 0; i < gnbMenuDepth2.length; i++) {
          gnbMenuDepth2[i].classList.remove("on");
        }
        findUpEl(e.target, "menu-depth-2").classList.add("on");
      }
    });
  }
})();
