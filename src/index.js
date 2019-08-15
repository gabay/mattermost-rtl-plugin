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

function setDirToSubtree(node) {
	// posts
	for (let post of node.getElementsByClassName ? node.getElementsByClassName('post-message__text') : []) {
		setDir(post);
	}
	// text areas
	for (let post of node.getElementsByTagName ? node.getElementsByTagName('textarea') : []) {
		setDir(post);
		post.onkeypress = (event => setDir(event.target, event.key));
	}
}

function update(mutationList, observer) {
	for (let mutation of mutationList) {
		for (let node of mutation.addedNodes) {
			setDirToSubtree(node);
		}
	}
}

class RTLPlugin {
	initialize(registry, store) {
		setDirToSubtree(document.body);
		new MutationObserver(update).observe(document.body, {subtree: true, childList: true});
	}
	uninitialize(){}
}

window.registerPlugin('gabay.mattermost-rtl-plugin', new RTLPlugin());
