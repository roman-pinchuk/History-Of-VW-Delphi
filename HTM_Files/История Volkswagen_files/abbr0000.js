var Abbr = new Class({

	Implements: Events,

	options: {
		popupWidth: 320
	},
	
	initialize: function() {
		window.addEvent('domready', function() {
			this.popup = new popup();
			$$('.abbr').each(function(el) {
				el.set('html', '<span>' + el.innerHTML.replace(/\s/g, '</span> <span>') + '</span>');
				el.getElements('span').each(function(elt) {
					elt.store('comm:text', el.get('title'));
					elt.addEvent('click', this.show.bindWithEvent(this, elt));
				}, this);
				el.erase('title');
			}, this);
			this.hideHandler = this.hide.bind(this);
			this.popup.addEvents({
				onShowcomplete: function() {
					document.addEvent('click', this.hideHandler);
				}.bind(this)
			});
		}.bind(this));
	},
	
	show: function(e, el) {
		if (this.current && this.current == el) {this.popup.show(); return;}
		this.current = el;
		var text = el.retrieve('comm:text');

		this.popup.holder.setStyles({
			width: this.options.popupWidth,
			height: 'auto'
		});
		this.popup.holder.set('html', '<div class="abbrpopup">' + text + '</div>');
		
		var pos = el.getCoordinates();
		var holder = this.popup.holder.getSize();
		var scoords = {
			left: pos.right - parseInt(pos.width / 2) - 6,
			top: pos.bottom + 8
		}
		var ecoords = {
			left: pos.right - parseInt(pos.width / 2) - parseInt(this.options.popupWidth / 2),
			top: pos.bottom + 8,
			width: this.options.popupWidth,
			height: this.popup.holder.offsetHeight
		};
		var scrollTop = Window.getScroll().y;	
		var scrollBottom = scrollTop + Window.getSize().y;
		if (ecoords.top + holder.y > scrollBottom && pos.top - 12 - holder.y > scrollTop) {
			scoords.top = pos.top - 12 - 19;
			ecoords.top = pos.top - 12 - holder.y;
		}
		
		this.popup.set(scoords, ecoords);
		this.popup.show();
	},

	hide: function() {
		if (this.current) {
			this.current = null;
			this.popup.hide();
			document.removeEvent('click', this.hideHandler);
		}
	}
	
});
var abbr = new Abbr();