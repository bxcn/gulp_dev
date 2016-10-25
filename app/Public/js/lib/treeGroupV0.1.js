

/*ajaxData.post({
	url:"/FavoriteGroup/add",
	data:{group_name:"最新添加", group_pid:0},
	success: function( result ) {
		console.log(result);
	}
});*/

/*ajaxData.post({
	url:"/FavoriteGroup/delete",
	data:{deltype:2, id:15},
	success: function( result ) {
		console.log(result);
	}
});
*/
/*ajaxData.post({
	url:"/FavoriteGroup/edit",
	data:{group_name:"修改分组名称", id:13},
	success: function( result ) {
		console.log(result);
	}
});*/


/*ajaxData.post({
	url:"/FavoriteGroup/jsonList",
	success: function( result ) {
		console.log(result);
	}
});*/

/*function TreeRoot(id, name, total, level, addLevel, last, isLink) {
	this.level = level;

	var root = document.createElement("div");
		root.setAttribute("class", "panel-body");
		root.setAttribute("data-panel", "tree");

	var panel = document.createElement("div");
		panel.setAttribute("class", "tree-root");
	var b = document.createElement("b");
	var link = document.createElement("a");
		link.setAttribute("class", "folder");
		link.innerHTML = name;
		link.href= isLink ? "javascript:void(0)" : "/Favorite/index/" + id;
		link.id = id;

	var child = document.createElement("div");
		child.setAttribute("class", "child");

	var toolbar = document.createDocumentFragment();
	if (isLink) {

		var toolbar = document.createElement("span");
			toolbar.setAttribute("class", "toolbar");

		var add = document.createElement("a");
			add.setAttribute("data-title", "新建目录");
			add.setAttribute("data-action", "mk");
			add.href="#";
			add.innerHTML = "添加子目录";
			add.id = id;

		var modify = document.createElement("a");
			modify.setAttribute("data-title", "修改目录");
			modify.setAttribute("data-action", "mv");
			modify.href="#";
			modify.innerHTML = "修改";
			modify.id = id;

		var del = document.createElement("a");
			del.setAttribute("data-title", "删除确认");
			del.setAttribute("data-action", "rm");
			del.href="#";
			del.innerHTML = "删除";
			del.id = id;

		if ( level <= addLevel) {
			toolbar.appendChild(add);
		}
		toolbar.appendChild(del);
		toolbar.appendChild(modify);
	}	

	root.appendChild(panel);
	root.appendChild(child);
	panel.appendChild(b);
	panel.appendChild(link);
	panel.appendChild(toolbar);

	this.child = child;
	this.element = root;

}
TreeRoot.prototype = {

	addNode: function(treeNode) {
		this.child.appendChild(treeNode.getElement());

	},
	getElement: function() {
		return this.element;
	},
	getLevel: function() {
		return this.level;
	},
	setLevel: function( level ) {
		this.level = level;
	}
	
}*/


function TreeComposite(id, name, total, level, addLevel, last, isLink) {

	var root = document.createDocumentFragment();

	var panel = document.createElement("div");
		panel.setAttribute("class", (last ? "tree-folder last" : "tree-folder"));
	var b = document.createElement("b");
	var i = document.createElement("i");

	var link = document.createElement("a");
		link.setAttribute("class", "folder");
		link.href= isLink ? "javascript:void(0)" : "/Favorite/index/" + id;
		link.innerHTML = name+"["+total+"]";
		link.id = id;

	var child = document.createElement("div");
		child.setAttribute("class", "tree-child");

	var toolbar = document.createDocumentFragment();
	if (isLink) {

		var toolbar = document.createElement("span");
			toolbar.setAttribute("class", "toolbar");

		var add = document.createElement("a");
			add.setAttribute("data-title", "新建目录");
			add.setAttribute("data-action", "mk");
			add.href="#";
			add.innerHTML = "添加子目录";
			add.id = id;

		var modify = document.createElement("a");
			modify.setAttribute("data-title", "修改目录");
			modify.setAttribute("data-action", "mv");
			modify.href="#";
			modify.innerHTML = "修改";
			modify.id = id;

		var del = document.createElement("a");
			del.setAttribute("data-title", "删除确认");
			del.setAttribute("data-action", "rm");
			del.href="#";
			del.innerHTML = "删除";
			del.id = id;

		if ( level <= addLevel) {
			toolbar.appendChild(add);
		}
		toolbar.appendChild(del);
		toolbar.appendChild(modify);
	}	


	if (level) {
		panel.appendChild(i);
	}
	panel.appendChild(b);
	panel.appendChild(link);
	panel.appendChild(toolbar);
	root.appendChild(panel);
	root.appendChild(child);

	this.level = level;
	this.child = child;
	this.element = root;

}
TreeComposite.prototype = {
		
	addNode: function(treeNode) {
		this.child.appendChild(treeNode.getElement());

	},
	getElement: function() {
		return this.element;
	},
	getLevel: function() {
		return this.level;
	},
	setLevel: function( level ) {
		this.level = level;
	}
	
}

function TreeLeaf(id, name, total, level, addLevel, last, isLink) {

	var panel = document.createElement("div");
		panel.setAttribute("class", (last ? "tree-only last" : "tree-only"));
	var b = document.createElement("b");
	var i = document.createElement("i");
	var link = document.createElement("a");
		link.setAttribute("class", (total ? "folder" : "folder empty"));
		link.href= isLink ? "javascript:void(0)" : "/Favorite/index/" + id;
		link.innerHTML = name+"["+total+"]";
		link.id = id;

	var toolbar = document.createDocumentFragment();
	if (isLink) {

		var toolbar = document.createElement("span");
			toolbar.setAttribute("class", "toolbar");

		var add = document.createElement("a");
			add.setAttribute("data-title", "新建目录");
			add.setAttribute("data-action", "mk");
			add.href="#";
			add.innerHTML = "添加子目录";
			add.id = id;

		var modify = document.createElement("a");
			modify.setAttribute("data-title", "修改目录");
			modify.setAttribute("data-action", "mv");
			modify.href="#";
			modify.innerHTML = "修改";
			modify.id = id;

		var del = document.createElement("a");
			del.setAttribute("data-title", "删除确认");
			del.setAttribute("data-action", "rm");
			del.href="#";
			del.innerHTML = "删除";
			del.id = id;

		if ( level <= addLevel) {
			toolbar.appendChild(add);
		}
		toolbar.appendChild(del);
		toolbar.appendChild(modify);
	}	


	panel.appendChild(i);
	panel.appendChild(link);
	panel.appendChild(toolbar);

	this.element = panel;
	
}
TreeLeaf.prototype = {
	addNode: function(treeNode) {},
	getElement: function() {
		return this.element;
	},
	getLevel: function() {
		return this.level;
	},
	setLevel: function( level ) {
		this.level = level;
	}
}

/*var treeRoot = new TreeRoot(0, "全部", 5, 1);
var treeComposite0 = new TreeComposite(0, "全部", 5, 1, true);
var treeComposite1= new TreeComposite(0, "全部全部全", 5, 1, true);
var treeComposite2= new TreeComposite(0, "全部", 5, 1, true);
var treeComposite3= new TreeLeaf(0, "全部", 5, 1, true);

treeComposite2.addNode(treeComposite3);
treeComposite1.addNode(treeComposite2);
treeComposite0.addNode(treeComposite1);
treeRoot.addNode(treeComposite0);*/

// 递归迭代集合中的组合对象
function LevelNodeRender( currData, parentNode, isLink, addLevel ) {

	// 判断
	var len = currData.child && currData.child.length || 0;
	var level = parentNode.getLevel() + 1;

	// 无子元素个数返回
	if ( !len ) {
		return;
	}

	for( var i = 0; i < len; i++) {

		var data = currData.child[i];//获取集合中的单个元素
		var childLen = data.child && data.child.length || 0; // 子集的个数
		var id = data.id; // 主键
		var groupName = data.group_name; //组名
		var count = data.count; // 组中的记录
		var last = (len == (i+1)); // 是否是最后一个元素
		
		// 当前组元素是组合对象(Composite)还是单个对象(Leaf)
		if ( childLen ) {
			var treeComposite = new TreeComposite(id, groupName, count, level, addLevel, last, isLink);
				parentNode.addNode(treeComposite);
				LevelNodeRender(data, treeComposite, isLink, addLevel); // 组合对象 递归调用它的子元素
		} else {
			var treeLeaf = new TreeLeaf(id, groupName, count, level, (id==0 ? 1 : addLevel), last,  isLink);
			parentNode.addNode(treeLeaf);
		}
	}

	parentNode.setLevel(level);
	return parentNode;
}

function treeGroupView(parent, isLink, addLevel) {
	addLevel = addLevel || 3;
	var treeRoot = new TreeComposite(0, "全部", 0, 0, addLevel, true, isLink);
		treeRoot.setLevel(1);


	ajaxData.post({
		url:"/FavoriteGroup/jsonList",
		success: function( result ) {
			if ( result.state ) {
				result["child"] = result["child"] || result.data;
				var node = LevelNodeRender(result, treeRoot, isLink, addLevel);
				parent.html("").append(node.getElement());
			}
		}
	});
}


/*$("#rootTree").append(treeRoot.getElement());*/


/*ajaxData.post({
	url:"/FavoriteGroup/jsonList",
	success: function( result ) {
		if ( result.state ) {
			for( var i = 0, len = result.data.length; i < len; i++) {
				var data = result.data[i];
				if ( data.child && data.child.length ) {

					var childrenLength = data.child && data.child.length || 0;
					var treeComposite = new TreeComposite(data.id, data.group_name, data.count, 1);
						treeRoot.addNode(treeComposite);

					for( var j = 0, jlen = data.child.length; j < jlen; j++) {
						var childData = data.child[j];
						var last = (childrenLength == (j+1));

						if ( childData.child && childData.child.length ) {
							var treeComposite0 = new TreeComposite(childData.id, childData.group_name, childData.count, treeComposite.getLevel(), last);
							treeComposite.addNode(treeComposite0);
						} else {
							var treeLeaf0 = new TreeLeaf(childData.id, childData.group_name, childData.count, treeComposite.getLevel(), last);
							treeComposite.addNode(treeLeaf0);
						}

					}

				} else {
					var treeLeaf = new TreeLeaf(data.id, data.group_name, data.count, 1);
					treeRoot.addNode(treeLeaf);
				}

			}
		}
	}
});*/