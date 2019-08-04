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

function update(mutationList, observer) {
	// textarea
	if (document.getElementById('post_textbox')) {
		document.getElementById('post_textbox').onkeypress = (event => setDir(event.target, event.key));
	}
	for (let mutation of mutationList) {
		for (let node of mutation.addedNodes) {
			// posts
			if (node.getElementsByClassName) {
				for (let post of node.getElementsByClassName('post-message__text')) {
					setDir(post);
				}
			}
		}
	}	
}

class RTLPlugin {
	initialize(registry, store) {
		new MutationObserver(update).observe(document.body, {subtree: true, childList: true});
	}
	uninitialize(){}
}

window.registerPlugin('gabay.mattermost-rtl-plugin', new RTLPlugin());
