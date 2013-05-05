/* Load this script using conditional IE comments if you need to support IE 7 and IE 6. */

window.onload = function() {
	function addIcon(el, entity) {
		var html = el.innerHTML;
		el.innerHTML = '<span style="font-family: \'bc-icons\'">' + entity + '</span>' + html;
	}
	var icons = {
			'calendar' : '&#xf073;',
			'reddit_icon' : '&#xe002;',
			'script-icon' : '&#xe003;',
			'clock-icon' : '&#xe004;',
			'dropdown_arrow' : '&#xe005;',
			'play' : '&#xe006;',
			'twitter' : '&#xe007;',
			'facebook' : '&#xe008;',
			'tumblr' : '&#xe00a;',
			'podcast' : '&#xe00c;'
		},
		els = document.getElementsByTagName('*'),
		i, attr, html, c, el;
	for (i = 0; ; i += 1) {
		el = els[i];
		if(!el) {
			break;
		}
		attr = el.getAttribute('data-icon');
		if (attr) {
			addIcon(el, attr);
		}
		c = el.className;
		c = c.match(/[^\s'"]+/);
		if (c && icons[c[0]]) {
			addIcon(el, icons[c[0]]);
		}
	}
};