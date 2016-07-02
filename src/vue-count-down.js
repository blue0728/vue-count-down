;
(function() {
	var vueCountDown = {};
	vueCountDown.install = function(Vue) {
		Vue.directive('countDown', {
			update: function(value) {
				if (typeof value !== 'string') {
					return console.error('The param of directive "v-time-down" must be a string!');
				}
				let newValue = value.replace(/-/g, "/").substring(0, 19);
				if (new Date(newValue) == 'Invalid Date') {
					return console.error('The param of directive "v-time-down" must be a date string!');
				}
				let timerSS = null,
					timerMS = null;
				let el = this.el;
				let hDom = document.createElement('span');
				let mDom = document.createElement('span');
				let hasHour = false;
				hDom.setAttribute('class', 'timeDown-H');
				mDom.setAttribute('class', 'timeDown-M');
				el.appendChild(hDom);
				el.appendChild(mDom);
				let ms = 10;
				downSS();

				function downSS() {
					let last = (new Date(newValue)).getTime() - (new Date()).getTime();
					last = last / 1000;
					if (last <= 0) {
						clearInterval(timerSS);
						last = 0;
					}
					el.querySelector('.timeDown-H').innerHTML = format(last);
				}
				timerSS = setInterval(downSS, 1000);

				function format(value) {
					let result = null;
					if (value == 0) {
						return result
					}
					let h = parseInt(value / 3600);
					let m = parseInt((value - h * 3600) / 60);
					let s = parseInt(value - h * 3600 - m * 60);
					h = h < 10 ? '0' + h : h;
					m = m < 10 ? '0' + m : m;
					s = s < 10 ? '0' + s : s;
					if (h == 0) {
						hasHour = false;
						result = m + ':' + s;
					} else {
						hasHour = true;
						result = h + ':' + m + ':' + s;
					}
					return result
				}

				function downMS() {
					parseInt(ms);
					ms--;
					if (ms < 0) {
						ms = 10;
					}
					ms = ms < 10 ? '0' + ms : ms;
					if (!hasHour) {
						el.querySelector('.timeDown-M').innerHTML = ':' + ms;
					}
				}
				timerMS = setInterval(downMS, 100);
			}
		});
	};
	if (typeof exports == "object") {
		module.exports = vueCountDown;
	} else if (typeof define == "function" && define.amd) {
		define([], function() {
			return vueCountDown
		})
	} else if (window.Vue) {
		window.vueCountDown = vueCountDown;
		Vue.use(vueCountDown);
	}
})();