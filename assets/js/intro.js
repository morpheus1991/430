(() => {
  let yOffset = 0; //window.pageYoffset 대신 쓸 변수;
  let prevScrollHeight = 0;
  let currentScene = 0;
  let enterNewScene = false; //새로운 scene이 시작된 순간 ture
  const sceneInfo = [
    //0
    {
      type: "sticky",
      heightNum: 5, //브라우저 높이의 5배로 scrollHeight셋팅
      scrollHeight: 0,
      objs: {
        container: document.querySelector("#scroll-section-0"),
        messageA: document.querySelector("#scroll-section-0 .main-message.a"),
        messageB: document.querySelector("#scroll-section-0 .main-message.b"),
        messageC: document.querySelector("#scroll-section-0 .main-message.c"),
        messageD: document.querySelector("#scroll-section-0 .main-message.d"),
      },
      values: {
        messageA_opacity: [0, 1],
      },
    },
    //1
    {
      type: "nomal",
      heightNum: 5, //브라우저 높이의 5배로 scrollHeight셋팅
      scrollHeight: 0,
      objs: {
        container: document.querySelector("#scroll-section-1"),
      },
    },
    //2
    {
      type: "sticky",
      heightNum: 5, //브라우저 높이의 5배로 scrollHeight셋팅
      scrollHeight: 0,
      objs: {
        container: document.querySelector("#scroll-section-2"),
      },
    },
    //3
    {
      type: "sticky",
      heightNum: 5, //브라우저 높이의 5배로 scrollHeight셋팅
      scrollHeight: 0,
      objs: {
        container: document.querySelector("#scroll-section-3"),
      },
    },
  ];
  const setLayout = () => {
    for (let i = 0; i < sceneInfo.length; i++) {
      sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;
      sceneInfo[
        i
      ].objs.container.style.height = `${sceneInfo[i].scrollHeight}px`;
    }
    yOffset = window.pageYOffset;
    let totalScrollHeight = 0;
    for (let i = 0; i < sceneInfo.length; i++) {
      totalScrollHeight += sceneInfo[i].scrollHeight;
      if (totalScrollHeight >= yOffset) {
        currentScene = i;
        break;
      }
    }
    document.body.setAttribute("id", `show-scroll-scene-${currentScene}`);
  };
  //현재 스크롤 된 값 console.log(window.pageYOffset);

  const scrollLoop = () => {
    prevScrollHeight = 0;
    for (let i = 0; i < currentScene; i++) {
      prevScrollHeight = prevScrollHeight + sceneInfo[i].scrollHeight;
      // prevScrollHeight += sceneInfo[i].scrollHeight;
    }
    if (yOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight) {
      currentScene++;
      document.body.setAttribute("id", `show-scroll-scene-${currentScene}`);
    }
    if (yOffset < prevScrollHeight) {
      if (currentScene === 0) {
        return;
      }
      currentScene--;
      document.body.setAttribute("id", `show-scroll-scene-${currentScene}`);
    }
    console.log(currentScene);
    const calcValues = (values, currentYoffset) => {
      let rv;
      let scrollRatio = currentYoffset / sceneInfo[currentScene].scrollHeight;
      rv = scrollRatio * (values[1] - values[0]) + values[0];
      return rv;
    };
    const playAnimation = () => {
      const objs = sceneInfo[currentScene].objs;
      const valus = sceneInfo[currentScene].values;
      const currentYoffset = yOffset - prevScrollHeight;
      console.log(currentScene, currentYoffset);
      switch (currentScene) {
        case 0:
          let messageA_opacity_in = calcValues(
            valus.messageA_opacity,
            currentYoffset
          );
          objs.messageA.style.opacity = messageA_opacity_in;
          console.log(messageA_opacity_in);
          // console.log("0 play");
          break;
        case 1:
          // calcValues();
          // console.log("1 play");
          break;
        case 2:
          // calcValues();
          // console.log("2 play");
          break;
        case 3:
          // calcValues();
          // console.log("3 play");
          break;
        default:
          break;
      }
    };
    playAnimation();
  };

  window.addEventListener("scroll", () => {
    yOffset = window.pageYOffset;
    scrollLoop();
  });
  window.addEventListener("resize", setLayout);
  window.addEventListener("load", setLayout);
  setLayout();
  console.log(sceneInfo);
})();
