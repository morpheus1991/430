	(() => {
		let tab;
		let index;
		let contents;
		let btns;
		let nextEl;
		let prevEl;
		let targetIndex = 0;
		let focusTabContentIn = false;

		window.addEventListener("keydown", (e) => {
			//키다운시 포커스이동
			const keyName = e.key;

			if (keyName == "Tab") {
				if (nextEl) {
					e.preventDefault();

					console.log(nextEl);
					nextEl.focus();

					if (
						tab.querySelectorAll(".tab-header-area .itm.on") &&
						nextEl.classList.contains("tab-btn")
					) {
						const tabBtns = tab.querySelectorAll(".tab-btn");
						const tabContents = tab.querySelectorAll(".tab-content-item");

						[...tabBtns].forEach((btn) => {
							closest(btn, "item").classList.remove("on");
						});

						[...tabContents].forEach((content) => {
							content.classList.remove("on");
						});

						console.log("인덱스", index);
						index++;
						tabContents[index].classList.add("on");
						closest(btns[index], "item").classList.add("on");
						console.log(btns);

						// if(){}
						console.log("켜진거있음");
					}
				}
				console.log(e);

				console.log("탭키, 프리벤트");
				// e.preventDefault();
				if (e.shiftKey) {
					console.log("탭플러스시프트");
					const currentEl = document.activeElement;
					const tab = closest(currentEl, "tab-area");

					//이 EL이 이중에 클레스를 가지고 있다면

				}
			}
		});

		window.addEventListener("keyup", (e) => {
			//키업시 이동후 타겟팅
			var focusableElementsString =
				'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]';
			const keyName = e.key;
			const isTabBtn = e.target.classList.contains("tab-btn");
			const isContent = e.target.classList.contains("tab-content-item");

			const getIndex = (el) => {
				if (el.classList.contains("tab-btn")) {
					tab = closest(el, "tab-area");
					index = [...tab.querySelectorAll(".tab-btn")].indexOf(el);
					contents = tab.querySelectorAll(".tab-content-item");

					console.log("컨텐츠");

					console.log(contents);
					const nextContext = contents[index];
					console.log(nextContext);

					if (nextContext) {
						nextEl = nextContext;
					} else {
						nextEl = null;
					}
				}
				if (el.classList.contains("tab-content-item")) {
					tab = closest(el, "tab-area");
					index = [...tab.querySelectorAll(".tab-content-item")].indexOf(el);
					btns = tab.querySelectorAll(".tab-btn");
					focusTabContentIn = true;

					// console.log(focusableElement);
					const nextContext = btns[index + 1];
					if (nextContext) {
						nextEl = nextContext;
					} else {
						nextEl = null;
					}
				}
				if (focusTabContentIn) {
					const focusableElement = tab
						.querySelectorAll(".tab-content-item")[index].querySelectorAll(focusableElementsString);
					console.log("----");
					console.log(e.target);
					console.log(focusableElement);
					console.log(focusableElement);
					console.log("----");
					if (e.target == focusableElement[focusableElement.length - 1]) {
						console.log("마지막");
						const tabBtns = tab.querySelectorAll(".tab-btn");
						nextEl = tabBtns[index + 1];
						focusTabContentIn = false;
					}
				}
			};
			// console.log(nextEl);
			targetIndex = getIndex(e.target);
			if (isTabBtn) {
				console.log(isTabBtn);
			}
			if (isContent) {
				console.log("이즈컨텐츠");

				console.log(e.target);
				targetIndex = getIndex(e.target);
				console.log(targetIndex);
				nextEl = closest(e.target, "tab-area").querySelectorAll(".tab-btn")[
					targetIndex + 1
				];
			}
			console.log(e.target);
		});
	})();