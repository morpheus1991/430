const qs = (el, option) => {
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

const getSameIndexEl = (el, iter) => {
	const index = findSibilings(el).indexOf(el);
	return iter[index];
	//엘리먼트 받으면 형제 내부에서 몇번째 인덱스인지 골라서
	//타겟에 해당 인덱스 반환
};

//형제요소 잡아오는 놈 (엘리먼트,옵션)옵션에 other주면 자기빼고 잡아줌

const findSibilings = (el, option) => {
	if (option == "other") {
		//옵션 체크한경우
		const res = [...el.children];
		//반환할 요소(자기형제들)
		res.splice([...el.children].indexOf(el), 1);
		//res에서 자기자신의 인덱스 구해서 빼버림
		return res;
		//자기자신 빼진 형제들을 반환
	}
	return el.parentElement.children;
	//형제들을 반환
};

const closest = (startEl, selector) => {
	let currentEl = startEl;

	while (!currentEl.classList.contains(selector)) {
		if (currentEl.tagName === "HTML") {
			return currentEl;
		}
		currentEl = currentEl.parentElement;
	}

	return currentEl;
};
const hasNext = (el) => {
	const nextEl = el.nextElementSibling;
	console.log(nextEl);
	// console.log(el.nextElementSibling);
	return nextEl;
};
const classCheckBring = (el, seperator) => {
	console.log(el)
	console.log(seperator)
	let res;
	if (Array.isArray(seperator)) {
		console.log('이즈어레이통과')
		seperator.forEach(className => {
			if (el.classList.contains(className)) {
				console.log('참')
				res = className
			}
		});
	} else {
		if (el.classList.contains(seperator)) {
			res = seperator;
		}
	}
	return res;
}

const throttle = (func, limit) => {
	let inThrottle;
	return function () {
		const args = arguments;
		const context = this;
		if (!inThrottle) {
			func.apply(context, args);
			inThrottle = true;
			setTimeout(() => (inThrottle = true), limit);
		}
	};
};



const getIndexNumber = (el, option, className) => {
	let res;
	if (option == "up") {
		res = [...findSibilings(closest(el, className))].indexOf(closest(el, className))
		return res;
	}

	res = [...findSibilings[el]].indexOf(el)
	return res;

	console.log('aaa')

};

const SibilingsClassClear = (el, className) => {
	findSibilings(el).forEach((element) => {
		element.classList.remove('on');
	})
	if (className) {
		findSibilings(el).forEach((element) => {
			element.classList.remove(className);
		})
	}
}

// if (option == "up") {
// 	console.log('옵션업')
// 	console.log(el, option, className)
// 	const item = closest(el, className);
// 	return [...findSibilings(item)].indexOf(item)
// }
// return [...findSibilings(el)].indexOf(el)
//Ie대응 getBoundingClientRect
// var getBoundingClientRect = function (el) {
//   var rect = el.getBoundingClientRect();
//   if (typeof rect.width === "undefined") {
//     // IE에서의 rect는 읽기 전용으로 쓸 수 없다.
//     return {
//       top: rect.top,
//       bottom: rect.bottom,
//       left: rect.left,
//       right: rect.right,
//       width: rect.right - rect.left,
//       height: rect.bottom - rect.top,
//     };
//   }
//   return rect;
// };

// // 클릭한놈 담을 변수
// let clickItem;
// //일단 아이템들 잡아온다.
// const uiSortItem = document.querySelectorAll(
//   ".portlet-header.ui-widget-header.ui-corner-all"
// );

// //이벤트 달고 클릭하면 clickItem애 담김
// uiSortItem.forEach((item) => {
//   item.addEventListener("mousedown", (e) => {
//     clickItem = e.target;
//   });
// });