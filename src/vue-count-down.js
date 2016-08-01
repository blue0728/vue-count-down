;
(function() {
	var vueCountDown = {};
	vueCountDown.install = function(Vue) {
		Vue.directive('countDown', {
			twoWay: true,
			update: function(value) {
				if (typeof value !== 'string') {
					return console.error('The param of directive "v-time-down" must be a string!');
				}
				var newValue = value.replace(/-/g, "/").substring(0, 19);
				if (new Date(newValue) == 'Invalid Date') {
					return console.error('The param of directive "v-time-down" must be a date string!');
				}
				var timerSS = null,
					timerMS = null;
				var el = this.el;
				var hDom = document.createElement('span');
				var mDom = document.createElement('span');
				hDom.setAttribute('class', 'timeDown-H');
				mDom.setAttribute('class', 'timeDown-M');
				el.appendChild(hDom);
				el.appendChild(mDom);
				var ms = 10;
				var last = 0;
				downSS();

				function downSS() {
					last = (new Date(newValue)).getTime() - (new Date()).getTime();
					last = last / 1000;
					if (last <= 0) {
						clearInterval(timerSS);
						last = 0;
					}
					el.querySelector('.timeDown-H').innerHTML = format(last);
				}
				timerSS = setInterval(downSS, 1000);

				function format(value) {
					var result = '00:00:00';
					if (value == 0) {
						clearInterval(timerMS);
						el.querySelector('.timeDown-M').innerHTML = '';
						setTimeout(function() {
							location.href = location.href;
						}, 1000)
						return result
					}
					var h = parseInt(value / 3600);
					var m = parseInt((value - h * 3600) / 60);
					var s = parseInt(value - h * 3600 - m * 60);
					h = h < 10 ? '0' + h : h;
					m = m < 10 ? '0' + m : m;
					s = s < 10 ? '0' + s : s;
					if (h == 0) {
						result = m + ':' + s;
					} else {
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
					el.querySelector('.timeDown-M').innerHTML = '.' + ms;
				}
				if (last != 0) {
					timerMS = setInterval(downMS, 100);
				}
			}
		});
	};
	if (typeof exports === "object") {
		module.exports = vueCountDown;
	} else if (typeof define === "function" && define.amd) {
		define([], function() {
			return vueCountDown
		})
	} else if (window.Vue) {
		window.vueCountDown = vueCountDown;
		Vue.use(vueCountDown);
	}
})();