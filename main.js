import $ from 'jquery'

function isRTL(str) {
  // Hebrew = 0590—05FF, Arabic + Syriac + Samaritan + Mandaic = 0600—08FF
  // Ignore whitespaces, digits and @mentions
  rtlRE = /^(\s|\d|@\S+)*[\u0590-\u08ff]/;
  return rtlRE.test(str);
}

function setDir(element, key) {
	text = element.textContent + (key ? key : '');
	element.dir = isRTL(text) ? 'rtl' : 'ltr';
}

function setDirForEach(selector) {
	selector.each((i, element) => setDir(element));
}

class RTLPlugin {
    initialize(registry, store) {
        $(document).ready(() => {
			// Textarea
			setDirForEach($('#post_textbox'));
			$('#post_textbox').keypress((e) => setDir(e.target, e.key));

			// Posts
			setDirForEach($('#postListContent .post-message__text'));
			newPostObserver = new MutationObserver((m, o) => setDirForEach($('#postListContent .post-message__text').not('[dir]')));
			newPostObserver.observe(document.getElementById('postListContent'), {childList: true});
		});
    }
	uninitialize(){}
}

window.registerPlugin('earth.xr.mattermost-plugin-rtl', new RTLPlugin());
