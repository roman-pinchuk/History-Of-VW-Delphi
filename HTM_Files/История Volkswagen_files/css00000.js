function setActiveStyleSheet(title) {
	var i, a, main;
	for (var i = 0; (a = document.getElementsByTagName("link")[i]); i++) {
		if(a.getAttribute("rel").indexOf("style") != -1 && a.getAttribute("title")) {
			a.disabled = true;
			if(a.getAttribute("title") == title) a.disabled = false;
		}
	}
}

if (navigator.platform && (navigator.platform.indexOf('Mac') !=-1 )) setActiveStyleSheet('Helvetica');
