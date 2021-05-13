var _ = {
  container: {
    el: qs(".inline-block-list"),
    font_size_values: [],
    lineHeight_values: [],
    btns_font_size: qs(".container-font-size-btn-area button"),
    btns_lineHeigt: qs(".container-line-height-btn-area button"),
  },
  items: {
    font_size_values: [],
    lineHeight_values: [],
    vertical_align_values: [],
    btns_font_size: qs(".item-font-size-btn-area button"),
    btns_lineHeigt: qs(".item-line-height-btn-area button"),
    btns_vertical: qs(".container-vertical-align-btn-area button"),
  },
  valueArrayInit: function () {
    for (let i = 0; i < _.container.btns_font_size.length; i++) {
      let t = _.container.btns_font_size;
      _.container.font_size_values.push(t[i].getAttribute("data-value"));
      t[i].addEventListener("click", function () {
        classCheckDelete(_.container.el, _.container.font_size_values);
        _.container.el.classList.add(_.container.font_size_values[i]);
      });
    }
    for (let h = 0; h < _.container.btns_lineHeigt.length; h++) {
      let t = _.container.btns_lineHeigt;
      _.container.lineHeight_values.push(t[h].getAttribute("data-value"));
      t[h].addEventListener("click", function () {
        classCheckDelete(_.container.el, _.container.lineHeight_values);
        _.container.el.classList.add(_.container.lineHeight_values[h]);
      });
    }
    for (let j = 0; j < _.items.btns_font_size.length; j++) {
      let t = _.items.btns_font_size;
      _.items.font_size_values.push(t[j].getAttribute("data-value"));
      t[j].addEventListener("click", function () {
        classCheckDelete(_.container.el, _.items.font_size_values);
        _.container.el.classList.add(_.items.font_size_values[j]);
      });
    }
    for (let k = 0; k < _.items.btns_vertical.length; k++) {
      let t = _.items.btns_vertical;
      _.items.vertical_align_values.push(t[k].getAttribute("data-value"));
      t[k].addEventListener("click", function () {
        classCheckDelete(_.container.el, _.items.vertical_align_values);
        _.container.el.classList.add(_.items.vertical_align_values[k]);
      });
    }
    for (let l = 0; l < _.items.btns_lineHeigt.length; l++) {
      let t = _.items.btns_lineHeigt;
      _.items.lineHeight_values.push(t[l].getAttribute("data-value"));
      t[l].addEventListener("click", function () {
        classCheckDelete(_.container.el, _.items.lineHeight_values);
        _.container.el.classList.add(_.items.lineHeight_values[l]);
      });
    }
  },

  // setEventTargets: function () {
  //   for (let i = 0; i < this.container.btns_font_size.length; i++) {
  //     this.container.font_size_values.push(
  //       this.container.btns_font_size[i].getAttribute("data-value")
  //     );
  //     // this.container.btns_font_size[i].addEventListener("click");
  //   }
  //   for (let j = 0; j < this.container.btns_lineHeigt.length; j++) {
  //     this.container.lineHeight_values.push(
  //       this.container.btns_lineHeigt[j].getAttribute("data-value")
  //     );
  //   }

  //   for (let k = 0; k < this.container.btns_vertical.length; k++) {
  //     this.container.vertical_align_values.push(
  //       this.container.btns_vertical[k].getAttribute("data-value")
  //     );
  //     // this.container.btns_font_size[i].addEventListener("click");
  //   }

  //   for (let q = 0; q < this.items.btns_font_size.length; q++) {
  //     this.items.font_size_values.push(
  //       this.items.btns_font_size[q].getAttribute("data-value")
  //     );
  //   }
  //   for (let w = 0; w < this.items.btns_lineHeigt.length; w++) {
  //     this.items.lineHeight_values.push(
  //       this.items.btns_lineHeigt[w].getAttribute("data-value")
  //     );
  //   }
  // },
};
// var el_ul = qs(".inline-block-list");
// var el_li = qs(".inline-block-list li");
// var el_container_btns = qs(".container-btn-area button");
// var el_item_btns = qs(".item-btn-area button");
// var el_container_lineHeigt_btns = qs("");
// var container_btns_values = [];
// var item_btns_values = [];
function classCheckDelete(el, className) {
  console.log("classCheckDelete실행");
  if (el.length) {
    for (let i = 0; i < el.length; i++) {
      var target = el[i];
      console.log(target);
      for (let j = 0; j < className.length; j++) {
        if (target.classList.contains(className[j])) {
          target.classList.remove(className[j]);
        }
      }
    }
  } else {
    console.log("랭스없음");
    for (let j = 0; j < className.length; j++) {
      if (el.classList.contains(className[j])) {
        el.classList.remove(className[j]);
      }
    }
  }
}

_.valueArrayInit();
// _.setEventTargets();
console.log(_);
