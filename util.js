var httpsPattern = /^https?:\/\//i;


var generateBookmarkHTML = function(title, url, extras){
	if (!extras) extras = '';
	var u = tooltipURL = url.htmlspecialchars();
	var favicon = 'chrome://favicon/' + u;
	if (/^javascript:/i.test(url)){
		if (url.length > 140) tooltipURL = url.slice(0, 140) + '...';
		favicon = 'document-code.png';
	}
	var name = title.htmlspecialchars() || (httpsPattern.test(url) ? url.replace(httpsPattern, '') : _m('noTitle'));
	return '<a href="' + u + '"' + ' title="' + tooltipURL + '" tabindex="0" ' + extras + '>'
		+ '<img src="' + favicon + '" width="16" height="16" alt=""><i>' + name + '</i>' + '</a>';
};

function _isBookmarkFolder(bookmark) {
	return bookmark.dateGroupModified || bookmark.children || typeof bookmark.url === 'undefined';
};

var generateHTML = function(data, rememberState, opens, level){
		if (!level) level = 0;
		var paddingStart = 14 * level;
		var group = (level == 0) ? 'tree' : 'group';
		var html = '<ul role="' + group + '" data-level="' + level + '">';
		
		console.log(data);

		for (var i = 0, l = data.length; i < l; i++){
			var d = data[i];
			var children = d.children;
			var title = d.title.htmlspecialchars();
			var url = d.url;
			var id = d.id;
			var parentID = d.parentId;
			var idHTML = id ? ' id="neat-tree-item-' + id + '"': '';
			if (_isBookmarkFolder(d)) { // bookmark is folder
				var isOpen = false;
				var open = '';
				if (rememberState){
					isOpen = opens.contains(id);
					if (isOpen) open = ' open';
				}
				html += '<li class="parent' + open + '"' + idHTML + ' role="treeitem" aria-expanded="' + isOpen + '" data-parentid="' + parentID + '">'
					+ '<span tabindex="0" style="-webkit-padding-start: ' + paddingStart + 'px"><b class="twisty"></b>'
					+ '<img src="folder.png" width="16" height="16" alt=""><i>' + (title || _m('noTitle')) + '</i>' + '</span>';
				if (isOpen){
					if (children){
						html += generateHTML(children, rememberState, opens, level + 1);
					} else {
						// (function(_id){
						// 	chrome.bookmarks.getChildren(_id, function(children){
						// 		console.log("...subchid.." + _id);
						// 		var html = generateHTML(children, rememberState, opens, level + 1);
						// 		var div = document.createElement('div');
						// 		div.innerHTML = html;
						// 		var ul = div.querySelector('ul');
						// 		ul.inject($('neat-tree-item-' + _id));
						// 		div.destroy();
						// 	});
						// })(id);
					}
				}
			} else {
				html += '<li class="child"' + idHTML + ' role="treeitem" data-parentid="' + parentID + '">'
					+ generateBookmarkHTML(title, url, 'style="-webkit-padding-start: ' + paddingStart + 'px"');
			}
			html += '</li>';
		}
		html += '</ul>';
		return html;
	};