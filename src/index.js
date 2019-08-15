function isRTL(str) {
	// Hebrew = 0590-05FF, Arabic + Syriac + Samaritan + Mandaic = 0600-08FF
	// Ignore non-letters and @mentions
	const rtlRE = /^([\0-\x40\x5b-\x60\x7b-\x7f]|@\S+)*[\u0590-\u08ff]/;
	return rtlRE.test(str);
}

function setDir(element) {
	element.dir = isRTL(element.textContent) ? 'rtl' : 'ltr';
}

function setDirDeferred(element) {
	setTimeout(() => setDir(element), 0);
}

function setDirToSubtree(node) {
	// posts
	for (let post of node.getElementsByClassName ? node.getElementsByClassName('post-message__text') : []) {
		setDir(post);
	}
	// text areas
	for (let post of node.getElementsByTagName ? node.getElementsByTagName('textarea') : []) {
		setDir(post);
		post.onkeypress = (event => setDirDeferred(event.target));
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
