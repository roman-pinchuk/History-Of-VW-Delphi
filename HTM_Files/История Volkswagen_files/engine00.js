var userLoggedIn = userLoggedIn || false;

// Legacy

function getClientSize() {
	return (document.body.scrollHeight > document.body.offsetHeight) ? [document.body.scrollWidth, document.body.scrollHeight] : [document.body.offsetWidth, document.body.offsetHeight];
}

function getBodyHeight() {
	if (self.innerWidth) return self.innerHeight;
	else if (document.documentElement && document.documentElement.clientWidth) return document.documentElement.clientHeight;
	else if (document.body) return document.body.clientHeight;
	return true;
}

function getRelLeft(el) {
	var pos = el.offsetLeft;
	while (el.offsetParent != null) { el = el.offsetParent; pos += el.offsetLeft; if (el.tagName == 'BODY') break; }
	return pos;
}

function getRelTop(el) {
	var pos = el.offsetTop;
	while (el.offsetParent != null) { el = el.offsetParent; if (el.id == 'bodyi') continue; pos += el.offsetTop; if (el.tagName == 'BODY') break; }
	return pos;
}

function retFalse() { return false; }

// Popup

function show(url, w, h, s, n, rs) {
	if (!n) n = 'drive_ru_w'
	if (!rs) rs = '0'
	attr = 'width=' + w + ',height=' + h + ',location=0,menubar=0,resizable=' + rs + ',scrollbars=' + s + ',status=0,titlebar=0,toolbar=0,hotkeys=0'
	if (parseInt(navigator.appVersion) >= 4) {
		x = (screen.width - w) / 2
		y = (screen.height - h) / 2
		if(x < 0) x = 0
		if(y < 0) y = 0
		attr += ',xposition=' + x + ',left=' + x + ',yposition=' + y + ',top=' + y
	}
	window.open(url, n, attr)
}

function f_edit(u) { show(u, 750, 400, 1, '', 1); return false; }
function messenger(name) { show('/reception/chat.html?target=' + name, 400, 600, 0, 'drive_ru_messenger_' + name.replace('.', '_').replace('-', '_'), 0); return false; }
function messenger_admin(name) { show('/reception/chat.html?target=' + name + '&source=DRIVE.RU', 400, 600, 0, 'drive_ru_messenger_admin_' + name.replace('.', '_').replace('-', '_'), 0); return false; }

// Tabs

function dtTab(curEl, blog) {
	var prefix = (blog) ? 'blog' : 'dt';
	if (curEl.className == 'active') return;
	var el = $(prefix + '-tab-ctrl').getElements('td');
	for (var i = 0; i < el.length; i++) {
		if (el[i] == curEl) {
			el[i].className = 'active';
			$(prefix + '-tab-' + (i + 1)).style.display = 'block';
		} else {
			el[i].className = (i == 0) ? 'first' : '';
			$(prefix + '-tab-' + (i + 1)).style.display = 'none';
		}
	}
}

function fixDtTab(blog) {
	var prefix = (blog) ? 'blog' : 'dt';
	var t, h = new Array(), el;
	for (var i = 0; i < 3; i++) {
		if (prefix == 'blog' && i == 2) { h[i] = 0; continue; }
		el = $(prefix + '-tab-' + (i + 1));
		t = el.style.display;
		el.style.width = '239px'
		el.style.height = 'auto'
		el.style.visibility = 'hidden';
		el.style.position = 'absolute';
		el.style.display = 'block'
		h[i] = el.offsetHeight;
		el.style.visibility = 'visible';
		el.style.display = t;
		el.style.position = '';
	}
	t = Math.max(h[0],h[1],h[2]);
	for (i = 0; i < 3; i++) {
		el = $(prefix + '-tab-' + (i + 1));
		el.style.height = t + 'px';
	}
}

// ---

function dtWidthFix() {
	if (!$('dtwrapper')) return;
	els = $$('.ear');
	if (!els) return;
	var t = els[0].offsetTop;
	for (i = 0; i < els.length; i++) {
		els[i].style.display = '';
	}
	s = ''
	for (var i = 0; i < els.length; i++) {
		s += els[i].offsetTop + ' '
		if (t != els[i].offsetTop) els[i].style.display = 'none';
	}
}

function dtWidthFixInit() {
	var zybexOldhandler = window.onresize;
	window.onresize = (typeof zybexOldhandler == "function") ? function() { zybexOldhandler(); dtWidthFix(); } : dtWidthFix;
}

// Article background resize fix

var bgFix = new Class({

	initialize: function() {
		if (!$('bgfix')) return;
		this.el = $('bgfix');
		this.background = this.el.getStyle('background-image');
		this.fix();
		window.addEvent('resize', this.fix.bind(this));
	},

	fix: function() {
		this.el.setStyle('background-image', (this.el.getWidth() > 465) ? this.background : '');
	}
});


// Blog link

var blogLink = new Class({
	
	initialize: function() {
		if (!$('bloglink')) return;
		
		this.el = $('bloglink-form');
		this.el.setStyle('display', 'block');
		this.el.setStyle('overflow', 'hidden');
		this.iniHeight = this.el.offsetHeight;
		this.el.setStyle('height', 0);
//		this.el.setStyle('width', '100%');

		this.fx = new Fx.Tween(this.el, {
			property: 'height',
			wait: true,
			duration: 300,
			onComplete: function() {
				window.onresize = this.iniHandler;
				$('bloglink-status').innerHTML = (this.el.getStyle('height').toInt() > 0) ? '&uarr;' : '&darr;';
			}.bind(this)
		});
		
		$('bloglink').addEvent('click', function() {
			this.iniHandler = window.onresize;
			window.onresize = $empty;
			if (this.el.getStyle('height').toInt() > 0)
				this.fx.start(0);
			else {
				this.fx.start(this.iniHeight);
			}
		}.bind(this));
	}

});

var dv = {
	varray: [],
	print: function(url, width, height, desc) {
		var cur = this.varray.length;
		this.varray[cur] = new SWFObject('/images/flvplayer.swf', 'dvideo' + cur, width, height + 20, '8');
		this.varray[cur].addVariable("allowScriptAccess", "sameDomain");
		this.varray[cur].addParam("wmode", "transparent");
		this.varray[cur].addVariable("autoStart", "false");
		this.varray[cur].addVariable("file", url);
		document.write ('<div id="flvideo' + cur + '" class="if">' + this.varray[cur].getSWFHTML() + '</div>');
		setTimeout('$(\'flvideo' + cur +'\').innerHTML = \'' + this.varray[cur].getSWFHTML() + '\'', 1000);
		if (desc) document.write ('<div class="textsub colorgray" style="width: ' + width + 'px; margin: 7px 0 3px 0; color: gray">' + desc + '</div>');
	}
}

var dp = {
	varray: [],
	print: function(url, width, height, desc) {
		var cur = this.varray.length;
		this.varray[cur] = new SWFObject('/images/pan.swf?path=' + url, 'dpan' + cur, width, height, '8');
		this.varray[cur].addVariable("allowScriptAccess", "sameDomain");
		this.varray[cur].addParam("wmode", "transparent");
		this.varray[cur].addVariable("path", url);
		document.write ('<div id="flpan' + cur + '" class="if">' + this.varray[cur].getSWFHTML() + '</div>');
		setTimeout('$(\'flpan' + cur +'\').innerHTML = \'' + this.varray[cur].getSWFHTML() + '\'', 1000);
		if (desc) document.write ('<div class="textsub colorgray" style="width: ' + width + 'px; margin: 7px 0 3px 0; color: gray">' + desc + '</div>');
	}
}

var dp1 = {
	varray: [],
	print: function(url, width, height, desc) {
		var cur = this.varray.length;
		var ver = deconcept.SWFObjectUtil.getPlayerVersion();
		if (ver.major > 7) {
			this.varray[cur] = new SWFObject('/images/pan1.swf?path=' + url, 'dpan' + cur, width, height, '8');
			this.varray[cur].addVariable("allowScriptAccess", "sameDomain");
			this.varray[cur].addParam("wmode", "transparent");
			this.varray[cur].addVariable("path", url);
			document.write ('<div id="flpan' + cur + '" class="if">' + this.varray[cur].getSWFHTML() + '</div>');
			setTimeout('$(\'flpan' + cur +'\').innerHTML = \'' + this.varray[cur].getSWFHTML() + '\'', 1000);
		} else {
			document.write ('<div id="flpan' + cur + '" class="if"><img src="/images/pans/' + url +'/tumb.gif" width="' + width +' height="' + height+ '"></div>');
		}
		if (desc)
			document.write ('<div class="textsub colorgray" style="width: ' + width + 'px; margin: 7px 0 3px 0; color: gray">' + desc + '</div>');
	}
}

function articlePing(id) {
	document.write('<iframe style="position: absolute; visibility: hidden;" src="http://stat.drive.ru/c/?id=' + id + '"></' + 'iframe>')
}

// Section highlighter

var sectionHightlight = new Class({

	initialize: function(el) {
		this.el = el;
		this.prev = null;
		el.addEvent('mouseenter', this.over.bind(this));
		el.addEvent('mouseleave', this.out.bind(this));
	},
	
	over: function() {
		if (!shEnabled) return;
		$clear(this.timer);
		if (this.prev) this.prev.removeClass('hover');
		this.prev = (this.prev == this.el) ? null : this.el;
		this.el.addClass('hover');
	},

	out: function() {
		if (!shEnabled) return;
		this.timer = this.el.removeClass.delay(30, this.el, 'hover');
	}

});

var shEnabled = true;

// Sections controller

var Section = new Class({

	Implements: Options,
	
	options: {
		navHeight: 14,
		popupWidth: 380,
		popupOffset: 0.3,
		commentsUrl: '/ajax/articles.comments.html',
		newCommentsUrl: '/ajax/articles.comments.diff.html'
	},
	
	initialize: function(articleId) {
		if (!articleId) return;
		this.articleId = articleId;
		this.sections = new Hash();
		this.ready = false;
		this.mode = 1; // 1 - side comments, 2 - inline comments
		this.data = new Request.JSON({url: this.options.commentsUrl, secure: false, onComplete: function() {
			if (this.ready) this.start();
		}}).post({'articleId': articleId});
		window.addEvent('domready', function() {
			this.ready = true;
			$$('#article .section').each(function(el) {
				this.sections.set(el.get('id'), {
					element: el,
					highlight: new sectionHightlight(el),
					iniHeight: el.offsetHeight - 30
				});
			}, this);
			this.wait = function() {
				if (this.data.response && this.data.response.json) {$clear(this.wait); this.start();}
			}.periodical(100, this);
		}.bind(this));
	},
	
	start: function() {
		this.addform = new popup.addform({zIndex: 110000});
		this.addform.addEvents({
			onHidecomplete: function() {this.addform.elements[2].setStyle('display', 'block');}.bind(this)
		});
		this.addform.holder.setStyle('width', this.options.popupWidth);
		this.addform.holder.set('html',
			'<div class="titlewrapper"><div class="title-tl"></div><div class="title-t"><a href="#" class="closebtn">&nbsp;</a>Ваш комментарий</div><div class="title-tr"></div></div>' +
			'<form class="addform">' +
			'<textarea rows="10"></textarea>' +
			'<div class="fdesc">' +
			'<input type="submit" value=" Добавить " title="Нажатие Ctrl-Enter также отправляет сообщение">' +
			'<div class="spinner"></div>' +
			'Помните, что модератор удалит комментарии: не&nbsp;по&nbsp;теме, набранные <a target="_blank" href="http://www.translit.ru/">translitom</a> или&nbsp;на&nbsp;любом иностранном языке, заглавными буквами, вопиюще безграмотные, а&nbsp;также разнообразные &laquo;похоже&nbsp;на&hellip;&raquo;, &laquo;+1&raquo;, &laquo;зачот&raquo;, &laquo;первый&raquo; &laquo;бред&raquo; и&nbsp;прочую ерунду. Будьте осторожны, тупые комментарии и&nbsp;любые ругательства удаляются вместе с&nbsp;авторами!' +
			'</div>' +
			'</form>'
		);
		
		this.addform.holder.getElement('.title-t').setStyle('width', this.addform.holder.getElement('.titlewrapper').offsetWidth - 17);
		this.addform.holder.getElement('.closebtn').addEvent('click', function(e) {
			shEnabled = true;
			e = new Event(e).stop();
			this.addform.hide();
		}.bind(this));
		var acoords = $('article').getCoordinates();
		this.addnewDrag = new Drag.Move(this.addform.holder, {
			handle: this.addform.holder.getElement('.titlewrapper'),
			limit: {x: [acoords.left, acoords.right - this.options.popupWidth - 12], y: [560, acoords.bottom - this.addform.holder.offsetHeight]},
			onStart: function() {this.addform.elements[2].setStyle('display', 'none');}.bind(this)
		});
		this.addnewDrag2 = new Drag(this.addform.elements[0], {
			handle: this.addform.holder.getElement('.titlewrapper'),
			limit: {x: [acoords.left - 6, acoords.right - this.options.popupWidth - 18], y: [560 - 6, acoords.bottom - this.addform.holder.offsetHeight - 6]}
		});
		this.addformRequest = new Request.JSON({url: this.options.newCommentsUrl, secure: false, onComplete: function(obj) {
			if (obj.freeze == 1) {
				this.addform.holder.getElement('form').getElement('textarea').disabled = true;
				this.addform.holder.getElement('form').getElement('input[type=submit]').disabled = true;
				this.addformSpinner.stop();
				return;
			}
			try {
				var newcomments = new Hash(obj.comments);
			} catch(e) {
				alert('Произошла ошибка при попытке написать комментарий.')
				this.addformSpinner.stop();
				return false;
			}
			shEnabled = true;
			newcomments.each(function(item, key) {
				if (this.comments.has(key)) {
					this.comments.get(key).extend(item);
				} else {
					this.comments.set(key, item);
				}
			}, this);
			this.render();
			this.addformSpinner.stop();
			this.addform.hide();
			this.addform.holder.getElement('form').getElement('textarea').value = '';
			return true;
		}.bind(this)});
		this.addformSpinner = new Spinner(this.addform.holder.getElement('.spinner'), this.addform.holder.getElement('input[type=submit]'));
		this.addform.holder.getElement('form').addEvent('submit', this.sendComment.bind(this));

		if (Cookie.read("AC.Block") == 'true') {
			this.addform.holder.getElement('form').getElement('textarea').disabled = true;
			this.addform.holder.getElement('form').getElement('input[type=submit]').disabled = true;
		} else {
			document.addEvent('keydown', function(e) {
				if (this.addform.state == 4 && e.control && (e.key == 'enter') && (!this.addformSpinner.state)) this.sendComment();
				if (e.alt && e.control && e.key == 'd') this.refresh();
			}.bind(this));
		}

		this.popup = new popup.comment({zIndex: 160000});
		this.popup.holder.addEvents({
			mouseenter: function() {
				$clear(this.timer);
				this.sections.get(this.curKey).highlight.over();
			}.bind(this),
			mouseleave: function() {
				this.sections.get(this.curKey).highlight.out();
				this.timer = this.reset.delay(10, this);
			}.bind(this)
		});
		this.popup.elements[2].addEvent('mouseenter', function() {
			$clear(this.timer);
			this.sections.get(this.curKey).highlight.over();
		}.bind(this));

		this.forumLink = this.data.response.json.forumLink;
		this.comments = new Hash(this.data.response.json.comments);
		this.render();
		window.addEvent('resize', this.reinit.bind(this));
	},

	sendComment: function(e) {
		if (e) e = new Event(e).stop();
		var v = this.addform.holder.getElement('form').getElement('textarea').value;
		if (v.trim().length < 25) {
			alert('Минимальная длина осмысленного комментария - 25 знаков. Если вам сказать особо нечего - лучше не пишите ничего. Спасибо за понимание.');
			return;
		}
		this.addformSpinner.start();
		var ids = [];
		this.comments.each(function(el, key) {
			ids.push(key + '|' + el.getLast().id);
		}.bind(this));
		this.addformRequest.post({
			articleId: this.articleId,
			text: v,
			id: this.addform.sectionId,
			ids: ids.join(',')
		});
	},

	refresh: function() {
		var ids = [];
		this.comments.each(function(el, key) {
			ids.push([key, el.getLast().id]);
		}.bind(this));
		this.addformRequest.post({
			articleId: this.articleId,
			ids: ids
		});
	},
	
	render: function() {
		this.numMessages = 0;
		this.comments.each(function(el, key) {
			this.numMessages += el.length;
		}, this);
		this.sections.each(function(el, key) {
			if (this.sections.get(key).wrapper) this.sections.get(key).wrapper.destroy();
			if (this.sections.get(key).iwrapper) this.sections.get(key).iwrapper.destroy();
			// side comments
			this.sections.get(key).wrapper = new Element('div', {styles: {overflow: 'hidden', 'padding-bottom': this.options.navHeight, position: 'relative', left: 0, top: 0, height: this.sections.get(key).iniHeight - this.options.navHeight}}).inject(this.sections.get(key).element.getElement('.right'));
			if (this.comments.has(key)) {
				this.sections.get(key).wrapper.set('html', this.renderComments(key));
				this.sections.get(key).wrapper.getElement('.allhide').setStyle('display', 'none');
				this.sections.get(key).wrapper.getElement('.thread').addEvent('click', function() {
					if (this.mode == 2) return;
					if (this.sections.get(key).wrapper.offsetHeight == this.sections.get(key).iniHeight) {
						if (Browser.Engine.trident4) {
							this.sections.get(key).wrapper.setStyle('overflow-y', 'visible');
							this.sections.get(key).wrapper.setStyle('height', this.sections.get(key).wrapper.offsetHeight - this.options.navHeight);
						} else {
							this.sections.get(key).wrapper.setStyle('height', 'auto');
						}
						if (this.sections.get(key).wrapper.offsetHeight < this.sections.get(key).iniHeight) this.sections.get(key).wrapper.setStyle('height', this.sections.get(key).iniHeight - this.options.navHeight);
					} else {
						if (Browser.Engine.trident4) this.sections.get(key).wrapper.setStyle('overflow-y', 'hidden');
						this.sections.get(key).wrapper.setStyle('height', this.sections.get(key).iniHeight - this.options.navHeight);
					}
					this.rehide(key);
				}.bind(this));
				this.rehide(key);
				this.sections.get(key).wrapper.getElements('li').each(function(el, index) {
					el.addEvents({
						mouseenter: function() {
							$clear(this.timer);
							if (this.popup.state != 4 || (this.curComment && this.curComment != el)) this.timer = this.highlight.delay(100, this, [el, key, index]);
						}.bind(this),
						mouseleave: function() {
							$clear(this.timer);
							this.timer = this.reset.delay(10, this);
						}.bind(this)
					});
				}, this);
				if (userLoggedIn) {
					var elt = this.sections.get(key).wrapper.getElement('.add');
					elt.addEvent('click', function() {
						if (this.addform.state != 1 && this.addform.state != 4) this.addformShow(elt, key);
					}.bind(this));
				}
			} else {
				if (userLoggedIn) {
					this.sections.get(key).wrapper.set('html', '<span class="addnew">Добавить комментарий&hellip;</span>');
					var elt = this.sections.get(key).wrapper.getElement('.addnew');
					elt.addEvent('click', function() {
						if (this.addform.state != 1 && this.addform.state != 4) this.addformShow(elt, key);
					}.bind(this));
				} else {
					this.sections.get(key).wrapper.set('html', '<span class="register"><a href="/reception/register.html">Зарегистрированные</a> пользователи могут оставлять здесь свои комментарии.</span>');
				}
			}
			
			// inline comments
			this.sections.get(key).iwrapper = new Element('div', {'class': 'inline', styles: {display: 'none'}}).inject(this.sections.get(key).element.getElement('.left'));
			if (this.comments.has(key)) {
				this.sections.get(key).iwrapper.set('html', this.renderInlineComments(key));
				this.sections.get(key).wrapper.getElement('.all').addEvent('click', function() {
					this.mode = 2;
					this.sections.each(function(el, key) {
						if (this.comments.has(key)) {
							el.curHeight = el.wrapper.offsetHeight;
							el.wrapper.getElement('ul').setStyle('display', 'none');
							el.wrapper.getElement('.all').setStyle('display', 'none');
							el.wrapper.getElement('.allhide').setStyle('display', '');
							el.iwrapper.setStyle('display', '');
							el.wrapper.setStyle('height', el.element.offsetHeight - 30 - this.options.navHeight);
						}
					}, this);
				}.bind(this));
				this.sections.get(key).wrapper.getElement('.allhide').addEvent('click', function() {
					this.mode = 1;
					this.sections.each(function(el, key) {
						if (this.comments.has(key)) {
							el.wrapper.setStyle('height', el.curHeight - this.options.navHeight);
							el.wrapper.getElement('.allhide').setStyle('display', 'none');
							el.wrapper.getElement('.all').setStyle('display', '');
							el.iwrapper.setStyle('display', 'none');
							el.wrapper.getElement('ul').setStyle('display', '');
							this.rehide(key);
						}
					}, this);
				}.bind(this));
			}
		}, this);
	},
		
	reinit: function() {
		this.sections.each(function(el, key) {
			el.wrapper.setStyle('display', 'none');
			el.iwrapper.setStyle('display', 'none');
			el.curHeight = el.element.offsetHeight - 30;
			el.iniHeight = el.element.offsetHeight - 30;
			el.wrapper.setStyle('height', el.iniHeight - this.options.navHeight);
			el.wrapper.setStyle('display', 'block');
			el.iwrapper.setStyle('display', (this.mode == 2) ? 'block' : 'none');
			if (this.mode == 2) el.wrapper.setStyle('height', el.element.offsetHeight - 30 - this.options.navHeight);
			this.rehide(key);
		}, this);
		var acoords = $('article').getCoordinates();
		this.addnewDrag.options.limit = {x: [acoords.left, acoords.right - this.options.popupWidth - 12], y: [560, acoords.bottom - this.addform.holder.offsetHeight]};
		this.addnewDrag2.options.limit = {x: [acoords.left - 6, acoords.right - this.options.popupWidth - 18], y: [560 - 6, acoords.bottom - this.addform.holder.offsetHeight - 6]};
	},
	
	rehide: function(key) {
		if (this.comments.has(key)) {
			var y = this.sections.get(key).wrapper.getPosition().y,
				h = this.sections.get(key).wrapper.offsetHeight - this.options.navHeight;
			this.sections.get(key).wrapper.getElements('li').each(function(el, index) {
        var ch = (Browser.Engine.trident) ? index * 19 + 14 : el.getCoordinates().bottom - y; 
				el.setStyle('visibility', (ch > h) ? 'hidden' : 'visible');
			});
		}
	},
	
	renderComments: function(key) {
		var t = '<ul>', lnk = this.forumLink + '&paragraph=' + key;
		this.comments.get(key).each(function(msg) {
			t += '<li><span></span><a href="' + (lnk + '#' + msg.id) + '">' + msg.shortText + '</a></li>';
		})
		t += '</ul>';
		t += '<div class="rnav">' + ((userLoggedIn) ? '<span class="add">Добавить&hellip;</span> | ' : '') + '<span class="threadw"><span class="thread">Ветвь</span> (<a href="' + lnk + '">' + this.comments.get(key).length + '</a>)</span> | <span class="all">Все (' + this.numMessages + ')</span><span class="allhide">Без комментариев</span>';
		return t;
	},
	
	renderInlineComments: function(key) {
		var t = '<ul>', lnk = this.forumLink + '&paragraph=' + key;
		this.comments.get(key).each(function(msg, index) {
			t += '<li' + ((index == 0) ? ' class="first-child"' : '') + '><div class="nickname"><span class="date">' + msg.date + '</span><b><a href="' + msg.profileUrl + '">' + msg.nick + '</a></b></div>' + msg.text
		})
		t += '</ul>';
		return t;
	},
	
	addformShow: function(el, key, index) {
		shEnabled = false;
		var pos = el.getPosition();
		var ecoords = {
			left: pos.x - this.options.popupWidth - 9,
			top: pos.y - parseInt(this.addform.holder.offsetHeight * this.options.popupOffset) + 6,
			width: this.options.popupWidth,
			height: this.addform.holder.offsetHeight
		};
		var scoords = {
			left: pos.x - 34,
			top: pos.y + 6,
			height: 21
		}
		var scrollTop = Window.getScroll().y;
		var scrollBottom = scrollTop + Window.getSize().y;
		if (scrollTop < 560) scrollTop = 560; // banner fix
		
		if (ecoords.top + ecoords.height > scrollBottom) ecoords.top = scrollBottom - ecoords.height;
		if (ecoords.top < scrollTop) ecoords.top = scrollTop;
		if (scoords.top - ecoords.top < 15) ecoords.top = scoords.top - 15;
		if (ecoords.top + ecoords.height - scoords.top < 15) ecoords.top = scoords.top - ecoords.height + 15;
		
		this.addform.sectionId = key;

		scoords.left += 6;
		scoords.top -= 9;
		
		this.addform.set(scoords, ecoords);
		this.addform.show();
	},

	highlight: function(el, key, index) {
		this.reset();
		if (this.curComment && this.curComment == el) {el.addClass('active'); this.popup.show(); return;}
		if (el) {
			this.curComment = el;
			this.curKey = key;
			this.curIndex = index;
		} else {
			el = this.curComment;
			key = this.curKey;
			index = this.curIndex;
		}
		
		el.addClass('active');
		var item = this.comments.get(key)[index];
		this.popup.holder.setStyles({
			width: this.options.popupWidth,
			height: 'auto'
		});
		this.popup.holder.set('html',
			'<div style="padding: 15px;">' +
			'<div class="userinfo">' +
				'<div class="avatar"><a href="' + item.profileUrl + '"><img src="' + item.avatar + '" width="100" height="100"></a></div>' +
				'<div class="info binfo">' +
					'<div class="nick' + (item.inactive ? ' inactive' : '') + '"><a href="' + item.profileUrl + '">' + item.nick + '</a>' +
					((item.inactive || item.noMessenger)? '' : ('<span class="profileMessenger"><img src="/images/status-' + (item.isOnline ? 'on' : 'off') + 'line.gif" width="14" height="13" title="Написать сообщение (' + item.nick + ' ' + (item.isOnline ? 'сейчас на сайте' : item.lastVisitMsg) + ')" class="onlinestatus" onclick="return messenger(\'' + item.nick + '\')"></span>')) +
					(item.driveru ? '&nbsp;&nbsp;<span style="background: #f03; color: #fff;" class="text2">&nbsp;&nbsp;<b>DRIVE.RU</b>&nbsp;&nbsp;</span>' : '') +
					'</div>' +
					'<div class="extra">' + item.info +'</div>' +
				'</div>' +
			'</div>' +
			'<div class="msg">' + item.text + '</div>' +
			'</div>'
		);
		
		if (this.popup.holder.getElement('.msg').offsetHeight > 300) this.popup.holder.getElement('.msg').setStyle('height', 300 - 15);
		var pos = el.getPosition();
		var scoords = {
			left: pos.x - 34,
			top: pos.y + 6,
			height: 21
		}
		var ecoords = {
			left: pos.x - this.options.popupWidth - 9,
			top: pos.y - parseInt(this.popup.holder.offsetHeight * this.options.popupOffset) + 6,
			width: this.options.popupWidth,
			height: this.popup.holder.offsetHeight
		};
		var scrollTop = Window.getScroll().y;
		var scrollBottom = scrollTop + Window.getSize().y;
		if (scrollTop < 560) scrollTop = 560; // banner fix
		
		if (ecoords.top + ecoords.height > scrollBottom) ecoords.top = scrollBottom - ecoords.height;
		if (ecoords.top < scrollTop) ecoords.top = scrollTop;
		if (scoords.top - ecoords.top < 15) ecoords.top = scoords.top - 15;
		if (ecoords.top + ecoords.height - scoords.top < 15) ecoords.top = scoords.top - ecoords.height + 15;
		
		scoords.left += 6;
		scoords.top -= 9;
		this.popup.set(scoords, ecoords);
		this.popup.show();
	},

	reset: function() {
		if (this.curComment) {
			this.curComment.removeClass('active');
			this.popup.hide();
		}
	}
	
});

// Popup MKII

var popup = new Class({

	Implements: [Events, Options],

	options: {
		duration: 250,
		transition: Fx.Transitions.Cubic.easeOut,
		elements: ['table', '.balloons-c'],
		body:
			'<table class="balloons">' +
			'<tr><td class="balloons-tl"></td><td class="balloons-t"></td><td class="balloons-tr"></td></tr>' +
			'<tr><td class="balloons-l"></td><td class="balloons-c"></td><td class="balloons-r"></td></tr>' +
			'<tr><td class="balloons-bl"></td><td class="balloons-b"></td><td class="balloons-br"></td></tr>' +
			'</table>',
		zIndex: 200000
	},
	
	initialize: function(options) {
		this.setOptions(options);
		this.wrapper = new Element('div', {
			'styles': {visibility: 'hidden'},
			'html': this.options.body
		}).inject(document.body);
		this.holder = new Element('div', {
			styles: {
				position: 'absolute',
				left: -9999,
				top: -9999,
				'z-index': this.options.zIndex,
				visibility: 'hidden'
			}
		}).inject(document.body);
		this.state = null; // 1 - show, 2 - hide, 3 - hidden, 4 - completed
		this.elements = [];
		this.options.elements.each(function(selector) {
			this.elements.push(this.wrapper.getElement(selector));
		}, this);
		this.elfx = new Fx.Elements(this.elements, {
			duration: this.options.duration,
			transition: this.options.transition,
			wait: false,
			onStart: this.startHandler.bind(this),
			onComplete: this.completeHandler.bind(this)
		})
	},
	
	set: function(scoords, ecoords) {
		this.coords = ecoords;
		this.holder.setStyles({
			width: ecoords.width,
			height: ecoords.height
		});
		this.startSet = {
			'0': {left: scoords.left - 6, top: scoords.top - 6},
			'1': {height: (scoords.height || 19) - 18}
		}
		if (Browser.Engine.presto925) this.startSet['0'].width = (scoords.height || 19) + 18;
		else this.startSet['1'].width = (scoords.width || 19) - 18;
		this.endSet = {
			'0': {left: ecoords.left - 6, top: ecoords.top - 6},
			'1': {height: ecoords.height - 18}
		}
		if (Browser.Engine.presto925) this.endSet['0'].width = ecoords.width - 18 + 36;
		else this.endSet['1'].width = ecoords.width - 18;
		this.elfx.set(this.startSet);
	},
	
	show: function() {
		this.state = 1;
		this.elfx.start(this.endSet);
	},

	hide: function() {
		this.state = 2;
		this.elfx.start(this.startSet);
	},
	
	completeHandler: function() {
		if (!this.state) return;
		if (this.state == 1) {
			this.state = 4;
			this.holder.setStyles({
				top: this.coords.top,
				left: this.coords.left,
				visibility: 'visible'
			});
			this.fireEvent('onShowcomplete');
		} else {
			this.state = 3;
			this.wrapper.setStyle('visibility', 'hidden');
			this.fireEvent('onHidecomplete');
		}
	},

	startHandler: function() {
		if (!this.state) return;
		if (this.state == 1) {
			if (this.wrapper.getStyle('visibility') == 'hidden') {
				this.elfx.set(this.startSet);
				this.wrapper.setStyle('visibility', 'visible');
			}
			this.fireEvent('onShowstart');
		} else {
			this.holder.setStyles({
				left: -9999,
				top: -9999,
				visibility: 'hidden'
			});
			this.fireEvent('onHidestart');
		}
	},
	
	limitHorisontal: function(coords, limit) {
		if (coords.left + coords.width > limit.right) coords.left = limit.right - coords.width;
		if (coords.left < limit.left) coords.left = limit.left;
	},

	limitVertical: function(coords, limit) {
		if (coords.top + coords.height > limit.bottom) coords.top = limit.bottom - coords.height;
		if (coords.top < limit.top) coords.top = limit.top;
	},
	
	limitBox:  function(coords, limit) {
		this.limitHorisontal(coords, limit);
		this.limitVertical(coords, limit);
	}
});

popup.square = new Class({

	Extends: popup,
	
	options: {
		body:
			'<table class="balloons">' +
			'<tr><td class="balloons-s-tl"></td><td class="balloons-s-t"></td><td class="balloons-s-tr"></td></tr>' +
			'<tr><td class="balloons-s-l"></td><td class="balloons-c"></td><td class="balloons-s-r"></td></tr>' +
			'<tr><td class="balloons-s-bl"></td><td class="balloons-s-b"></td><td class="balloons-s-br"></td></tr>' +
			'</table>'
	}
	
});


popup.comment = new Class({

	Extends: popup,
	
	options: {
		elements: ['table', '.balloons-c', '.balloons-arr'],
		body:
			'<table class="balloons">' +
			'<tr><td class="balloons-tl"></td><td class="balloons-t"></td><td class="balloons-tr"></td></tr>' +
			'<tr><td class="balloons-l"></td><td class="balloons-c"></td><td class="balloons-r"></td></tr>' +
			'<tr><td class="balloons-bl"></td><td class="balloons-b"></td><td class="balloons-br"></td></tr>' +
			'</table>' +
			'<div class="balloons-arr"></div>'
	},
	
	set: function(scoords, ecoords) {
		this.parent(scoords, ecoords);
		this.elements[2].setStyles({
			left: scoords.left + 19,
			top: scoords.top - 2
		});
	}

});

popup.addform = new Class({

	Extends: popup.comment,
	
	options: {
		body:
			'<table class="balloons balloons-a">' +
			'<tr><td class="balloons-tl"></td><td class="balloons-t"></td><td class="balloons-tr"></td></tr>' +
			'<tr><td class="balloons-l"></td><td class="balloons-c"></td><td class="balloons-r"></td></tr>' +
			'<tr><td class="balloons-bl"></td><td class="balloons-b"></td><td class="balloons-br"></td></tr>' +
			'</table>' +
			'<div class="balloons-arr balloons-arr-a"></div>'
	}

});

var Spinner = new Class({

	initialize: function(element, button) {
		this.state = false;
		this.element = element;
		this.button = button || null;
		this.stop();
	},
	
	start: function() {
		this.state = true;
		if (this.button) this.button.disabled = true;
		this.element.addClass('loading');
	},

	stop: function() {
		this.state = false;
		if (this.button) this.button.disabled = false;
		this.element.removeClass('loading');
	}
	
});

/*
Request.safeJSON
	Request.JSON с проверками на ошибки сервера или на ошибочный отданный JSON. В опциях есть параметр progressIndicator.
*/

Request.safeJSON = new Class({

	Extends: Request.JSON,

	options: {
		progressIndicator: null,
		quietMode: false
	},

	initialize: function(options){
		this.parent(options);
		//arguments.callee.parent(options);
	},

	send: function(options) {
		if (this.options.progressIndicator) this.options.progressIndicator.start();
		this.parent(options);
		//arguments.callee.parent(options);
	},

	success: function(text) {
		if (this.options.progressIndicator) this.options.progressIndicator.stop();
		this.response.json = JSON.decode(text, this.options.secure);
		if (this.response.json) {
			if (this.response.json.error) {
				if (!this.options.quietMode) alert($splat(this.response.json.error).join('\n'));
				this.fireEvent('complete').fireEvent('failure', this.xhr);
			} else {
				this.onSuccess(this.response.json, text);
			}
		} else {
			if (!this.options.quietMode) alert('Ошибка обработки запроса.');
			this.onFailure();
		}
	},

	failure: function() {
		if (this.options.progressIndicator) this.options.progressIndicator.stop();
		if (!this.options.quietMode) alert('Ошибка исполнения запроса.');
		this.onFailure();
	}

});
