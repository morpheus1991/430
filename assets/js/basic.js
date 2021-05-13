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
