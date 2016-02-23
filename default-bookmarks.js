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

var defaultBar = [];

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

	defaultBar.push(group);
});

function getGroupById(data, id) {
	result = data.filter(function(d) {
		return d.id == id;
	});
	if(result.length === 1) {
		return result;
	} else if(result.children) {
		return getGroupById(result.children, id);
	} else {
		return;
	}
};

