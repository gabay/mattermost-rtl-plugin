import $ from 'jquery';

function isRTL(str) {
  // Hebrew = 0590-05FF, Arabic + Syriac + Samaritan + Mandaic = 0600-08FF
  // Ignore whitespaces, digits and @mentions
  const rtlRE = /^(\s|\d|@\S+)*[\u0590-\u08ff]/;
  return rtlRE.test(str);
}

function setDir(element, key) {
	const text = element.textContent + (key ? key : '');
	element.dir = isRTL(text) ? 'rtl' : 'ltr';
}

function setDirForEach(selector) {
	selector.each((i, element) => setDir(element));
}

function tryToSetup() {
	if (document.getElementById('post_textbox') && document.getElementById('postListContent')) {
		// Textarea
		setDirForEach($('#post_textbox'));
		$('#post_textbox').keypress((e) => setDir(e.target, e.key));
				
		// Posts
		setDirForEach($('#postListContent .post-message__text'));
		const observer = new MutationObserver((m, o) => setDirForEach($('#postListContent .post-message__text').not('[dir]')));
		observer.observe(document.getElementById('postListContent'), {subtree: true, childList: true});
		return true;
	}
	return false;
}

class RTLPlugin {
	initialize(registry, store) {
		const callback = (mutationList, observer) => {
			if (tryToSetup()) observer.disconnect();
		};
		new MutationObserver(callback).observe(document.body, {subtree: true, childList: true});
	}
	uninitialize(){}
}

window.registerPlugin('gabay.mattermost-rtl-plugin', new RTLPlugin());
