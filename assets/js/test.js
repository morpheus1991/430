(() => {
  const main = qs(".main");
  const img = new Image();
  console.log("이미지실행");
  let imgW;
  let imgH;
  let startPoint;
  let currentX;
  let bgFlag;

  img.onload = function () {
    console.log("온로드실행");
    imgW = this.width;
    imgH = this.height;
    if (window.innerWidth < imgW) {
      console.log("이프문실행");
      startPoint = (imgW - window.innerWidth) / 2;
      console.log(startPoint);
      currentX = -startPoint;
      console.log(currentX);
      main.style.backgroundPosition = `${currentX}px`;
      play();
    }
  };
  const play = (ratio) => {
    console.log(currentX);
    switch (bgFlag) {
      case "leftSpeed":
        if (currentX <= 0) {
          currentX = currentX + 3;

          main.style.backgroundPosition = `${currentX}px`;
        }
        break;
      case "leftSlow":
        if (currentX <= 0) {
          currentX++;

          main.style.backgroundPosition = `${currentX}px`;
        }
        break;
      case "rightSpeed":
        if (currentX >= -imgW) {
          currentX = currentX - 3;
          main.style.backgroundPosition = `${currentX}px`;
        }
        break;
      case "rightSlow":
        if (currentX >= -imgW) {
          currentX--;
          main.style.backgroundPosition = `${currentX}px`;
        }
        break;
      default:
        break;
    }

    requestAnimationFrame(play);
  };

  img.src = "../../assets/images/img-main-bg.jpg";

  if (qs(".main")) {
    window.addEventListener("mousemove", (e) => {
      const width = window.innerWidth;
      const speedRange = 0.25;
      const slowRange = 0.15;
      const leftSlowRange = [
        width * speedRange,
        width * (speedRange + slowRange),
      ];
      const leftSpeedRange = [0, width * speedRange];
      const rightSpeedRange = [width, width - width * speedRange];
      const rightSlowRange = [
        rightSpeedRange[1],
        width - width * (speedRange + slowRange),
      ];
      const stopRange = [
        width * (speedRange + slowRange),
        width - width * (speedRange + slowRange),
      ];

      console.log(e.clientX);
      const currentX = e.clientX;
      if (currentX >= leftSpeedRange[0] && currentX <= leftSpeedRange[1]) {
        bgFlag = "leftSpeed";
        console.log(bgFlag);
      }
      if (currentX >= leftSlowRange[0] && currentX <= leftSlowRange[1]) {
        bgFlag = "leftSlow";

        console.log(bgFlag);
      }
      if (currentX >= rightSpeedRange[1] && currentX <= rightSpeedRange[0]) {
        bgFlag = "rightSpeed";
        console.log(bgFlag);
      }
      if (currentX >= rightSlowRange[1] && currentX <= rightSlowRange[0]) {
        bgFlag = "rightSlow";
        console.log(bgFlag);
      }
      if (currentX >= stopRange[0] && currentX <= stopRange[1]) {
        bgFlag = "stopRange";
        console.log(bgFlag);
      }
    });
  }
})();
