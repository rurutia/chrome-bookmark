var barId = "-1";
var initGroupId = 200;
var initGroupIndex = 0;

var data = [
	{
		title: "Confluence Wiki",
		children: [
			{
				title: "On boarding new starters",
				url: "https://wiki.sbetcorp.com.au/confluence/pages/viewpage.action?pageId=11995687"
			}
		]
	},
	{
		title: "Projects Repo (Stash)",
		children: [
			{
				title: "API Core Services",
				url: "https://stash.sbetcorp.com.au/projects/MIC/repos/apicoreservices/browse"
			}
		]
	}
];

var defaultBars = [];

data.forEach(function(group, i) {
	group.dateAdded = 1435705527287;
	group.dateGroupModified = 1435705527287;
	group.id = "-" + initGroupId++;
	group.index = initGroupIndex++;
	group.parentId = barId;

	itemId = group.id + "0";
	itemIndex = 0;
	group.children.forEach(function(item, i) {
		item.dateAdded = 1435705527287;
		item.id = "-" + itemId++;
		item.index = itemIndex++;
		item.parentId = group.id;
		// group.children.push(item);
	});

	defaultBars.push(group);
});

var getGroupById = (function() {
	var bookmark;

	function _getGroupById(data, id) {
		result = data.filter(function(d) {
			return d.parentId == id;
		});
		if(result.length > 0) {
			bookmark = bookmark || result;
		} else {
			data.forEach(function(m, i) {
				if(m.children) {
					return _getGroupById(m.children, id);
				}
			});	
		}
	};

	return function(data, id) {
		bookmark = null;
		_getGroupById(data, id);	
		return bookmark;
	};
})();

