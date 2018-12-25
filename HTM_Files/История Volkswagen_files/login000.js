var userLoggedIn = false;
(function(){
	var t = '';
	var id = Cookie.read("Auth.Id");
	var nick = Cookie.read("Auth.Nick");
	var msgs = id ? Cookie.read("UM.Count." + parseInt(id)) : null;
	if (!id) {
		userLoggedIn = false;
		t += '<form action="/reception/login.html" method="POST" name="lform">';
		t += '<input type="hidden" name="return" value="' + window.location.href + '">';
		t += '<table cellspacing="0" cellpadding="0" id="top-login"><tr>';
		t += '<td><span id="reglink" style="background-color: #fff; padding: 3px 0;">&nbsp;&nbsp;<a class="ablack" href="/reception/register.html">����������� � ����</a>&nbsp;&nbsp;</span>&nbsp;&nbsp;&nbsp;</td>';
		t += '</tr></table>';
		t += '<div id="regblock">' +
			'<div><label>�����</label><input type="text" name="login" class="input-text"></div>' +
			'<div><label>������</label><input type="password" name="password" class="input-text"></div>' +
			'<div><label>&nbsp;</label><input type="submit" class="submit" value="Drive!"></div>' +
			'<span><a href="/reception/password.html">������&nbsp;������?</a> &nbsp; &nbsp;' +
			'<input type="checkbox" name="rememberMe" id="rememberMe" value="true"> <label title="�� ����������� ���� ������ ��� ������ (�������� 2&nbsp;������)" for="rememberMe">���������</label><br>' +
			'<a style="position: relative; top: -3px;" href="/reception/register.html">�����������</a><br></span>' +
			'</div>';
		t += '</form>';
		$('tlwrapper').set('html', t);
		$('reglink').addEvent('click', function(event) {
            event = new Event(event).stop();
			var hidden = ($('regblock').getStyle('display') == 'none');
            $('regblock').setStyle('display', (hidden) ? 'block' : 'none');
            if (hidden)
            	$('regblock').getElement('input[name=login]').focus();
		});
	} else if (id && nick && msgs) {
		userLoggedIn = true;
		t += '<table cellspacing="0" cellpadding="0" id="top-login"><tr><td>';
		t += '<span style="background-color:#fff; padding:3px 0;">&nbsp;&nbsp;<a class="ablack" href="/users/' + nick + '"><B>' + nick + '</B></a>&nbsp;&nbsp;</span>';
		if (msgs && parseInt(msgs) > 0) t += '<span style="padding:3px 0; background-color:#f03;" title="� ��� ���� ����� ���������">&nbsp;<a href="/my/"><img src="/images/alert2.gif" width="18" height="11" style="position: relative; top: 2px;"></a><a class="awhite" href="/my/"><B>' + msgs + '</B></a>&nbsp;';
		t += '&nbsp;</span>&nbsp;&nbsp;<a href="/my/"><B>���&nbsp;��������</B></a>&nbsp;&nbsp;|';
		t += '&nbsp;&nbsp;<a href="/reception/settings.html">���������</a>&nbsp;&nbsp;|&nbsp;&nbsp;<a href="/forums/">������</a>&nbsp;&nbsp;|&nbsp;&nbsp;<a class="exit" href="/reception/logout.html" title="�����"><B>�����</B></a>';
		t += '</td></tr></table>';
		$('tlwrapper').set('html', t);
	} else {
		new Request.HTML({
			url: '/reception/logininfo.html',
			evalScripts: true,
			onComplete: function(responseTree, responseElements, responseHTML, responseJavaScript) {
				$('tlwrapper').set('html', responseHTML);
				var t = $('tlwrapper').getElement('input[name=return]')
				if (t) t.value = window.location.href;
			}
		}).get();
	}
})();
