var _ = {
	container: {
		el: qs(".inline-block-list"),
		font_size_values: [],
		lineHeight_values: [],
		text_align_values: [],
		btns_font_size: qs(".container-font-size-btn-area button"),
		btns_lineHeigt: qs(".container-line-height-btn-area button"),
		btns_text_align: qs(".container-text-align-btn-area button"),
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
		for (let g = 0; g < _.container.btns_text_align.length; g++) {
			let t = _.container.btns_text_align;
			_.container.text_align_values.push(t[g].getAttribute("data-value"));
			t[g].addEventListener("click", function () {
				classCheckDelete(_.container.el, _.container.text_align_values);
				_.container.el.classList.add(_.container.text_align_values[g]);
				for (let z = 0; z < t.length; z++) {
					t[z].classList.remove("on");
				}
				t[g].classList.add("on");
			});
		}
		for (let i = 0; i < _.container.btns_font_size.length; i++) {
			let t = _.container.btns_font_size;
			_.container.font_size_values.push(t[i].getAttribute("data-value"));

			t[i].addEventListener("click", function () {
				classCheckDelete(_.container.el, _.container.font_size_values);
				_.container.el.classList.add(_.container.font_size_values[i]);
				for (let z = 0; z < t.length; z++) {
					t[z].classList.remove("on");
				}
				t[i].classList.add("on");
			});
		}
		for (let h = 0; h < _.container.btns_lineHeigt.length; h++) {
			let t = _.container.btns_lineHeigt;
			_.container.lineHeight_values.push(t[h].getAttribute("data-value"));

			t[h].addEventListener("click", function () {
				classCheckDelete(_.container.el, _.container.lineHeight_values);
				_.container.el.classList.add(_.container.lineHeight_values[h]);
				for (let z = 0; z < t.length; z++) {
					t[z].classList.remove("on");
				}
				t[h].classList.add("on");
			});
		}
		for (let j = 0; j < _.items.btns_font_size.length; j++) {
			let t = _.items.btns_font_size;
			_.items.font_size_values.push(t[j].getAttribute("data-value"));

			t[j].addEventListener("click", function () {
				classCheckDelete(_.container.el, _.items.font_size_values);
				_.container.el.classList.add(_.items.font_size_values[j]);
				for (let z = 0; z < t.length; z++) {
					t[z].classList.remove("on");
				}
				t[j].classList.add("on");
			});
		}
		for (let k = 0; k < _.items.btns_vertical.length; k++) {
			let t = _.items.btns_vertical;
			_.items.vertical_align_values.push(t[k].getAttribute("data-value"));

			t[k].addEventListener("click", function () {
				classCheckDelete(_.container.el, _.items.vertical_align_values);
				_.container.el.classList.add(_.items.vertical_align_values[k]);
				for (let z = 0; z < t.length; z++) {
					t[z].classList.remove("on");
				}
				t[k].classList.add("on");
			});
		}
		for (let l = 0; l < _.items.btns_lineHeigt.length; l++) {
			let t = _.items.btns_lineHeigt;
			_.items.lineHeight_values.push(t[l].getAttribute("data-value"));

			t[l].addEventListener("click", function () {
				classCheckDelete(_.container.el, _.items.lineHeight_values);
				_.container.el.classList.add(_.items.lineHeight_values[l]);
				for (let z = 0; z < t.length; z++) {
					t[z].classList.remove("on");
				}
				t[l].classList.add("on");
			});
		}
	},
};

function classCheckDelete(el, className) {

	if (el.length) {
		for (let i = 0; i < el.length; i++) {
			var target = el[i];

			for (let j = 0; j < className.length; j++) {
				if (target.classList.contains(className[j])) {
					target.classList.remove(className[j]);
				}
			}
		}
	} else {

		for (let j = 0; j < className.length; j++) {
			if (el.classList.contains(className[j])) {
				el.classList.remove(className[j]);
			}
		}
	}
}

_.valueArrayInit();