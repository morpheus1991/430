setTimeout(() => {
  console.log("3초지남");
  //gnb 2뎁스 컨테이너 3뎁스 컨테이너 체크
  (function () {
    var target = qs(".menu-depth-1", "array");
    var target2;
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
    var openState = false;
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
          openState = true;
        }
      });
    }

    window.addEventListener("click", () => {});
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
    var target2 = qs(".m-gnb .menu-depth-2-container .has-child", "array");
    console.log(target2);
    for (var j = 0; j < target2.length; j++) {
      console.log(target2[j]);
      if (findEl(target2[j], "menu-depth-3-container", "down")) {
        target2[j].querySelector("a").setAttribute("href", "#");
      }
    }
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

  //lnb open&close 모듈 (.wrapper.lnb-less가 lnb붙이지 않음.)
  (function () {
    if (!qs(".wrapper").classList.contains("lnb-less")) {
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
      var target2 = qs(".lnb-nav .menu-depth-2-container .has-child", "array");
      console.log(target2);
      for (var j = 0; j < target2.length; j++) {
        console.log(target2[j]);
        if (findEl(target2[j], "menu-depth-3-container", "down")) {
          target2[j].querySelector("a").setAttribute("href", "#");
        }
      }
    }
    //메인화면 마우스 오버
    (function () {
      var target = qs(".main-intro-area h2 span");
      var bg = qs("#content");
      if (target) {
        for (let i = 0; i < target.length; i++) {
          target[i].addEventListener("click", (e) => {
            bg.style.backgroundImage = `url(../assets/images/bg${i + 1}.jpg)`;
          });
        }

        setTimeout(() => {
          target[0].classList.add("on");
          bg.style.backgroundImage = `url(../assets/images/bg${1}.jpg)`;
          setTimeout(() => {
            target[1].classList.add("on");
            bg.style.backgroundImage = `url(../assets/images/bg${2}.jpg)`;
            setTimeout(() => {
              target[2].classList.add("on");
              bg.style.backgroundImage = `url(../assets/images/bg${3}.jpg)`;
            }, 1000);
          }, 1200);
        }, 1000);
      }
    })();

    //메인 첫 화면 셋팅
    (function () {})();
  })();
}, 100);
