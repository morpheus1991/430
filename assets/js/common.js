setTimeout(() => {
  console.log("3초지남");
  var qs = function (el, option) {
    if (document.querySelectorAll(el).length > 0) {
      if (option == "array") {
        return document.querySelectorAll(el);
      }
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

  var findEl = function (startEl, selector, option) {
    var currentEl = startEl;

    if (option == "down") {
      currentEl.querySelector(selector);
    } else {
      while (!currentEl.classList.contains(selector)) {
        if (currentEl.tagName === "HTML") {
          return currentEl;
        }
        currentEl = currentEl.parentElement;
      }
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

  //gnb 2뎁스 컨테이너 3뎁스 컨테이너 체크
  (function () {
    var target = qs(".menu-depth-1", "array");
    for (var i = 0; i < target.length; i++) {
      if (findEl(target[i], "menu-depth-2-container", "down")) {
        console.log(target[i]);
        target[i].classList.add("has-child");
      }
    }
  })();
  //2뎁스영역 열기 모듈
  (function () {
    var gnbMenuDepth1 = qs(".gnb-area .menu-depth-1");
    for (var i = 0; i < gnbMenuDepth1.length; i++) {
      gnbMenuDepth1[i].addEventListener("click", function (e) {
        if (
          e.target.tagName == "A" &&
          e.target.parentElement.classList.contains("menu-depth-1")
        ) {
          for (var i = 0; i < gnbMenuDepth1.length; i++) {
            gnbMenuDepth1[i].classList.remove("on");
          }
          findEl(e.target, "menu-depth-1").classList.add("on");
        }
      });
    }
  })();

  //2뎁스영역 닫기 모듈
  (function () {
    var depth2CloseBtn = qs(".btn-gnb-depth2-area-close");
    var findAndRemove = function (t) {
      if (t.classList.contains("btn-gnb-depth2-area-close")) {
        findEl(t, "menu-depth-1").classList.remove("on");
      }
    };
    if (depth2CloseBtn.length) {
      for (var i = 0; i < depth2CloseBtn.length; i++) {
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

  //모바일 gnb가져오기
  (function () {
    var target = qs(".menu-depth-1-list");
    var mGnb = qs(".m-gnb-inner");
    mGnb.innerHTML = target.innerHTML;
  })();
  //모바일 햄버거메뉴 토글 / 햄버거 메뉴 닫기
  (function () {
    var mobileMenuBtn = qs(".btn-m-gnb");
    var mobileMenuCloseBtn = qs(".btn-m-gnb-close");
    mobileMenuBtn.addEventListener("click", function (e) {
      if (e.target.parentElement.classList.contains("m-gnb-area")) {
        e.target.parentElement.classList.toggle("open");
      }
    });
    mobileMenuCloseBtn.addEventListener("click", function (e) {
      findEl(e.target, "m-gnb-area").classList.toggle("open");
    });
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
          findEl(e.target, "menu-depth-1").classList.add("on");
        }
        if (e.target.classList.contains("menu-depth-2-a")) {
          if (findEl(e.target, "menu-depth-2").classList.contains("on")) {
            findEl(e.target, "menu-depth-2").classList.remove("on");
            return;
          }
          for (var i = 0; i < gnbMenuDepth2.length; i++) {
            gnbMenuDepth2[i].classList.remove("on");
          }
          findEl(e.target, "menu-depth-2").classList.add("on");
        }
      });
    }
  })();

  //lnb open&close 모듈
  (function () {
    if (!qs(".wrapper").classList.contains("main")) {
      var lnbNav = qs(".lnb-nav");
      var target = qs(".gnb-area .menu-depth-1.select .menu-depth-2-container");
      if (target) {
        lnbNav.append(target.cloneNode(true));
        console.log(target);

        var clickTarget = qs(".lnb-area .menu-depth-2-a");
        for (let i = 0; i < clickTarget.length; i++) {
          clickTarget[i].addEventListener("click", (e) => {
            var tempEl = findEl(e.target, "menu-depth-2");
            if (tempEl.classList.contains("on")) {
              tempEl.classList.remove("on");
              return;
            }
            for (let j = 0; j < clickTarget.length; j++) {
              findEl(clickTarget[j], "menu-depth-2").classList.remove("on");
            }
            tempEl.classList.add("on");
          });
        }
        console.log(clickTarget);
      }
    }
  })();
}, 100);
