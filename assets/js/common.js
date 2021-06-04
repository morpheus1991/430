setTimeout(() => {
	console.log("3초지남");




	(() => {
		if (qs('.tab-area')) {
			//초기화
			const init = () => {
				// 시각적으로 활성화 표기를 위한 클래스 추가
				qs('.tab:first-of-type, .tabpanel:first-of-type', "array").forEach((el) => {
					el.classList.add("active");
					el.setAttribute("tabindex", "0")
				});
				// 의미적으로 활성화 표기를 위해 true로 설정된 aria-selected 속성 추가
				qs(".tab:first-of-type", "array").forEach((el) => {
					el.setAttribute("area-selected", "true")
				});
			}
			init()

			//탭 초점이동 (방향키)
			qs('.tab', "array").forEach((el) => {
				el.addEventListener('keydown', (e) => {
					e.preventDefault ? e.preventDefault() : e.returnValue = false;
					const target = e.target;
					const keyCode = e.keyCode;
					console.log(keyCode)

					switch (keyCode) {
						//leftArrow
						case 37:
							if (target.previousElementSibling) {
								target.setAttribute("tabindex", "-1");
								target.previousElementSibling.setAttribute("tabindex", "0");
								target.previousElementSibling.focus();
							} else {
								//초점이 첫번째라면 마지막 탭으로 초점이동
								target.setAttribute("tabindex", "-1");
								findSibilings(target)[findSibilings(target).length - 1].setAttribute("tabindex", "0");
								findSibilings(target)[findSibilings(target).length - 1].focus()
							}
							break;


							//rightArrow
						case 39:
							if (target.nextElementSibling) {
								target.setAttribute("tabindex", "-1");
								target.nextElementSibling.setAttribute("tabindex", "0");
								target.nextElementSibling.focus();
							} else {
								//초점이 첫번째라면 마지막 탭으로 초점이동
								target.setAttribute("tabindex", "-1");
								findSibilings(target)[0].setAttribute("tabindex", "0");
								findSibilings(target)[0].focus()
							}
							break;
							//Sapce
						case 32:
							//Enter
						case 13:

							// 기존 탭 비활성화
							findSibilings(target).forEach((el) => {
								el.classList.remove("active");
								el.setAttribute("aria-selected", "false");
							});
							//선택된탭 활성화
							target.classList.add('active');
							target.setAttribute("aria-selected", "true");


							//기존 탭 패널 비활성화
							findSibilings(qs(`#${target.getAttribute("aria-controls")}`)).forEach((el) => {
								el.setAttribute("tabindex", "-1");
								el.classList.remove("active");
							});
							//연관된 탭 패널 활성화

							qs(`#${target.getAttribute("aria-controls")}`).setAttribute("tabindex", "0");
							qs(`#${target.getAttribute("aria-controls")}`).classList.add("active");
							break;
					}


				})
			})

			qs('.tablist', "array").forEach((el) => {
				el.addEventListener("keydown", (e) => {
					const target = e.target;
					const keyCode = e.keyCode;
					console.log(keyCode)
					if (target.classList.contains("active")) {

						//tab키 눌렀을 때 (시프트 탭 제외)
						if (!e.shiftKey && keyCode === 9) {
							e.preventDefault ? e.preventDefault() : e.returnValue = false;
							findSibilings(qs(`#${target.getAttribute("aria-controls")}`)).forEach((el) => {
								if (el.classList.contains('tabpanel')) {
									el.setAttribute("tabindex", "-1");
									el.classList.remove("active")
								}
							});
							qs(`#${target.getAttribute("aria-controls")}`).setAttribute("tabindex", "0");
							qs(`#${target.getAttribute("aria-controls")}`).classList.add("active");
							qs(`#${target.getAttribute("aria-controls")}`).focus();

						}
					}
				})
			})

			qs('.tab', "array").forEach((el) => {
				el.addEventListener('mousedown', (e) => {
					const target = e.target;
					//기존 탭 비활성화
					findSibilings(target).forEach((el) => {
						el.classList.remove("active");
						el.setAttribute("tabindex", "-1")
						el.setAttribute("aria-selected", "false")
					});
					//선택된 탭 활성화
					target.classList.add("active");
					target.setAttribute("tabindex", "0")
					target.setAttribute("aria-selected", "true")
					target.focus();

					//기존탭 비활성화
					findSibilings(qs(`#${target.getAttribute("aria-controls")}`)).forEach((el) => {
						if (el.classList.contains('tabpanel')) {
							el.setAttribute("tabindex", "-1");
							el.classList.remove("active");
						}
					})
					//연관된 탭 패널 활성화

					qs(`#${target.getAttribute("aria-controls")}`).setAttribute("tabindex", "0");
					qs(`#${target.getAttribute("aria-controls")}`).classList.add("active")
				});
			});
		}
	})();
















	// 탭
	// if (qs(".tab-header-area")) {
	//   const tab = qs(".tab-header-area", "array");
	//   tab.forEach((tab) => {
	//     tab.classList.add(`tab-${tab.querySelectorAll(".item").length}ea`);
	//   });
	// }
	// if (qs(".tab-header-area .item")) {
	//   qs(".tab-header-area .item", "array").forEach((tabBtn) => {
	//     tabBtn.addEventListener("click", (e) => {
	//       qs(".tab-header-area .item").forEach((item) => {
	//         console.log([...qs(".tab-header-area .item", "array")].indexOf(item));

	//         item.classList.remove("on");
	//       });

	//       tabBtn.classList.add("on");
	//     });
	//   });
	// }
	//gnb 2뎁스 컨테이너 3뎁스 컨테이너 체크
	(function () {
		var target = qs(".menu-depth-1", "array");
		for (var i = 0; i < target.length; i++) {
			if (target[i].querySelector(".menu-depth-2-container")) {
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

					closest(e.target, "menu-depth-1").classList.add("on");
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
				closest(t, "menu-depth-1").classList.remove("on");
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
			if (target2[j].querySelector(".menu-depth-3-container")) {
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
			closest(e.target, "m-gnb-area").classList.toggle("open");
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
					closest(e.target, "menu-depth-1").classList.add("on");
				}
				if (e.target.classList.contains("menu-depth-2-a")) {
					if (closest(e.target, "menu-depth-2").classList.contains("on")) {
						closest(e.target, "menu-depth-2").classList.remove("on");
						return;
					}
					for (var i = 0; i < gnbMenuDepth2.length; i++) {
						gnbMenuDepth2[i].classList.remove("on");
					}
					closest(e.target, "menu-depth-2").classList.add("on");
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
						var tempEl = closest(e.target, "menu-depth-2");
						if (tempEl.classList.contains("on")) {
							tempEl.classList.remove("on");
							return;
						}
						for (let j = 0; j < clickTarget.length; j++) {
							closest(clickTarget[j], "menu-depth-2").classList.remove("on");
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
				if (target2[j].querySelector(".menu-depth-3-container")) {
					target2[j].querySelector("a").setAttribute("href", "#");
				}
			}
		}
		//메인화면 마우스 오버
		// (function () {
		//   var target = qs(".main-intro-area h2 span");
		//   var bg = qs("#content");
		//   if (target) {
		//     for (let i = 0; i < target.length; i++) {
		//       target[i].addEventListener("click", (e) => {
		//         bg.style.backgroundImage = `url(../assets/images/bg${i + 1}.jpg)`;
		//       });
		//     }

		//     setTimeout(() => {
		//       target[0].classList.add("on");
		//       bg.style.backgroundImage = `url(../assets/images/bg${1}.jpg)`;
		//       setTimeout(() => {
		//         target[1].classList.add("on");
		//         bg.style.backgroundImage = `url(../assets/images/bg${2}.jpg)`;
		//         setTimeout(() => {
		//           target[2].classList.add("on");
		//           bg.style.backgroundImage = `url(../assets/images/bg${3}.jpg)`;
		//         }, 1000);
		//       }, 1200);
		//     }, 1000);
		//   }
		// })();

		//메인 첫 화면 셋팅
		// const targetEl = Symbol("targetEl");
		// const src = Symbol("src");
		class MoveBgMouseTracker {
			imgInfo = {
				img: {},
			};
			elInfo = {};
			values = {};
			constructor(obj) {
				if (qs(".main")) {
					this.throttle = obj.throttle ? obj.throttle : 500;
					this.imgInfo.img = new Image();
					this.elInfo.el = document.querySelector(obj.el);
					this.imgInfo.img.src = obj.src;
					this.values.mouseX = 0;
					this.values.currentX = null;
					this.that = this;
					this.bgFlag = null;

					this.onloadCheck = () => {
						this.imgInfo.img.onload = () => {
							this.imgInfo.imgW = this.imgInfo.img.width;
							this.imgInfo.imgH = this.imgInfo.img.height;
							qs('.main').style.backgroundSize = `${this.imgInfo.imgW}px ${this.imgInfo.imgH}px`
							console.log(qs('.main'))
							if (window.innerWidth < this.imgInfo.imgW) {
								this.values.startPoint =
									(this.imgInfo.imgW - window.innerWidth) / 2;
								this.values.currentX = -this.values.startPoint;
								this.elInfo.el.style.backgroundPosition = `${this.values.currentX}px`;
							}
						};
					};
					this.play = () => {
						switch (this.bgFlag) {
							case "leftVeryFast":
								if (this.values.currentX <= 0) {

									if (this.values.currentX + 5 > 0) {
										this.values.currentX = this.values.currentX + 0;
									} else {
										this.values.currentX = this.values.currentX + 5;

									}
									this.elInfo.el.style.backgroundPosition = `${this.values.currentX}px`;
								}
								break;
							case "leftFast":
								if (this.values.currentX <= 0) {

									if (this.values.currentX + 3 > 0) {
										this.values.currentX = this.values.currentX + 0;

									} else {
										this.values.currentX = this.values.currentX + 3;

									}

									this.elInfo.el.style.backgroundPosition = `${this.values.currentX}px`;
								}
								break;
							case "leftSlow":
								if (this.values.currentX <= 0) {

									if (this.values.currentX + 3 > 0) {
										this.values.currentX = this.values.currentX + 0;
									} else {
										this.values.currentX++;
									}



									this.elInfo.el.style.backgroundPosition = `${this.values.currentX}px`;
								}
								break;
							case "rightVeryFast":
								if (this.values.currentX >= -(this.imgInfo.imgW - window.innerWidth)) {
									this.values.currentX = this.values.currentX - 5;
									this.elInfo.el.style.backgroundPosition = `${this.values.currentX}px`;
								}
								case "rightFast":
									if (this.values.currentX >= -(this.imgInfo.imgW - window.innerWidth)) {
										this.values.currentX = this.values.currentX - 3;
										this.elInfo.el.style.backgroundPosition = `${this.values.currentX}px`;
									}
									break;
								case "rightSlow":
									if (this.values.currentX >= -(this.imgInfo.imgW - window.innerWidth)) {
										this.values.currentX--;
										this.elInfo.el.style.backgroundPosition = `${this.values.currentX}px`;
									}
									break;
								default:
									break;
						}

						requestAnimationFrame(this.play);
					};
					this.areaRead = () => {
						if (this.elInfo.el) {
							let timer = null;
							timer = setTimeout;
							const ReadRange = (e) => {
								const width = window.innerWidth;
								const veryFastRange = 0.1;
								const fastRange = 0.15;
								const slowRange = 0.15;
								const leftSlowRange = [
									width * (fastRange + veryFastRange),
									width * (fastRange + veryFastRange + slowRange),
								];
								const leftFastRange = [
									width * veryFastRange,
									width * (veryFastRange + fastRange),
								];
								const leftVeryFastRange = [0, width * veryFastRange];
								const rightVeryFastRange = [
									width - width * veryFastRange,
									width,
								];
								const rightFastRange = [
									width - width * (fastRange + veryFastRange),
									width - width * veryFastRange,
								];
								const rightSlowRange = [
									width - width * (fastRange + veryFastRange + slowRange),
									width - width * (fastRange + veryFastRange),
								];
								const stopRange = [
									width * (veryFastRange + fastRange + slowRange),
									width - width * (veryFastRange + fastRange + slowRange),
								];

								const currentX = e.clientX;
								if (
									currentX >= leftVeryFastRange[0] &&
									currentX <= leftVeryFastRange[1]
								) {
									this.bgFlag = "leftVeryFast";
								}
								if (
									currentX >= leftFastRange[0] &&
									currentX <= leftFastRange[1]
								) {
									this.bgFlag = "leftFast";
								}
								if (
									currentX >= leftSlowRange[0] &&
									currentX <= leftSlowRange[1]
								) {
									this.bgFlag = "leftSlow";
								}
								if (
									currentX >= rightVeryFastRange[0] &&
									currentX <= rightVeryFastRange[1]
								) {
									this.bgFlag = "rightVeryFast";
								}
								if (
									currentX >= rightFastRange[0] &&
									currentX <= rightFastRange[1]
								) {
									this.bgFlag = "rightFast";
								}
								if (
									currentX >= rightSlowRange[0] &&
									currentX <= rightSlowRange[1]
								) {
									this.bgFlag = "rightSlow";
									console.log("rightSlow");
								}
								if (currentX >= stopRange[0] && currentX <= stopRange[1]) {
									this.bgFlag = "stopRange";
									console.log("stopRange");
								}
							};
							window.addEventListener("mousemove", (e) => {
								throttle(ReadRange(e), 1000);
							});
						}
						this.play();
					};
					this.areaRead();
					this.onloadCheck();
				}
			}
		}
		const testA = new MoveBgMouseTracker({
			throttle: 1000,
			el: ".main",
			src: "../../assets/images/img-main-bg.jpg",
		});
	})();

	//탭메뉴 포커스
	//keyDown이벤트의 특징
	//keyUp이벤트의 특징
	//tab한다.
	//tab메뉴에 진입
	//tab메뉴에서 버튼을 탭 했다면 한번 더 눌렀을 때 해당 인덱스에 컨텐츠로 이동
	//tab컨텐츠에서 텝 한다면 해당 인덱스+1에 버튼으로 이동(버튼이 있다면,)
	//tab컨텐츠에서 shft+tab을 누르면 index-1의 텝버튼으로(있다면),
	//tab버튼에서 shft+tab을 누르면 index-1의 텝컨텐츠로(있다면),


	// let focusEl;
	// let criteria;
	// let NextEl;
	// window.addEventListener("keydown", (e) => {
	// 	const loadClassName = ["tab-btn"]
	//   const keyName = e.key;
	//   console.log(focusEl);
	//   focusEl = document.activeElement;
	//   criteria = focusEl.classList;
	//   console.log(focusEl.nextElementSibling);
	//   NextEl = hasNext(closest(focusEl, "item"));
	//   if (keyName == "Tab") {
	//     console.log("탭키, 프리벤트");
	//     e.preventDefault();
	//   }
	// 	focusEl
	// 	loadClassName.forEach((className,focusEl)=>{
	// 	focusEl.classList.contains(className)
	// 	})

	// });
}, 100);